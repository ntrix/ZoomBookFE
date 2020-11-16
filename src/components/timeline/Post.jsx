import React, { useState, useRef } from 'react';
import headers from 'services/headers';
import PostComments from './PostComments';
import Reactions from './Reactions';
import like from 'images/likeReaction.png';
import love from 'images/love.png';
import haha from 'images/haha.png';
import wow from 'images/wow.png';
import sad from 'images/sad.png';
import angry from 'images/angry.png';
import defaultPicture from 'images/defaultAvatar.png';
import pen from 'images/pen.png';
import deleteIcon from 'images/delete.png';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditPostForm from './EditPostForm';
import axios from 'axios';

export default function Post({
    post_id,
    user,
    user_id,
    profile_picture,
    content,
    image,
    comments,
    reactions,
    timestamp,
    currentUser,
    deletePost,
}) {
    const [postContent, setPostContent] = useState(content || '');
    const [postComments, setPostComments] = useState(comments);
    const [commentsCount, setCommentCount] = useState(comments.length || 0);
    const [comment, setComment] = useState('');
    const [postReactions, setPostReactions] = useState(reactions);
    const [showPostActions, setShowPostActions] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUserID = currentUser._id;

    const createComment = async (e) => {
        e.preventDefault();
        const newComment = {
            content: comment,
            user_id: currentUser._id,
        };
        const { data } = await axios.put(`/api/posts/${post_id}/comment`, newComment, {
            mode: 'cors',
            headers: headers(),
        });
        setComment('');
        setPostComments((comments) => comments.concat(data));
        setCommentCount(postComments.length + 1);
        console.log(data);
    };

    const likes = postReactions.filter((reaction) => reaction.type === 'Like').length;
    const loves = postReactions.filter((reaction) => reaction.type === 'Love').length;
    const hahas = postReactions.filter((reaction) => reaction.type === 'Haha').length;
    const wows = postReactions.filter((reaction) => reaction.type === 'Wow').length;
    const sads = postReactions.filter((reaction) => reaction.type === 'Sad').length;
    const angrys = postReactions.filter((reaction) => reaction.type === 'Angry').length;
    const reactionCounts = [
        { type: likes, img: like, key: 1 },
        { type: loves, img: love, key: 2 },
        { type: hahas, img: haha, key: 3 },
        { type: wows, img: wow, key: 4 },
        { type: sads, img: sad, key: 5 },
        { type: angrys, img: angry, key: 6 },
    ];

    const sortedReactionCountes = reactionCounts.sort((a, b) => b.type - a.type);

    const commentInput = useRef();
    const focusCommentInput = () => {
        commentInput.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        commentInput.current.focus();
    };

    return (
        <article>
            {currentUserID === user_id ? (
                <div className="post-actions" onClick={() => setShowPostActions(!showPostActions)}>
                    &sdot;&sdot;&sdot;
                    {showPostActions && (
                        <div className="btn-wrapper">
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowEditForm(!showEditForm)}
                                >
                                    <img src={pen} alt=" " />
                                    Edit
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={(e) => deletePost(post_id, setShowPostActions)}
                                >
                                    <img src={deleteIcon} alt="" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                ''
            )}
            <Link to={`/users/${user_id}/profile`}>
                <figure className="user-info">
                    <img src={profile_picture || defaultPicture} alt="" />
                    <figcaption>
                        <p className="username">{user}</p>
                        <p className="post-date">
                            {moment(new Date(timestamp.split(', ').reverse().join(' '))).fromNow()}
                        </p>
                    </figcaption>
                </figure>
            </Link>
            {currentUserID === user_id && (
                <EditPostForm
                    oldContent={content}
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                    post_id={post_id}
                    setPostContent={setPostContent}
                />
            )}
            <figure className="post-content" onClick={() => setShowPostActions(false)}>
                {!showEditForm && <figcaption>{postContent}</figcaption>}
                <img src={image || ''} alt="" className="post-img" />
            </figure>
            <div className="reactions-comment-count">
                <ul className="reactions">
                    {sortedReactionCountes.map(
                        (reaction) =>
                            !!reaction.type && (
                                <li key={reaction.key}>
                                    <img src={reaction.img} alt="" />
                                    <span className="reaction-counter">{reaction.type}</span>
                                </li>
                            ),
                    )}
                    <li>{postReactions.length > 0 ? postReactions.length : ''}</li>
                </ul>
                <p className="comment-count">
                    {commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`}
                </p>
            </div>
            <div className="like-comment-buttons">
                <div className="like" id="like-btn">
                    <Reactions
                        post_id={post_id}
                        user_id={currentUser._id}
                        setPostReactions={setPostReactions}
                    />
                    <i></i>Like
                </div>
                <button className="comment" onClick={focusCommentInput}>
                    <i></i>Comment
                </button>
            </div>
            <PostComments comments={postComments} />
            <form onSubmit={(e) => createComment(e)}>
                <img src={currentUser.profile_picture || defaultPicture} alt="" />
                <input
                    type="text"
                    required
                    placeholder="Write a comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    ref={commentInput}
                />
                <button>Comment</button>
            </form>
        </article>
    );
}

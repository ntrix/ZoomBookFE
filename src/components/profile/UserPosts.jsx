import React, { useState, useEffect } from 'react';
import Post from '../timeline/Post';
import headers from 'services/headers';
import axios from 'axios';

export default function UserPosts({ currentUser, profile_user_id, profile_picture }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const abortCon = new AbortController();
        const signal = abortCon.signal;

        const getUserPosts = async () => {
            const { data } = await axios(`/api/users/${profile_user_id}/profile/posts`, {
                mode: 'cors',
                headers: headers(),
                signal,
            });
            setPosts(data);
        };
        if (currentUser._id) {
            getUserPosts();
        }
        return function () {
            abortCon.abort();
        };
    }, [currentUser._id, profile_user_id]);

    const deletePost = async (post_id, setShowPostActions) => {
        await axios.delete(`/api/posts/${post_id}`, {
            mode: 'cors',
            headers: headers(),
        });
        setPosts((prevState) => prevState.filter((post) => post._id !== post_id));
        setShowPostActions(false);
    };

    return (
        <>
            <div className="posts">
                <section className="post-list">
                    {posts.map((post) => (
                        <Post
                            key={post._id}
                            post_id={post._id}
                            user={`${post.user.first_name} ${post.user.last_name}`}
                            user_id={post.user._id}
                            profile_picture={profile_picture}
                            content={post.content}
                            image={post.image}
                            comments={post.comments}
                            reactions={post.reactions}
                            timestamp={post.timestamp}
                            currentUser={currentUser}
                            deletePost={deletePost}
                        />
                    ))}
                </section>
            </div>
        </>
    );
}

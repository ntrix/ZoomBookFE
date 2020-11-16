import React from 'react';
import defaultPicture from 'images/defaultAvatar.png';
import { Link } from 'react-router-dom';

export default function Friends({ friends }) {
    return (
        <section className="user-friends">
            <h2>
                Friends <button>See All</button>
            </h2>
            {friends && (
                <>
                    <p>{friends.length} friends</p>
                    <div>
                        {friends.map((friend) => (
                            <Link
                                to={`/users/${friend._id}/profile`}
                                key={`${friend.first_name} ${friend.last_name}`}
                            >
                                <figure>
                                    <img src={friend.profile_picture || defaultPicture} alt="" />
                                    <figcaption>{`${friend.first_name} ${friend.last_name}`}</figcaption>
                                </figure>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

import React from 'react';
import Header from './Header';
import defaultPicture from 'images/defaultAvatar.png';
import { Link } from 'react-router-dom';

export default function SearchPage({ currentUser, logOut, location }) {
    const people = location.state.searchResult;
    const friendsID = currentUser.friends && currentUser.friends.map((friend) => friend._id);

    return (
        <>
            <Header
                username={currentUser.first_name}
                profile_picture={currentUser.profile_picture}
                user_id={currentUser._id}
                full_name={`${currentUser.first_name} ${currentUser.last_name}`}
                friend_requests={currentUser.friend_requests}
                logOut={logOut}
            />
            <section className="search-people">
                <h2>People</h2>
                {people.length > 0 ? (
                    people.map((person) => (
                        <figure key={person._id}>
                            <Link to={`/users/${person._id}/profile`}>
                                <img src={person.profile_picture || defaultPicture} alt="" />
                                <figcaption>{`${person.first_name} ${person.last_name}`}</figcaption>
                            </Link>
                            {friendsID && friendsID.includes(person._id) ? (
                                <div className="action">Friend</div>
                            ) : (
                                <Link to={`/users/${person._id}/profile`}>
                                    <div className="action">
                                        {person._id === currentUser._id ? ' You ' : 'See profile'}
                                    </div>
                                </Link>
                            )}
                        </figure>
                    ))
                ) : (
                    <p>No user found! Try again with another name?</p>
                )}
            </section>
        </>
    );
}

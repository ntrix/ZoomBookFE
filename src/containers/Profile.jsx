import React, { useState, useEffect } from 'react';
import headers from 'services/headers';
import Header from './Header';
import Intro from '../components/profile/Intro';
import UserPosts from '../components/profile/UserPosts';
import Friends from '../components/profile/Friends';
import axios from 'axios';

export default function Profile({ match, currentUser, logOut }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios(`/api/users/${match.params.id}`, {
                mode: 'cors',
                headers: headers(),
            });
            setUser(data);
        };
        getUser();
    }, [match.params.id]);

    return (
        <>
            <Header
                username={currentUser.first_name}
                full_name={`${currentUser.first_name} ${currentUser.last_name}`}
                user_id={currentUser._id}
                profile_picture={currentUser.profile_picture}
                friend_requests={user.friend_requests}
                logOut={logOut}
            />
            <section className="profile">
                <Intro
                    first_name={user.first_name || ''}
                    last_name={user.last_name || ''}
                    bio={user.bio}
                    cover_photo={user.cover_photo}
                    profile_picture={user.profile_picture}
                    notLoggedInUser={match.params.id}
                    currentUser={currentUser._id}
                    friends={currentUser.friends}
                    friend_requests={currentUser.friend_requests}
                />
                <div className="cols-wrapper">
                    <Friends friends={user.friends} />
                    <UserPosts
                        currentUser={currentUser}
                        profile_user_id={user._id}
                        profile_picture={user.profile_picture}
                    />
                </div>
            </section>
        </>
    );
}

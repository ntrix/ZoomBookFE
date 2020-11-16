import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import headers from 'services/headers';
import Logo from 'images/ZoomBook.png';
import SearchIcon from 'images/search.png';
import edit from 'images/edit.png';
import defaultPicture from 'images/defaultAvatar.png';
import Account from '../components/timeline/Account';
import Notifications from '../components/timeline/Notifications';
import axios from 'axios';

export default function Header({
    username,
    profile_picture,
    user_id,
    full_name,
    friend_requests,
    logOut,
}) {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchPeopleQuery, setSearchPeopleQuery] = useState('');
    const history = useHistory();
    const pendingFrs = friend_requests
        ? friend_requests.filter((fr) => fr.status === 'Pending' && fr.to._id === user_id)
        : [];
    const switchNotifModalState = () => {
        setShowNotifications(!showNotifications);
        setShowAccountSettings(false);
    };

    const switchAccModalState = () => {
        setShowAccountSettings(!showAccountSettings);
        setShowNotifications(false);
    };

    const searchPeople = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await axios(
                `/api/users/${user_id}/search?limit=50&search=${searchPeopleQuery}`,
                { mode: 'cors', headers: headers() },
            );
            const searchResult = data;
            if (status === 200) {
                history.push(`/users/${user_id}/search?q=${searchPeopleQuery}`, { searchResult });
            }
        } catch (e) {
            console.error(e);
        }
    };

    const frNumber = pendingFrs.length;

    return (
        <header className="home-header">
            <form onSubmit={(e) => searchPeople(e)}>
                <img src={Logo} alt="" />
                <input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => setSearchPeopleQuery(e.target.value)}
                />
                <img src={SearchIcon} alt="" />
            </form>
            <ul>
                <Link to={`/users/${user_id}/profile`}>
                    <li>
                        <img src={profile_picture || defaultPicture} alt="" />
                    </li>
                    <li>Hi {username}!</li>
                </Link>
                <li>
                    <Link to={`/users/${user_id}/timeline`}>
                        <img src={edit} alt="" />
                    </Link>
                </li>
                <li className="notifications" onClick={switchNotifModalState}>
                    <i></i>
                    <span>Notifications</span>
                    <span className={frNumber > 0 ? 'fr-number active' : 'fr-number'}>
                        {frNumber > 0 ? frNumber : ''}
                    </span>
                </li>
                <li className="account" onClick={switchAccModalState}>
                    <i></i>
                    <span>Account</span>
                </li>
            </ul>
            <Account
                name={full_name}
                profile_picture={profile_picture || defaultPicture}
                user_id={user_id}
                showAccountSettings={showAccountSettings}
                logOut={logOut}
            />
            <Notifications
                showNotifications={showNotifications}
                friend_requests={friend_requests}
                pendingFrs={pendingFrs}
            />
        </header>
    );
}

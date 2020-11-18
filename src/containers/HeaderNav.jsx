import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBox from 'components/searchPage/SearchBox';
import AccountSetting from '../components/headerNav/AccountSetting';
import Notifications from '../components/headerNav/Notifications';

import Logo from 'images/ZoomBook.png';
import defaultAvatar from 'images/defaultAvatar.png';
import edit from 'images/edit.png';

export default function HeaderNav({
    username,
    profile_picture,
    user_id,
    full_name,
    friend_requests,
    logOut,
}) {
    const [showAccountSettings, setShowAccountSettings] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const pendingFrs = friend_requests
        ? friend_requests.filter((fr) => fr.status === 'Pending' && fr.to._id === user_id)
        : [];
    const switchNotifyModalState = () => {
        setShowNotifications(!showNotifications);
        setShowAccountSettings(false);
    };

    const switchAccModalState = () => {
        setShowAccountSettings(!showAccountSettings);
        setShowNotifications(false);
    };

    const frRequestNumber = pendingFrs.length;

    return (
        <header className="home-header">
            <img src={Logo} alt="" />

            <SearchBox user_id={user_id} />
            <p style={{ flex: 1 }}></p>

            <ul>
                <Link to={`/users/${user_id}/profile`}>
                    <li><img src={profile_picture || defaultAvatar} alt="" /></li>
                    <li>Hi {username}!</li>
                </Link>

                <Link to={`/users/${user_id}/timeline`}>
                    <li><img src={edit} alt="" /></li>
                </Link>

                <li className="notifications" onClick={switchNotifyModalState}>
                    <i></i>
                    <span>Notifications</span>
                    <span className={frRequestNumber > 0 ? 'fr-number active' : 'fr-number'}>
                        {frRequestNumber > 0 ? frRequestNumber : ''}
                    </span>
                </li>

                <li className="account" onClick={switchAccModalState}>
                    <i></i>
                    <span>Account</span>
                </li>
            </ul>

            <AccountSetting
                name={full_name}
                profile_picture={profile_picture || defaultAvatar}
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

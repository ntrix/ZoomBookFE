import React from 'react';
import LoginForm from '../components/loginPage/LoginForm';
import SignUpForm from '../components/loginPage/SignUpForm';
import { Redirect } from 'react-router-dom';

import Logo from 'images/ZoomBook.png';

export default function LoginHeader({ authenticated }) {
    if (authenticated.message) {
        return <Redirect to={`/users/${authenticated.user_id}/timeline`} />;
    }

    return (
        <>
            <header className="log-in-page-header">
                <img src={Logo} alt="" />
                <h1>ZoomBook</h1>
                <LoginForm />
            </header>
            <section className="sign-up-map-container">
                <SignUpForm />
            </section>
        </>
    );
}

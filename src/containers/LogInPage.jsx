import React from 'react';
import LogInForm from '../components/LogInPage/LogInForm';
import SignUpForm from '../components/LogInPage/SignUpForm';
import { Redirect } from 'react-router-dom';

import Logo from 'images/ZoomBook.png';

export default function LogInHeader({ authenticated }) {
    if (authenticated.message) {
        return <Redirect to={`/users/${authenticated.user_id}/timeline`} />;
    }

    return (
        <>
            <header className="log-in-page-header">
                <img src={Logo} alt="" />
                <h1>ZoomBook</h1>
                <LogInForm />
            </header>
            <section className="sign-up-map-container">
                <SignUpForm />
            </section>
        </>
    );
}

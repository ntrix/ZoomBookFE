import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LogInPage from './containers/LogInPage';
import Timeline from './containers/Timeline';
import Profile from './containers/Profile';
import SearchPeople from './containers/SearchPeople';
import headers from './services/headers';
import PrivateRoute from './containers/PrivateRoute';
import axios from 'axios';

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const user = JSON.parse(localStorage.getItem('user')) || '';
    const [authenticated, setAuthenticated] = useState(user || '');
    const user_id = user ? user.user_id : '';

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const { data } = await axios(`/api/users/${user_id}`, {
                    mode: 'cors',
                    headers: headers(),
                });
                setLoggedInUser(data);
            } catch (err) {
                console.error(err);
            }
        };
        if (user_id) {
            getUserInfo();
        }
    }, [user_id]);

    const logOut = () => {
        localStorage.removeItem('user');
        setLoggedInUser({});
        setAuthenticated(false);
    };

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={'/users/login'} />
                </Route>
                <Route
                    path="/users/login"
                    exact
                    render={(props) => <LogInPage {...props} authenticated={authenticated} />}
                />
                <PrivateRoute
                    exact
                    path={'/users/:id/timeline'}
                    render={(props) => <Timeline {...props} logOut={logOut} />}
                />
                <PrivateRoute
                    exact
                    path={'/users/:id/profile'}
                    render={(props) => (<Profile {...props} currentUser={loggedInUser} logOut={logOut} />)}
                />
                <PrivateRoute
                    path="/users/:id/search"
                    exact
                    render={(props) => (<SearchPeople {...props} currentUser={loggedInUser} logOut={logOut} />)}
                />
            </Switch>
        </Router>
    );
}

export default App;

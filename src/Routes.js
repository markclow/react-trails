import React from 'react';
import { Router, Route, IndexRoute, DefaultRoute, hashHistory } from 'react-router';
import App from './components/App';
import Welcome from './components/Welcome';
import Search from './components/Search';
import Details from './components/Details';

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/search" component={Search} />
            <IndexRoute component={Welcome} />
            <Route path="/details" component={Details} />
            <Route path="/details/:lat/:lon" component={Details} />
        </Route>
    </Router>
);

export default routes;

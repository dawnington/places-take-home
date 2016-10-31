import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import App from './App';
import PlaceDetail from './PlaceDetail';
import PlaceStore from '../stores/PlaceStore';

function ensureContent(nextState, replace) {
  if (PlaceStore.all().length === 0) {
    replace('/');
  }
}

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="results/:id" component={PlaceDetail} onEnter={ensureContent} />
    </Route>
  </Router>
);

export default routes;

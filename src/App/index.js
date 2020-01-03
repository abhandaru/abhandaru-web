import LandingView from '~/views/LandingView';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingView} />
      </Switch>
    </Router>
  );
};

export default App;

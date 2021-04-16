import React from 'react';
import './css/App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ContactBook from './pages/ContactBook';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Log in here</Link>
              </li>
              <li>
                <Link to="/landing">Landing</Link>
              </li>
              <li>
                <Link to="/contact-book">Contact Book</Link>
              </li>
            </ul>
          </nav>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/contact-book" exact component={ContactBook} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

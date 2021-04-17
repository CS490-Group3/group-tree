import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ContactBook from './pages/ContactBook';
import './css/App.css';

const clientId =
  '1021307606256-ktn0m9dj0bn27nc2qei22m42h9dj02dk.apps.googleusercontent.com';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
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
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/contact-book" exact component={ContactBook} />
          </Switch>
        </div>
      </Router>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(googleResponse) => {
          fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleResponse.tokenId }),
          });
        }}
        onFailure={() => {}}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default App;

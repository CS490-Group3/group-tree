import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ContactBook from './pages/ContactBook';
import './css/App.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // initialize logged in status to fasle

  if (loggedIn) {
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
                <li>
                  <div>
                    <GoogleLogout
                      clientId={clientId}
                      buttonText="Logout"
                      onLogoutSuccess={() =>
                        fetch('/logout', { method: 'POST' })
                          .then((response) => response.json())
                          .then((data) => {
                            if (data.success === true) setLoggedIn(false);
                          })
                      }
                      style={{ marginTop: '100px' }}
                    />
                  </div>
                </li>
              </ul>
            </nav>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/landing" component={LandingPage} />
              <Route path="/contact-book" exact component={ContactBook} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(googleResponse) =>
          fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: googleResponse.tokenId }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success === true) setLoggedIn(true);
            })
        }
        onFailure={() => {}}
        cookiePolicy="single_host_origin"
        style={{ marginTop: '100px' }}
      />
    </div>
  );
}

export default App;

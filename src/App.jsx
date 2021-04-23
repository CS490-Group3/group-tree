import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TreePage from './pages/TreePage';
import CalenderView from './pages/CalenderView';
import ContactBook from './pages/ContactBook';
import './css/App.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn === true ? (
        <Router>
          <nav>
            <ul>
              <li>
                <h1 id="title">GroupTree</h1>
              </li>
              <li>
                <Link to="/tree-page">TreePage</Link>
              </li>
              <li>
                <Link to="/calender-view">CalenderView</Link>
              </li>
              <li>
                <Link to="/contact-book">ContactBook</Link>
              </li>
              <li>
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
              </li>
            </ul>
          </nav>
          {/* A <Switch> looks through its children <Route>s and renders the first one
          that matches the current URL. */}
          <Switch>
            <Route exact path="/tree-page" component={TreePage} />
            <Route exact path="/calender-view" component={CalenderView} />
            <Route path="/contact-book" exact component={ContactBook} />
          </Switch>
        </Router>
      ) : (
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
      )}
    </div>
  );
}

export default App;

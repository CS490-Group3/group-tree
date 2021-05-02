import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TreeView from './pages/TreeView';
import CalendarView from './pages/CalendarView';
import ContactBook from './pages/ContactBook';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';

import './css/App.css';

const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn === true ? (
        <Router>
          <nav className="navbar navbar-expand-md" id="nav">
            <h1 classnName="navbar-brand">GroupTree</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-align-justify fa-2x" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="nav navbar-nav ml-auto" id="nav-bar">
                <li className="nav-item px-4 py-2">
                  <Link to="/tree-view">
                    <i className="fab fa-pagelines fa-2x" />
                  </Link>
                </li>
                <li className="nav-item px-4 py-2">
                  <Link to="/calendar-view">
                    <i className="fas fa-calendar-alt fa-2x" />
                  </Link>
                </li>
                <li className="nav-item px-4 py-2">
                  <Link to="/contact-book">
                    <i className="fas fa-user-friends fa-2x" />
                  </Link>
                </li>
                <li className="nav-item px-4 py-2">
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
            </div>
          </nav>
          {/* A <Switch> looks through its children <Route>s and renders the first one
          that matches the current URL. */}
          <Switch>
            <Route exact path="/tree-view" component={TreeView} />
            <Route exact path="/calendar-view" component={CalendarView} />
            <Route path="/contact-book" exact component={ContactBook} />
          </Switch>
        </Router>
      ) : (
        <div className="landing-page">
          <div className="login-button">
            <nav className="navbar navbar-expand-md" id="nav">
              <h1 classnName="navbar-brand">GroupTree</h1>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav ml-auto" id="nav-bar">
                  <li className="nav-item px-4 py-2">
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
                  </li>
                </ul>
              </div>
            </nav>
            <div className="main">
              <div className="intro">
                <p className="np">Connect with Family and Friends</p>
                <p>Grow Your tree</p>
                <button className="learn-button" type="button">
                  Scroll To Learn More
                </button>
              </div>
            </div>
          </div>
          <About />
          <Team />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = '1021307606256-ktn0m9dj0bn27nc2qei22m42h9dj02dk.apps.googleusercontent.com';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(response) => {
          console.log('Login success', response);
        }}
        onFailure={(response) => {
          console.log('Login failure', response);
        }}
        cookiePolicy="single_host_origin"
        // isSignedIn
      />
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={(response) => {
          console.log('Logout success', response);
        }}
      />
    </div>
  );
}

export default Login;

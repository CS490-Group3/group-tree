import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId =
  '1021307606256-ktn0m9dj0bn27nc2qei22m42h9dj02dk.apps.googleusercontent.com';

function Login() {
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(response) => {
          fetch('/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.tokenId }),
          });
        }}
        onFailure={() => {}}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
}

export default Login;

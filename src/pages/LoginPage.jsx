import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId =
  '1021307606256-ktn0m9dj0bn27nc2qei22m42h9dj02dk.apps.googleusercontent.com';

function LoginPage() {
  // hold on to token after authenticating with Google
  const [tokenId, setTokenId] = useState(null);

  return (
    <div>
      {tokenId !== null ? (
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={() => {
            fetch('/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: tokenId }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success === true) setTokenId(null);
              });
          }}
          onFailure={() => {}}
          cookiePolicy="single_host_origin"
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          onSuccess={(googleResponse) => {
            fetch('/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: googleResponse.tokenId }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.success === true) setTokenId(googleResponse.tokenId);
              });
          }}
          onFailure={() => {}}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
}

export default LoginPage;

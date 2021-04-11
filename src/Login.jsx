import React from 'react';
import { GoogleLogin } from 'react-google-login';


const clientId = process.env.REACT_APP_CLIENT_ID;

function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };
    
    const onFailure = (res) => {
        console.log('[Login failed] res:', res)
    };
    
    return (
        <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy='single_host_origin'
            style={{ marginTop: '100px' }}
            isSignedIn
        />
        </div>
    );
}

export default Login;



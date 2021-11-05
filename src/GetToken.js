import React, { useState, useEffect } from 'react';
import App from './App'
// import WebPlayback from './WebPlayback';
import Login from './Login'

function GetToken() {

  const [token, setToken] = useState('');

  useEffect(() => {

    // 
    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  // Login will be loaded if no valid token (no session yet) otherwise we go to the app
  return (
    <>
        { (token === '') ? <Login/> : <App token={token} /> }
    </>
  );
}

export default GetToken;
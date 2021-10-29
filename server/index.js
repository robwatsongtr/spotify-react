
const express = require('express')
const dotenv = require('dotenv');
const app = express();
const port = 5000

dotenv.config()

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const spotify_redirect_uri = 'http://localhost:3000/auth/callback'

// randomly generated string to protect against attacks such as cross-site forgery
const generateRandomString = (length) => {

  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
  for(let i = 0; i < length; i++) {
    text += possible.charAt( Math.floor( Math.random() * possible.length) )
  }
  return text 

}

// redirect to Spotify Login screen 
app.get('/auth/login', (req, res) => {

  let scope = 
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
  
  // randomly generated string to protect against attacks 
  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({

    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state

  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
  
});


app.get('/auth/callback', (req, res) => {

  
  
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
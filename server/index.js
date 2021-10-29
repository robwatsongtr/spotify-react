
const express = require('express')
const dotenv = require('dotenv');
const app = express();
const port = 5000

// Rather than hard-coding the user credentials inside the source code of our application, 
//we are going to use the dotenv package to store and read them from a hidden configuration file
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

// To do so, we need to send a GET request to the /authorize endpoint of the Spotify account 
// service with the following parameters:

// response_type 
// is the credential that will be returned. The value will always be code.

// client_id, 
// is the Client ID of the application we have just created on the portal dashboard.

// scope
// a space-separated list of actions that our app can be allowed to do on a user’s behalf. 
// We need permission for streaming, user-read-email and user-read-private for the Web Player SDK.

// redirect_uri 
// is the URL that Spotify’s Authorization server will redirect once the access token 
// is granted. Since we are running the project locally, our redirect URL will point to 
// localhost:3000/auth/callback since all petitions are handled from the frontend.

// state 
// a randomly generated string to protect against attacks such as cross-site request forgery.

app.get('/auth/login', (req, res) => {

  let scope = 
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";
  
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
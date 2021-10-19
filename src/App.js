import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
// import Listbox from './Listbox';
// import Detail from './Detail';
import { Credentials } from './Credentials';
import axios from 'axios';





const App = () => {

  const spotify = Credentials()

  console.log('RENDERING APP.JS');

  const dummyData = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'}
  ]

  // useState is a function that returns two elements:
  // -the first element is a snapshopt of the current state
  // meaning its either the inital state or the updated state after the component re-renders.
  // -second element is a function that allows you to update the current state.
  // setToken and setGenres and setWhatever are functions that actually
  // update the state 
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState([]);  

  // useEffect can fire an event when provided with a 'dependency'
  // array, instead of automatically every render cycle 
  // On render, the app sends an api call and gets a token.
  // Then, the app sends an api call to get a list of genres that 
  // will populate the drop-dowwn. 
  useEffect( () => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      console.log(tokenResponse.data.access_token);      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(genreResponse => {
        setGenres(genreResponse.data.categories.items);
      });
      
    });
    

  }, [])



  return (
    <form onSubmit={ () => {} }>
      <div className="container">
        <Dropdown options={genres} />
        <Dropdown options={dummyData} />
        <button type='submit'>
          Search
        </button>
      </div>
    </form>
  )

}

export default App; 
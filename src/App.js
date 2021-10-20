import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
// import Listbox from './Listbox';
// import Detail from './Detail';
import { Credentials } from './Credentials';
import axios from 'axios';

// APP COMPONENT

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

  // state manages selected genres in addition to the array of genres
  const [genres, setGenres] = useState( { selectedGenre: '', listOfGenresFromApi: [] } );  

  // useEffect can fire an event when provided with a dependency
  // array, instead of automatically every render cycle 
  //
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
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromApi: genreResponse.data.categories.items
        })
        
      });
      
    });
    

  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret])

  // this function gets passed down to dropdown component 
  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromApi: genres.listOfGenresFromApi
    })
  }


  // the selected state of the dropdown is set by passing an app component method
  // down to the dropdown component as a prop. "Lifting state up". The selected 
  // value is also passed as a prop. 

  return (
    <form onSubmit={ () => {} }>
      <div className="container">
        <Dropdown 
          options={genres.listOfGenresFromApi} 
          changed={ genreChanged }
          selectedValue={genres.selectedGenre}   
        />
        <Dropdown options={dummyData} />
        <button type='submit'>
          Search
        </button>
      </div>
    </form>
  )

}

export default App; 
import React from 'react';
import Dropdown, { useState, useEffect } from './Dropdown'
import { Credentials } from './Credentials';
import axios from 'axios'; 

const App = () => {

  const spotify = Credentials()

  const dummyData = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'}
  ]

  const [token, setToken] = useState('');

  // useEffect can fire an event when provided with a 'dependency'
  // instead of automatically 

  useEffect( () => {

    axios( 'https://accounts.spotify.com/api/token', {

      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })


  })



  return (
    <form onSubmit={ () => {} }>
      <div className="container">
        <Dropdown options={dummyData} />
        <Dropdown options={dummyData} />
        <button type='submit'>
          Search
        </button>
      </div>
    </form>
  )

}

export default App; 
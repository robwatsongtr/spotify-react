import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import Detail from './Detail';
import { Credentials } from './Credentials';
import axios from 'axios';


const App = () => {

  const spotify = Credentials()

  // console.log('RENDERING APP.JS');

  // const dummyData = [
  //   {value: 1, name: 'A'},
  //   {value: 2, name: 'B'},
  //   {value: 3, name: 'C'}
  // ]


  // useState
  // 
  // useState is a function that returns two elements:
  // -the first element is a snapshopt of the current state
  // meaning its either the inital state or the updated state after the component re-renders.
  // -second element is a function that allows you to update the current state.
  // setToken and setGenres and setWhatever are functions that actually
  // update the state 
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState( {selectedGenre: '', listOfGenresFromApi: [] });  
  const [playlist, setPlaylist] = useState( {selectedPlaylist: '', listOfPlaylistsFromApi: [] })
  const [tracks, setTracks] = useState( {selectedTrack: '', listofTracksFromApi: [] });
  const [trackDetail, setTrackDetail] = useState(null);

  // useEffect:
  // 
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

      axios('https://api.spotify.com/v1/browse/categories', {
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



  // these functions below get passed to their respective components
  // ------------------------------------------------------------------------- 
  const genreChanged = val => {

    setGenres({
      selectedGenre: val,
      listOfGenresFromApi: genres.listOfGenresFromApi
    })

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then( playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistsFromApi: playlistResponse.data.playlists.items
      })
    })

  }

  const playlistChanged = val => {

    console.log(val)

    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistsFromApi: playlist.listOfPlaylistsFromApi
    })
    
  }

  const buttonClicked = e => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,{
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .then(tracksResponse => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listofTracksFromApi: tracksResponse.data.items 
      })
    })

  }


  // When we click on the listbox item, we get the selected track ID
  // becuase we set that to be the ID of the actual button.

  // We then use the spread operator on our tracks state variable
  // to create a new list of tracks. 

  // After which, we use the filter method to find the track containing the
  // track ID matching that of our button ID.

  // Lastly, we store the trackinfo inside our track detail state variable.

  const listboxClicked = val => {

    const currentTracks = [...tracks.listofTracksFromApi];
    const trackInfo = currentTracks.filter( t => t.track.id === val )

    setTrackDetail(trackInfo[0].track)

  }

  // the selected state of the dropdown is set by passing an app component method
  // down to the dropdown component as a prop. "Lifting state up". The selected 
  // value is also passed as a prop. 

  // we're passing our track object to our track detail component.
  // but we're using the spread operator, in turn the properties are extracted
  // which allows destructuring in our component where we can access the property directly.
  return (
    <div className="container">
      <form onSubmit={ buttonClicked }>

          <Dropdown 
            label="Genre:"
            options={genres.listOfGenresFromApi} 
            changed={ genreChanged }
            selectedValue={genres.selectedGenre}   
          />

          <Dropdown 
            label="Playlist:"
            options={playlist.listOfPlaylistsFromApi} 
            changed={ playlistChanged }
            selectedValue={playlist.selectedPlaylist}
          />

          <div className="col-sm-6 row form-group px-0">
            <button type='submit' className="btn btn-success col-sm-12">
            Search
            </button>
          </div>

          <div className="row">
            <Listbox items={tracks.listofTracksFromApi} clicked={ listboxClicked } />
            { trackDetail && <Detail {...trackDetail} /> }
          </div>

      </form>
    </div>
  )

}

export default App; 
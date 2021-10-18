import React from 'react';
import Dropdown from './Dropdown'

const App = () => {

  const dummyData = [
    {value: 1, name: 'A'},
    {value: 2, name: 'B'},
    {value: 3, name: 'C'}
  ]

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
import React, { useState } from 'react';


// useState is a function that returns two elements:

// the first element is a snapshopt of the current state
// meaning its either the inital state or the updated state after the component re-renders.

// second element is a function that allows you to update the current state.

const Dropdown = props => {

  // JS destructuring to get the current state and the function return 
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div>
      <select value={selectedValue} onChange={ e => setSelectedValue(e.target.value) }   >
        {props.options.map( (item, idx) => <option key={idx} value={item.value}> {item.name} </option>  )}
      </select>
      <p>{selectedValue}</p>
    </div>
  )

}

export default Dropdown;


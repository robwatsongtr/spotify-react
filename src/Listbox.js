import React from 'react';

const Listbox = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  return (

    <div>
        {
          props.items.map( (item, idx) =>
            <button key={idx}
              onClick={ clicked }
              className="list-group-item list-group-item-action list-group-item-light"
              id={item.track.id}
            >
              {item.track.name}
           </button>
          )
        } 
    </div>

  );

}

export default Listbox; 
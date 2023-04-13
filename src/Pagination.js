import React from 'react'

// we know that we will get a gotonext and gotoprev function, and we can use those inside of this div on buttons
// the buttons just call the function from our App.js
// the && is used to create an IF statement.  
// IF we have a gotoPrevPage function, THEN we render everything after the &&
export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}

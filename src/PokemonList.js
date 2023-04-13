// "rfc" creates the component template
import React from 'react'

// we destructure the props
// same as PokemonList(props) { props.pokemon
export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map(p => (
        // For each pokemon in the collection, we return this code
        // in React, we need a key for every thing in an array (so every time we use a loop)
        // The key must be in the top level element, and unique to that element
        // Put a key ANY time there is a loop in React code
        <div key={p}>{p}</div>
      ))}
    </div>
  )
}

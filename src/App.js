// import the hooks for using state and effects
import React, { useState, useEffect } from 'react';
// importing our map from PokemonList.js
import PokemonList from './PokemonList';
import Pagination from './Pagination';
// axios is used for asynchronous requests to an API
import axios from 'axios';


function App() {
  // creates our initial state
  // we destructure the array because it returns two variables
  // the first variable is current state pokemon, the second variable is the method we use to Update our State
  // So when we go to a different page we can call setPokemon and update the list of pokemon shown
  const [pokemon, setPokemon] = useState([])
  // this state will track the current page we are on
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  // sets what state the Next/Previous buttons will change to
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  // sets the loading state so that we can let the user know the application is waiting on data
  const [loading, setLoading] = useState(true);

  // React hook EFFECT - which is something that we want to re-render our application (sometimes) when it triggers
  // This function will rerun every time one of our arguments in it changes
  useEffect(() => {
    // Going to fetch some data, so loading true
    setLoading(true);
    // What happens if the user calls the useEffect multiple times in a row, before the old request has finished?
    // we want to make sure we cancel old request when new request is called
    let cancel
    // makes a fetch request and returns a PROMISE with a property called "data"
    // inside data we have an array with all of our information we fetched
    // in this case, our data returns the "results" array with names of pokemon
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
      // Axios CancelToken takes a function that returns the cancel token that we need to cancel our request
      // Every time Axios makes a call, it will set our cancel variable to this CancelToken using the cancel function below
      }).then(res => {
      // we have our data, app is no longer loading
      setLoading(false);
      // next and previous properties are in the data we pulled from the API
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name));
      // every time the current page URL changes, we want to re-fetch our pokemon list
    }, [currentPageUrl]);

    // cancel method will run when CancelToken is created
    return () => cancel()
    }, [currentPageUrl]);

    // Pagination will use these functions in order to go next or previous depending on button clicked
    function gotoNextPage() {
      setCurrentPageUrl(nextPageUrl)
    }

    function gotoPrevPage() {
      setCurrentPageUrl(prevPageUrl)
    }
  
  if (loading) return "Loading...";

  return (
    // Since we have 2 elements, we need to put them into a blank parent element
    // JavaScript can only return one object, so the empty object will wrap both that we want to return
    <>
    <PokemonList pokemon={pokemon}/>
    <Pagination 
    // IF the next page url is true, then we pass the next page function
    // if we do not have a nextpage function, we pass null
    gotoNextPage={nextPageUrl ? gotoNextPage : null}
    gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
    />
    
    </>
  );
}

export default App;

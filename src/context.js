import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,  
  HANDLE_PAGE,   
  HANDLE_SEARCH,   
} from './actions'

import reducer from './reducer'
//below is not the complete url
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

//define all the states in the initialState below
const initialState = {
  isLoading:true,
  hits:[],   //hits are stories--the array of objects in api
  query: 'react',   //search section
  page:0,     //begins--pages from 0 to 49 since the api begins with page=0
  nbPages:0,  //ends-number of all the pages-nbPages = 50
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //define the useReducer
  const [state,dispatch] = useReducer(reducer,initialState)

  //fetch the url from API
  const fetchStories = async(url)=> {
    //turn the state isLoading to true--payload is optional so we don't add it below
    dispatch({type:SET_LOADING})
    try{
      const response = await fetch(url) 
      const data = await response.json()
      console.log(data)
      console.log(data.hits)
      
      //update stories state--we know about the hits but we add nbPages since in the state above it's 0 but now we should assign it to 50
      dispatch({type:SET_STORIES,payload:{hits:data.hits, nbPages:data.nbPages}})
    }catch(error){
      console.log(error)
    }
  }

  //handle functions
  const removeStory = (id) =>{
    dispatch({type: REMOVE_STORY, payload:id})
  }
  const handleSearch = (query) =>{
    dispatch({type:HANDLE_SEARCH, payload:query})
  }
  const handlePage = (value) =>{     //increment and decrement of the page--or we can write decrement and increment functions seperately
    dispatch({type:HANDLE_PAGE,payload:value})
  }

  //create the final url--state.query and state.page should be used for search and also page number
  useEffect(()=>{
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  },[state.query,state.page])   //for every page and every search we call the fetch again to upload the browser page again--otherwise we always on page one
  

  return <AppContext.Provider value={{...state, removeStory, handleSearch,handlePage}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

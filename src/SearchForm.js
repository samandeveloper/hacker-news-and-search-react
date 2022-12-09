import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const{query,handleSearch,fetchStories} = useGlobalContext()

  const handleChange  = (e) =>{
    return handleSearch(e.target.value)    //handleSearch works as same as setQuery
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return(
    <form className='search-form' onSubmit={handleSubmit}>
      <h2>search hacker news</h2>
      <input type="text" className='form-input' value={query} onChange={handleChange}/>
    </form>
  )
}

export default SearchForm

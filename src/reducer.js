import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state,action) => {
  //use switch or chain of if
  switch(action.type){
    case SET_LOADING:
      return ({...state,isLoading:true})
    case SET_STORIES:
      return({
        ...state, 
        isLoading:false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      })
    case REMOVE_STORY:
      return({
        ...state,
        hits: state.hits.filter((story)=>     //state.hits are 20 arrays
        story.objectID !== action.payload   //the id is objectID in this api--action.payload is the id of each story
        )
      })
    case HANDLE_SEARCH:
      return({
        ...state,
        query: action.payload,   
        page:0
      })
    //below we have two sections: increment and decrement
    case HANDLE_PAGE:
      if(action.payload === 'inc'){
        let nextPage = state.page + 1
        if(nextPage > state.nbPages - 1){   //if we reaches the last page 
          nextPage = 0
        }
        return({
          ...state,
          page:nextPage
        })
      }
      if(action.payload === 'dec'){
          let prevPage = state.page - 1   //prevPage is 0-49
          if(prevPage < 0){
            prevPage = state.nbPages - 1    //or prevPage = 49
          }
          return({
            ...state,
            page:prevPage 
          })
       
      }
      default:
        throw new Error ('no matching "${action.type}" action type')
  }
}
export default reducer

import {
  CURRENT_NEWS,
  SEARCH_NEWS,
  CLEAR_NEWS
} from '../types'; 

export default (state, action) => {

  switch(action.type) {

    case SEARCH_NEWS:
      return {
        ...state,
        userNews: action.payload
      }
    case CURRENT_NEWS: 
      return {
        ...state,
        news: action.payload
      }; 
    
    case CLEAR_NEWS: 
      return {
        ...state,
        userNews: [],
        news: []
      }
    
    default: 
      return state
  }
}
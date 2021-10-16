import React, { useReducer } from 'react';
import NewsContext from './newsContext';
import NewsReducer from './newsReducer';

import {
  CURRENT_NEWS,
  SEARCH_NEWS,
  CLEAR_NEWS
} from '../types'; 

const NewsState = props => {

  const initialState = {
    news: [],
    userNews: []
  };

  const [state, dispatch] = useReducer(NewsReducer,initialState); 


  const searchNews = async (searchTopic) => {

    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTopic}&apiKey=${process.env.REACT_APP_API_KEY}`); 

    const data = await response.json(); 

    console.log('searchNews data:');
    console.log(data);

    dispatch({
      type: SEARCH_NEWS,
      payload: data.articles
    });



  }; 

  /**
   * Gets the top 20 stories in the U.S
   */
  const getCurrentNews = async () => {
  
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY}`);

    const data = await response.json(); 

    dispatch({
      type: CURRENT_NEWS,
      payload: data.articles
    })
  };

  const clearNews = () => {
    dispatch({type: CLEAR_NEWS}); 
  }

  const values = {
    news: state.news,
    userNews: state.userNews,
    getCurrentNews,
    searchNews,
    clearNews
  }

  return (
    <NewsContext.Provider value={values}>
      {props.children}
    </NewsContext.Provider>
  );
}

export default NewsState; 
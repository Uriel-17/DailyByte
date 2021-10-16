import React, { useState, useEffect, useContext} from 'react';
import fire from '../context/fire';
import Typography from '@material-ui/core/Typography';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useHistory } from 'react-router-dom';
import useStyles from '../useStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box"; 
import NewsCard from './NewsCard'; 
import NewsContext from '../context/news/newsContext';
import Button from '@mui/material/Button';

const DashBoard = () => {

  const newsContext = useContext(NewsContext); 

  const { news, userNews, searchNews, getCurrentNews, clearNews } = newsContext; 

  const history = useHistory(); 
  const classes = useStyles(); 
  const auth = getAuth();
  const[user, setUser] = useState('');
  const[showUserNews, setShowUserNews] = useState(false); 
  const[search, setSearch] = useState('');
  
  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }

  console.log(news);

  const authListener = () => {

    onAuthStateChanged(auth, (user) => {

      if(user) {
        
        setUser(user);
      
      } else {
        
        setUser('');
        history.push('/');
        
      }
   
    });
  };

  const handleSearch = () => {


    if(!isEmpty(search)) {

      clearNews(); 

      searchNews(search); 

      setShowUserNews(true); 

      console.log('showUserNews: ', showUserNews); 

    } else {

      console.log('search is empty'); 
    }

  };

  useEffect(() => {
   authListener();

   getCurrentNews(); 
   
  
  }, []);


  return(
      <Container maxWidth = 'md'>
        <div className = 'searchBar'>
          <Typography align = 'center' variant = 'h6' >Search For The News You Want</Typography>
          <TextField placeholder = 'Search...'  margin = 'normal' fullWidth onChange = {(e) => {setSearch(e.target.value)}} value = {search}></TextField>

          <Typography align = 'center'>
            <Button className = {classes.searchBtn} size = 'large' type = 'submit' onClick = {handleSearch} variant = 'contained'>Search</Button>
          </Typography>
         
        
        
        
        </div>
      <Box lg = {{ flexGrow: 1}}>
        <Container maxWidth = 'md'>
          <Grid container spacing = {3} align = 'center'>
          
         {showUserNews ? (

          userNews.map( userArticle => (
            <Grid item lg = {6} sx = {1}>
              <NewsCard urlImage = {userArticle.urlToImage} title = {userArticle.title} description = {userArticle.description}></NewsCard>
            </Grid>
          ))

         ) : (
          news.map( newsArticle => (
            <Grid item lg = {6} sx = {1}>
              <NewsCard urlImage = {newsArticle.urlToImage} title = {newsArticle.title} description = {newsArticle.description}></NewsCard>
            </Grid>
          ))


         )


         }
            
            

      

          </Grid>
        </Container>
        </Box>
      </Container>
   
  );
}; 

export default DashBoard; 

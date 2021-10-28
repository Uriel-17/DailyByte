import React, { useEffect, useState } from 'react'; 
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useHistory } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@material-ui/core/Typography';

const NewsArticle = (props) => {
  
  const { author, content, publishedAt, title, urlImage, urlToArticle} = props.location.state; 
  const history = useHistory(); 
  const [user, setUser] = useState(''); 
  const auth = getAuth();

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
  
  useEffect(() => {

    authListener(); 

  }, [])


  return(
   <Container maxWidth = 'md' >
     <div className = 'newsPage'>
      <Typography align = 'center' variant = 'h4' gutterBottom>
        {title.title}
      </Typography>
      <Typography align = 'center' variant = 'h6' gutterBottom>
        <img className = 'image-article' src = {urlImage.urlImage}></img>  
      </Typography>
      <Typography align = 'left' variant = 'subtitle2' gutterBottom style = {{tabSize: "8 !important"}}>
        {"Publisher: " + author.author}  
      </Typography>
      <Typography align = 'left' variant = 'subtitle2' gutterBottom>
        {"Published: " + publishedAt.publishedAt} 
      </Typography>    
      <Typography align = 'left' variant = 'subtitle2' gutterBottom>
        {"View Full Article: "}
       <a href = {urlToArticle.urlToArticle} target = "_blank" rel = "noopener noreferrer">{urlToArticle.urlToArticle}</a> 
      </Typography>
      <Typography align = 'center' variant = 'subtitle1' gutterBottom>
        {content.content}
      </Typography>
     </div>
   </Container>
  )
}

export default NewsArticle;
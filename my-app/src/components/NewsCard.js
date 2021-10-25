import React from "react"; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from '../useStyles';

//<Route exact path = '/' component = {Login}></Route>
const NewsCard = ({ author, urlImage, urlToArticle, publishedAt, title, description, content }) => {

  const classes = useStyles(); 

  //<CardActionArea component = {Link} to = {`/articles/${title}`}>
  return(
      <Card sx = {{maxWidth: 390, height: 450 }}>
        <CardActionArea component = {Link} 
        to = {{
          pathname:`/articles/${title}`,
          state: {
            urlImage: {urlImage},
            author: {author},
            urlToArticle: {urlToArticle},
            publishedAt: {publishedAt}, 
            title: {title},
            content: {content}
          }
        
        }}
        >
          <CardMedia
            component = "img"
            height = "140"
            src = 'img'
            image = {urlImage}
            alt = "no pic found"
          />
          <CardContent>
            <Typography gutterBottom variant = 'h5' component = 'div'>
              {title}
            </Typography>
            <Typography variant = 'body2' color = 'text.secondary' gutterBottom>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );

}; 

export default NewsCard; 
import React from "react"; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const NewsCard = ({ urlImage, title, description }) => {
  
  return(


    <Card sx = {{maxWidth: 390, height: 400 }}>
      <CardActionArea>
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
          <Typography variant = 'body2' color = 'text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

}; 

export default NewsCard; 
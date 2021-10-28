import React, { useEffect, useState, useContext } from 'react';
import fire from '../context/fire';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { useHistory, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import useStyles from '../useStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
const Navbar = () => {

  const auth = getAuth();
  const db = getFirestore();
  const userReference = collection(db, 'users');
  const classes = useStyles(); 
  const history = useHistory(); 
  const[user, setUser] = useState('');
  const[show, setShow] = useState(false); 
  const[name, setName] = useState(''); 
 

  const signUp = () => {
    history.push('/SignUp'); 
  }

  const login = () => {
    history.push('/'); 
  }

  const logout = () => {

    signOut(auth).then(() => {
      setUser(''); 
      history.push('/'); 
      console.log('SignOut was succesful. Please delete this console.log')
    }).catch((error) => {
      console.log(error); 
    });
  };

  const getUser = async (user) => {

    const uid = String(user.uid); 
    const q = query(userReference, where("uid", "==", uid)); 

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { 
     setName(doc.data().firstName);
    });
  }; 

  const authListener = () => {

    onAuthStateChanged(auth, (user) => {

      if(user) {
        
        setUser('/DashBoard');
        setShow(true); 
        getUser(user); 

      } else {
        
        setUser('/');
        setShow(false); 

      }
   
    });
  };

  useEffect(() => {

    authListener(); 

    return () => {
      setUser('');
      setShow(false);
      
    }

  }, []);

  return(
 
    <AppBar position="static" style = {{background: '#16435A'}}>
      <Toolbar>
      <Container maxWidth = 'xl'>
        <Grid container spacing = {2} align = 'center'>
          <Grid item lg = {3} sm = {3} xs = 'auto'>
            <Typography className = "title" variant="h6" component="div">
              <Link to = {user} style = {{textDecoration: 'none', color: '#fff'}}>DailyByte</Link>
            </Typography>
          </Grid>
      
          {!show ? (
            <Grid item lg = {9} sm = {9} xs = {8}>
              <div className = 'user-info'>
                <Button onClick = {signUp} color="inherit">
                  <LoginIcon></LoginIcon>
                  SignUp
                </Button>
                <Button onClick = {login} color="inherit">
                  <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
                  login
                </Button>
              </div>  
            </Grid>
          ): (
            <Grid item lg = {9} sm = {9} xs = {8}>
              <div className = 'user-info'>
                <Typography className = "greetings" variant = 'string' component = 'span'>
                  Hello, {name}
                </Typography>
                <Button onClick = {logout} className = 'show' color="inherit">
                    <LogoutIcon></LogoutIcon>
                    Logout
                  </Button>
              </div>
            </Grid>
          )}
        </Grid>
        </Container>
      </Toolbar>
    </AppBar>

  );
};

export default Navbar; 

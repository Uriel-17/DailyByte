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
        
        setUser(user);
        setShow(true); 
        getUser(user); 

      } else {
        
        setUser('');
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
        <Typography className = {classes.title} variant="h6" component="div">
          <Link to = '/' style = {{textDecoration: 'none', color: '#fff'}}>DailyByte</Link>
        </Typography>

        {!show ? (
          <div>
            <Button onClick = {signUp} color="inherit">
              <LoginIcon></LoginIcon>
              SignUp
            </Button>
            <Button onClick = {login} color="inherit">
              <AccountCircleRoundedIcon></AccountCircleRoundedIcon>
              login
            </Button>
          </div>  
        ): (
          <Typography className = {classes.greeting} variant = 'string' component = 'div'>
            Hello, {name}
            <Button onClick = {logout} color="inherit">
              <LogoutIcon></LogoutIcon>
              Logout
            </Button>
          </Typography>
        )}
        
      </Toolbar>
    </AppBar>

  );

};

export default Navbar; 

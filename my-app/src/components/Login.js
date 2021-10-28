import React, { useEffect, useState }from 'react';
import fire from '../context/fire'; 
import { useHistory } from 'react-router-dom';
import '../App.css'; 
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '../useStyles';


const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState(''); 
  const[error, setError] = useState(''); 
  const[show, setShow] = useState(false); 
  const classes = useStyles(); 
  const history = useHistory(); 
  const auth = getAuth();

  const login = () => {


    signInWithEmailAndPassword(auth, email, password)
    .then((user) => { 
      history.push('/DashBoard'); 
    })
    .catch((error) => {
      console.log('error: ', error);
      console.log('error.code: ', error.code); 
      switch(error.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/weak-password':
        case 'auth/invalid-password':
        case 'auth/internal-error':
        case 'auth/internal-error':
        case 'auth/wrong-password': 
          setError('Invalid Email or Password');
          setShow(true); 
          break;
        default:
           setError('An error has occured.');
           setShow(true); 
      }
    });
   
  };

  const authListener = () => {

    onAuthStateChanged(auth, (user) => {

      if(user) {
        history.push('/DashBoard')
      }
   
    });
  };

 
  useEffect(() => {

    setTimeout(() => {
      setError('');
      setShow(false); 
    }, 2300);

  }, [setError, email, password])

  useEffect(() => {
    authListener();
  }, []); 

  return(

    <div className = 'Auth'>
    <div className = 'card-login card-rounded'>
      <Container maxWidth = 'md' className = {classes.container}>
        <FormControl noValidate error required className = 'form' autoComplete="off">
          <Typography align = 'center' gutterBottom variant="h5">
            Login
          </Typography>
          {show && (
            <Typography className = 'error-msg' variant = 'caption'>{error}</Typography>
          )}
          <TextField 
          className = {classes.textField}
          required
          type = 'email'
          variant = 'outlined' 
          label = 'Email'
          value = {email}
          onChange = {(e) => {setEmail(e.target.value)}}
          >
          </TextField>
          <TextField 
          className = {classes.textField} 
          required
          variant = 'outlined' 
          type = 'password' 
          label = 'Password'
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          >
          </TextField>
        </FormControl>
        <Button className = {classes.btn} size = 'large' type = 'submit' onClick = {login} variant = 'contained'>Login</Button>
      </Container>
    </div>
  </div>
  )

}; 

export default Login; 
import React, { useEffect, useState }from 'react';
import fire from '../context/fire'; 
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';
import '../App.css'; 
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '../useStyles';

//TODO take note of the alert component in material ui. Can be used as a warning/error/success component instead of the one built by hand. 
const SignUp = () => {
  
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState(''); 
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState('');

  const[firstName, setFirstName] = useState(''); 
  const[lastName, setLastName] = useState(''); 
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState(''); 
  const classes = useStyles(); 
  const history = useHistory(); 
  const database = getFirestore(); 
  const auth = getAuth();


  const insertData = async (firstName, lastName, email, uid) => {
    try {
      const docRef = await addDoc(collection(database, "users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: uid
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const signUp = () => {

    if(isEmpty(firstName)) {

      setFirstNameError('Invalid Input'); 

    } else if(isEmpty(lastName)) {

      setLastNameError('Invalid Input'); 

    } else {

      createUserWithEmailAndPassword(auth, email, password)
      .then((createdUser) => { 
        insertData(firstName, lastName, email, createdUser.user.uid); 
        history.push('/DashBoard'); 
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/email-already-in-use':
            setEmailError("Email already in use"); 
            break;
          case 'auth/invalid-email':
            setEmailError("Invalid Email");
            break; 
          case 'auth/weak-password':
            setPasswordError("Password must be at least six character's long"); 
            break; 
          case 'auth/invalid-password':
            setPasswordError("Invalid Password");
            break; 
          case 'auth/internal-error':
            setPasswordError('Missing Password'); 
        }
      });

    }
    
   
  };

  const authListener = () => {

    onAuthStateChanged(auth, (user) => {

      if(user) {
        history.push('/DashBoard');
      }
   
    });
  };


  const isEmpty = (str) => {
    return (!str || str.length === 0);
  }
  
  useEffect(() => {
    authListener();
  }, []); 

  useEffect(() => {

    setTimeout(() => {
      setEmailError('');
      setFirstNameError('');
      setLastNameError(''); 
      setPasswordError(''); 
    }, 2300);

  }, [emailError, passwordError, firstNameError, lastNameError])

  return(

    <div className = 'Auth'>
    <div className = 'card card-rounded'>
      <Container maxWidth = 'md' className = {classes.container}>
        <FormControl noValidate error required className = 'form' autoComplete="off">
          <Typography align = 'center' gutterBottom variant="h5">
            Create an account
          </Typography>
          <TextField 
          className = {classes.textField} 
          required
          error = {('Invalid Input' === firstNameError)}
          helperText = {firstNameError}
          type = 'text'
          variant = 'outlined' 
          label='Enter first name'
          value = {firstName} 
          onChange = {(e) => {setFirstName(e.target.value)}}
          >
          </TextField>
          <TextField 
          className = {classes.textField} 
          required
          error = {('Invalid Input' === lastNameError)}
          helperText = {lastNameError}
          type = 'text'
          variant = 'outlined' 
          label='Enter last name'
          value = {lastName}
          onChange = {(e) => {setLastName(e.target.value)}}
          >
          </TextField>
          <TextField 
          className = {classes.textField}
          required
          error = {('Invalid Email' === emailError) || ('Email already in use' === emailError)} 
          helperText = {emailError}
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
          error = {
            ("Password must be at least six character's long" === passwordError) 
            || ("Invalid Password" === passwordError) || ("Missing Password" === passwordError)}
          helperText = {passwordError}
          variant = 'outlined' 
          type = 'password' 
          label = 'Password'
          value = {password}
          onChange = {(e) => {setPassword(e.target.value)}}
          >
          </TextField>
        </FormControl>
        <Button className = {classes.btn} size = 'large' type = 'submit' onClick = {signUp} variant = 'contained'>Sign Up</Button>
      </Container>
    </div>
  </div>
  )

}; 

export default SignUp; 
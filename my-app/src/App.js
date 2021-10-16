import React from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import NewsState from './context/news/NewsState';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DashBoard from './components/DashBoard'; 


const App = () => {
  return (
    
      <NewsState>
        <Router>
        <Navbar></Navbar>
          <Switch>
            <Route exact path = '/' component = {Login}></Route>
            <Route exact path = '/SignUp' component = {SignUp}></Route>
            <Route exact path = '/DashBoard' component = {DashBoard}></Route>
          </Switch>
        </Router>
      </NewsState>
  
    
  );
}

export default App;

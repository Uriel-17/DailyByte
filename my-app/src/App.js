import React from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import NewsState from './context/news/NewsState';
import AlertState from './context/alert/AlertState';
import Alert from './components/Alert'; 
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DashBoard from './components/DashBoard'; 
import NewsArticle from './components/NewsArticle'


const App = () => {
  return (
    
    <NewsState>
      <AlertState>
        <Router>
        <Navbar></Navbar>
        <Alert/>
          <Switch>
            <Route exact path = '/' component = {Login}></Route>
            <Route exact path = '/SignUp' component = {SignUp}></Route>
            <Route exact path = '/DashBoard' component = {DashBoard}></Route>
            <Route exact path = '/articles/:title' component = {NewsArticle}></Route>
          </Switch>
        </Router>
      </AlertState>
    </NewsState>
  
    
  );
}

export default App;

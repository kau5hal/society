import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import Register from './components/register';
import Login from './components/login';
import Main from './components/main';
import EntryLog from './components/entry-log';
import ExitLog from './components/exit-log';
import Logs from './components/logs';
import Logout from './components/logout';
import Thankyou from './components/thank-you'
import MobileVerify from './components/mobile-verify'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header/> */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Register.html" component={Register}/>
          <Route path="/login.html" component={Login}/>
          <Route path="/main.html" component={Main}/>
          <Route path="/entry-log.html" component={EntryLog}/>
          <Route path="/exit-log.html" component={ExitLog}/>
          <Route path="/logs.html" component={Logs}/>
          <Route path="/logout.html" component={Logout}/>
          <Route path="/thank-you.html" component={Thankyou}/>
          <Route path="/mobile-verify.html" component={MobileVerify}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

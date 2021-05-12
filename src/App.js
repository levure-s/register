import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Admin from './admin';
import User from './user';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
            <div>
              <Route exact path='/' component={User}/>
              <Route path='/admin' component={Admin}/>
            </div>
          </Router>
      </div>
    );
  }
  
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './components/Login'
import JokeList from './components/JokeList'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/Register'


function App() {
  return (
    <Router>
      <div className="App">
        <div className='navbar'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>register</Link>
          <Link to="/jokes">Friends List</Link>
        </div>
        <Switch>
          <ProtectedRoute exact path="/jokes" component={JokeList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'

import About from './components/views/About';

import axios from 'axios';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlertState] = useState(null)

  const searchUser = async text => {
    const searchParam = text.trim()
    setLoading( true );

    const res = await axios.get(`https://api.github.com/search/users?q=${searchParam}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false)
  }

  const getUser = async username => {
    setLoading( true );

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

    setUser(res.data)
    setLoading(false)
  }

  const getUserRepos = async username => {
    setLoading( true );

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([]);
    setLoading(false)
  }

  const setAlert = (msg, type) => {
    setAlertState({msg, type})

    setTimeout(() =>setAlertState(null), 3000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='container'>       
          <Alert alert={alert} />

          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUser={searchUser} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false } 
                  setAlert={setAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />

            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User { ...props } getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
            )} />

          </Switch>
        </div>
      </div>
    </Router>
  );
    
}

export default App;

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert'

import About from './components/views/About';

import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  searchUser = async text => {
      const searchParam = text.trim()
      this.setState({ loading: true });

      const res = await axios.get(`https://api.github.com/search/users?q=${searchParam}&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

      this.setState({ users: res.data.items, loading: false });
  }

  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }

  clearUsers = () => this.setState({users: [], loading: false});

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})

    setTimeout(() => this.setState({alert: null}), 3000)
  }

  render() {
    const {users, user, repos, loading} = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className='container'>       
            <Alert alert={this.state.alert} />

            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUser={this.searchUser} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true : false } 
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
              )} />

            </Switch>
          </div>
        </div>
      </Router>
    );
    
  }
}

export default App;

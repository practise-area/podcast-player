import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentLibrary } from './actions/libraryActions';
import { Provider } from 'react-redux';
import store from './store';



// Import components
import Player from './components/Player';
import Menu from './components/Menu';
import Library from './components/Library';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

// check to see if token in localStorage or is expired
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentLibrary());
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/" component={Player} />

              <section className="menu-container">
                <Menu />
              </section>

             {/* <section className="player-container">
                <Player />
              </section>*/}

          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Player from './components/Player';
import Menu from './components/Menu';
// import Search from './components/Search';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

class App extends Component {
  render() {
    return (
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

    );
  }
}

export default App;

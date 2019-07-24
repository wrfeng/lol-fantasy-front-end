import React from 'react';
import HomePage from './Components/HomePage'
import LeaguesPage from './Components/LeaguesPage'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import LeagueShow from './Components/LeagueShow'

class App extends React.Component {
  state = {
    players: [],
    drafted_teams: [],
    currentUser: null
  }

  getCurrentUser = () => {
    if (localStorage.token) {
      fetch('http://localhost:3001/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(profileInfo => this.setState({ currentUser: profileInfo }))
    }
  }
  componentDidMount(){

    this.getCurrentUser()

    fetch('http://localhost:3001/drafted_teams')
    .then(resp => resp.json())
    .then(resp => this.setState({drafted_teams: resp.drafted_teams}))
  }

  render(){
    return(
      <div>
        <Router>
          <Route path={`/leagues/:leagueId`} render={routerProps => <LeagueShow getCurrentUser={this.getCurrentUser} currentUser={this.state.currentUser} leagues={this.state.leagues} {...routerProps} />} />
          <Route exact path='/leagues' render={routerProps => <LeaguesPage {...routerProps} getCurrentUser={this.getCurrentUser} currentUser={this.state.currentUser}/>}/>
          <Route exact path='/' render={routerProps => <HomePage {...routerProps} />}/>
        </Router>
      </div>
    )
  }
}

export default App;

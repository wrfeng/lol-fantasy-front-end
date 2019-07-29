import React from 'react';
import HomePage from './Components/HomePage'
import LeaguesPage from './Components/LeaguesPage'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import LeagueShow from './Components/LeagueShow'
import Draft from './Components/Draft'
class App extends React.Component {
  state = {
    players: [],
    drafted_teams: [],
    currentUser: null,
    leagueId: ''
  }

  setUser = (user) => {
    this.setState({currentUser: user})
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

  selectLeague = (leagueId) => {
    this.setState({leagueId: leagueId})
  }

  render(){
    return(
      <div>
        <Router>
          {this.state.currentUser && this.state.leagueId ? <Route path={`/draft`} render={routerProps => <Draft {...routerProps} currentUser={this.state.currentUser} leagueId={this.state.leagueId} />} /> : <Route exact path='/draft' render={routerProps => <LeaguesPage {...routerProps} currentUser={this.state.currentUser} selectLeague={this.selectLeague} />} />}
          {this.state.currentUser && <Route path={`/leagues/:leagueId`} render={routerProps => <LeagueShow currentUser={this.state.currentUser} leagues={this.state.leagues} {...routerProps} />}/>}
          {this.state.currentUser && <Route exact path='/leagues' render={routerProps => <LeaguesPage {...routerProps} leagues={this.state.leagues} currentUser={this.state.currentUser} selectLeague={this.selectLeague}/>}/>}
          <Route exact path='/' render={routerProps => <HomePage setUser={this.setUser} {...routerProps} />}/>
        </Router>
      </div>
    )}
}

export default App;

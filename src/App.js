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
    leagueId: '',
    leagues: []
  }

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  componentDidMount(){

    fetch('http://localhost:3001/leagues/')
      .then(resp => resp.json())
      .then(resp => this.setState({leagues: resp.data}))

    fetch('http://localhost:3001/players/')
      .then(resp => resp.json())
      .then(resp => this.setState({players: resp.data}))

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

  selectLeague = (leagueId) => {
    this.setState({leagueId: leagueId})
  }


  logout = () => {
    localStorage.clear()
    this.setState({
      players: [],
      drafted_teams: [],
      currentUser: null,
      leagueId: '',
      leagues: []
    })

  }

  render(){
    return(
      <div>
        <Router>
          {
            this.state.currentUser && this.state.leagueId ? 
              <Route path={`/draft`} render={routerProps => 
                <Draft 
                  {...routerProps} 
                  players={this.state.players} 
                  currentUser={this.state.currentUser} 
                  leagueId={this.state.leagueId
              } />} /> : 
              <Route exact path='/draft' render={routerProps => 
                <LeaguesPage 
                  {...routerProps} 
                  currentUser={this.state.currentUser} 
                  selectLeague={this.selectLeague} />
              } />
          }

          {
            this.state.currentUser && 
            this.state.leagues.length > 0 && 
            <Route path={`/leagues/:leagueId`} render={routerProps => 
              <LeagueShow leagues={this.state.leagues} 
                players={this.state.players} 
                currentUser={this.state.currentUser} 
                {...routerProps} />
            }/>
          }

          {
            this.state.currentUser && <Route exact path='/leagues' render={routerProps => 
              <LeaguesPage 
                {...routerProps} 
                currentUser={this.state.currentUser} 
                selectLeague={this.selectLeague}/>
            }/>
          }
          {
            !this.state.currentUser && 
            <Route path='/' render={routerProps => 
              <HomePage 
                setUser={this.setUser} 
                {...routerProps} />
            }/>
          }
        </Router>
        
        {this.state.currentUser && <button class="button" onClick={this.logout}>Logout</button>}
      </div>
    )}
}

export default App;

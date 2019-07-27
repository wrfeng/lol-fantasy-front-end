import React from 'react'
import LeagueForm from './LeagueForm'
import LeaguesList from '../Containers/LeaguesList';
import { BrowserRouter as Route } from 'react-router-dom'
import LeagueShow from './LeagueShow'


class LeaguesPage extends React.Component{
  state = {
    leagues: []
  }

    componentDidMount(){
      fetch(`http://localhost:3001/leagues`)
        .then(resp => resp.json())
        .then(resp => {
          this.setState({
            leagues: resp.data
          })
        })
    }
  createLeague = (league) => {
    fetch('http://localhost:3001/leagues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(league)
    })
    .then(resp => resp.json())
    .then(resp => {
      this.setState({leagues: [...this.state.leagues, {id: resp.id, attributes:  {name: resp.name, users: [{id: this.props.currentUser.id}]} }]})
      fetch('http://localhost:3001/drafted_teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ user_id: this.props.currentUser.id, league_id: resp.id })
      })
      fetch('http://localhost:3001/drafted_teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ user_id: 2, league_id: resp.id })
      })
    })

    // fetch(`http://localhost:3001/matchups`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json'
    //   },
    //   body: JSON.stringify({user_id: this.props.currentUserId, opponent_id: 2})
    // })
  }

  render(){
    return(
      <div>
        {this.state.leagues.length > 0 ? <LeaguesList currentUser={this.props.currentUser} selectLeague={this.props.selectLeague} leagues={this.state.leagues} /> : null}
        <Route path={`${this.props.match.url}/:leagueId`} render={routerProps => <LeagueShow leagues={this.state.leagues} {...routerProps}/>}/>
        <LeagueForm createLeague={this.createLeague} currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default LeaguesPage


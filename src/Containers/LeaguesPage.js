import React from 'react'
import LeagueForm from '../Components/LeagueForm'
import LeaguesList from '../Components/LeaguesList';


class LeaguesPage extends React.Component{
  state = {
    leagues: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/leagues')
      .then(resp => resp.json())
      .then(resp => this.setState({ leagues: resp.data }))
      this.props.getCurrentUser()
      
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
      this.setState({leagues: [...this.state.leagues, {attributes: {name: resp.name}}]})
      fetch('http://localhost:3001/drafted_teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ user_id: this.props.currentUser.id, league_id: resp.id })
      })
    })
  }

  render(){
    return(
      <div>
        {this.state.leagues.length > 0 ? <LeaguesList leagues={this.state.leagues} /> : null}
        {/* <Route path={`${this.props.match.url}/:leagueId`} render={routerProps => <LeagueShow leagues={this.state.leagues} {...routerProps}/>}/> */}
        <LeagueForm createLeague={this.createLeague} currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default LeaguesPage


import React from 'react'
import { Link } from 'react-router-dom'

class LeaguesList extends React.Component{
  
  render(){
    // const myLeagues = this.props.leagues.filter(league => league.attributes.users[0].id === this.props.currentUserId)
    // myLeagues.map(league => )
    console.log(this.props.currentUser.id)
    

    const leagues = this.props.leagues.map((league, idx) => {
      const leagueId = league.id
      return <div key={league.id} onClick={() => this.props.selectLeague(leagueId)}>
        {league.drafted && league.attributes.users.find(user => user.id === this.props.currentUser.id) ? <Link to={`/leagues/${league.id}`}>{this.props.leagues[idx].attributes.name}</Link> : null}
        {!league.drafted && league.attributes.users.find(user => user.id === this.props.currentUser.id) ? <Link to={`/draft`}>{this.props.leagues[idx].attributes.name}</Link>  : null }
        
        </div>
    })
    return(
      <div>
        {leagues}
      </div>
    )
  }
}

export default LeaguesList
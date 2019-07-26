import React from 'react'
import { Link } from 'react-router-dom'

class LeaguesList extends React.Component{
  
  render(){
    // const myLeagues = this.props.leagues.filter(league => league.attributes.users[0].id === this.props.currentUserId)
    // myLeagues.map(league => )
    const leagues = this.props.leagues.map(league => {
      const leagueId = league.id
      return <div key={league.id} onClick={() => this.props.selectLeague(leagueId)}>
        {
          league.drafted  
            ? <Link  to={`/leagues/${league.id}`}>{this.props.leagues[parseInt(league.id) - 1].attributes.name}</Link>
            : <Link test={league.id} to={`/draft`}>{this.props.leagues[parseInt(league.id) - 1].attributes.name}</Link>
        }
        
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
import React from 'react'
import { Link } from 'react-router-dom'

class LeaguesList extends React.Component{
  render(){
    const leagues = Object.keys(this.props.leagues).map(leagueId => <div key={leagueId}><Link to={`/leagues/${leagueId}`}>{this.props.leagues[leagueId].attributes.name}</Link></div>)
    return(
      <div>
        {leagues}
      </div>
    )
  }
}

export default LeaguesList
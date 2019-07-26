import React from 'react'
import Draft from './Draft'
import Matchup from './Matchup'
class LeagueShow extends React.Component{
  leagueId = this.props.match.params.leagueId
  currentUser = this.props.currentUser
  state = {
    drafted: false
  }


  render(){
    return(
      <div>
        <Matchup leagueId={this.props.match.params.leagueId} /> 
      </div>
    )
  }
}

export default LeagueShow


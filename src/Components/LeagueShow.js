import React from 'react'
import Matchup from './Matchup'
class LeagueShow extends React.Component{
  leagueId = this.props.match.params.leagueId
  currentUser = this.props.currentUser
  
  state = {
    myTeam: [],
    theirTeam: []
  }

  componentDidMount(){
    fetch(`http://localhost:3001/drafted_teams/${this.props.location.state.myDraftedId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({myTeam: resp.included})
      })
    
    fetch(`http://localhost:3001/drafted_teams/${this.props.location.state.theirDraftedId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({theirTeam: resp.included})
      })
    
  }

  render(){
    return(
      <div>
        {console.log(this.state)}
        <Matchup myTeam={this.state.myTeam} theirTeam={this.state.theirTeam} /> 
      </div>
    )
  }
}

export default LeagueShow


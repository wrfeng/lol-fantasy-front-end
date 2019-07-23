import React from 'react'
import PlayersContainer from '../Containers/PlayersContainer'

class Draft extends React.Component{
  state = {
    myTeam: [],
    theirTeam: []  
  }

  componentDidMount(){
    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === this.props.currentUser.id && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        let otherTarget = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        console.log(target)
        console.log(otherTarget)
        this.setState({
          myTeam: target.attributes.players
        })
      })
  }
  render(){
    return(
      <div>
        <h1>My Team</h1>
  
        <h1>Opponents Team</h1>

        <PlayersContainer />
      </div>
    )
  }
}

export default Draft
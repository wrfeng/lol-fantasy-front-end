import React from 'react'
import Matchup from './Matchup'
class LeagueShow extends React.Component{  
  state = {
    myTeam: [],
    theirTeam: [],

  }

  componentDidMount(){
    let draftedId = this.props.location.state.myDraftedId || this.props.history.state.myDraftedId
    let theirDraftedId = this.props.location.state.theirDraftedId || this.props.history.state.theirDraftedId
    console.log("hi")
    if (this.props.location.state.myTeam) {
      this.setState({
        myTeam: this.props.location.state.myTeam,
        theirTeam: this.props.location.state.theirTeam
      })
    } else{

      fetch(`http://localhost:3001/drafted_teams/${draftedId}`)
        .then(resp => resp.json())
        .then(resp => {
          this.setState({ myTeam: resp.included, myDrafted: resp.data})
        })
      
      fetch(`http://localhost:3001/drafted_teams/${theirDraftedId}`)
        .then(resp => resp.json())
        .then(resp => {
          this.setState({ theirTeam: resp.included, theirDrafted: resp.data})
          
        })
    }
  }

  render(){
    return(
      <div>
        <Matchup myTeam={this.state.myTeam} theirTeam={this.state.theirTeam} /> 
      </div>
    )
  }
}

export default LeagueShow


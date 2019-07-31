import React from 'react'
import Matchup from './Matchup'
import MyPlayers from './MyPlayers'
import FreeWaiver from './FreeWaiver'
import Standings from './Standings'

class LeagueShow extends React.Component{  
  state = {
    myTeam: [],
    theirTeam: [],
    matchup: true,
    myPlayers: false,
    freeWaiver: false,
    standings: false
  }

  componentDidMount(){

    let draftedId = this.props.location.state.myDraftedId || this.props.history.state.myDraftedId
    let theirDraftedId = this.props.location.state.theirDraftedId || this.props.history.state.theirDraftedId
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

  showLeagues = () => {
    this.props.history.push('/leagues')
  }

  showPlayers = () => {
    this.setState({
      matchup: false,
      myPlayers: true,
      freeWaiver: false,
      standings: false
    })
  }

  showFreeWaiver = () => {
    this.setState({
      matchup: false,
      myPlayers: false,
      freeWaiver: true,
      standings: false
    })
  }

  showStandings = () => {
    this.setState({
      matchup: false,
      myPlayers: false,
      freeWaiver: false,
      standings: true
    })
  }

  showMatchups = () => {
    this.setState({
      matchup: true,
      myPlayers: false,
      freeWaiver: false,
      standings: false
    })
  }

  render(){
    return(
      <div>
        {this.state.matchup && <Matchup myTeam={this.state.myTeam} theirTeam={this.state.theirTeam} />}
        {this.state.myPlayers && <MyPlayers myTeam={this.state.myTeam}/>}
        {this.state.freeWaiver && <FreeWaiver />}
        {this.state.standings && <Standings />}
        <button onClick={() => this.showLeagues()}>My Leagues</button>
        <button onClick={() => this.showPlayers()}>My Players</button>
        <button onClick={() => this.showMatchups()}>Matchups</button>
        <button onClick={() => this.showFreeWaiver()}>Free Waiver</button>
        <button onClick={() => this.showStandings()}>Standings</button>
      </div>
    )
  }
}

export default LeagueShow


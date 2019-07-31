import React from 'react'
import Matchup from './Matchup'
import MyPlayers from '../Containers/MyPlayers'
import FreeWaiver from '../Containers/FreeWaiver'
import Standings from './Standings'

class LeagueShow extends React.Component{  
  state = {
    myTeam: [],
    theirTeam: [],
    waivers: [],
    matchup: true,
    myPlayers: false,
    freeWaiver: false,
    standings: false
  }

  componentDidMount(){
    let draftedId = this.props.location.state.myDraftedId || this.props.history.state.myDraftedId
    let theirDraftedId = this.props.location.state.theirDraftedId || this.props.history.state.theirDraftedId
    console.log(this.props.location.state.theirDraftedId)
    if (this.props.location.state.myTeam) {
      let combinedTeams = this.props.location.state.myTeam.concat(this.props.location.state.theirTeam)
      let allNames = combinedTeams.map(player => player.attributes.ign)
      let waivers = this.props.players.filter(player => !allNames.includes(player.attributes.ign))
      this.setState({
          myTeam: this.props.location.state.myTeam,
          theirTeam: this.props.location.state.theirTeam,
          waivers: waivers
      })
      
    } else{
      fetch(`http://localhost:3001/drafted_teams/${draftedId}`)
        .then(resp => resp.json())
        .then(myDraft => {
          this.setState({ myTeam: myDraft.included, myDrafted: myDraft.data})
          fetch(`http://localhost:3001/drafted_teams/${theirDraftedId}`)
            .then(resp => resp.json())
            .then(theirDraft => {
              let combinedTeams = myDraft.included.concat(theirDraft.included)
              let allNames = combinedTeams.map(player => player.attributes.ign)
              let waivers = this.props.players.filter(player => !allNames.includes(player.attributes.ign))
              this.setState({ theirTeam: theirDraft.included, theirDrafted: theirDraft.data, waivers: waivers})
            })
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
    let myPoints = []
    let theirPoints = []

    for (let i = 0; i <= this.state.myTeam.length; i++) {
      myPoints[i] = this.state.myTeam.map(player => player.attributes.stats[i].total_points)
      theirPoints[i] = this.state.theirTeam.map(player => player.attributes.stats[i].total_points)
    }

    return(
      <div>
        {this.state.matchup && <Matchup myPoints={myPoints} theirPoints={theirPoints} currentUser={this.props.currentUser} myTeam={this.state.myTeam} theirTeam={this.state.theirTeam} />}
        {this.state.myPlayers && <MyPlayers myTeam={this.state.myTeam}/>}
        {this.state.freeWaiver && <FreeWaiver waivers={this.state.waivers}/>}
        {this.state.standings && <Standings myPoints={myPoints} theirPoints={theirPoints} currentUser={this.props.currentUser}/>}
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


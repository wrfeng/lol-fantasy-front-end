import React from 'react'
import PlayersContainer from '../Containers/PlayersContainer'
import Player from './Player'

class Draft extends React.Component{
  state = {
    myTeam: [],
    theirTeam: [],
    players: [],
    myDraftedId: '',
    theirDraftedId: ''
  }

  
  componentDidMount(){
    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === this.props.currentUser.id && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        let otherTarget = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        let names = target.attributes.players.map(player => player.ign)
        let otherNames = otherTarget.attributes.players.map(player => player.ign)
        let test = resp.included.filter(player => names.includes(player.attributes.ign))
        let otherTest = resp.included.filter(player => otherNames.includes(player.attributes.ign))
        this.setState({
          myTeam: test,
          theirTeam: otherTest
        })

        let myTeamNames = this.state.myTeam.map(player => player.ign)
        let theirTeamNames = this.state.theirTeam.map(player => player.ign)
        // console.log(myTeamNames)
        // console.log(theirTeamNames)
        fetch('http://localhost:3001/players')
          .then(resp => resp.json())
          .then(players => this.setState({
            players: players.data.filter(player => !myTeamNames.includes(player.attributes.ign) && !theirTeamNames.includes(player.attributes.ign))
          }))


      })



    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === this.props.currentUser.id && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        let otherTarget = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        this.setState({ myDraftedId: target.id })
        this.setState({ theirDraftedId: otherTarget.id })
      })
  }

  draft = (selected) => {
    if (this.state.myTeam.length >= 10) return

    this.setState({ myTeam: [...this.state.myTeam, selected], players: this.state.players.filter(player => player.attributes.ign !== selected.attributes.ign) })
    let random_number = Math.floor(Math.random() * this.state.players.length)
    let random_player = this.state.players[random_number]
    this.setState({ players: this.state.players.filter(player => player.id !== random_player.id && player.id !== selected.id) })
    this.computer_draft(random_player)

    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === this.props.currentUser.id && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        fetch('http://localhost:3001/drafts',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({drafted_team_id: target.id, player_id: selected.id})
        })
      })
  }

  computer_draft = (random_player) => {
    // console.log(random_player)
    this.setState({ theirTeam: [...this.state.theirTeam, random_player] })
    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        fetch('http://localhost:3001/drafts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ drafted_team_id: target.id, player_id: random_player.id })
        })
        // this.setState({theirDraftedId: target.id})
        if (this.state.myTeam.length >= 10) {
          fetch(`http://localhost:3001/leagues/${this.props.leagueId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({ drafted: true })
          })
          // console.log(this.props)
          this.props.history.push(`/leagues/${this.props.leagueId}`, {waivers: this.state.players, myTeam: this.state.myTeam, theirTeam: this.state.theirTeam, myDraftedId: this.state.myDraftedId, theirDraftedId: this.state.theirDraftedId})
        }
      })
  }

  render(){
    const myPlayers = this.state.myTeam.map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    const theirPlayers = this.state.theirTeam.map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    return(
      <div>
        <h1>My Team</h1>
          {myPlayers}
        <h1>Opponents Team</h1>
          {theirPlayers}
        <h1>Draft Your Team</h1>
        <PlayersContainer players={this.state.players} draft={this.draft}/>
      </div>
    )
  }
}

export default Draft
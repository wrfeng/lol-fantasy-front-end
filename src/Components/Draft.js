import React from 'react'
import PlayersContainer from '../Containers/PlayersContainer'
import Player from './Player'

class Draft extends React.Component{
  state = {
    myTeam: [],
    theirTeam: [],
    players: []
  }


  componentDidMount(){

    fetch('http://localhost:3001/drafted_teams')
      .then(resp => resp.json())
      .then(resp => {
        let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === 1 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        let otherTarget = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.props.leagueId))
        this.setState({
          myTeam: target.attributes.players,
          theirTeam: otherTarget.attributes.players
        })
      })

    fetch('http://localhost:3001/players')
      .then(resp => resp.json())
      .then(players => this.setState({ players: players.data }))


  }

  draft = (selected) => {
    this.setState({ myTeam: [...this.state.myTeam, selected.attributes] })

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
      this.computer_draft(selected)
  }

  computer_draft = (selected) => {
    let random_number = Math.floor(Math.random() * this.state.players.length)
    let random_player = this.state.players[random_number]
    this.setState({ players: this.state.players.filter(player => player.id !== random_player.id && player.id !== selected.id) })
    this.setState({ theirTeam: [...this.state.theirTeam, random_player.attributes] })
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
      })
  }

  render(){
    const myPlayers = this.state.myTeam.map(player => <div><Player playerData={player} /></div>)
    const theirPlayers = this.state.theirTeam.map(player => <div><Player playerData={player} /></div>)
    return(
      <div>
        <h1>My Team</h1>
          {myPlayers}
        <h1>Opponents Team</h1>
          {theirPlayers}
        <PlayersContainer players={this.state.players} draft={this.draft}/>
        {this.state.myTeam.length + this.state.theirTeam.length === 20 ? this.props.finishDraft() : null}
      </div>
    )
  }
}

export default Draft
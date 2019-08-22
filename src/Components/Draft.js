import React from 'react'
import PlayersContainer from '../Containers/PlayersContainer'
import Player from './Player'

class Draft extends React.Component{
  state = {
    myTeam: [],
    theirTeam: [],
    players: [],
    myDraftedId: '',
    theirDraftedId: '',
    comp: {Top: 0, Jungler: 0, Mid: 0, ADC: 0, Support: 0},
    theirComp: {Top: 0, Jungler: 0, Mid: 0, ADC: 0, Support: 0}
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
        this.state.myTeam.forEach(player => this.setState({
          comp: {
            ...this.state.comp, 
            [player.attributes.position]: this.state.comp[player.attributes.position] + 1
          }
        })
        )
        this.state.theirTeam.forEach(player => this.setState({
          theirComp: { 
            ...this.state.theirComp,
            [player.attributes.position]: this.state.theirComp[player.attributes.position] + 1
          }
        })
        )
        let myTeamNames = this.state.myTeam.map(player => player.attributes.ign)
        let theirTeamNames = this.state.theirTeam.map(player => player.attributes.ign)

        fetch('http://localhost:3001/players')
          .then(resp => resp.json())
          .then(players => {
            this.setState({
              players: players.data.filter(player => !myTeamNames.includes(player.attributes.ign) && !theirTeamNames.includes(player.attributes.ign))
            })
          })
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

  check_eligibility = (selected) => {
    let position = this.state.comp[selected.attributes.position]
    let eligible = false
    if (position < 2) {
      this.setState({
        comp: {
          ...this.state.comp,
          [selected.attributes.position]: position + 1
        }
      })
      eligible = true
    } 
    return eligible
  }

  getRandPlayer = () => {
    let eligible = false
    let random_number = Math.floor(Math.random() * this.state.players.length)
    let rando = this.state.players[random_number]
    
    while (!eligible){
      random_number = Math.floor(Math.random() * this.state.players.length)
      rando = this.state.players[random_number]
      let position = this.state.theirComp[rando.attributes.position]  
    
      if (position < 2) {
        this.setState({
          theirComp: {
            ...this.state.theirComp,
            [rando.attributes.position]: position + 1
          }
        })
        eligible = true
      }
    }
    return rando
  }
  draft = (selected) => {
    if (this.state.myTeam.length >= 9) return

    if (this.check_eligibility(selected)) {

      this.setState({ myTeam: [...this.state.myTeam, selected], players: this.state.players.filter(player => player.attributes.ign !== selected.attributes.ign) })
      this.setState({ players: this.state.players.filter(player => player.id !== selected.id) })
      let random_player = this.getRandPlayer()
      this.setState({ players: this.state.players.filter(player => player.id !== random_player.id && player.id !== selected.id ) })
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
  }
  
  computer_draft = (random_player) => {

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
      if (this.state.myTeam.length >= 9) {
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
    const theirPlayers = this.state.theirTeam.map(player => <div key={player.id} className="theirPlayers"><Player playerData={player.attributes} /></div>)
    console.log(this.state.comp)
    console.log(this.state.theirComp)
    return(
      <div>
        <div className="myTeamDraft">
          <h1 className="test">My Team</h1>
          {myPlayers}
        </div>
        <div className="draftDiv">
          <h1>Draft Your Team</h1>
          <PlayersContainer players={this.state.players} draft={this.draft}/>
        </div>
        <div className="theirPlayersDraft">
          <h1>Opponents Team</h1>
          {theirPlayers}
        </div>
      </div>
    )
  }
}

export default Draft
import React from 'react'
import TeamContainer from '../Containers/TeamContainer'
import PlayerCard from './PlayerCard'
class Matchup extends React.Component{
  state = {
    leagueId: this.props.leagueId,
    user1: '',
    t1: [],
    t2: [],
    p1: [],
    p2: [],
    week: 1    
  }

  componentDidMount(){
    fetch(`http://localhost:3001/leagues/${this.state.leagueId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          user1: resp.data.attributes.users[0].id,
        })
        fetch('http://localhost:3001/drafted_teams')
          .then(resp => resp.json())
          .then(resp => {
            let target = resp.data.find(drafted_team => drafted_team.attributes.user_id === this.state.user1 && drafted_team.attributes.league_id === parseInt(this.state.leagueId))
            let otherTarget = resp.data.find(drafted_team => drafted_team.attributes.user_id === 2 && drafted_team.attributes.league_id === parseInt(this.state.leagueId))
            this.setState({
              t1: target.attributes.players.map(player => player.ign),
              t2: otherTarget.attributes.players.map(player => player.ign)
            })
          })

        fetch(`http://localhost:3001/players`)
          .then(resp => resp.json())
          .then(resp => {
            this.setState({
              p1: resp.data.filter(player => this.state.t1.includes(player.attributes.ign)),
              p2: resp.data.filter(player => this.state.t2.includes(player.attributes.ign))
            })
          })
          
      })
  }

  nextWeek = () => {
    if (this.state.week < 9) { 
      this.setState({week: this.state.week + 1})
    }
  }

  previousWeek = () => {
    if (this.state.week > 1) { 
      this.setState({week: this.state.week - 1})
    }
  }
  render(){
    let players = ''
    let players2 = ''
    if(this.state.p1[0]) {players = this.state.p1.map(player => <div><PlayerCard week={this.state.week} playerData={player.attributes.stats} /></div>)}
    if(this.state.p2[0]) {players2 = this.state.p2.map(player => <div><PlayerCard week={this.state.week} playerData={player.attributes.stats} /></div>)}

    return(
      <div>
        <button onClick={this.previousWeek}>Prev</button>
        <button onClick={this.nextWeek}>Next</button>
        <h1>WEEK {this.state.week}</h1>
        <h2>Team 1</h2>
        {this.state.p1[this.state.week] ? players : null}
        <h2>Team 2</h2>
        {this.state.p2[this.state.week] ? players2 : null}
      </div>
    )
  }

}

export default Matchup
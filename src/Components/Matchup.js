import React from 'react'
import TeamContainer from '../Containers/TeamContainer'
import PlayerCard from './PlayerCard'
class Matchup extends React.Component{
  state = {
    week: 0    
  }

  nextWeek = () => {
    if (this.state.week < 9) { 
      this.setState({week: this.state.week + 1})
    }
  }

  previousWeek = () => {
    if (this.state.week > 0) { 
      this.setState({week: this.state.week - 1})
    }
  }
  render(){
    let players = ''
    let players2 = ''
    if(this.props.myTeam[0]) {players = this.props.myTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player.attributes} /></div>)}
    if(this.props.myTeam[0]) {players2 = this.props.myTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player.attributes} /></div>)}
    console.log(this.props)
    return(
      <div>
        <button onClick={this.previousWeek}>Prev</button>
        <button onClick={this.nextWeek}>Next</button>
        <h1>{this.state.week === 0 ? "TOTALS" : `WEEK ${this.state.week}`}</h1>
        <h2>Team 1</h2>
        {this.props.myTeam[this.state.week] ? players : null}
        <h2>Team 2</h2>
        {this.props.theirTeam[this.state.week] ? players2 : null}
      </div>
    )
  }

}

export default Matchup
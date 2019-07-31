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

  getStandings = () => {
    console.log(this.props.myTeam)
    let myPoints = []
    let theirPoints = []
    for (let i = 0; i < this.props.myTeam.length; i ++){
      myPoints[i] = this.props.myTeam.map(player => player.attributes.stats[i].total_points)
      theirPoints[i] = this.props.theirTeam.map(player => player.attributes.stats[i].total_points)
    }
    console.log("mypoints: ", myPoints)
    console.log("theirpoints: ", theirPoints)
  }  

  render(){
    let players = ''
    let players2 = ''
    let myPoints = []
    let theirPoints = []
    
    if(this.props.myTeam[0]) {players = this.props.myTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player} /></div>)}
    if(this.props.theirTeam[0]) {players2 = this.props.theirTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player} /></div>)}

    for (let i = 0; i < this.props.myTeam.length; i++) {
      myPoints[i] = this.props.myTeam.map(player => parseFloat(player.attributes.stats[i].total_points))
      theirPoints[i] = this.props.theirTeam.map(player => parseFloat(player.attributes.stats[i].total_points))
    }

    if (this.props.myTeam[0]) { myPoints = myPoints[this.state.week].reduce((acc, curr) => acc + curr)}
    if (this.props.theirTeam[0]) { theirPoints = theirPoints[this.state.week].reduce((acc, curr) => acc + curr)}

    return(
      <div>
        <button onClick={this.previousWeek}>Prev</button>
        <button onClick={this.nextWeek}>Next</button>
        <h1>{myPoints > theirPoints && this.state.week !== 0 ? `${this.props.currentUser.username} WINS THIS WEEK` : (this.state.week !== 0 ? "CPU WINS THIS WEEK" : null)}</h1>
        <h2>{this.state.week === 0 ? "TOTALS" : `WEEK ${this.state.week}`}</h2>
        <h2>{`${this.props.currentUser.username}'s Team`}</h2>
        {this.props.myTeam[this.state.week] && `Total Points: ${myPoints}` }
        {this.props.myTeam[this.state.week] && players}
        <h3>CPU's Team</h3>
        {this.props.theirTeam[this.state.week] && `Total Points: ${theirPoints}`}
        {this.props.theirTeam[this.state.week] && players2 }
      </div>
    )
  }

}

export default Matchup
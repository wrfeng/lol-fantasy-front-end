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
    let myPoints = []
    let theirPoints = []
    for (let i = 0; i < this.props.myTeam.length; i ++){
      myPoints[i] = this.props.myTeam.map(player => player.attributes.stats[i].total_points)
      theirPoints[i] = this.props.theirTeam.map(player => player.attributes.stats[i].total_points)
    }
  }  

  render(){
    let players = ''
    let players2 = ''
    let myPoints = []
    let theirPoints = []
    let test 
    
    if(this.props.myTeam[0]) {players = this.props.myTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player} /></div>)}
    // if(this.props.myTeam[0]) {test = this.props.myTeam.map(player => player)}
    if(this.props.theirTeam[0]) {players2 = this.props.theirTeam.map(player => <div key={player.id}><PlayerCard week={this.state.week} playerData={player} /></div>)}
    if (this.props.myTeam[0]) { myPoints = this.props.myPoints[this.state.week].reduce((acc, curr) => acc + curr).toFixed(2)}
    if (this.props.theirTeam[0]) { theirPoints = this.props.theirPoints[this.state.week].reduce((acc, curr) => acc + curr).toFixed(2)}

    console.log(test)
    return(
      <div>
        <button className="button" onClick={this.previousWeek}>Prev</button>
        <button className="button" onClick={this.nextWeek}>Next</button>
        <h1>{myPoints > theirPoints && this.state.week !== 0 ? `${this.props.currentUser.username} WINS THIS WEEK` : (this.state.week !== 0 ? "CPU WINS THIS WEEK" : null)}</h1>
        <h2>{this.state.week === 0 ? "TOTALS" : `WEEK ${this.state.week}`}</h2>

        <div className="container">
          <div className="myMatchup">
            <h2>{`${this.props.currentUser.username}'s Team`}</h2>
            <h1>{this.props.myTeam[0] && `Total Points: ${myPoints}`}</h1>
            {this.props.myTeam[0] && players}
          </div>
          </div>
          
          <div className="container">
          <div className="otherMatchup">
            <h3>CPU's Team</h3>
            <h1>{this.props.theirTeam[0] && `Total Points: ${theirPoints}`}</h1>
            {this.props.theirTeam[0] && players2 }
          </div>
        </div>
      </div>
    )
  }

}

export default Matchup
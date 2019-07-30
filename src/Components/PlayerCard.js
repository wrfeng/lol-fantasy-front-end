import React from 'react'

class Player extends React.Component {
  render() {
    return (
      <div>
        {/* {console.log(this.props)} */}
        <img src={this.props.playerData.img_url} height="200" width="200"></img>
        <h4>{this.props.playerData.stats[this.props.week].ign}</h4>
        <div>Team: {this.props.playerData.stats[this.props.week].team}</div>
        <div>Position: {this.props.playerData.stats[this.props.week].position}</div>
        <div>Total Points: {this.props.playerData.stats[this.props.week].total_points}</div>
        <div>Game Played: {this.props.playerData.stats[this.props.week].games_played}</div>
        <div>Kills: {this.props.playerData.stats[this.props.week].kills}</div>
        <div>Deaths: {this.props.playerData.stats[this.props.week].deaths}</div>
        <div>Assists: {this.props.playerData.stats[this.props.week].assists}</div>
        <div>CS: {this.props.playerData.stats[this.props.week].creep_score}</div>
        <div>10 Kills/Assists Bonus: {this.props.playerData.stats[this.props.week].kill_assist_bonus}</div>
        <div>Triple/Quadra/Penta Kill Bonus: {this.props.playerData.stats[this.props.week].multi_kill}</div>
      </div>
    )
  }
}

export default Player

import React from 'react'

class PlayerCard extends React.Component {
  render() {
    return (
      <div>
        {console.log(this.props.playerData)}
        <img src={this.props.playerData.attributes.img_url} alt={this.props.playerData.attributes.ign}height="200" width="200"></img>
        <h4>{this.props.playerData.attributes.stats[this.props.week].ign}</h4>
        <div>Team: {this.props.playerData.attributes.stats[this.props.week].team}</div>
        <div>Position: {this.props.playerData.attributes.stats[this.props.week].position}</div>
        <div>Total Points: {this.props.playerData.attributes.stats[this.props.week].total_points}</div>
        <div>Game Played: {this.props.playerData.attributes.stats[this.props.week].games_played}</div>
        <div>Kills: {this.props.playerData.attributes.stats[this.props.week].kills}</div>
        <div>Deaths: {this.props.playerData.attributes.stats[this.props.week].deaths}</div>
        <div>Assists: {this.props.playerData.attributes.stats[this.props.week].assists}</div>
        <div>CS: {this.props.playerData.attributes.stats[this.props.week].creep_score}</div>
        <div>10 Kills/Assists Bonus: {this.props.playerData.attributes.stats[this.props.week].kill_assist_bonus}</div>
        <div>Triple/Quadra/Penta Kill Bonus: {this.props.playerData.attributes.stats[this.props.week].multi_kill}</div>
      </div>
    )
  }
}

export default PlayerCard

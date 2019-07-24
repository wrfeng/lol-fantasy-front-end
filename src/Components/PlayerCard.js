import React from 'react'

class Player extends React.Component {
  render() {
    return (
      <div>
        <h4>{this.props.playerData[this.props.week].ign}</h4>
        <div>Total Points: {this.props.playerData[this.props.week].total_points}</div>
        <div>Kills: {this.props.playerData[this.props.week].kills}</div>
        <div>Deaths: {this.props.playerData[this.props.week].deaths}</div>
        <div>Assists: {this.props.playerData[this.props.week].assists}</div>
      </div>
    )
  }
}

export default Player
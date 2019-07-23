import React from 'react'
import Player from '../Components/Player'

class PlayersContainer extends React.Component{
  state = {
    players: []
  }

  componentDidMount(){
    fetch('http://localhost:3001/players')
      .then(resp => resp.json())
      .then(players => this.setState({players: players.data}))
  }
  render(){
    // const players = this.state.players.map(player => console.log(player.attributes))
    const players = this.state.players.map(player => player)
    const top = players.filter(player => player.attributes.position === "Top").map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    const jungle = players.filter(player => player.attributes.position === "Jungler").map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    const mid = players.filter(player => player.attributes.position === "Mid").map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    const adc = players.filter(player => player.attributes.position === "AD Carry").map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    const support = players.filter(player => player.attributes.position === "Support").map(player => <div key={player.id}><Player playerData={player.attributes} /></div>)
    return(
      <div>
        <h3>Top</h3>
        {top}
        <h3>Jungle</h3>
        {jungle}
        <h3>Mid</h3>
        {mid}
        <h3>ADC</h3>
        {adc}
        <h3>Support</h3>
        {support}
      </div>
    )
  }
}

export default PlayersContainer
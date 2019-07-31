import React from 'react'
import PlayerCard from '../Components/PlayerCard'

class MyPlayers extends React.Component{
  render(){
    let players = this.props.myTeam.map(player => <div key={player.id}><PlayerCard week={0} playerData={player} /></div>) 
    return(
      <div>
        <h1>My Players</h1>
        {console.log(this.props.myTeam)}
        {players}
      </div>
    )
  }
}

export default MyPlayers
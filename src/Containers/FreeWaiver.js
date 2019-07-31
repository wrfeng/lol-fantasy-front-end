import React from 'react'
import PlayerCard from '../Components/PlayerCard'

class FreeWaiver extends React.Component{
  render(){
    let players = this.props.waivers.map(player => <div key={player.id}><PlayerCard week={0} playerData={player} /></div>) 
    return(
      <div>
        {console.log(this.props)}
        FreeWaiver
        {players}
      </div>
    )
  }
}

export default FreeWaiver
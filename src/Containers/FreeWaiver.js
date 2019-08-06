import React from 'react'
import PlayerCard from '../Components/PlayerCard'

class FreeWaiver extends React.Component{
  render(){
    let players = this.props.waivers.map(player => <div key={player.id} className="freeWaiver"><PlayerCard week={0} playerData={player} /></div>) 
    return(
      <div>
        {console.log(this.props)}
        <h1>FreeWaiver</h1>
        <div>
          {players}
        </div>  
      </div>
    )
  }
}

export default FreeWaiver
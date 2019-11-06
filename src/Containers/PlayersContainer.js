import React from 'react'
import DraftPlayer from '../Components/DraftPlayer'

class PlayersContainer extends React.Component{

  render(){
    const {players} = this.props
    let top = []
    let jungle = []
    let mid = []
    let adc = []
    let support = []
    
    players.forEach(player =>{
      switch(player.attributes.position){
        case "Top":
          top.push(<div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player} /></div>)
          break
        case "Jungler":
          jungle.push(<div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player} /></div>)
          break
        case "Mid":
          mid.push(<div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player} /></div>)
          break
        case "ADC":
          adc.push(<div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player} /></div>)
          break
        case "Support":
          support.push(<div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player} /></div>)
          break
      }
    })
    
    return(
      <div>
        <div className="draftCard">
          <h3>Top</h3>
          {top}
        </div>

        <div className="draftCard">
          <h3>Jungle</h3>
          {jungle}
        </div>

        <div className="draftCard">
          <h3>Mid</h3>
          {mid}
        </div>

        <div className="draftCard">
          <h3>AD Carry</h3>
          {adc}
        </div>

        <div className="draftCard">
          <h3>Support</h3>
          {support}
        </div>
    </div>
    )
  }
}

export default PlayersContainer
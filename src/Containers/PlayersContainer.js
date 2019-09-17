import React from 'react'
import DraftPlayer from '../Components/DraftPlayer'

class PlayersContainer extends React.Component{

  render(){
    // const players = this.state.players.map(player => console.log(player.attributes))
    const players = this.props.players.map(player => player)
    const top = players.filter(player => {
      return player.attributes.position === "Top"
    }).map(player => {
      return <div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player}/></div>
    })
    
    const jungle = players.filter(player => {
      return player.attributes.position === "Jungler"
    }).map(player => {
      return <div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player}/></div>
    })

    const mid = players.filter(player => {
      return player.attributes.position === "Mid"
    }).map(player => {
      return <div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player}/></div>
    })

    const adc = players.filter(player => {
      return player.attributes.position === "ADC"
    }).map(player => {
      return <div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player}/></div>
    })
    
    const support = players.filter(player => {
      return player.attributes.position === "Support"
    }).map(player => {
      return <div key={player.id}><DraftPlayer draft={this.props.draft} playerData={player}/></div>
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
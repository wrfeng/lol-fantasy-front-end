import React from 'react'

class Player extends React.Component{
  render(){
    return(
      <div>
        {this.props.playerData.ign}
      </div>
    )
  }
}

export default Player
import React from 'react'

class Player extends React.Component{
  render(){
    return(
      <div>
        {/* {console.log(this.props.playerData)} */}
        {this.props.playerData.ign}
        <img src={this.props.playerData.img_url} height="200" width="200" alt={this.props.playerData.ign}></img>
      </div>
    )
  }
}

export default Player
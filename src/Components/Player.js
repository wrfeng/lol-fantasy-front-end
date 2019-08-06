import React from 'react'

class Player extends React.Component{
  render(){
    return(
      <div>
        {/* {console.log(this.props)} */}
        <img src={this.props.playerData.img_url} height="200" width="200" alt={this.props.playerData.ign}></img>
        <p>{this.props.playerData.ign}</p>
      </div>
    )
  }
}

export default Player
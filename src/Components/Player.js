import React from 'react'

class Player extends React.Component{
  render(){
    return(
      <div className="draft-selection">
        {/* {console.log(this.props)} */}
        <img src={this.props.playerData.img_url} height="100" width="100" alt={this.props.playerData.ign}></img>
        <p>{this.props.playerData.ign}</p>
      </div>
    )
  }
}

export default Player
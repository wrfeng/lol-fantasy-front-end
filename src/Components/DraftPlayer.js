import React from 'react'

class DraftPlayer extends React.Component{
  render(){
    return(
      <div>
        <img onClick={() => this.props.draft(this.props.playerData)} alt={this.props.playerData.attributes.ign} src={this.props.playerData.attributes.img_url} height="100" width="100"></img>
        <p>{this.props.playerData.attributes.ign}</p>
      </div>
    )
  }
}

export default DraftPlayer
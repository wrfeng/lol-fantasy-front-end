import React from 'react'

class DraftPlayer extends React.Component{
  render(){
    return(
      <div onClick={() => this.props.draft(this.props.playerData)}>
        {this.props.playerData.attributes.ign}
      </div>
    )
  }
}

export default DraftPlayer
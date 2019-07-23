import React from 'react'

class League extends React.Component{
  
  render(){
    return(
      <div>
        {this.props.leagueName}
      </div>
    )
  }
}

export default League
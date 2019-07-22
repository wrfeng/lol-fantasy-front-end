import React from 'react'

class HomePage extends React.Component{

  render(){
    return(
      <div>
        hi {this.props.username}
      </div>
    )
  }
}

export default HomePage
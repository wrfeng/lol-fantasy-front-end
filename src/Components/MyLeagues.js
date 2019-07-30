import React from 'react'

class MyLeagues extends React.Component{
  render(){
    return(
      <div>
        <button onClick={() => this.props.showLeagues()}>My Leagues</button>
      </div>
    )
  }
}

export default MyLeagues
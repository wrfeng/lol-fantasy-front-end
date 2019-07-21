import React from 'react'

class HomePage extends React.Component{

  state = {
    username: ''
  }
  componentDidMount(){
    fetch('http://localhost:3001/profile', {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(profileInfo => this.setState({username: profileInfo.username}))
  }
  render(){
    return(
      <div>
        hi {this.state.username}
      </div>
    )
  }
}

export default HomePage
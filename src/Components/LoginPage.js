import React from 'react'

class LoginPage extends React.Component{

  state = {
    username: '',
    password: ''
  }

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        localStorage.setItem('token', resp.token)
        this.props.history.push('/')
      })
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleInput} placeholder="username..." name="username" value={this.state.username}/>
        <input onChange={this.handleInput} placeholder="password..." name="password" value={this.state.password}/>
        <input type="submit" value="Login"/>
      </form>
    )
  }
}

export default LoginPage
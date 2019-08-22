import React from'react'

class SignupPage extends React.Component{
  state = {
    username: '',
    password: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(resp => {
        localStorage.setItem('token', resp.token)
        this.props.setUser(resp.user)
        resp.token && this.props.routerProps.history.push('/leagues')
      })
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} placeholder="username..." name="username" value={this.state.username}/>
        <input type="password" onChange={this.handleChange} placeholder="password..." name="password" value={this.state.password}/>
        <input type="submit" value="Signup"/>
      </form>
    )
  }
  
}

export default SignupPage
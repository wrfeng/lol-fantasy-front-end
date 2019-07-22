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
        this.props.history.push('/home')
      })
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} name="username" value={this.state.username}/>
        <input onChange={this.handleChange} name="password" value={this.state.password}/>
        <input type="submit" value="signup"/>
      </form>
    )
  }
  
}

export default SignupPage
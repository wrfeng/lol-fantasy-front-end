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
        localStorage.setItem('token', resp.token)
        this.props.setUser(resp.user)
        resp.token && this.props.routerProps.history.push('/leagues')
      })
  }
  render(){
    return(
      <div className="loginPage">
        <div className="login-form">
        <h1 className="header-heading">SIGN IN</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="username-input">
            <label>Username</label>
            <input onChange={this.handleInput} className="form-control" name="username" value={this.state.username}/>
          </div>
          <div>
            <label>Password</label>
            <input type ="password" onChange={this.handleInput} className="form-control" name="password" value={this.state.password}/>
          </div>
          <input type="submit" value="Login"/>
        </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
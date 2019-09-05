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
  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  render(){
    return(
      <div className="loginPage">
        <img className="fantasy-logo" src={require("../images/fantasy-logo.png")}/>
        <div className="login-form">
        <h1 className="header-heading">SIGN UP</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="username-input">
            <label>Username</label>
            <input onChange={this.handleInput} className="form-control" name="username" value={this.state.username}/>
          </div>
          <div>
            <label>Password</label>
            <input type ="password" onChange={this.handleInput} className="form-control" name="password" value={this.state.password}/>
          </div>
          <input className="button login" type="submit" value="Sign Up"/>
        </form>

        <span>
            <p onClick={this.props.handleClick} className="sign-in">Already have an account?</p>
        </span>
        </div>
      </div>
    )
  }
  
}

export default SignupPage
import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

class HomePage extends React.Component{

  state = {
    login: true,
    signup: false
  }

  handleClick = () => {
    this.setState({
      login: !this.state.login,
      signup: !this.state.signup
    })
  }

  render(){
    return(
      <div className="home-div">
        <img className="home-image" src={require("../images/draven.jpg")} alt="draven"></img>
        {this.state.login && <LoginPage setUser={this.props.setUser} handleClick={this.handleClick} routerProps={this.props}/>}
        {this.state.signup && <SignupPage setUser={this.props.setUser} handleClick={this.handleClick} routerProps={this.props}/>}
      </div>
    )
  }
}

export default HomePage
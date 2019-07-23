import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

class HomePage extends React.Component{
  state = {
    loggedIn: false
  }
  render(){
    return(
      <div>
        <LoginPage routerProps={this.props}/>
        or
        <SignupPage routerProps={this.props}/>
      </div>
    )
  }
}

export default HomePage
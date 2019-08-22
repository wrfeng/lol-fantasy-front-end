import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

class HomePage extends React.Component{

  render(){
    return(
      <div className="homepage">
        <LoginPage setUser={this.props.setUser} routerProps={this.props}/>
        or
        <SignupPage setUser={this.props.setUser} routerProps={this.props}/>
      </div>
    )
  }
}

export default HomePage
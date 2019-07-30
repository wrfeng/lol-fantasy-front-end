import React from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

class HomePage extends React.Component{

  render(){
    return(
      <div>
        
        <LoginPage setUser={this.props.setUser} routerProps={this.props}/>
        or
        <SignupPage setUser={this.props.setUser} routerProps={this.props}/>

          <h2>DRAFTING YOUR TEAM</h2>
          <p>To build your dream team of LCS stars, you'll conduct a draft where you and your competitors in your league take turns picking the players you want to form your team.</p>

          <p>You'll be picking the following positions:</p>

          <p>7 Starters:</p>
          <p>1 Top</p>
          <p>1 Jungler</p>
          <p>1 Mid</p>
          <p>1 AD Carry</p>
          <p>1 Support</p>
          <p>1 Flex player (an extra starter; can be a player from any position)</p>
          <p>1 Team (like Dignitas or Fnatic)</p>
          <p>3 Alternate players who can sub for a Starter</p>
          <p>You can have a maximum of 2 players of the same position (you can't draft 3 Mids or 3 Teams). You'll earn points each week based on how well your Starters do.</p>
      </div>
    )
  }
}

export default HomePage
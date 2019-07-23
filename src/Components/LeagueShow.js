import React from 'react'
import Draft from './Draft'
class LeagueShow extends React.Component{
  
  state = {
    drafted: false
  }

  render(){
    return(
      <div>
        {this.state.drafted && !this.props.currentUser ? null : <Draft currentUser={this.props.currentUser} leagueId={this.props.match.params.leagueId}/>}
      </div>
    )
  }
}

export default LeagueShow
import React from 'react'
import Draft from './Draft'
import Matchup from './Matchup'
class LeagueShow extends React.Component{
  
  state = {
    drafted: false
  }

  finishDraft = (num) => {
    if (num >= 20) {
      this.setState({drafted: true})
    }
  }
  render(){
    return(
      <div>
        {this.state.drafted && this.props.currentUser ? null : <Draft finishDraft={this.finishDraft}currentUser={this.props.currentUser} getCurrentUser={this.props.getCurrentUser} leagueId={this.props.match.params.leagueId}/>}
        {this.state.drafted ? <Matchup leagueId={this.props.match.params.leagueId}/> : null}
      </div>
    )
  }
}

export default LeagueShow


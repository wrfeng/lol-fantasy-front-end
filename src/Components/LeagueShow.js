import React from 'react'
import Draft from './Draft'
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
        {this.state.drafted ? null : <Draft finishDraft={this.finishDraft}currentUser={this.props.currentUser} leagueId={this.props.match.params.leagueId}/>}
        {this.state.drafted ? <div>hi</div> : null}
      </div>
    )
  }
}

export default LeagueShow
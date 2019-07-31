import React from 'react'
import { Link } from 'react-router-dom'

class LeaguesList extends React.Component{
  

  render(){
    // const myLeagues = this.props.leagues.filter(league => league.attributes.users[0].id === this.props.currentUserId)
    // myLeagues.map(league => )
    

    const leagues = this.props.leagues.map((league, idx) => {
      const leagueId = league.id
      return <div key={league.id} onClick={() => this.props.selectLeague(leagueId)}>
        {league.attributes.drafted && league.attributes.users.find(user => user.id === this.props.currentUser.id) ? <div> <Link to={{ pathname: `/leagues/${leagueId}`, state: { myDraftedId: league.attributes.drafted_teams[0].id, theirDraftedId: league.attributes.drafted_teams[1].id } }}>{this.props.leagues[idx].attributes.name}</Link> </div>: null}
        {!league.attributes.drafted && league.attributes.users.find(user => user.id === this.props.currentUser.id) ? <div><Link to={`/draft`}>{this.props.leagues[idx].attributes.name}</Link> </div> : null }
        
        </div>
    })
    return(
      <div>
        {leagues}
      </div>
    )
  }
}


export default LeaguesList


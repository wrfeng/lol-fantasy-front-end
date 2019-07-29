import React from 'react'

class LeagueForm extends React.Component{
  state = {
    league_name: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({league_name: ''})
    this.props.createLeague(this.state)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input name="league_name" value={this.state.league_name} onChange={this.handleChange} placeholder="league name..." />
        <input type="submit" value="Create" />
      </form>
    )
  }
}

export default LeagueForm
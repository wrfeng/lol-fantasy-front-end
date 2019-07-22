import React from 'react';
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'
import SignupPage from './Components/SignupPage'
import { Switch, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    username: ''
  }

  redirect = (page) => {
    this.setState({ page: page })
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3001/profile', {
        headers: {
          Authorization: localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(profileInfo => this.setState({ username: profileInfo.username }))
    } 
  }


  render(){
    return(
      <Switch>
        <Route exact path='/' render={() => <HomePage username={this.state.username} />}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/signup' component={SignupPage}/>
      </Switch>
    )
  }
}

export default App;

// switch (this.state.page) {
//   case 'login':
//     return < LoginPage redirect={this.redirect} />
//   case 'home':
//     return < HomePage />
//   case 'signup':
//     return <SignupPage redirect={this.redirect} />
// }
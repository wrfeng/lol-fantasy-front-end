import React from 'react';
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'

class App extends React.Component {
  state = {
    page: 'login'
  }

  redirect = (page) => {
    this.setState({ page: page })
  }

  componentDidMount() {
    if (localStorage.token) {
      this.redirect('home')
    }
  }

  render(){
    switch(this.state.page) {
      case 'login':
        return < LoginPage redirect={this.redirect}/>
      case 'home':
        return < HomePage />
    }
  }
}

export default App;

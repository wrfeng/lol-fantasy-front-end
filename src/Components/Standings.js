import React from 'react'

class Standings extends React.Component{
  render(){
    let myPoints = []
    let theirPoints = []
    let wins = 0
    let losses = 0

    this.props.myPoints.forEach(week => myPoints.push(week.reduce((accu, curr) => accu + curr).toFixed(2)))
    this.props.theirPoints.forEach(week => theirPoints.push(week.reduce((accu, curr) => accu + curr).toFixed(2)))
    
    for (let i = 1; i < myPoints.length; i++) {
      myPoints[i] > theirPoints[i] ? wins += 1: losses += 1
    }
    return(
      <div>
        <h1>Standings</h1>
        <h2>{this.props.currentUser.username}</h2>
        <p>{`${wins} - ${losses}`}</p>
        <h2>CPU</h2>
        <p>{`${losses} - ${wins}`}</p>
      </div>
    )
  }
}

export default Standings
import React, { Component } from 'react';
import './styles/App.css';

import Header from './components/Header';
import Main from './components/Main'
import firebase from './components/firebase';
class App extends Component {
  constructor() {
    super()

    this.state = {
      employeeName: '',
      employeeEmail: '',
      weekDays: [],
    }
  }

  // Getting data from child component state and setting it to parent's state 🤙 and then after setting saving it to real time data base FIREBASE 🔥
  updateState = (e, nameEmployee, emailEmployee, daysOfWeek) => {
    e.preventDefault()
    this.setState({
      employeeName: nameEmployee,
      employeeEmail: emailEmployee,
      weekDays: [daysOfWeek]
    }, () => {
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
    });
  }


  render() {
    return (
      <div className="App">
        <Header></Header>
        <Main updateParentState={this.updateState} ></Main>
        <div className='wrapper'>
          <div className='timeCard'>
            <h3>Time Card</h3>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

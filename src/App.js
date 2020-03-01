import React, { Component } from 'react';
import './styles/App.css';

import { Motion, spring } from 'react-motion';
import axios from 'axios';

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
      cardInfo: [],
    }
  }

  // Getting data from child component state and setting it to parent's state 🤙 and then after setting saving it to real time data base FIREBASE 🔥
  updateState = (e, nameEmployee, emailEmployee, daysOfWeek) => {
    e.preventDefault()
    this.setState({
      employeeName: nameEmployee,
      employeeEmail: emailEmployee,
      weekDays: daysOfWeek
    }, () => {
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
    });
  }

  componentDidMount() {
    const dbref = firebase.database().ref()
    dbref.on('value', (response) => {
      const timeCardData = response.val();
      console.log(timeCardData);

      const stateToBeSet = [];

      for (let key in timeCardData) {
        const timeCardInfo = {
          key: key,
          allData: timeCardData[key],
        }
        stateToBeSet.push(timeCardInfo)
      }
      console.log(stateToBeSet);
      this.setState({
        cardInfo: stateToBeSet,
      })
    })

    const apiKey = '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';

    // axios({
    //   url: 'https://api.sendgrid.com/v3/mail/send',
    //   method: 'POST',
    //   responseType: 'json',
    //   params: {
    //     key: apiKey,
    //   },
    //   body: {
    //     "personalizations": [{ "to": [{ "email": `${timeCardData}`, "name": "test" }], "subject": "Hello, Naveen!" }],

    //     "content": [{ "type": "text/plain", "value": "Heya!" }],

    //     "from": { "email": "naveenmalhotra05@gmail.com", "name": "NAV" }
    //   }
    // })
  }

  removeCard = (toykey) => {
    const dbRef = firebase.database().ref();
    dbRef.child(toykey).remove();
  }

  sendEmail = () => {
    this.state.cardInfo.map((eachCard, index) => {
      console.log(eachCard.allData.employeeEmail);
    })}

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Main updateParentState={this.updateState} ></Main>

        <Motion defaultStyle={{ x: -500, opacity: 0 }} style={{ x: spring(0), opacity: spring(1) }}>
          {(style) => (

            <div className='wrapper mainContainer' style={{ transform: `translateX(${style.x}px)`, opacity: style.opacity }}>
              <div className='timeCardsArea'>
                {
                  this.state.cardInfo.map((eachCard, index) => {
                    return (
                      <div className='timeCard' key={eachCard.key}>
                        <h3>{eachCard.allData.employeeName}</h3>
                        <div className='allDays'>
                          {
                            eachCard.allData.weekDays.map((day, i) => {
                              return (
                                <li key={i}>{day}</li>
                              )
                            })
                          }
                        </div>
                        <button className='emailButton' href={`mailto:${eachCard.allData.employeeEmail}`} onClick={this.sendEmail} >Dynamic Email Button</button>
                        <button className='deleteCard' onClick={() => { this.removeCard(eachCard.key) }}>Delete!</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )}
        </Motion>
      </div>
    );
  }
}

export default App;

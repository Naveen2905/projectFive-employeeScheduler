import React, { Component } from 'react';
import './styles/App.css';

import { Motion, spring } from 'react-motion';
import axios from 'axios';
import schedule from './assets/noun_schedule_346777.png'
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

  }

  removeCard = (toykey) => {
    const dbRef = firebase.database().ref();
    dbRef.child(toykey).remove();
  }

  sendEmail = (e) => {
    const emailValue = e.target.value;
    console.log(emailValue);

    // axios({
    //   url: `https://api.sendgrid.com/v3/mail/send`,
    //   method: `POST`,
    //   responseType: `json`,
    //   params: {
    //     key: `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`
    //   },
    //   data: {
    //     "personalizations": [
    //         {
    //             "to": [
    //                 {
    //                     "email": "naveenmalhotra05@gmail.com",
    //                     "name": "test"
    //                 }
    //             ],
    //             "subject": "Hello, Naveen!"
    //         }
    //     ],
    //     "content": [
    //         {
    //             "type": "text/plain",
    //             "value": "Heya!"
    //         }
    //     ],
    //     "from": {
    //         "email": "naveenmalhotra05@gmail.com",
    //         "name": "nav "
    //     }
    // },
    // })

    // fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': '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',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(
    //     { "personalizations": [{ "to": [{ "email": "naveenmalhotra05@gmail.com" }], "subject": "Hello, World!" }], "from": { "email": "naveenmalhotra05@gmail.com" }, "content": [{ "type": "text/plain", "value": "Hello, World!" }] }
    //   ),
    // })

  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Main updateParentState={this.updateState} ></Main>



        <div className='wrapper mainContainer'>
          <div className='timeCardsArea'>
            {
              this.state.cardInfo.map((eachCard, index) => {
                return (
                  <Motion defaultStyle={{ y: -500, opacity: 0 }} style={{ y: spring(0), opacity: spring(1) }}>
                    {(style) => (
                      <div className='timeCard' key={eachCard.key}  style={{ transform: `translateY(${style.y}px)`, opacity: style.opacity }}>
                        <div className='scheduleLogo'><img src={schedule} alt="schedule by Chameleon Design from the Noun Project"/></div>
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
                        <button className='emailButton' href={`mailto:${eachCard.allData.employeeEmail}`} onClick={this.sendEmail} value={`${eachCard.allData.employeeEmail}`} >Dynamic Email Button</button>
                        <button className='deleteCard' onClick={() => { this.removeCard(eachCard.key) }}>Delete!</button>
                      </div>
                    )}
                  </Motion>
                )
              })
            }
          </div>
        </div>

      </div>
    );
  }
}

export default App;

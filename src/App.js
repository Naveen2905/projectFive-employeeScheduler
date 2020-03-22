import React, { Component } from 'react';
import './styles/App.css';
import { Motion, spring } from 'react-motion';
import emailjs from 'emailjs-com';
import schedule from './assets/noun_schedule_346777.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Main from './components/Main'
import firebase from './components/firebase';
import Footer from './components/Footer';
class App extends Component {
  constructor() {
    super()

    this.state = {
      employeeName: '',
      employeeEmail: '',
      weekDays: [],
      cardInfo: [],
      timings: [],
    }
  }

  // Getting data from child component state and setting it to parent's state 🤙 and then after setting saving it to real time data base FIREBASE 🔥
  updateState = (e, nameEmployee, emailEmployee, daysOfWeek, timeInfo) => {
    e.preventDefault()
    this.setState({
      employeeName: nameEmployee,
      employeeEmail: emailEmployee,
      weekDays: daysOfWeek,
      timings: timeInfo,
    }, () => {
      const dbRef = firebase.database().ref();
      dbRef.push(this.state);
    });
  }

  componentDidMount() {
    const dbref = firebase.database().ref()
    dbref.on('value', (response) => {
      const timeCardData = response.val();

      const stateToBeSet = [];

      for (let key in timeCardData) {
        const timeCardInfo = {
          key: key,
          allData: timeCardData[key],
        }
        stateToBeSet.push(timeCardInfo)
      }
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
    console.log(e.target);
    
    this.state.cardInfo.map((card) => {
      console.log(card);

      if (card.allData.employeeEmail === emailValue) {
        const newTimeArray = card.allData.timings
        const newDaysArray = card.allData.weekDays
        const stringTiming = newTimeArray.join(" to ");
        const stringDays = newDaysArray.join(" , ");
        const template_params = {
          "employeeEmail": emailValue,
          "employeeName": e.target.name,
          "timings": stringTiming,
          "weekDays": stringDays.toUpperCase(),
        }
        const service_id = "gmail";
        const template_id = "employeescheduling";
        const user_id = "user_ywdZbo0PJVij42CvYY4oE";
        emailjs.send(service_id, template_id, template_params, user_id)
          .then((response) => {
            toast.success('🤓 SUCCESS! 🤓 Email Sent !!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }, (err) => {
            toast.error('😰 FAILED... 😰', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      }
    })
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
                  <Motion defaultStyle={{ y: -100, opacity: 0.5 }} style={{ y: spring(0), opacity: spring(1) }} key={index}>
                    {(style) => (
                      <div className='timeCard' key={eachCard.key} style={{ transform: `translateY(${style.y}px)`, opacity: style.opacity }}>
                        <div className='scheduleLogo'><img src={schedule} alt="schedule by Chameleon Design from the Noun Project" /></div>
                        <h3>{eachCard.allData.employeeName}</h3>
                        <p className='timingStyle'>{eachCard.allData.timings[0]} - {eachCard.allData.timings[1]}</p>
                        <div className='allDays'>
                          {
                            
                            eachCard.allData.weekDays.map((day, i) => {                          
                              return (
                                <li key={i}>{day}</li>
                              )
                            })
                          }
                        </div>
                        <button className='emailButton' name={`${eachCard.allData.employeeName}`} onClick={this.sendEmail} value={`${eachCard.allData.employeeEmail}`} >Send Email <span aria-label="Nerdy-happy-face" role='img'>🤓</span></button>

                        <button className='deleteCard' onClick={() => { this.removeCard(eachCard.key) }}>Delete!</button>
                      </div>
                    )}
                  </Motion>
                )
              })
            }
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
              className=''
            />
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;

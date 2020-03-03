import React, { Component } from 'react';
import logo from '../assets/logo.png'

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="wrapper">
                    <div className="logoImage">
                        <img src={logo} alt="Employee Scheduling logo" />
                    </div>
                    <h1>Employee Scheduling</h1>
                </div>
            </header>
        )
    }
}

export default Header
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
                </div>
            </header>
        )
    }
}

export default Header
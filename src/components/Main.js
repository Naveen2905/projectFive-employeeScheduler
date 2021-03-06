import React, { Component } from 'react';

import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
class Main extends Component {
    constructor() {
        super()

        this.state = {
            showForm: false,
            nameInput: '',
            emailInput: '',
            days: [],
            time: ['8:00', '5:00'],
        }
    }

    nameHandleChange = (e) => {
        this.setState({
            nameInput: e.target.value,
        })
    }

    emailHandleChange = (e) => {
        this.setState({
            emailInput: e.target.value,
        })
    }

    onCheckChange = e => {
        const set = new Set(this.state.days);
        e.target.checked ? set.add(e.target.name) : set.delete(e.target.name);
        this.setState({ days: [...set] });
    }

    updateParentState = (e) => {
        this.props.updateParentState(e, this.state.nameInput, this.state.emailInput, this.state.days, this.state.time);

        this.setState({
            showForm: false,
            nameInput: '',
            emailInput: '',
        })
    }

    onTimeChange = time => this.setState({ time })

    showForm = () => {

        return (
            <div className='wrapper'>
                <form action="submit" className="employeeForm" onSubmit={this.handleFormSubmit}>
                    <input type="text" placeholder="Employee Name" onChange={this.nameHandleChange} value={this.state.nameInput} required />

                    <input type="email" placeholder="Email Address" onChange={this.emailHandleChange} value={this.state.emailInput} required />

                    <div>
                        <TimeRangePicker className={"timePicker"} clockIcon={null} format={"hh:mm a"} onChange={this.onTimeChange}
                            value={this.state.time}
                        />
                    </div>
                    <div className='labelContainer'>
                        <input type="checkbox" id="monday" name="monday" onChange={this.onCheckChange} />
                        <label htmlFor="monday">Monday </label>

                        <input type="checkbox" id="tuesday" name="tuesday"
                            onChange={this.onCheckChange} />
                        <label htmlFor="tuesday">Tuesday </label>

                        <input type="checkbox" id="wednesday" name="wednesday"
                            onChange={this.onCheckChange} />
                        <label htmlFor="wednesday">Wednesday </label>

                        <input type="checkbox" id="thursday" name="thursday"
                            onChange={this.onCheckChange} />
                        <label htmlFor="thursday">Thursday </label>

                        <input type="checkbox" id="friday" name="friday"
                            onChange={this.onCheckChange} />
                        <label htmlFor="friday">Friday </label>
                    </div>
                    <button type="submit" className='submitData' onClick={this.updateParentState}>Confirm!</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div>
                <section className="wrapper">
                    <button className="addEmployee" onClick={() => this.setState({ showForm: true })}>Add an Employee</button>
                </section>
                {this.state.showForm ? this.showForm() : null}
            </div>
        )
    }
}

export default Main
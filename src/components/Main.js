import React, { Component } from 'react';

class Main extends Component {
    constructor() {
        super()

        this.state = {
            showForm: false,
            nameInput: '',
            emailInput: '',
        }
    }

    nameHandleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            nameInput: e.target.value,
        })
    }

    emailHandleChange = (e) => {
        this.setState({
            emailInput: e.target.value,
        })
    }

    onCheckChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
        })
    }

    showForm = () => {
        return (
            <div>
                <form action="submit" className="employeeForm">
                    <input type="text" placeholder="Employee Name" onChange={this.nameHandleChange} value={this.state.nameInput} />

                    <input type="text" placeholder="Email Address" onChange={this.emailHandleChange} value={this.state.emailInput} />

                    <input type="checkbox" id="monday" name="monday"
                        onChange={this.onCheckChange} />
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

                    <button type="submit">Create Time Card</button>
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
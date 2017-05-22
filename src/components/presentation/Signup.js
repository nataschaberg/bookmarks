import React, { Component } from "react"



class Signup extends Component {
    constructor() {
        super()
        this.state = {
            profile: {}
        }
    }

    signup(event) {
        event.preventDefault()
        let updatedProfile = Object.assign({}, this.state.profile)
        updatedProfile[event.target.name] = event.target.value
        this.setState({
            profile: updatedProfile
        })
    }

    submitSignup(event) {
        event.preventDefault()
        this.props.onRegister(this.state.profile)
    }

    submitLogin(event) {
        event.preventDefault()
        this.props.onLogin(this.state.profile)
    }


    render() {
        return(
            <div>
                <h2><i className="fa fa-home" aria-hidden="true"></i></h2>
                <div className="row 50%">
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="password" name="password" placeholder="Password" />
                    </div>
                </div>
                <div className="row 50%">
                    <div className="11u">
                        <ul className="actions">
                            <li><input type="submit" className="button alt" value="Login" onClick={this.submitLogin.bind(this)}/></li>
                        </ul>
                    </div>
                </div>
                <br />
                <hr />
                <div className="row 50%">
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="text" name="firstName" placeholder="First Name" />
                    </div>
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="text" name="lastName" placeholder="Last Name" />
                    </div>
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="11u">
                        <input onChange={this.signup.bind(this)} type="password" name="password" placeholder="Password" />
                    </div>
                </div>
                <div className="row 50%">
                    <div className="11u">
                        <ul className="actions">
                            <li><input type="submit" className="button alt" value="Join" onClick={this.submitSignup.bind(this)}/></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup

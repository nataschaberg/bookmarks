import React, { Component } from "react"
import { connect } from "react-redux"
import actions from "../../actions"
import { APIManager } from "../../utils"
import { Signup } from "../presentation"

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            link: ""
        }
    }


    componentDidMount() {
        APIManager.get("/account/currentuser", null, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            if(response.profile == null) {
                return
            }
            this.props.currentUserReceived(response.profile)
        })
    }

    submitSignup(user) {
        APIManager.post("/account/register", user, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            this.props.profileCreated(response.profile)
        })
    }

    submitLogin(user) {
        APIManager.post("/account/login", user, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            this.props.currentUserReceived(response.profile)
        })
    }

    updateLink(event) {
        event.preventDefault()
        this.setState({
            link: event.target.value
        })
        // console.log(this.state.bookmark)
    }

    submitLink(event) {
        event.preventDefault()
        const bookmark = {
            profile: this.props.currentUser.id,
            url: this.state.link
        }
        APIManager.post("/api/bookmark", bookmark, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            // console.log("BOOKMARK: ", JSON.stringify(response))
            this.props.bookmarkCreated(response.result)
        })

    }


    logout(event) {
        event.preventDefault()
        APIManager.get("/account/logout", null, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            this.props.currentUserReceived(null)
        })
    }

    render() {
        return(
            <div>
                { (this.props.currentUser == null) ? <Signup onRegister={this.submitSignup.bind(this)} onLogin={this.submitLogin.bind(this)}/> :
                <div>
                    <h2><i className="fa fa-home" aria-hidden="true"></i></h2>
                    <div className="row 50%">
                        <div className="11u">
                            <h2>Hi, {this.props.currentUser.firstName}</h2>
                            <input onChange={this.updateLink.bind(this)} placeholder="www.example.com" type="text" />
                        </div>
                    </div>
                    <div className="row 50%">
                        <div className="11u">
                            <ul className="actions">
                                <li><input type="submit" className="button alt" value="Submit Link" onClick={this.submitLink.bind(this)}/></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row 50%">
                        <div className="11u">
                            <ul className="actions">
                                <a onClick={this.logout.bind(this)} href="#" style={{backgroundColor: "#DF5F6C"}} className="button">Logout</a>
                            </ul>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser
    }
}


const disptachToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
        bookmarkCreated: (bookmark) => dispatch(actions.bookmarkCreated(bookmark))
    }
}


export default connect(stateToProps, disptachToProps)(Admin)

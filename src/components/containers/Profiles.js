import React, { Component } from "react"
import superagent from "superagent"
import { APIManager } from "../../utils"
import actions from "../../actions"
import { connect } from "react-redux"


class Profiles extends Component {

    componentDidMount() {
        APIManager.get("/api/profile", null, (err, response) => {
            if(err) {
                alert(err)
                return
            }
            const results = response.result
            this.props.profilesReceived(results)
        })

    }

    selectProfile(profile, event) {
        event.preventDefault()
        this.props.profileSelected(profile)
    }

    render() {
        const list = this.props.profiles.map((profile, i) => {
            let name = null
            if(this.props.selected == null) {
                name = <a onClick={this.selectProfile.bind(this, profile)} href="#">{ profile.firstName }</a>
            } else if(this.props.selected.id == profile.id) {
                name = <a onClick={this.selectProfile.bind(this, profile)} href="#"><strong style={{color: "#DF5F6C"}}>{ profile.firstName }</strong></a>
            } else {
                name = <a onClick={this.selectProfile.bind(this, profile)} href="#">{ profile.firstName }</a>
            }
            return(
                <div>
                    <li key={profile.id} style={{fontSize:24,marginBottom:5}}> { name } </li>
                </div>
            )
        })

        return(
            <div>
                <h2><i className="fa fa-users" aria-hidden="true"></i></h2>
                <ol>
                    { list }

                </ol>
            </div>
        )
    }
}


const stateToProps = (state) => {
    return {
        profiles: state.profile.list,
        selected: state.profile.selected
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),
        profileSelected: (profile) => dispatch(actions.profileSelected(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Profiles)

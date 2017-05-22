import React, { Component } from "react"
import { APIManager } from "../../utils"
import { connect } from "react-redux"
import actions from "../../actions"

class Bookmarks extends Component {

    componentDidUpdate() {
        const list = this.props.bookmarks[this.props.selected.id]
        if(list != null) {
            return
        } else {
            const params = {profile: this.props.selected.id}
            APIManager.get("/api/bookmark", params , (err, response) => {
                if(err) {
                    alert(err)
                    return
                }
                this.props.bookmarksReceived(response.result, params)
            })
        }
    }

    render() {
        const list = (this.props.selected == null) ? null : this.props.bookmarks[this.props.selected.id]

        return(
            <div>
                <h2><i className="icon fa-paper-plane"></i></h2>
                <ol>
                {
                    (list == null)? null : list.map((bookmark, i) => {
                        return(
            				<div className="row 50%" key={bookmark.id}>
                                <section id="cta" style={{border: "0.5px dashed #64CEFD"}}>
                					<header>
                						<h3>{bookmark.title}</h3>
                                        <h4>{bookmark.description}</h4>
                                        <a href={bookmark.url}>{bookmark.url}</a>
                					</header>
                                </section>
        					</div>
                        )
                    })
                }
                </ol>
            </div>
        )
    }
}

const stateToProps = (state) => {
    return {
        bookmarks: state.bookmarks,
        selected: state.profile.selected
    }
}

const dispatchToProps = (dispatch) => {
    return {
        bookmarksReceived: (bookmarks, params) => dispatch(actions.bookmarksReceived(bookmarks,params))
    }
}


export default connect(stateToProps, dispatchToProps)(Bookmarks)

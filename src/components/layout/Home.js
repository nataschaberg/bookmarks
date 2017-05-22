import React, { Component } from "react"
import { Profiles, Admin, Bookmarks } from "../containers"



class Home extends Component {
    render() {
        return(
            <div id="page-wrapper">
    		    <div id="header">
                    <h1><a href="index.html" id="logo">Share what you read online<em>....with bookmarks</em></a></h1>
                        <section className="wrapper style1">
                            <div className="container">
                                <div className="row 200%">
                                    <div className="3u 12u(narrower)">
                                        <div id="sidebar1">
                                            <section>
                                                <Profiles />
                                            </section>
                                        </div>
                                    </div>

                                    <div className="6u 12u(narrower) important(narrower)">
                                        <div id="content">
                                            <article>
                                                <header>
                                                    <Bookmarks />
                                                </header>
                                            </article>
                                        </div>
                                    </div>

                                    <div className="3u 12u(narrower)">
                                        <div id="sidebar2">
                                            <section>
                                                <Admin/>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                </div>
            </div>
        )
    }
}

export default Home

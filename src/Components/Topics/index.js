import React from "react";
import Rendring from "./Rendering"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"


export default ({ match }) => {
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/redering`} >Rendering With React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/component`} >Component</Link>
                </li>
                <li>
                    <Link to={`${match.url}/prop-v-state`} >Prop vs state</Link>
                </li>
            </ul>
            <Route path={`${match.path}/:topicId`} component={Rendring} />
            <Route path={`${match.path}`} exact render={()=><p>Please select topic</p>} />
        </div>
    )
}




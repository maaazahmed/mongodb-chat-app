import React from "react"



export default ({ match }) => {
    return <h4>{match.params.topicId}</h4>
}
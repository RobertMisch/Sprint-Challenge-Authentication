import React from 'react'

function Joke(props){
    console.log(props)
    return (
        <div>
            {props.data.id}
            {props.data.joke}
        </div>
    )
}

export default Joke
import React from 'react'
import Login from './Login'

const Compiler = ({uId, uname}) => {
    return(
        <div>
            <h1>{uname}</h1>
            <h1>Id {uId}</h1>
        </div>
    )
}
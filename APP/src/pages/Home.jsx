import React from 'react'
import {Link } from 'react-router-dom'

function Home(){
    return(
        <div>
            <button><Link to='/register'>Register</Link></button><br/>
            <button><Link to='/login'>Login</Link></button>
        </div>
    )
}

export default Home;
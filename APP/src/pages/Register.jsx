import React from "react";
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [output, setOutput] = useState(null)

    const register = (e)=> {
        e.preventDefault();
        if(!username || !password){
            setOutput('Username and Password is required!')
        }
        else{
            Axios.post('http://localhost:8000/register',{
                username:username,
                password:password
            }).then(response => {
                setOutput(response.data)
            });
        }
    }

    return(
        <div className="register-container">
            <h1>Register</h1>
            <label>
                Enter Username : <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
            </label><br/>
            <label>
                Enter Password : <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
            </label><br/>
            <button onClick={register}>Submit</button>
            <h1>{output}</h1>
            <p>Go to <Link to='/login'>login</Link></p>
        </div>
        
    )
}

export default Register;
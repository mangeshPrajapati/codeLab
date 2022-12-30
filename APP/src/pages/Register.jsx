import React from "react";
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import "../styles/register.css"

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
        <div class="input-group">
            <h1 className="heading">Register</h1>
            <input type="text" className="input" onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="user-label" >Username</label><br/><br/>
            <input type="text" className="input" onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="user-label" >Password</label>
            <button  className="send-btn" onClick={register}>
                <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                        </svg>
                    </div>
                </div>
                <span>Send</span>
            </button>
            <h1>{output}</h1>
            <p className="redirect">Go to <Link to='/login'>login</Link></p>
        </div>
        
    )
}

export default Register;
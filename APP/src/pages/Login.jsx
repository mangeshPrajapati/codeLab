import React from "react";
import {useState} from 'react'
import Axios from 'axios'
import {Link, redirect} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/register.css'

export var uname = ''
export var uId = 0
function Login(){

    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [output, setOutput] = useState(null)

    var isValid = false
    // var uname = ''
    // var uId = 0
    // const [uname, setUname] = useState('')
    // const [uId, setUid] = useState(0)

    const navigate = useNavigate()

    const login = (e)=> {
        e.preventDefault();
        if(!username || !password){
            setOutput('Username and Password is required!')
        }
        else{
            Axios.post('http://localhost:8000/login',{
                username:username,
                password:password
            }).then(response => {
                //setOutput(response.data)
                console.log(response.data)
                isValid = response.data.isValid;
                uname = response.data.username
                uId = response.data.userId
                
                // setUname(response.data.username);
                // setUid(response.data.userId)
                console.log(isValid)
                console.log(uname)
                console.log(uId)
                
                if(isValid==true){
                    navigate('/dashboard')
                    
                }else{
                    console.log('false value')
                }
            });
        }
    }
    // var name = document.getElementById('uname').value
    // console.log(name)
    return(
        <div class="input-group">
            <h1 className="heading">Login</h1>
            <input required="" type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{setUsername(e.target.value)}}/>
            <label className="user-label">Username</label><br/><br/>
            <input required="" type="text" name="text" autocomplete="off" className="input" onChange={(e)=>{setPassword(e.target.value)}}/>
            <label className="user-label">Password</label>
            <button  className="send-btn" onClick={login}>
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
            <p className="redirect">Go to <Link to='/register'>login</Link></p>
        </div>
        
    )
}

export default Login;
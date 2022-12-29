import React from "react";
import {useState} from 'react'
import Axios from 'axios'
import {Link, redirect} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

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
        <div className="login-form">
            <h1>Login</h1>
            <label>
                Enter Username : <input type="text"  onChange={(e) => {setUsername(e.target.value)}}/>
            </label><br/>
            <label>
                Enter Password : <input type="text" id="id" onChange={(e) => {setPassword(e.target.value)}}/>
            </label><br/>
            <button onClick={login}>Submit</button>
            <h1>{output}</h1>
            <p>Go to <Link to='/register'>Register</Link></p>
            <p id="uname" value={uname}>{uname}</p>
            <p value={uId}>{uId}</p>
            <script>
                var name = document.getElementById('uname').value
                console.log(name)
            </script>
        </div>
        
    )
}

export default Login;
import React from "react";
import {useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/register.css'
import { useEffect } from 'react';


function Login(){

    var uname = ''
    var uId = 0
    var isLog=false
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [output, setOutput] = useState(null)

    var isValid = false

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
                console.log(response.data)
                isValid = response.data.isValid;
                console.log("isValid value comes here"+isValid)
                uname = response.data.username
                uId = response.data.userId
                setOutput(response.data.msg)
                //save in browser
                if(isValid == true){
                    window.localStorage.setItem("username",uname)
                    window.localStorage.setItem("userId",uId)
                    window.localStorage.setItem("isloggedIn",true)
                }
                
                if(isValid===true){
                    navigate('/dashboard')
                    
                }else{
                    console.log('false value')
                }
            });
        }
    }

    isLog = window.localStorage.getItem("isloggedIn")
    useEffect(() => {
        if(isLog){
            navigate('/dashboard')
        }
    }, [])

    return(
        <div className="contain">
            <div className="register">
                <p className="heading">Sign In</p>
                <div className="user_class">                    <i className="fa fa-user icon" />
                    <input className="user_input" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} required/><br/>
                </div>
                <div className="pass_class">
                    <i className="fa fa-key icon" />
                    <input className="user_input" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                </div>
                <div className="btn_class">
                    <button className="btn" onClick={login}>Sing In</button>
                </div>
                <p className="output_field">{output}</p>
                <p>Not a member?<Link to='/register'>Sing Up now</Link></p>
            </div>
            
        </div>
        
    )
}

export default Login;
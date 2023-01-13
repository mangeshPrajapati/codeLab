import React from "react";
import {useState} from 'react'
import { Link} from 'react-router-dom'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../styles/register.css"
import { useEffect } from 'react';

function Register(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [output, setOutput] = useState(null)
    const [insert, setInsert] = useState(false)
    const navigate = useNavigate()

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
                setInsert(response.data.isInsert)
                setOutput(response.data.msg)

                if(insert === true){
                    navigate('/login')
                }
            });
        }
    }

    var isLog = window.localStorage.getItem("isloggedIn")
    useEffect(() => {
        if(isLog){
            navigate('/dashboard')
        }
    }, [])

    return(
        <div className="contain">
            <div className="register">
                <p className="heading">Sign Up</p>
                <div className="user_class">
                    <i className="fa fa-user icon" />
                    <input className="user_input" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}} required/><br/>
                </div>
                <div className="pass_class">
                    {/* <label className="user">Password</label> */}
                    <i className="fa fa-key icon" />
                    <input className="user_input" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                </div>
                <div className="btn_class">
                    <button className="btn" onClick={register}>Sing Up</button>
                </div>
                <p className="output_field">{output}</p>
                <p>Already member?<Link to='/login'>Sing in now</Link></p>
            </div>
            
        </div>
    )
}
//<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
export default Register;
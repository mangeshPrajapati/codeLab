import React, { useState } from 'react'
import {uname, uId} from './Login'
import { useEffect } from 'react'
import './style.css'
import Axios from 'axios'


const Dashboard = () => {
    const [code, setCode] = useState('')
    const [cname, setCname] = useState('')

    //save code with name
    const saveCode = (e) => {
        e.preventDefault()

        Axios.post('http://localhost:8000/save',{
            cname:cname,
            code:code,
            userid:uId
        }).then(response => {
            console.log(response)
        })
        console.table({cname,code, uId}) 
    }

    //view code 
    // const viewCode = () => {
    //     Axios.post('http://localhost:8000/view',{
    //         uId:uId
    //     }).then((response) => {
    //         console.log(response)
    //     })
    // }
    const getData = async () => {
        const result = await fetch("http://localhost:8000/view",{
            method:'get',
            headers:{
                "Content-Type":"application/json"
            }
        }
        )

        const data = await result.json()
        console.log(data)
    }

    useEffect(() => {
        getData();
    }, [])

    console.log(uname)
    console.log(uId)
    return(
        <div>
            <h1>This is dashboard</h1><br/>
            <h1>Name {uname}</h1>
            <h1>Id {uId}</h1>
            <label>file Name </label>
            <input type='text' onChange={(e) => {setCname(e.target.value)}}></input>
            <textarea className='txtarea' onChange={(e) => {setCode(e.target.value)}}></textarea>
            <button onClick={saveCode}>Save</button><br/>
            <button onClick={getData}>getData</button>
        </div>
    )
}

export default Dashboard;
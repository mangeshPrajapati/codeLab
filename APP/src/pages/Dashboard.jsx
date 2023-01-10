import React from 'react'
import '../styles/Home.css'

import { useState } from 'react';
import Editor from "@monaco-editor/react";
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useEffect } from 'react';
import { uId } from './Login';


const Dashboard = () => {
  const [userData, setUserData] = useState([]);
    // State variable to set users source code
  const [userCode, setUserCode] = useState(``);
 
  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");
 
  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");
 
  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);
 
  // State variable to set users input
  const [userInput, setUserInput] = useState("");
 
  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  //name of the code
  const [codeName, setCodeName] = useState("")
 
  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);
  
   
  const options = {
    fontSize: fontSize
  }
  
 
  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return
    }
 
    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: userCode,
      language: userLang,
      input: userInput }).then((res) => {
      setUserOutput(res.data.output);
    }).then(() => {
      setLoading(false);
    })
  }

  //Save Code

  const saveCode = () => {
    if(codeName!=""){
    Axios.post(`http://localhost:8000/save`,{
      cname:codeName,
      code:userCode,
      user_id:uId
    }).then((res)=>{
      console.log(res)
      getData()
    })
  }else{
    alert("Name is Required")
  }
  }

  const getData = async () => {
    const result = await fetch(`http://localhost:8000/view/${uId}`,{
        method:'get',
        headers:{
            "Content-Type":"application/json"
        }
    }
    )

    const data = await result.json()
    
    setUserData(data)
    
}

useEffect(() => {
    getData();
}, [])


//Delete the entry
const deleteData = (id) => {
  Axios.delete(`http://localhost:8000/delete/${id}`
  ).then(response => {
    getData()
  })
}
 
  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  //Code to edit and print on the editor
  const printCode = (id) => {
     console.log(id)
     Axios.get(`http://localhost:8000/getcode/${id}`
     ).then((res) => {
      setUserCode(res.data[0].code)
     })
  }

  //Update the code
  const updateData = (id) =>{
    console.log(userCode)
    Axios.post(`http://localhost:8000/update/${id}`,{
      code:userCode
    }).then((res) => {
      alert(res.data)
    })
  }
  

  //Download file
  const downloadTxtFile = () => {
    if(codeName!=""){
      const element = document.createElement("a");
      const file = new Blob([userCode], {
        type: "text/plain"
      });
      console.log(userLang)
      element.href = URL.createObjectURL(file);
      if(userLang=="python"){
        element.download=`${codeName}.py`
      }else if(userLang=="javascript"){
        element.download=`${codeName}.js`
      }else{
        element.download = `${codeName}.${userLang}`;
      }
      document.body.appendChild(element);
      element.click();
    }else{
      alert("Name is Required!")
    }
  };

  var msg
    if(userLang=="python"){
      msg='# Your First Python Program \nprint("Hello, World")'
    }else if(userLang=="javascript"){
      msg='// Your First Javascript Program \nconsole.log("Hellow World")'
    }else if(userLang=="c"){
      msg='// Your First C Program \n#include <stdio.h>\nint main()\n{\n\tprintf("Hello World");\n\treturn 0;\n}'
    }else if(userLang=="cpp"){
      msg='// Your First C++ Program \n#include <iostream> \nint main() { \n\tstd::cout << "Hello World!"; \n\treturn 0; \n}'
    }

  return (
    <>
    <meta name="viewport" content="width=1024" />
    <div className="App">
      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
        codeName={codeName} setCodeName={setCodeName}
      />
      <div className="main">
      <div className='user-data'><h4>User Data</h4><div className='data-box'>
          <table>
            <thead>
              <tr>
                <th>Sr</th>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {
                userData.map((element, id) => {
                  return(
                    <>
                    <tr>
                        <td scope="row">{id + 1}</td>
                        <td>{element.cname}</td>
                        <td><button className='e-btn' onClick={() => printCode(element.id)}>Edit</button></td>
                        <td><button className='d-btn' onClick={()=>deleteData(element.id)}>Delete</button></td>
                        <td><button className='u-btn' onClick={()=>updateData(element.id)}>Update</button></td>
                      </tr>
                    </>
                  )
                })
                
              }
            </tbody>
          </table>
        </div></div>
        <div className="left-container">
          
          
            <Editor
              options={options}
              height="calc(100vh - 50px)"
              width="100%"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue="#Start Coding..."
              value={msg}
              onChange={(value) => { setUserCode(value) }}
            />
            <button className="run-btn" onClick={() => compile()}>
              Run
            </button>
            <button onClick={downloadTxtFile} className="download-btn">
              Download
            </button>
        </div>
        <div className="right-container">
          <h4>Input:</h4>
          <div className="input-box">
            <textarea id="code-inp" onChange=
              {(e) => setUserInput(e.target.value)}>
            </textarea>
          </div>
          <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }}
                 className="clear-btn">
                 Clear
              </button>
              <button onClick={() => { saveCode() }}
                 className="save-btn">
                 Save
              </button>
              
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
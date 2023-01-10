import React from 'react';
import Select from 'react-select';
import '../styles/Navbar.css';
import {uname} from "../pages/Login"
 
const Navbar = ({userLang, setUserLang, userTheme,
                setUserTheme, fontSize, setFontSize,codeName, setCodeName}) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "javascript", label: "Js" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
    return (
        <>
        <div className="navbar">
            <h1>codeLab</h1>
            <Select options={languages} value={userLang}
                    onChange={(e) => setUserLang(e.value)}
                    placeholder={userLang} />
            <Select options={themes} value={userTheme}
                    onChange={(e) => setUserTheme(e.value)}
                    placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="18" max="30"
                   value={fontSize} step="2"
                   onChange={(e) => { setFontSize(e.target.value)}}/>
            <label className='username'>file Name : </label><input className='codeName' placeholder='file name' onChange={(e) => setCodeName(e.target.value)}></input>
            <h3 className='userName'>{uname}</h3>
            </div>
        </>
    )
}
 
export default Navbar
import logo from './logo.svg';
import './App.css';
import { Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';

function App() {
  const isLogged = window.localStorage.getItem("isLoggedIn")
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Register/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css'
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/signup/Signup';
import Home from './components/home/Home';
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/up' element={<SignUp />} />
          <Route element={<Navbar />}>
            <Route path='/home' element={<Home />} />
            <Route />
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App

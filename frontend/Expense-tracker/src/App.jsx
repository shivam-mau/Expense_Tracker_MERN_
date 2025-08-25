import React from 'react'

import { 
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom'

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';

const App = () => {
  return (
    <div> 
      <Router>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path ="/login" exact element={<Login />} />
          <Route path ="/signup" exact element={<SignUp />} />
          <Route path ="/dashboard" exact element={<Home />} />
          <Route path ="/income" exact element={<Income />} />
          <Route path ="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  //check if the token exist in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard if authenticated, otherwise go to login
  return isAuthenticated ?(<Navigate to="/dashboaed"/>):(<Navigate to="/login"/>);
  
}
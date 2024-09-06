import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Index from './pages/profil';
import Update from './pages/profil/Update';
import Delete from './pages/profil/Delete';
import Signin from './pages/Signin';
import Logout from './pages/Logout';


function App() {
  return (
<React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Signin />}> </Route>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/logout" element={<Logout />}> </Route>
            <Route path="/profil/:userId?" element={<Index />}> </Route>
            <Route path="/profil/update/:userId?" element={<Update />}> </Route>
            {/* <Route path="/profil/delete/:userId?" element={<Delete />}> </Route> */}
          </Routes>
        </Router>
</React.StrictMode>
  )
}

export default App

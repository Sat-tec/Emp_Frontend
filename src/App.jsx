import React from 'react';

import Navbar from './Components/Navbar';  
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddForm from './Components/AddUser';
import EditUser from './Components/EditUser';
import ViewUser from './Components/ViewUser';
// In your main entry file


function App() {

 
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/adduser' element={<AddForm />} />
          <Route exact path='/EditUser/:id' element={<EditUser />} />
          <Route exact path='/ViewUser/:id' element={<ViewUser />} />
        </Routes>
       
      </Router>
    </div>
  )
}

export default App

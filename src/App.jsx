import React from 'react';
import Navbar from './Components/Navbar';  
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './Components/AddEmployee';
import UpdateEmployee from './Components/UpdateEmployee';
import ViewEmployee from './Components/ViewEmployee';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/addEmployee' element={<AddEmployee />} />
          <Route exact path='/editEmployee/:id' element={<UpdateEmployee />} />
          <Route exact path='/viewEmployee/:id' element={<ViewEmployee />} />
        </Routes>
       
      </Router>
    </div>
  )
}

export default App

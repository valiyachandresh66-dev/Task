import React from 'react'
import { BrowserRouter as Router, Route, Routes
} from 'react-router-dom'

import Login from './Component/Login'
import Register from './Component/Register'
import Task from './Component/Task'

const App = () => {
  return (

    <Router>

      <Routes>

        
        <Route path='/' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/task' element={<Task />} />

      </Routes>

    </Router>
  )
}

export default App
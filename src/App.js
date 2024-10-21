import React from 'react';
import {  } from 'antd';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Itempage from './components/pages/Itempage';
import Cartpage from './components/pages/Cartpage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<Itempage />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

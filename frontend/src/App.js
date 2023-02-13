import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { io } from "socket.io-client"

function App() {

  

  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

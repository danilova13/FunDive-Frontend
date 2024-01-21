import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MyDives from './pages/MyDives';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import DiveForm from './pages/DiveForm';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route  path='/' element={<MyDives />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/diveform' element={<DiveForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

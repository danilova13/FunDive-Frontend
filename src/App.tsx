import './App.css';
import Login from './pages/Login';
import MyDives from './pages/MyDives';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import DiveForm from './pages/DiveForm';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequirAuth';

function App() {
  return (
    <div> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>

            {/* private routes we want to protect */}
            <Route  element={<RequireAuth />}> 
              <Route  path='/' element={<MyDives />}/>
              <Route path='diveform' element={<DiveForm/>} /> 
            </Route>
             
          </Route>     
        </Routes>
    </div>
    
    
  );
}

export default App;

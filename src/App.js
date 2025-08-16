import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Weather from './components/Weather';
import { AuthProvider } from "./contexts/authContext"
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/home' element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

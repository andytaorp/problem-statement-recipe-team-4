import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext, AuthContextProvider } from './hooks/useAuthContext'; // Import AuthContextProvider

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user} = useAuthContext();

  return(
    <div className="App">
      <AuthContextProvider> {/* Wrap BrowserRouter with AuthContextProvider */}
        <BrowserRouter>
          <Navbar/>
          <div className='pages'>
            <Routes>
              <Route 
                path='/' 
                element={user ? <Home/> : <Navigate to="/login"/>}
              />
              <Route 
                path='/login' 
                element={!user ? <Login/> : <Navigate to="/"/>}
              />
              <Route 
                path='/signup' 
                element={!user ? <Signup/> : <Navigate to="/"/>}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App;

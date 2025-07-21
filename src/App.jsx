import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Carrito from './components/Carrito';
import DetalledeProducto from './components/DetalledeProductos';
import Login from './components/Login';
import RutaProtegida from './Pages/RutaProtegida';
import { useAuth } from './context/AuthContext';
import GestionProductos from './Pages/GestionProductos';
import './App.css'

function App() {
  const { isAuth, login, role } = useAuth();

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/product/:id"
            element={
            <RutaProtegida>
            <DetalledeProducto />
            </RutaProtegida>
            }
          />

          <Route
            path="/cart"
            element={
              <RutaProtegida>
                <Carrito />
              </RutaProtegida>
            }
          />

          <Route
            path="/login"
            element={<Login setIsAuth={login} />}
          />

          <Route
            path="/admin"
            element={
            <RutaProtegida>
              {role === 'admin' ? <GestionProductos /> : <Navigate to="/" />}
            </RutaProtegida>
  }
/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Carrito from './components/Carrito';
import DetalledeProducto from './components/DetalledeProductos';
import Login from './components/Login';
import RutaProtegida from './Pages/RutaProtegida';
import { useAuth } from './context/AuthContext';
import './App.css'

function App() {
  const { isAuth, login } = useAuth();

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
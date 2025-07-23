import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Carrito from './components/Carrito';
import DetalledeProducto from './components/DetalledeProducto';
import Login from './components/Login';
import RutaProtegida from './Pages/RutaProtegida';
import { useAuth } from './context/AuthContext';
import GestionProductos from './Pages/GestionProductos';
import Footer from './components/Footer';
import './App.css';

function App() {
  const { role } = useAuth();

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 container py-4 content-with-footer">
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
          <Route path="/login" element={<Login />} />
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
      <Footer />
    </div>
  );
}

export default App;

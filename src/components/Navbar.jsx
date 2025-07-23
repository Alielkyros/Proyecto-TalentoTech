import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';
import { useContextoCarrito } from '../Context/ContextoCarrito';

function Navbar() {
const { isAuth, logout, role } = useAuth();
const { cart, clearCart } = useContextoCarrito();

const handleLogout = () => {
    logout();
    clearCart();
    window.location.href = '/'; // Redirige al home
};

return (
    <nav className="navbar navbar-expand bg-dark text-light px-3 d-flex justify-content-between">
    <div className="d-flex gap-3">
        <Link className="nav-link text-light" to="/">Home</Link>
        {isAuth ? (
        <>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
            {role === 'admin' && (
            <Link className="nav-link text-light" to="/admin">Gestionar Productos</Link>
            )}
        </>
        ) : (
        <Link className="nav-link text-light" to="/login">Login</Link>
        )}
    </div>

    <div>
        <Link className="btn btn-outline-light position-relative" to="/cart">
        <FaShoppingCart />
        {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
            </span>
        )}
        </Link>
    </div>
    </nav>
);
}

export default Navbar;

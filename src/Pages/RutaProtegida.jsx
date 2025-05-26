import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function RutaProtegida({ children }) {
const { isAuth } = useAuth();

return isAuth ? children : <Navigate to="/login" />;
}

export default RutaProtegida;
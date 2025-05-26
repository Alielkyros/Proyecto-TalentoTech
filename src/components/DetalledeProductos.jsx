import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from './Product';
import { useContextoCarrito } from '../Context/ContextoCarrito';
import { useNavigate } from 'react-router-dom';

function DetalledeProducto() {
const { id } = useParams();
const [producto, setProducto] = useState(null);
const [error, setError] = useState("");
const { addToCart } = useContextoCarrito();
const navigate = useNavigate();

useEffect(() => {
    fetchProducts()
    .then((products) => {
        const found = products.find((p) => p.id === parseInt(id));
        if (found) setProducto(found);
        else setError("Producto no encontrado");
    })
    .catch(() => setError("Error al cargar el producto"));
}, [id]);

if (error) return <p>{error}</p>;
if (!producto) return <p>Cargando...</p>;

return (
    <div className="card bg-secondary text-light p-4">
    <h2>{producto.title}</h2>
    <img
        src={producto.image}
        alt={producto.title}
        height="250"
        style={{ objectFit: 'contain' }}
    />
    <p className="mt-3">{producto.description}</p>
    <strong>Precio: ${producto.price}</strong>
    <div className="mt-4">
        <button className="btn btn-success me-2" onClick={() => addToCart(producto)}>
        Agregar al carrito
        </button>
        <button className="btn btn-outline-light" onClick={() => navigate('/')}>
        Volver
        </button>
    </div>
    </div>
);
}

export default DetalledeProducto;

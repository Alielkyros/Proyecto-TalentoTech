import { useEffect, useState } from 'react';
import { fetchProducts } from './Product';
import { useContextoCarrito } from '../Context/ContextoCarrito';
import { Link } from 'react-router-dom';

function ListadeProductos() {
const [products, setProducts] = useState([]);
const [error, setError] = useState("");
const { addToCart } = useContextoCarrito();

useEffect(() => {
    fetchProducts()
    .then(setProducts)
    .catch(() => setError("Error al cargar productos"));
}, []);

if (error) return <p>{error}</p>;
if (!products.length) return <p>Cargando productos...</p>;

return (
    <div className="row">
    {products.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
        <div className="card h-100">
            <img
            src={product.image}
            alt={product.title}
            className="card-img-top p-3 rounded"
            height="250"
            style={{ objectFit: 'contain' }}
            />
            <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p>${product.price}</p>

            <Link
                to={`/product/${product.id}`}
                className="btn btn-sm btn-primary me-2"
            >
                Ver detalle
            </Link>

            <button
                className="btn btn-sm btn-success"
                onClick={() => addToCart(product)}
            >
                Agregar al carrito
            </button>
            </div>
        </div>
        </div>
    ))}
    </div>
);
}

export default ListadeProductos;

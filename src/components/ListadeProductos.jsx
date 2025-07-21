import { useEffect, useState } from 'react';
import { fetchProducts } from './Product';
import { useContextoCarrito } from '../Context/ContextoCarrito';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function ListadeProductos() {
const [products, setProducts] = useState([]);
const [error, setError] = useState("");
const { addToCart } = useContextoCarrito();

const [search, setSearch] = useState(""); 
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6; 

useEffect(() => {
    fetchProducts()
    .then(setProducts)
    .catch(() => setError("Error al cargar productos"));
}, []);

if (error) return <p>{error}</p>;
if (!products.length) return <p>Cargando productos...</p>;

  // Filtrar por búsqueda
const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
);

  // Calcular paginación
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

return (
    <div className="container mt-4">
      {/* Barra de búsqueda */}
    <div className="mb-4 input-group">
        <span className="input-group-text bg-dark border-secondary text-light">
        <FaSearch />
        </span>
        <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        className="form-control bg-dark text-light border-secondary"
        />
    </div>

      {/* Productos */}
    <div className="row">
        {displayedProducts.map((product) => (
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
                <h5 className="card-title text-light">{product.title}</h5>
                <p className='text-light'>${product.price}</p>
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

      {/* Paginador */}
    {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-outline-light me-2" onClick={goPrev} disabled={currentPage === 1}>
            <FaArrowLeft /> Anterior
        </button>
        <span className="align-self-center">Página {currentPage} de {totalPages}</span>
        <button className="btn btn-outline-light ms-2" onClick={goNext} disabled={currentPage === totalPages}>
            Siguiente <FaArrowRight />
        </button>
        </div>
    )}
    </div>
);
}

export default ListadeProductos;

import { useContextoCarrito } from '../Context/ContextoCarrito';

function Carrito() {
const { cart, removeFromCart } = useContextoCarrito();

const total = cart.reduce((acc, item) => acc + item.price, 0);

if (!cart.length) return <p className="container mt-4">Carrito vacío.</p>;

return (
    <div className="container mt-4">
    <h2>Mi carrito</h2>
    <ul className="list-group">
        {cart.map((item, i) => (
        <li key={i} className="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
            <img src={item.image} alt={item.title} width="50" height="50" className='me-3 rounded'/>
            <span className="flex-grow-1">${item.title}</span>
            <span className='badge bg-primary'>${item.price.toFixed(2)}</span>
            <button className='btn btn-danger dtn-sm ms-2'
            onClick={()=> removeFromCart(i)}>Eliminar</button>
        </li>
        ))}
    </ul>
    <div className='mt-3 d-flex justify-content-between'>
        <h5>Total: ${total.toFixed(2)}</h5>
        <button className='btn btn-success'>Ir a pagar</button>
    </div>
    </div>
);
}

export default Carrito;

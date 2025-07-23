import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../components/Product';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function GestionProductos() {
const [products, setProducts] = useState([]);
const [form, setForm] = useState({ title: '', price: '', description: '', image: '' });
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
    cargarProductos();
}, []);

const cargarProductos = async () => {
    setLoading(true);
    try {
    const data = await fetchProducts();
    setProducts(data);
    } catch (error) {
    toast.error('Error al cargar productos');
    } finally {
    setLoading(false);
    }
};

const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
};


const validar = () => {
    if (!form.title.trim()) return 'El nombre es obligatorio';
    if (form.description.trim().length < 10) return 'Descripción mínimo 10 caracteres';
    if (parseFloat(form.price) <= 0) return 'El precio debe ser mayor a 0';
    return null;
};


const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validar();
    if (errorMsg) return toast.error(errorMsg);

    try {
    if (editingId) {
        await updateProduct(editingId, form);
        toast.success('Producto actualizado');
    } else {
        await createProduct(form);
        toast.success('Producto agregado');
    }
    setForm({ title: '', price: '', description: '', image: '' });
    setEditingId(null);
    cargarProductos();
    } catch (error) {
    toast.error('Error al guardar');
    }
};

const handleEdit = (prod) => {
    setForm({ title: prod.title, price: prod.price, description: prod.description, image: prod.image });
    setEditingId(prod.id);
};

const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este producto?')) {
    try {
        await deleteProduct(id);
        toast.success('Producto eliminado');
        cargarProductos();
    } catch {
        toast.error('Error al eliminar');
    }
    }
};

return (
    <div className="container mt-4 mb-5">
    <Helmet>
        <title>The Super Store - Panel de Administración</title>
        <meta name='description' content='Administra y gestiona los productos de The Super Store desde este panel de administración.'/>
    </Helmet>
    <ToastContainer />
    <h2 className="mb-4">Gestionar Productos</h2>

    <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
        <input type="text" name="title" value={form.title} onChange={handleChange}
            placeholder="Nombre" className="form-control" />
        </div>
        <div className="mb-2">
        <input type="number" name="price" value={form.price} onChange={handleChange}
            placeholder="Precio" className="form-control" />
        </div>
        <div className="mb-2">
        <input type="text" name="image" value={form.image} onChange={handleChange}
            placeholder="URL de imagen" className="form-control" />
        </div>
        <div className="mb-2">
        <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Descripción" className="form-control" rows="2"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
        {editingId ? 'Actualizar' : 'Agregar'}
        </button>
        {editingId && (
        <button type="button" className="btn btn-secondary ms-2" onClick={() => {
            setEditingId(null); setForm({ title: '', price: '', description: '', image: '' });
        }}>Cancelar</button>
        )}
    </form>

    {loading ? <p>Cargando productos...</p> : (
        <table className="table table-dark table-striped">
        <thead>
            <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {products.map((prod) => (
            <tr key={prod.id}>
                <td><img src={prod.image} alt={prod.title} width="50" /></td>
                <td>{prod.title}</td>
                <td>${prod.price}</td>
                <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(prod)}>
                    <FaEdit />
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>
                    <FaTrash />
                </button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
}

export default GestionProductos;

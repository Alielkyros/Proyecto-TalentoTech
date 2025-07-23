const BASE_URL = 'https://687d7c30918b64224331e8e4.mockapi.io/api/v1/products';

export async function fetchProducts() {
const res = await fetch(BASE_URL);
if (!res.ok) throw new Error("Error al cargar productos");
const data = await res.json();
return data.map(product => ({
    ...product,
    price: parseFloat(product.price) || 0
}));
}

export async function createProduct(data) {
const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error('Error al crear producto');
return res.json();
}

export async function updateProduct(id, data) {
const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error('Error al actualizar producto');
return res.json();
}

export async function deleteProduct(id) {
const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
});
if (!res.ok) throw new Error('Error al eliminar producto');
return res.json();
}
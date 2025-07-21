export async function fetchProducts() {
const res = await fetch('https://687d7c30918b64224331e8e4.mockapi.io/api/v1/productos');
if (!res.ok) throw new Error("Error al cargar productos");
return res.json();
}

export async function createProduct(data) {
const res = await fetch('https://TU-URL-DE-MOCKAPI.com/products', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error('Error al crear producto');
return res.json();
}

export async function updateProduct(id, data) {
const res = await fetch(`https://TU-URL-DE-MOCKAPI.com/products/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error('Error al actualizar producto');
return res.json();
}

export async function deleteProduct(id) {
const res = await fetch(`https://TU-URL-DE-MOCKAPI.com/products/${id}`, {
    method: 'DELETE',
});
if (!res.ok) throw new Error('Error al eliminar producto');
return res.json();
}

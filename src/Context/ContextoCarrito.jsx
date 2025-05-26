import { createContext, useState, useContext, useEffect } from 'react';

const ContextoCarrito = createContext();

export function CartProvider({ children }) {
const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

const addToCart = (product) => {
    setCart(prev => [...prev, product]);
};

const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
};


return (
    <ContextoCarrito.Provider value={{ cart, addToCart, removeFromCart }}>
    {children}
    </ContextoCarrito.Provider>

    
);
}

export const useContextoCarrito = () => useContext(ContextoCarrito);

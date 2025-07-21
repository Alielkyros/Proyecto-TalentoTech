import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("auth") === "true";
});

const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
});

const login = (userRole) => {
    setIsAuth(true);
    setRole(userRole);
    localStorage.setItem("auth", "true");
    localStorage.setItem("role", userRole);
};

const logout = () => {
    setIsAuth(false);
    setRole(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
};

return (
    <AuthContext.Provider value={{ isAuth, role, login, logout }}>
    {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);

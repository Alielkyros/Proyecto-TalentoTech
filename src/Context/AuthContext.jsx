import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [isAuth, setIsAuth] = useState(() => {
return localStorage.getItem("auth") === "true";
});

const login = () => {
    setIsAuth(true);
    localStorage.setItem("auth", "true");
};

const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
};

return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
    {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
const [user, setUser] = useState('');
const [pass, setPass] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();
const { login } = useAuth(); 

const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'Administrador' && pass === 'Admin1234') {
    login('admin'); 
    navigate('/');
    } else if (user === 'Usuario' && pass === 'User1234') {
    login('user'); 
    navigate('/');
    } else {
    setError('Usuario o contraseña incorrectos');
    }
};

return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
    <h2 className="text-center mb-4">Iniciar Sesión</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUser" className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
        />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
        />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
        Ingresar
        </Button>
    </Form>
    </Container>
);
};

export default Login;

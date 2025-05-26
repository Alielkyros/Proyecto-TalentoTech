import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = ({ setIsAuth }) => {
const [user, setUser] = useState('');
const [pass, setPass] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'Alielkyros' && pass === '1234') {
    localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
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
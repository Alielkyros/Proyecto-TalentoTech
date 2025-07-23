import ListadeProductos from '../components/ListadeProductos';
import { Helmet } from 'react-helmet';

function Home() {
return (
    <div className="container mt-4">
    <Helmet>
        <title>The Super Store - Inicio</title>
        <meta name='description' content='Todos los productos de la mejor tienda random'/>
    </Helmet>
    <h1>Lista de Productos</h1>
    <ListadeProductos />
    </div>
);
}

export default Home;
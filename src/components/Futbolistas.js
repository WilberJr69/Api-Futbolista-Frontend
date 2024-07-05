import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Futbolistas = () => {
  const [futbolistas, setFutbolistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchFutbolistas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/futbolista?page=${page}&size=10`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFutbolistas(data.content);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFutbolistas();
  }, [page]);

  if (loading) return <div className="container"><div>Loading...</div></div>;
  if (error) return <div className="container"><div>Error: {error.message}</div></div>;

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Futbolistas</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
              <th>Características</th>
              <th>Posición</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {futbolistas.map(futbolista => (
              <tr key={futbolista.id}>
                <td>{futbolista.id}</td>
                <td>{futbolista.nombres}</td>
                <td>{futbolista.apellidos}</td>
                <td>{formatFecha(futbolista.fechaNacimiento)}</td>
                <td>{futbolista.caracteristicas}</td>
                <td>{futbolista.posicion ? futbolista.posicion.nombre : 'N/A'}</td>
                <td><Link to={`/futbolista/${futbolista.id}`} className="link">Ver Detalles</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handlePreviousPage} disabled={page === 0} className="button">
            Página Anterior
          </button>
          <button onClick={handleNextPage} disabled={page >= totalPages - 1} className="button">
            Página Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Futbolistas;

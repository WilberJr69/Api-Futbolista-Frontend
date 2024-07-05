import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const FutbolistaDetalle = () => {
    const { id } = useParams();
    const [futbolista, setFutbolista] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFutbolista = async () => {
            try {
                const response = await fetch(`http://localhost:4000/futbolista/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Futbolista not found');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                const data = await response.json();
                setFutbolista(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchFutbolista();
    }, [id]);

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    if (loading) return <div className="container"><div>Loading...</div></div>;
    if (error) return <div className="container"><div>Error: {error.message}</div></div>;

    return (
        <div className="container">
            <div className="card">
                <h1>Detalles del Futbolista</h1>
                <p>ID: {futbolista.id}</p>
                <p>Nombres: {futbolista.nombres}</p>
                <p>Apellidos: {futbolista.apellidos}</p>
                <p>Fecha de Nacimiento: {formatFecha(futbolista.fechaNacimiento)}</p>
                <p>Características: {futbolista.caracteristicas}</p>
                <p>Posición: {futbolista.posicion ? futbolista.posicion.nombre : 'N/A'}</p>
            </div>
        </div>
    );
};

export default FutbolistaDetalle;
import React, { useEffect, useState } from 'react';
import '../css/Reservas.css';

const Reservas = () => {
  const [misReservas, setMisReservas] = useState([]);
  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservasEV') || '[]');
    setMisReservas(reservasGuardadas);
  }, []);

  const cancelarReserva = (id) => {
    const nuevasReservas = misReservas.filter(r => r.id !== id);
    setMisReservas(nuevasReservas);
    localStorage.setItem('reservasEV', JSON.stringify(nuevasReservas));
  };

  return (
    <div className="reservas-container">
      <h2 className="reservas-title">Mis Reservas</h2>
      <p className="reservas-subtitle">Gestiona tus puntos de carga programados.</p>

      {misReservas.length === 0 ? (
        <div className="mensaje-vacio">
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '10px' }}></span>
            <h3>No tienes reservas activas</h3>
            <p>Ve al mapa y selecciona un punto de carga para reservar.</p>
        </div>
      ) : (
        <table className="tabla-reservas">
            <thead>
            <tr>
                <th>Ubicación</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Acción</th>
            </tr>
            </thead>
            <tbody>
            {misReservas.map((reserva) => (
                <tr key={reserva.id}>
                <td>
                    <strong>Punto de Carga</strong>
                    <span className="ubicacion-detalle">{reserva.lugar}</span>
                </td>
                <td>{reserva.fecha}</td>
                <td>
                    <span className={`badge badge-${reserva.estado}`}>
                        {reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1)}
                    </span>
                </td>
                <td>
                    <button 
                        className="btn-cancelar" 
                        onClick={() => cancelarReserva(reserva.id)}
                    >
                        Cancelar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      )}
    </div>
  );
};

export default Reservas;
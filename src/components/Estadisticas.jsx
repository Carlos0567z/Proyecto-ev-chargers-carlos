import '../css/Estadisticas.css';

const Estadisticas = () => {
  return (
    <div className="stats-scroll">
      <h2 className="stats-title">Resumen de Actividad</h2>

      <div className="stats-grid">
        
        <div className="card">
          <span className="card-label">CONSUMO TOTAL</span>
          <div className="big-text">145 kWh</div>
        </div>

        <div className="card">
          <span className="card-label">AHORRO ESTIMADO</span>
          <div className="big-text">32 €</div>
          <span className="text-muted">Comparado con Gasolina</span>
        </div>

        <div className="card card-maintenance">
          <h3 className="maintenance-title">Mantenimiento(Simuluación)</h3>
          <p className="maintenance-text">
            El punto "Plaza Mayor" estará cerrado mañana por obras.
          </p>
        </div>

        <div className="card card-wide">
          <h3>Historial de Cargas (Últimos 7 días)</h3>
          
          <p>Gráfica de uso de Cargadores</p>
          
          <div className="chart-labels">
            <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Estadisticas;
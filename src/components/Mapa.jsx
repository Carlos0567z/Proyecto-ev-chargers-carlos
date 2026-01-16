import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../css/Mapa.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon, shadowUrl: iconShadow,
    iconSize: [25, 41], iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = () => {
    const [cargadores, setCargadores] = useState([]);
    
    const [busqueda, setBusqueda] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('TODOS');

    useEffect(() => {
        const API_URL = "https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records?limit=50";
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setCargadores(data.records))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleReservar = (info) => {
        const nuevaReserva = {
            id: Date.now(),
            lugar: info.emplazamie || info.direccion,
            fecha: new Date().toLocaleString(),
            estado: 'activa'
        };
        const reservasActuales = JSON.parse(localStorage.getItem('reservasEV') || '[]');
        localStorage.setItem('reservasEV', JSON.stringify([...reservasActuales, nuevaReserva]));
        alert("Reserva realizada con exito en " + nuevaReserva.lugar);
    };

    const cargadoresFiltrados = cargadores.filter((item) => {
        const info = item.record.fields;
        
        const textoBusqueda = busqueda.toLowerCase();
        const coincideTexto = (info.direccion && info.direccion.toLowerCase().includes(textoBusqueda)) || 
                              (info.emplazamie && info.emplazamie.toLowerCase().includes(textoBusqueda));
        
        const conectorData = info.conector ? info.conector.toUpperCase() : '';
        const coincideTipo = filtroTipo === 'TODOS' || conectorData.includes(filtroTipo);

        return coincideTexto && coincideTipo;
    });

    return (
        <div className="mapa-layout">
        
            <div className="mapa-bloque">
                <MapContainer center={[39.4699, -0.3763]} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        attribution='© OpenStreetMap'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    {cargadoresFiltrados.map((item, i) => {
                        const info = item.record.fields;
                        if (!info.geo_point_2d) return null;
                        
                        const gmapsUrl = `https://www.google.com/maps?q=${info.geo_point_2d.lat},${info.geo_point_2d.lon}`;

                        return (
                            <Marker key={i} position={[info.geo_point_2d.lat, info.geo_point_2d.lon]}>
                                <Popup>
                                    <div className="popup-content">
                                        <h3 className="popup-title">{info.tipo_cargador}</h3>
                                        
                                        <span className="popup-label">Dirección:</span>
                                        <span className="popup-value">{info.emplazamie}</span>
                                        
                                        <div className="popup-grid">
                                            <div>
                                                <span className="popup-label">Conector</span>
                                                <span className="popup-value" style={{fontWeight:'bold'}}>
                                                    {info.conector}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="popup-label">Potencia</span>
                                                <span className="popup-value">{info.potenc_ia}</span>
                                            </div>
                                        </div>

                                        <div className="popup-actions">
                                            <button className="btn-reservar-popup" onClick={() => handleReservar(info)}>
                                                Reservar
                                            </button>
                                            <a href={gmapsUrl} target="_blank" rel="noreferrer" className="btn-gmaps">
                                            Cómo llegar
                                            </a>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            <div className="lista-bloque">
                
                <div className="filtros-container">
                    <h3 className="filtro-titulo">Buscar Puntos</h3>
                    
                    <input 
                        type="text" 
                        placeholder="Calle, zona..." 
                        className="input-busqueda"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <select 
                        className="select-filtro"
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                        <option value="TODOS">Todos los conectores</option>
                        <option value="TIPO 2">Tipo 2 (Mennekes)</option>
                        <p>Prueba de filtros, todos son tipo 2</p>
                    </select>

                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '10px' }}>
                        Encontrados: <strong>{cargadoresFiltrados.length}</strong> puntos
                    </p>
                </div>

                <div className="lista-items">
                    {cargadoresFiltrados.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '20px' }}>
                            No hay resultados con estos filtros.
                        </p>
                    ) : (
                        cargadoresFiltrados.map((item, i) => {
                            const info = item.record.fields;
                            return (
                                <div key={i} className="item-card">
                                    <h4 className="item-titulo">{info.tipo_cargador}</h4>
                                    <span className="item-direccion">{info.emplazamie || info.direccion}</span>
                                    
                                    <div>
                                        <span className="tag-conector">{info.conector || 'Estándar'}</span>
                                        <span className="tag-conector" style={{ marginLeft: '5px', background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }}>
                                            {info.potenc_ia}
                                        </span>
                                    </div>

                                    <button className="btn-lista" style={{ marginTop: '10px' }} onClick={() => handleReservar(info)}>
                                        Reservar Desde Aquí
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
};
export default Mapa;
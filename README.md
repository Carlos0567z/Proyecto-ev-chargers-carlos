# ⚡ Gestor de Cargadores Eléctricos

Este proyecto es una aplicación web desarrollada en **React** que permite la visualización, gestión y reserva de puntos de carga para vehículos eléctricos en la ciudad de Valencia. Utiliza datos reales de Open Data Valencia y ofrece una interfaz amigable para los usuarios de vehículos eléctricos.

---

## 📋 Características Principales

### 1. Mapa Interactivo y Geolocalización
- Visualización de puntos de carga en un mapa interactivo (**Leaflet** + **OpenStreetMap**).
- Marcadores personalizados con información detallada (tipo de conector, potencia, dirección).
- Enlace directo a **Google Maps** para navegar hacia el punto seleccionado.

### 2. Buscador y Filtros Avanzados
- **Buscador de texto:** Filtra puntos de carga por calle, dirección o zona en tiempo real.
- **Filtro por conector:** Permite seleccionar cargadores específicos (Tipo 2, Schuko, CHAdeMO, etc.).
- Panel lateral con lista dinámica de resultados sincronizada con el mapa.

### 3. Gestión de Reservas
- Sistema de reservas simulado con persistencia de datos en **LocalStorage**.
- Panel "Mis Reservas" donde el usuario puede ver sus citas activas y **cancelarlas** si es necesario.
- Estado de las reservas (Activa, Pendiente, Completada).

### 4. Panel de Usuario y Estadísticas
- **Login simulado:** Sistema de autenticación que guarda el correo del usuario y mantiene la sesión activa.
- **Dashboard de estadísticas:** Visualización gráfica del consumo, ahorro estimado y actividad reciente.

---

## 🛠️ Tecnologías Utilizadas

* **React + Vite:** Framework principal para el desarrollo frontend.
* **React Router DOM:** Manejo de rutas y navegación SPA (Single Page Application).
* **React Leaflet:** Integración de mapas interactivos.
* **CSS3:** Estilos modulares y diseño responsivo (CSS Grid y Flexbox).
* **Open Data API:** Consumo de datos públicos del Ayuntamiento de Valencia.

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu ordenador:

1.  **Clonar el repositorio** (o descargar el código):
    ```bash
    git clone [https://github.com/TU_USUARIO/nombre-repo.git](https://github.com/TU_USUARIO/nombre-repo.git)
    cd nombre-repo
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener Node.js instalado y ejecuta:
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Visita la URL que aparece en la terminal (normalmente `http://localhost:5173`).

---

## 📂 Estructura del Proyecto

El código está organizado de manera modular para facilitar su mantenimiento:

```text
src/
├── components/       # Componentes funcionales de React
│   ├── Login.jsx     # Formulario de acceso
│   ├── Mapa.jsx      # Lógica del mapa, marcadores y filtros
│   ├── Reservas.jsx  # Gestión de reservas (LocalStorage)
│   └── Estadisticas.jsx # Dashboard visual
│
├── css/              # Hojas de estilo independientes
│   ├── Login.css
│   ├── Mapa.css
│   ├── Reservas.css
│   └── Estadisticas.css
│
├── App.jsx           # Configuración de Rutas y Estado Global (Usuario)
└── main.jsx          # Punto de entrada de la aplicación

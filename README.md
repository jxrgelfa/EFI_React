# SneakerStore - Examen Final Integrador

Aplicación web desarrollada en **React** que consume información de una **API REST (desarrollada en Python)** de forma asíncrona, aplica enrutamiento con múltiples vistas y gestiona el estado global de la aplicación.

Proyecto correspondiente a la cátedra **Práctica Profesionalizante 1 - JavaScript**, carrera **Técnico Superior en Desarrollo de Software**, ITEC Río Cuarto.
Docente: Valentino Arballo.

---

## 👥 Integrantes
* Jorge Gabriel Fernandez Arballo
* Brisa Alvarez
* Agustin Sosa
* Santiago Bianchi Celi

---

## 📋 Temática y Arquitectura de la Aplicación

La temática elegida es un **e-commerce y catálogo de zapatillas urbanas y deportivas** con panel de administración.

La aplicación consume de forma asíncrona una API externa desarrollada en Python (FastAPI / backend REST) para consultar productos, marcas asociadas y órdenes de compra, permitiendo operaciones completas de lectura, alta con validación y eliminación.

### Requisitos Implementados

1. **R1: Enrutamiento y Navegación (`react-router-dom`)**:
   * **Rutas Base:** Inicio (`/`), Catálogo de productos (`/productos`), Favoritos (`/favoritos`), Panel de administración (`/admin`).
   * **Ruta Dinámica:** Consulta y detalle individual de cada zapatilla según su identificador (`/producto/:id`) utilizando `useParams()`.
   * **Ruta Anidada:** Módulo de administración modularizado mediante subrutas (`/admin/nuevo-producto`, `/admin/pedidos`, `/admin/marcas`) utilizando componentes de diseño con `<Outlet />`.

2. **R2: Consumo de API y Manejo de Estado (`useState` y `useEffect`)**:
   * **Peticiones asíncronas:** Consumo de endpoints REST mediante `fetch` para operaciones de:
     * **Lectura (GET):** Listado paginado de productos con filtros, detalle por ID, marcas y pedidos.
     * **Creación (POST):** Formulario controlado para registrar nuevos productos.
     * **Eliminación (DELETE):** Baja directa de pedidos y marcas.
   * **Estados de carga y error:** Uso de `useState` para gestionar datos, indicadores de carga (`loading`) y captura de errores de conexión (`error`).
   * **Ciclo de vida:** Uso de `useEffect` para sincronizar peticiones al montar componentes y reaccionar a cambios en filtros y paginación.
   * **Validación de formularios:** Control estricto de campos obligatorios, tipos numéricos positivos y longitudes de texto antes del envío.

3. **R3: Gestión de Estado Global con Context API**:
   * Implementación de `createContext` y `useContext` mediante `FavoritesContext`.
   * Permite guardar y remover zapatillas de la lista global de favoritos desde cualquier parte de la aplicación (catálogo, vista de detalle o vista de favoritos) manteniendo la reactividad en tiempo real.

4. **R4: Hosting y Despliegue en Vercel**:
   * Configuración de variables de entorno mediante `VITE_API_URL`.
   * Reglas de reescritura para Single Page Application configuradas en `vercel.json`.

5. **Estilos y Flujo de Trabajo**:
   * Maquetación y estilos aplicados con **Tailwind CSS**.
   * Flujo de trabajo colaborativo basado en la metodología **GitFlow** (`main`, `develop`, ramas temáticas `feature/*` y `fix/*`).

---

## 🚀 Pasos para Ejecutar la Aplicación Localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/jxrgelfa/EFI_React.git
cd EFI_React
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

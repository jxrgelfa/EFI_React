import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

// Layouts
import RootLayout from "./components/layout/RootLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Vistas públicas
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductoDetail";
import Favorites from "./components/Favorite";

// Vistas de administración
import PedidosAdmin from "./pages/PedidosAdmin";
import MarcasList from "./pages/MarcasList";
import AgregarProducto from "./pages/AgregarProducto";

// Vista de inicio del panel de administración
const AdminHome = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
      🛠️ Panel de Administración
    </h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      Selecciona una opción del menú lateral para gestionar pedidos, marcas o registrar nuevos productos.
    </p>
  </div>
);

// Página de error 404
const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-extrabold text-red-500 mb-4">404</h1>
    <p className="text-xl text-gray-700 dark:text-gray-300">Página no encontrada</p>
  </div>
);

export default function App() {
  // Manejo de tema claro/oscuro con estado estándar
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas principales envueltas en RootLayout (Navbar + Footer) */}
          <Route element={<RootLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Catalog />} />
            <Route path="producto/:id" element={<ProductDetail />} />
            <Route path="favoritos" element={<Favorites />} />

            {/* Rutas anidadas bajo AdminLayout utilizando Outlet */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="nuevo-producto" element={<AgregarProducto />} />
              <Route path="pedidos" element={<PedidosAdmin />} />
              <Route path="marcas" element={<MarcasList />} />
            </Route>

            {/* Ruta comodín para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";
import { FavoritesProvider } from "./context/FavoritesContext";
import { UserProvider } from "./context/UserContext";

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

// ─── Placeholders para vistas secundarias ──────────────────────────────────────
const AdminHome = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">🛠️ Panel de Administración</h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      Selecciona una opción del menú lateral para gestionar pedidos, marcas o nuevos productos.
    </p>
  </div>
);

const AdminUsuarios = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">👤 Gestión de Usuarios</h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">Módulo en desarrollo.</p>
  </div>
);

const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-extrabold text-red-500 mb-4">404</h1>
    <p className="text-xl text-gray-700 dark:text-gray-300">Página no encontrada</p>
  </div>
);

// ─── Router principal ──────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <UserProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas bajo RootLayout */}
            <Route element={<RootLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Catalog />} />
              <Route path="producto/:id" element={<ProductDetail />} />
              <Route path="favoritos" element={<Favorites />} />

              {/* Rutas de Administración bajo AdminLayout */}
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="nuevo-producto" element={<AgregarProducto />} />
                <Route path="pedidos" element={<PedidosAdmin />} />
                <Route path="marcas" element={<MarcasList />} />
                <Route path="usuarios" element={<AdminUsuarios />} />
              </Route>

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </UserProvider>
  );
}

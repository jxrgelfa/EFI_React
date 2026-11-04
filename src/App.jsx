import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDarkMode } from "./hooks/useDarkMode";
import RootLayout from "./components/layout/RootLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import PedidosAdmin from "./pages/PedidosAdmin";
import MarcasList from "./pages/MarcasList";

// ─── Placeholders temporales en espera de los compañeros ──────────────────────
// Se reemplazarán directamente por sus componentes cuando realicen la entrega.
const Catalogo           = () => <h1 className="text-3xl font-bold">👟 Catálogo de Productos (en espera de Santiago)</h1>;
const DetalleProducto    = () => <h1 className="text-3xl font-bold">🔍 Detalle del Producto (en espera de Santiago)</h1>;
const Favoritos          = () => <h1 className="text-3xl font-bold">❤️ Favoritos (en espera de Brisa)</h1>;
const AdminNuevoProducto = () => <h1 className="text-3xl font-bold">➕ Nuevo Producto — Formulario (en espera de Brisa)</h1>;
const AdminHome          = () => <h1 className="text-3xl font-bold">🛠️ Panel de Administración (pendiente)</h1>;
const AdminUsuarios      = () => <h1 className="text-3xl font-bold">👤 Gestión de Usuarios (pendiente)</h1>;
const NotFound           = () => <h1 className="text-3xl font-bold text-red-500">404 — Página no encontrada</h1>;

export default function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas bajo RootLayout */}
        <Route element={<RootLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Catalogo />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          <Route path="favoritos" element={<Favoritos />} />

          {/* Rutas de Administración bajo AdminLayout */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="nuevo-producto" element={<AdminNuevoProducto />} />
            <Route path="pedidos" element={<PedidosAdmin />} />
            <Route path="marcas" element={<MarcasList />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

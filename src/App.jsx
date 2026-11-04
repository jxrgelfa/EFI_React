import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import PedidosAdmin from "./pages/PedidosAdmin";
import MarcasList from "./pages/MarcasList";

// ─── Layout ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="bg-black text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-widest uppercase hover:text-gray-300 transition-colors">
          SneakerStore
        </Link>

        {/* Links principales */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className="hover:text-gray-300 transition-colors">
              Catálogo
            </Link>
          </li>
          <li>
            <Link to="/favoritos" className="hover:text-gray-300 transition-colors">
              Favoritos
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-semibold text-white tracking-widest uppercase">SneakerStore</p>
        <p>© {new Date().getFullYear()} SneakerStore. Todos los derechos reservados.</p>
        <ul className="flex gap-4">
          <li><Link to="/productos" className="hover:text-white transition-colors">Catálogo</Link></li>
          <li><Link to="/favoritos" className="hover:text-white transition-colors">Favoritos</Link></li>
          <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
        </ul>
      </div>
    </footer>
  );
}

/**
 * Layout raíz: envuelve todas las rutas públicas con Navbar + Footer.
 * El <Outlet /> renderiza la vista hija activa.
 */
function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ─── Placeholders para los compañeros ─────────────────────────────────────────

const Home            = () => <h1 className="text-3xl font-bold">🏠 Home — Vista principal (pendiente)</h1>;
const Catalogo        = () => <h1 className="text-3xl font-bold">👟 Catálogo de Productos (pendiente)</h1>;
const DetalleProducto = () => <h1 className="text-3xl font-bold">🔍 Detalle del Producto (pendiente)</h1>;
const Favoritos       = () => <h1 className="text-3xl font-bold">❤️ Favoritos (pendiente)</h1>;
const NotFound        = () => <h1 className="text-3xl font-bold text-red-500">404 — Página no encontrada</h1>;

// ─── Admin Layout (con Outlet para subrutas) ───────────────────────────────────

function AdminLayout() {
  const adminLinks = [
    { to: "nuevo-producto", label: "➕ Nuevo Producto" },
    { to: "pedidos",        label: "📦 Pedidos" },
    { to: "marcas",         label: "🏷️ Marcas" },
    { to: "usuarios",       label: "👤 Usuarios" },
  ];

  return (
    <div className="flex gap-8">
      {/* Sidebar Admin */}
      <aside className="w-52 shrink-0">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Panel Admin</h2>
        <nav className="flex flex-col gap-1">
          {adminLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenido de la subruta activa */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// Placeholders restantes
const AdminHome          = () => <h1 className="text-3xl font-bold">🛠️ Panel de Administración (pendiente)</h1>;
const AdminNuevoProducto = () => <h1 className="text-3xl font-bold">➕ Nuevo Producto — Formulario (pendiente)</h1>;
const AdminUsuarios      = () => <h1 className="text-3xl font-bold">👤 Gestión de Usuarios (pendiente)</h1>;

// ─── Router principal ──────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas bajo RootLayout */}
        <Route element={<RootLayout />}>
          <Route index                   element={<Home />} />
          <Route path="productos"        element={<Catalogo />} />
          <Route path="producto/:id"     element={<DetalleProducto />} />
          <Route path="favoritos"        element={<Favoritos />} />

          {/* Rutas de Admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index                 element={<AdminHome />} />
            <Route path="nuevo-producto" element={<AdminNuevoProducto />} />
            <Route path="pedidos"        element={<PedidosAdmin />} />
            <Route path="marcas"         element={<MarcasList />} />
            <Route path="usuarios"       element={<AdminUsuarios />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
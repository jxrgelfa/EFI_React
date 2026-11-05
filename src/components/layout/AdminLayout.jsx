import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const adminLinks = [
    { to: "nuevo-producto", label: "➕ Nuevo Producto" },
    { to: "pedidos", label: "📦 Pedidos" },
    { to: "marcas", label: "🏷️ Marcas" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Admin */}
      <aside className="w-full md:w-56 shrink-0">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Panel Admin
        </h2>
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

      {/* Contenido de la subruta activa mediante Outlet */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

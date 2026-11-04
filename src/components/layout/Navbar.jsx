import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogoIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
  BagIcon,
  SunIcon,
  MoonIcon,
} from "../common/Icons";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
          darkMode
            ? "bg-black text-white border-neutral-800"
            : "bg-white text-black border-gray-200"
        }`}
      >
        <nav className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between relative">
          {/* Izquierda: Menú con icono de 2 líneas + texto "Menu" */}
          <div className="flex-1 flex items-center justify-start">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2.5 hover:opacity-70 transition-opacity focus:outline-none cursor-pointer"
              aria-label="Abrir menú"
            >
              <MenuIcon className="w-5 h-5" />
              <span className="text-sm font-medium tracking-tight select-none">
                Menu
              </span>
            </button>
          </div>

          {/* Centro: Logo geométrico + Título sneakerstore */}
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-opacity hover:opacity-85"
            >
              <LogoIcon className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-105 transition-transform" />
              <span className="text-xl sm:text-2xl font-black tracking-tight uppercase font-sans">
                sneakerstore
              </span>
            </Link>
          </div>

          {/* Derecha: Iconos de acción (Modo claro/oscuro + Lupa + Usuario + Favoritos + Bolsa) */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6">
            {/* Toggle Modo Claro / Oscuro */}
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="hover:opacity-60 transition-opacity p-0.5 focus:outline-none cursor-pointer"
              aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-white hover:text-amber-300 transition-colors" />
              ) : (
                <MoonIcon className="w-5 h-5 text-black hover:text-neutral-600 transition-colors" />
              )}
            </button>

            {/* 1. Lupa / Búsqueda */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:opacity-60 transition-opacity p-0.5 focus:outline-none cursor-pointer"
              aria-label="Buscar productos"
              title="Buscar"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* 2. Usuario / Perfil / Admin */}
            <Link
              to="/admin"
              className="hover:opacity-60 transition-opacity p-0.5"
              aria-label="Mi Cuenta / Panel Admin"
              title="Mi Cuenta"
            >
              <UserIcon className="w-5 h-5" />
            </Link>

            {/* 3. Favoritos / Lista de deseos */}
            <Link
              to="/favoritos"
              className="hover:opacity-60 transition-opacity p-0.5 relative"
              aria-label="Favoritos"
              title="Favoritos"
            >
              <HeartIcon className="w-5 h-5" />
            </Link>

            {/* 4. Bolsa de compra / Pedidos */}
            <Link
              to="/admin/pedidos"
              className="hover:opacity-60 transition-opacity p-0.5 relative"
              aria-label="Bolsa de compra"
              title="Bolsa de compra"
            >
              <BagIcon className="w-5 h-5" />
            </Link>
          </div>
        </nav>

        {/* Desplegable de búsqueda */}
        {searchOpen && (
          <div
            className={`border-t py-3 px-4 sm:px-8 shadow-sm transition-colors duration-200 ${
              darkMode
                ? "bg-black border-neutral-800 text-white"
                : "bg-white border-gray-100 text-black"
            }`}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-3xl mx-auto flex items-center gap-3"
            >
              <SearchIcon
                className={`w-5 h-5 shrink-0 ${
                  darkMode ? "text-neutral-400" : "text-gray-400"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar zapatillas, marcas o modelos..."
                className={`w-full text-sm sm:text-base outline-none bg-transparent ${
                  darkMode
                    ? "text-white placeholder-neutral-500"
                    : "text-gray-900 placeholder-gray-400"
                }`}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={`text-xs uppercase cursor-pointer ${
                    darkMode ? "text-neutral-400 hover:text-white" : "text-gray-400 hover:text-black"
                  }`}
                >
                  Limpiar
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className={`text-xs font-semibold uppercase tracking-wider ml-2 cursor-pointer ${
                  darkMode ? "text-neutral-400 hover:text-white" : "text-gray-500 hover:text-black"
                }`}
              >
                Cerrar
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Drawer lateral de Navegación activado por "Menu" */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro traslúcido */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel deslizante */}
          <div
            className={`relative w-80 max-w-[85vw] h-full shadow-2xl flex flex-col justify-between p-6 z-10 transition-colors duration-200 ${
              darkMode ? "bg-black text-white border-r border-neutral-800" : "bg-white text-black"
            }`}
          >
            <div>
              {/* Encabezado del menú */}
              <div
                className={`flex items-center justify-between pb-6 border-b ${
                  darkMode ? "border-neutral-800" : "border-gray-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LogoIcon className="w-6 h-6" />
                  <span className="font-bold tracking-tight text-lg uppercase">
                    sneakerstore
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className={`p-1.5 rounded-full transition-colors focus:outline-none cursor-pointer ${
                    darkMode ? "hover:bg-neutral-800 text-neutral-300" : "hover:bg-gray-100 text-gray-600"
                  }`}
                  aria-label="Cerrar menú"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Enlaces de navegación */}
              <nav className="mt-6 flex flex-col gap-4 text-base font-medium">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={`py-1 hover:translate-x-1 transition-all ${
                    darkMode ? "text-neutral-200 hover:text-white" : "text-gray-900 hover:text-black"
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to="/productos"
                  onClick={() => setMenuOpen(false)}
                  className={`py-1 hover:translate-x-1 transition-all ${
                    darkMode ? "text-neutral-200 hover:text-white" : "text-gray-900 hover:text-black"
                  }`}
                >
                  Catálogo de Productos
                </Link>
                <Link
                  to="/favoritos"
                  onClick={() => setMenuOpen(false)}
                  className={`py-1 hover:translate-x-1 transition-all ${
                    darkMode ? "text-neutral-200 hover:text-white" : "text-gray-900 hover:text-black"
                  }`}
                >
                  Mis Favoritos
                </Link>
                <div
                  className={`pt-4 mt-2 border-t ${
                    darkMode ? "border-neutral-800" : "border-gray-100"
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                      darkMode ? "text-neutral-500" : "text-gray-400"
                    }`}
                  >
                    Administración
                  </p>
                  <div className="flex flex-col gap-3 text-sm">
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className={`hover:translate-x-1 transition-all ${
                        darkMode ? "text-neutral-300 hover:text-white" : "text-gray-700 hover:text-black"
                      }`}
                    >
                      Panel de Control
                    </Link>
                    <Link
                      to="/admin/pedidos"
                      onClick={() => setMenuOpen(false)}
                      className={`hover:translate-x-1 transition-all ${
                        darkMode ? "text-neutral-300 hover:text-white" : "text-gray-700 hover:text-black"
                      }`}
                    >
                      Gestión de Pedidos
                    </Link>
                    <Link
                      to="/admin/marcas"
                      onClick={() => setMenuOpen(false)}
                      className={`hover:translate-x-1 transition-all ${
                        darkMode ? "text-neutral-300 hover:text-white" : "text-gray-700 hover:text-black"
                      }`}
                    >
                      Gestión de Marcas
                    </Link>
                  </div>
                </div>
              </nav>
            </div>

            {/* Pie del menú lateral */}
            <div
              className={`pt-6 border-t text-xs ${
                darkMode
                  ? "border-neutral-800 text-neutral-500"
                  : "border-gray-100 text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} SneakerStore. Todos los derechos reservados.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Layout raíz: envuelve todas las rutas públicas con Navbar + Footer.
 * El fondo es blanco puro en modo claro (#FFFFFF) para que las fotos
 * de producto se integren de manera continua y sin cortes (smooth).
 */
export default function RootLayout({ darkMode, setDarkMode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-200 ${
        darkMode ? "bg-black text-neutral-100" : "bg-white text-black"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className={`flex-1 w-full ${isHome ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Layout raíz: envuelve todas las rutas públicas con Navbar.
 */
export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <main className={`flex-1 w-full ${isHome ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"}`}>
        <Outlet />
      </main>
    </div>
  );
}

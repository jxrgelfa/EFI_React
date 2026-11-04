import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm mt-auto border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-semibold text-white tracking-widest uppercase">SneakerStore</p>
        <p>© {new Date().getFullYear()} SneakerStore. Todos los derechos reservados.</p>
        <ul className="flex gap-4">
          <li>
            <Link to="/productos" className="hover:text-white transition-colors">
              Catálogo
            </Link>
          </li>
          <li>
            <Link to="/favoritos" className="hover:text-white transition-colors">
              Favoritos
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFromFavorites, clearFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <div className="max-w-3xl mx-auto pt-12 px-4 w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center text-3xl">
          ❤️
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Tu lista de favoritos está vacía
        </h1>
        <p className="text-gray-500 mt-2 mb-6">
          Explora nuestro catálogo y guarda tus zapatillas preferidas para verlas aquí.
        </p>
        <Link
          to="/productos"
          className="inline-block px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:opacity-85 transition-opacity"
        >
          Explorar catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-6 px-4 w-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Mis Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {favorites.length} {favorites.length === 1 ? "artículo guardado" : "artículos guardados"}
          </p>
        </div>
        <button
          type="button"
          onClick={clearFavorites}
          className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          Vaciar lista
        </button>
      </div>

      {/* Lista de zapatillas favoritas */}
      <ul className="mt-6 flex flex-col gap-4">
        {favorites.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-xs"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-zinc-50 p-2 flex items-center justify-center shrink-0">
                {item.imagen_url ? (
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">Sin foto</span>
                )}
              </div>

              <div>
                <Link
                  to={`/producto/${item.id}`}
                  className="text-base font-semibold text-gray-900 hover:underline line-clamp-1"
                >
                  {item.nombre}
                </Link>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">
                  ${Number(item.precio || 0).toLocaleString("es-AR")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/producto/${item.id}`}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 text-gray-800 hover:bg-zinc-200 transition-colors"
              >
                Ver detalle
              </Link>
              <button
                type="button"
                onClick={() => removeFromFavorites(item.id)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

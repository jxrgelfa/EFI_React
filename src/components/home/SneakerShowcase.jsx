import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../../services/api";
import { FavoritesContext } from "../../context/FavoritesContext";

function HeartButton({ isLiked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
        isLiked
          ? "border-red-400 bg-white"
          : "border-neutral-300 bg-white/70 backdrop-blur-xs hover:scale-110 active:scale-95"
      }`}
      aria-label={isLiked ? "Quitar de favoritos" : "Añadir a favoritos"}
      title={isLiked ? "Quitar de favoritos" : "Guardar en favoritos"}
    >
      <svg
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
          isLiked
            ? "fill-red-500 stroke-red-500"
            : "fill-none stroke-neutral-700 hover:stroke-black"
        }`}
        viewBox="0 0 24 24"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export default function SneakerShowcase() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  const fetchProductos = () => {
    setLoading(true);
    setError(null);
    getProductos()
      .then((data) => {
        // Maneja tanto un array directo como un objeto paginado { items: [...] }
        const lista = Array.isArray(data) ? data : data?.items || [];
        setProductos(lista);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("No se pudo conectar a la API de productos:", err.message);
        setError(err.message || "Error al conectar con el backend de productos");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Obtenemos los primeros 4 productos directamente del backend
  const sneakersToDisplay = productos.slice(0, 4);

  return (
    <section className="w-full pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera sección: Título + subcategoría */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            Novedades
          </h2>
          <div className="flex items-center gap-6 mt-1 text-xs sm:text-sm font-medium">
            <span className="border-b-2 border-black pb-0.5 text-black">
              Destacados
            </span>
            <Link
              to="/productos"
              className="text-neutral-500 hover:text-black transition-colors"
            >
              Ver todo &rarr;
            </Link>
          </div>
        </div>

        {/* Estado de Carga (Skeletons) */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col animate-pulse">
                <div className="aspect-square w-full bg-neutral-100 rounded-lg" />
                <div className="mt-3 h-4 bg-neutral-100 rounded w-3/4" />
                <div className="mt-2 h-4 bg-neutral-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Estado de Error */}
        {!loading && error && (
          <div className="py-12 px-6 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-xl max-w-lg mx-auto">
            <p className="text-sm font-medium text-neutral-800 mb-1">
              No se pudieron cargar los productos desde el backend
            </p>
            <p className="text-xs text-neutral-500 mb-4">{error}</p>
            <button
              type="button"
              onClick={fetchProductos}
              className="px-4 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:opacity-85 transition-opacity cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Estado Sin Productos */}
        {!loading && !error && sneakersToDisplay.length === 0 && (
          <div className="py-12 px-6 text-center bg-neutral-50 border border-dashed border-neutral-200 rounded-xl">
            <p className="text-sm text-neutral-500">
              No hay productos cargados en el backend actualmente.
            </p>
          </div>
        )}

        {/* Grilla de productos traídos directo del backend */}
        {!loading && !error && sneakersToDisplay.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {sneakersToDisplay.map((sneaker) => {
              const isLiked = isFavorite(sneaker.id);
              const title = sneaker.nombre || "Zapatilla";

              return (
                <div key={sneaker.id} className="group flex flex-col relative">
                  {/* Botón flotante de favoritos */}
                  <div className="absolute top-2 right-2 z-20">
                    <HeartButton
                      isLiked={isLiked}
                      onToggle={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(sneaker);
                      }}
                    />
                  </div>

                  <Link
                    to={`/producto/${sneaker.id}`}
                    className="flex flex-col flex-1 focus:outline-none"
                    aria-label={`Ver ${title}`}
                  >
                    {/* Espacio de la foto */}
                    <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden bg-neutral-50 rounded-lg">
                      {sneaker.imagen_url ? (
                        <img
                          src={sneaker.imagen_url}
                          alt={title}
                          className="w-full h-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105 select-none"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs text-neutral-400">Sin foto</span>
                      )}
                    </div>

                    {/* Título y Precio */}
                    <div className="mt-3 flex flex-col">
                      <h3 className="text-xs sm:text-sm font-normal text-neutral-900 leading-snug line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-900 mt-1 tracking-tight">
                        ${sneaker.precio}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

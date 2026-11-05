import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getProductos, getMarcas } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";
import FilterBar from "../components/FilterBar";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para paginacion y filtros
  const [page, setPage] = useState(1);
  const [marcaFiltro, setMarcaFiltro] = useState("");

  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  // Carga de marcas para la barra de filtros
  useEffect(() => {
    getMarcas()
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.items || [];
        setMarcas(items);
      })
      .catch((err) => {
        console.warn("No se pudieron cargar las marcas:", err.message);
      });
  }, []);

  // Carga de productos ante cambios de página o filtro de marca
  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = { page };
    if (marcaFiltro) {
      params.marca_id = marcaFiltro;
    }

    getProductos(params)
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.items || [];
        setProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar los productos");
        setLoading(false);
      });
  }, [page, marcaFiltro]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl font-bold text-gray-500 animate-pulse">
          Cargando catálogo de zapatillas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Hubo un problema</h2>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setError(null);
            getProductos({ page, marca_id: marcaFiltro })
              .then((data) => {
                const items = Array.isArray(data) ? data : data?.items || [];
                setProducts(items);
                setLoading(false);
              })
              .catch((e) => {
                setError(e.message);
                setLoading(false);
              });
          }}
          className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:opacity-85"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-6 px-4">
      <FilterBar
        page={page}
        setPage={setPage}
        marcaFiltro={marcaFiltro}
        setMarcaFiltro={setMarcaFiltro}
        marcas={marcas}
      />

      {products.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-xl mt-6">
          <p className="text-gray-500 text-sm">
            No se encontraron productos para los filtros seleccionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => {
            const liked = isFavorite(product.id);
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-xs transition-shadow hover:shadow-md"
              >
                {/* Botón de favoritos */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                    liked
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white/80 hover:scale-110"
                  }`}
                  aria-label={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                  title={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                >
                  <svg
                    className={`w-4 h-4 transition-colors ${
                      liked
                        ? "fill-red-500 stroke-red-500"
                        : "fill-none stroke-gray-600"
                    }`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                {/* Contenido clickeable hacia el detalle */}
                <Link to={`/producto/${product.id}`} className="flex flex-col flex-1">
                  <div className="aspect-square w-full rounded-lg bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
                    {product.imagen_url ? (
                      <img
                        src={product.imagen_url}
                        alt={product.nombre}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Sin foto</span>
                    )}
                  </div>

                  <div className="mt-3 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {product.nombre}
                    </h3>
                    <p className="mt-1 text-base font-extrabold text-emerald-600">
                      ${Number(product.precio).toLocaleString("es-AR")}
                    </p>
                  </div>
                </Link>

                {/* Botón Ver Producto */}
                <Link
                  to={`/producto/${product.id}`}
                  className="mt-4 w-full text-center py-2 px-3 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:opacity-85 transition-opacity"
                >
                  Ver detalle
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

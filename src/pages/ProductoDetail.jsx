import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoById } from "../services/api";
import { FavoritesContext } from "../context/FavoritesContext";

export default function ProductDetail() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(null);

    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        setLoading(true);
        setError(null);
        setNotFound(false);

        getProductoById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.message && err.message.includes("404")) {
                    setNotFound(true);
                } else {
                    setError(err.message || "Error al cargar el producto");
                }
                setLoading(false);
            });
    }, [id]);

    // 1. Estado de carga
    if (loading) {
        return (
            <div className="py-20 text-center">
                <p className="text-2xl font-bold text-gray-400 animate-pulse">
                    Cargando zapatilla...
                </p>
            </div>
        );
    }

    // 2. Estado de Producto No Encontrado (404)
    if (notFound) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <h2 className="text-3xl font-extrabold text-red-500 mb-2">
                    Producto no encontrado
                </h2>
                <p className="text-zinc-400 mb-6">
                    La zapatilla con ID #{id} no existe o fue eliminada de la base de datos.
                </p>
                <Link
                    to="/productos"
                    className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
                >
                    ← Volver al catálogo
                </Link>
            </div>
        );
    }

    // 3. Estado de Error general
    if (error) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <h2 className="text-2xl font-bold text-red-500 mb-2">
                    Hubo un problema
                </h2>
                <p className="text-zinc-400 mb-6">{error}</p>
                <Link
                    to="/productos"
                    className="inline-block px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-white font-medium transition-colors"
                >
                    ← Volver al catálogo
                </Link>
            </div>
        );
    }

    const liked = product ? isFavorite(product.id) : false;

    // 4. Vista principal del detalle de la zapatilla
    return (
        <div className="max-w-4xl mx-auto pt-6 px-4 w-full">
            <Link
                to="/productos"
                className="inline-flex items-center text-sm text-indigo-400 hover:underline mb-6"
            >
                ← Volver al catálogo
            </Link>

            <article className="flex flex-col md:flex-row gap-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="w-full md:w-1/2 aspect-square rounded-xl bg-gray-50 dark:bg-zinc-800/60 overflow-hidden flex items-center justify-center p-6 shrink-0">
                    {product?.imagen_url ? (
                        <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-zinc-400 text-sm">Sin imagen</span>
                    )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                {product?.nombre}
                            </h1>

                            {/* Botón flotante para favoritos */}
                            <button
                                type="button"
                                onClick={() => toggleFavorite(product)}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                    liked
                                        ? "border-red-400 bg-red-50 dark:bg-zinc-800"
                                        : "border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                }`}
                                aria-label={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                                title={liked ? "Quitar de favoritos" : "Guardar en favoritos"}
                            >
                                <svg
                                    className={`w-5 h-5 ${
                                        liked
                                            ? "fill-red-500 stroke-red-500"
                                            : "fill-none stroke-gray-600 dark:stroke-gray-300"
                                    }`}
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2 mb-4">
                            ${Number(product?.precio || 0).toLocaleString("es-AR")}
                        </p>

                        {product?.descripcion && (
                            <p className="text-gray-600 dark:text-zinc-300 text-sm mb-6 leading-relaxed">
                                {product.descripcion}
                            </p>
                        )}

                        {product?.talle && (
                            <div className="mb-6">
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-2">
                                    Talles disponibles
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(product.talle) ? product.talle : [product.talle]).map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 border border-gray-200 dark:border-zinc-700"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={() => toggleFavorite(product)}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                liked
                                    ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300"
                                    : "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
                            }`}
                        >
                            <span>{liked ? "❤️ En tus favoritos" : "🤍 Agregar a favoritos"}</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}

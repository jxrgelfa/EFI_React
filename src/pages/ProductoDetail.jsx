import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getProductoById } from "../services/api"

export default function ProductDetail() {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        setNotFound(false)

        getProductoById(id)
            .then((data) => {
                setProduct(data)
                setLoading(false)
            })
            .catch((err) => {
                if (err.message && err.message.includes("404")) {
                    setNotFound(true)
                } else {
                    setError(err.message || "Error al cargar el producto")
                }
                setLoading(false)
            })
    }, [id])

    // 1. Estado de carga
    if (loading) {
        return (
            <div className="py-20 text-center">
                <p className="text-2xl font-bold text-gray-300 animate-pulse">
                    Cargando zapatilla...
                </p>
            </div>
        )
    }

    // 2. Estado de Producto No Encontrado (404 - requisito clave de Santiago)
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
        )
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
        )
    }

    // 4. Vista principal del detalle de la zapatilla
    return (
        <div className="max-w-3xl mx-auto pt-6 px-4 w-full">
            <Link
                to="/productos"
                className="inline-flex items-center text-sm text-indigo-400 hover:underline mb-4"
            >
                ← Volver al catálogo
            </Link>

            <article className="flex flex-col sm:flex-row gap-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg items-center">
                <div className="w-48 h-48 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center p-2 shrink-0">
                    {product?.imagen_url ? (
                        <img
                            src={product.imagen_url}
                            alt={product.nombre}
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-zinc-600 text-sm">Sin imagen</span>
                    )}
                </div>

                <div className="flex-1 w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {product?.nombre}
                    </h1>
                    <p className="text-2xl font-extrabold text-emerald-400 mb-3">
                        ${product?.precio}
                    </p>

                    {product?.descripcion && (
                        <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                            {product.descripcion}
                        </p>
                    )}

                    {product?.talle && (
                        <p className="text-zinc-400 text-xs mb-4">
                            Talle: {Array.isArray(product.talle) ? product.talle.join(", ") : product.talle}
                        </p>
                    )}

                    <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-colors cursor-pointer"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </article>
        </div>
    )
}
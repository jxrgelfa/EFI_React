import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProductos } from "../services/api"
import FilterBar from "../components/FilterBar"

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Estados para paginacion y filtros requeridos para Santiago
    const [page, setPage] = useState(1)
    const [marcaFiltro, setMarcaFiltro] = useState("")

    useEffect(() => {
        setLoading(true)
        setError(null)

        const params = { page }
        if (marcaFiltro) {
            params.marca_id = marcaFiltro
        }

        getProductos(params)
            .then((data) => {
                // Si FastAPI devuelve objeto paginado { items: [...] } o array directo
                const items = Array.isArray(data) ? data : (data?.items ?? [])
                setProducts(items)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message || "Error al cargar los productos")
                setLoading(false)
            })
    }, [page, marcaFiltro])

    if (loading) return <h1 className="text-6xl font-bold">Cargando...</h1>

    if (error) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Hubo un problema</h2>
                <p className="text-gray-400">{error}</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto pt-6 px-4">
            <FilterBar
                page={page}
                setPage={setPage}
                marcaFiltro={marcaFiltro}
                setMarcaFiltro={setMarcaFiltro}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="p-4 bg-zinc-800 rounded">
                        <img src={product.imagen_url} alt={product.nombre} />
                        <h1>{product.nombre}</h1>
                        <p className="mb-2">
                            ${product.precio}
                        </p>
                        <Link
                            to={`/producto/${product.id}`}
                            className="mt-4 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500"
                        >
                            Ver producto
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default function FilterBar({
    page,
    setPage,
    marcaFiltro,
    setMarcaFiltro,
    marcas = []
}) {
    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    const handleNext = () => {
        setPage((prev) => prev + 1)
    }

    const handleMarcaChange = (e) => {
        setMarcaFiltro(e.target.value)
        setPage(1) // Al cambiar filtro siempre volvemos a la pagina 1
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mb-6 bg-zinc-800 rounded-lg border border-zinc-700">
            {/* Filtro por Marca */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <label htmlFor="filtro-marca" className="text-sm font-medium text-zinc-300">
                    Marca:
                </label>
                <select
                    id="filtro-marca"
                    value={marcaFiltro}
                    onChange={handleMarcaChange}
                    className="bg-zinc-900 text-white border border-zinc-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                    <option value="">Todas las marcas</option>
                    {marcas.length > 0 ? (
                        marcas.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.nombre}
                            </option>
                        ))
                    ) : (
                        <>
                            <option value="1">Nike</option>
                            <option value="2">Adidas</option>
                            <option value="3">New Balance</option>
                            <option value="4">Puma</option>
                            <option value="5">Converse</option>
                        </>
                    )}
                </select>
            </div>

            {/* Controles de Paginacion */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={page <= 1}
                    className="px-4 py-1.5 bg-zinc-900 border border-zinc-700 text-white rounded text-sm hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                    ← Anterior
                </button>
                <span className="text-zinc-200 text-sm font-semibold px-2">
                    Página {page}
                </span>
                <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-1.5 bg-zinc-900 border border-zinc-700 text-white rounded text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                    Siguiente →
                </button>
            </div>
        </div>
    )
}
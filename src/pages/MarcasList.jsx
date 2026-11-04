import { useState, useEffect } from "react";
import { getMarcas, deleteMarca } from "../services/api";

export default function MarcasList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMarcas()
      .then((marcas) => {
        const listaMarcas = Array.isArray(marcas) ? marcas : (marcas?.items ?? []);
        setData(listaMarcas);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al conectar con la API");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id, nombre) => {
    const confirmar = window.confirm(`¿Seguro que deseás eliminar la marca "${nombre}"?`);
    if (!confirmar) return;

    deleteMarca(id)
      .then(() => {
        setData(data.filter((marca) => marca.id !== id));
      })
      .catch((err) => {
        alert(`Error al eliminar marca: ${err.message}`);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <h1 className="text-4xl font-bold text-slate-700 animate-pulse">Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-12 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
        <h2 className="font-semibold text-lg mb-1">⚠️ Error al cargar</h2>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Marcas Destacadas</h1>
        <p className="text-sm text-slate-500">Catálogo de marcas oficiales asociadas</p>
      </div>

      {data.length === 0 ? (
        <p className="text-slate-500 text-sm">No hay marcas disponibles.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((marca) => (
            <div
              key={marca.id}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-between"
            >
              <div className="flex flex-col items-center">
                {marca.logo_url ? (
                  <img
                    src={marca.logo_url}
                    alt={marca.nombre}
                    className="w-16 h-16 object-contain mb-3"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 mb-3">
                    {marca.nombre.charAt(0).toUpperCase()}
                  </div>
                )}
                <h3 className="font-semibold text-slate-800">{marca.nombre}</h3>
                <span className="text-xs text-slate-400 mt-0.5">ID: #{marca.id}</span>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(marca.id, marca.nombre)}
                className="mt-4 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
              >
                🗑️ Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
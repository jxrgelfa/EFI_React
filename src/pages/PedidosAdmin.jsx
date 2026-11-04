import { useState, useEffect } from "react";
import { getPedidos, deletePedido } from "../services/api";
import PedidoCard from "../components/PedidoCard";

export default function PedidosAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPedidos()
      .then((pedidos) => {
        const listaPedidos = Array.isArray(pedidos) ? pedidos : (pedidos?.items ?? []);
        setData(listaPedidos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error al conectar con la API");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmar = window.confirm(`¿Seguro que deseás eliminar el pedido #${id}?`);
    if (!confirmar) return;

    deletePedido(id)
      .then(() => {
        setData(data.filter((pedido) => pedido.id !== id));
      })
      .catch((err) => {
        alert(`Error al eliminar pedido: ${err.message}`);
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control: Pedidos</h1>
        <p className="text-sm text-slate-500 mt-1">
          Gestión y seguimiento de órdenes de compra
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm">No hay pedidos registrados en el sistema.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((pedido) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
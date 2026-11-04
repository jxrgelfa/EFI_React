export default function PedidoCard({ pedido, onDelete }) {
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "-";
    return new Date(fechaStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBadgeColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case "entregado":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pendiente":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelado":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Pedido #{pedido.id}
          </span>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getBadgeColor(
              pedido.estado
            )}`}
          >
            {pedido.estado ?? "Sin estado"}
          </span>
        </div>

        <div className="space-y-1.5 mb-4 text-sm text-slate-600">
          <p>
            <strong className="text-slate-800">Usuario ID:</strong> {pedido.usuario_id}
          </p>
          <p>
            <strong className="text-slate-800">Fecha:</strong>{" "}
            {formatearFecha(pedido.created_at || pedido.fecha)}
          </p>
          {pedido.total != null && (
            <p className="text-base font-bold text-slate-900 mt-2">
              Total: ${Number(pedido.total).toLocaleString("es-AR")}
            </p>
          )}
          {pedido.items && pedido.items.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500">Ítems:</span>
              <ul className="text-xs text-slate-600 list-disc list-inside mt-1">
                {pedido.items.map((item, idx) => (
                  <li key={idx}>
                    Prod #{item.producto_id} — Cantidad: {item.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={() => onDelete(pedido.id)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-lg transition-colors cursor-pointer"
          title="Eliminar pedido"
        >
          <span>🗑️</span>
          Eliminar
        </button>
      </div>
    </div>
  );
}
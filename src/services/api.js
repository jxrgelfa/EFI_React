const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// --- PRODUCTOS ---

export async function getProductos(params) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  const res = await fetch(`${BASE_URL}/productos${query}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: Error al obtener los productos`);
  }
  return res.json();
}

export async function getProductoById(id) {
  const res = await fetch(`${BASE_URL}/productos/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Error 404: Producto no encontrado");
    }
    throw new Error(`Error ${res.status}: Error al cargar el producto`);
  }
  return res.json();
}

export async function createProducto(data) {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const detail = typeof errorBody.detail === "string" 
      ? errorBody.detail 
      : "Error al agregar el producto";
    throw new Error(detail);
  }

  return res.json();
}

// --- MARCAS ---

export async function getMarcas() {
  const res = await fetch(`${BASE_URL}/marcas/`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: Error al obtener las marcas`);
  }
  return res.json();
}

export async function deleteMarca(id) {
  const res = await fetch(`${BASE_URL}/marcas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: Error al eliminar la marca`);
  }
  return true;
}

// --- PEDIDOS ---

export async function getPedidos() {
  const res = await fetch(`${BASE_URL}/pedidos/`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: Error al obtener los pedidos`);
  }
  return res.json();
}

export async function deletePedido(id) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}: Error al eliminar el pedido`);
  }
  return true;
}

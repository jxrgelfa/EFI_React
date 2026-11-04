/**
 * @file api.js
 * @description Capa centralizada de comunicación con el backend REST.
 *
 * Uso:
 *   import { getProductos, createPedido } from "../services/api";
 *
 * La URL base se lee desde la variable de entorno VITE_API_URL definida
 * en el archivo .env (o .env.local) del proyecto:
 *
 *   VITE_API_URL=http://localhost:8000/api
 *
 * Si la variable no está definida, se usa un string vacío y las rutas
 * relativas funcionarán igual mientras el frontend y backend compartan origen.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

// ─── Utilidad interna ──────────────────────────────────────────────────────────

/**
 * Wrapper sobre fetch que:
 * - Agrega los headers JSON por defecto.
 * - Lanza un error con el status HTTP si la respuesta no es ok.
 * - Devuelve el body ya parseado como JSON.
 *
 * @param {string} endpoint  - Ruta relativa a BASE_URL (ej: "/productos").
 * @param {RequestInit} [options] - Opciones nativas de fetch.
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // TODO: Agregar token de autenticación cuando esté listo el backend.
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    // Intenta extraer el mensaje de error del body; si falla usa el statusText.
    let errorMessage;
    try {
      const errorBody = await response.json();
      errorMessage = errorBody?.message ?? response.statusText;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  // DELETE suele devolver 204 sin body
  if (response.status === 204) return null;

  return response.json();
}

// ─── MARCAS ───────────────────────────────────────────────────────────────────

/** Obtiene todas las marcas. */
export const getMarcas = () => request("/marcas/");

/** Obtiene una marca por ID. */
export const getMarcaById = (id) => request(`/marcas/${id}`);

/** Crea una nueva marca. @param {{ nombre: string, logo_url?: string }} data */
export const createMarca = (data) =>
  request("/marcas", { method: "POST", body: JSON.stringify(data) });

/** Actualiza una marca existente. */
export const updateMarca = (id, data) =>
  request(`/marcas/${id}`, { method: "PUT", body: JSON.stringify(data) });

/** Elimina una marca por ID. */
export const deleteMarca = (id) => request(`/marcas/${id}`, { method: "DELETE" });

// ─── PRODUCTOS ────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los productos.
 * @param {{ marca_id?: number, search?: string, page?: number }} [params]
 */
export const getProductos = (params) => {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return request(`/productos${query}`);
};

/** Obtiene un producto por ID. */
export const getProductoById = (id) => request(`/productos/${id}`);

/**
 * Crea un nuevo producto.
 * @param {{ nombre: string, precio: number, stock: number, descripcion: string, marca_id: number, imagen_url?: string }} data
 */
export const createProducto = (data) =>
  request("/productos", { method: "POST", body: JSON.stringify(data) });

/** Actualiza un producto existente. */
export const updateProducto = (id, data) =>
  request(`/productos/${id}`, { method: "PUT", body: JSON.stringify(data) });

/** Elimina un producto por ID. */
export const deleteProducto = (id) =>
  request(`/productos/${id}`, { method: "DELETE" });

// ─── USUARIOS ─────────────────────────────────────────────────────────────────

/** Obtiene todos los usuarios. */
export const getUsuarios = () => request("/usuarios");

/** Obtiene un usuario por ID. */
export const getUsuarioById = (id) => request(`/usuarios/${id}`);

/**
 * Registra un nuevo usuario.
 * @param {{ nombre: string, email: string, password: string, rol?: string }} data
 */
export const createUsuario = (data) =>
  request("/usuarios", { method: "POST", body: JSON.stringify(data) });

/** Actualiza un usuario existente. */
export const updateUsuario = (id, data) =>
  request(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(data) });

/** Elimina un usuario por ID. */
export const deleteUsuario = (id) =>
  request(`/usuarios/${id}`, { method: "DELETE" });

// ─── PEDIDOS ──────────────────────────────────────────────────────────────────

/** Obtiene todos los pedidos. */
export const getPedidos = () => request("/pedidos/");

/** Obtiene un pedido por ID. */
export const getPedidoById = (id) => request(`/pedidos/${id}`);

/**
 * Crea un nuevo pedido.
 * @param {{ usuario_id: number, items: Array<{ producto_id: number, cantidad: number }> }} data
 */
export const createPedido = (data) =>
  request("/pedidos", { method: "POST", body: JSON.stringify(data) });

/**
 * Actualiza el estado de un pedido.
 * @param {number} id
 * @param {{ estado: "pendiente" | "procesando" | "enviado" | "entregado" | "cancelado" }} data
 */
export const updatePedido = (id, data) =>
  request(`/pedidos/${id}`, { method: "PUT", body: JSON.stringify(data) });

/** Cancela / elimina un pedido por ID. */
export const deletePedido = (id) =>
  request(`/pedidos/${id}`, { method: "DELETE" });

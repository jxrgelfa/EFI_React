/**
 * @file initialData.js
 * @description Datos de prueba que replican la estructura exacta de la base de datos.
 *
 * Úsalos mientras el backend no esté disponible:
 *
 *   import { marcas, productos, usuarios, pedidos } from "../mocks/initialData";
 *
 * Cuando el backend esté listo, reemplaza el import por las funciones de api.js.
 */

// ─── MARCAS ───────────────────────────────────────────────────────────────────

export const marcas = [
  {
    id: 1,
    nombre: "Nike",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    createdAt: "2024-01-10T08:00:00.000Z",
  },
  {
    id: 2,
    nombre: "Adidas",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    createdAt: "2024-01-10T08:05:00.000Z",
  },
  {
    id: 3,
    nombre: "New Balance",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg",
    createdAt: "2024-01-10T08:10:00.000Z",
  },
  {
    id: 4,
    nombre: "Puma",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg",
    createdAt: "2024-01-10T08:15:00.000Z",
  },
  {
    id: 5,
    nombre: "Converse",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg",
    createdAt: "2024-01-10T08:20:00.000Z",
  },
];

// ─── PRODUCTOS ────────────────────────────────────────────────────────────────

export const productos = [
  {
    id: 1,
    nombre: "Nike Air Max 270",
    descripcion:
      "Zapatilla de running con amortiguación Air Max en el talón para máxima comodidad durante todo el día.",
    precio: 129.99,
    stock: 35,
    talle: ["39", "40", "41", "42", "43", "44"],
    color: "Negro/Blanco",
    imagen_url: "https://static.nike.com/a/images/t_PDP_1728_v1/air-max-270.png",
    marca_id: 1,           // Nike
    destacado: true,
    createdAt: "2024-02-01T10:00:00.000Z",
  },
  {
    id: 2,
    nombre: "Nike Air Force 1 '07",
    descripcion:
      "Clásica zapatilla de básquet reconvertida en ícono del streetwear. Cuero premium y suela de goma.",
    precio: 109.99,
    stock: 20,
    talle: ["38", "39", "40", "41", "42", "43"],
    color: "Blanco",
    imagen_url: "https://static.nike.com/a/images/t_PDP_1728_v1/air-force-1.png",
    marca_id: 1,           // Nike
    destacado: false,
    createdAt: "2024-02-03T10:00:00.000Z",
  },
  {
    id: 3,
    nombre: "Adidas Ultraboost 23",
    descripcion:
      "La zapatilla de running más avanzada de Adidas. Entresuela BOOST para una energía de retorno excepcional.",
    precio: 179.99,
    stock: 18,
    talle: ["39", "40", "41", "42", "43", "44", "45"],
    color: "Núcleo Negro",
    imagen_url: "https://assets.adidas.com/images/ultraboost-23.jpg",
    marca_id: 2,           // Adidas
    destacado: true,
    createdAt: "2024-02-05T10:00:00.000Z",
  },
  {
    id: 4,
    nombre: "Adidas Stan Smith",
    descripcion:
      "Zapatilla clásica de tenis con parte superior de cuero y tres franjas laterales perforadas.",
    precio: 89.99,
    stock: 42,
    talle: ["36", "37", "38", "39", "40", "41", "42"],
    color: "Blanco/Verde",
    imagen_url: "https://assets.adidas.com/images/stan-smith.jpg",
    marca_id: 2,           // Adidas
    destacado: false,
    createdAt: "2024-02-07T10:00:00.000Z",
  },
  {
    id: 5,
    nombre: "New Balance 574",
    descripcion:
      "Silueta retro con ENCAP en la entresuela para soporte y amortiguación duraderos.",
    precio: 94.99,
    stock: 27,
    talle: ["39", "40", "41", "42", "43"],
    color: "Gris/Azul Marino",
    imagen_url: "https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i.jpg",
    marca_id: 3,           // New Balance
    destacado: true,
    createdAt: "2024-02-09T10:00:00.000Z",
  },
  {
    id: 6,
    nombre: "Puma RS-X³",
    descripcion:
      "Zapatilla de running reimaginada con capas de materiales y paletas de colores llamativas.",
    precio: 99.99,
    stock: 14,
    talle: ["40", "41", "42", "43", "44"],
    color: "Blanco/Rojo",
    imagen_url: "https://images.puma.com/image/upload/rsx3.jpg",
    marca_id: 4,           // Puma
    destacado: false,
    createdAt: "2024-02-11T10:00:00.000Z",
  },
  {
    id: 7,
    nombre: "Converse Chuck Taylor All Star",
    descripcion:
      "La zapatilla más icónica de todos los tiempos. Lona resistente y suela de goma vulcanizada.",
    precio: 59.99,
    stock: 60,
    talle: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    color: "Negro",
    imagen_url: "https://www.converse.com/dw/image/v2/chuck-taylor.jpg",
    marca_id: 5,           // Converse
    destacado: true,
    createdAt: "2024-02-13T10:00:00.000Z",
  },
];

// ─── USUARIOS ─────────────────────────────────────────────────────────────────

export const usuarios = [
  {
    id: 1,
    nombre: "Jorge Administrador",
    email: "jorge@sneakerstore.com",
    // NUNCA guardes contraseñas reales en mocks. Esto es solo placeholder.
    password_hash: "hashed_password_placeholder",
    rol: "admin",
    avatar_url: null,
    createdAt: "2024-01-15T09:00:00.000Z",
  },
  {
    id: 2,
    nombre: "María García",
    email: "maria.garcia@email.com",
    password_hash: "hashed_password_placeholder",
    rol: "cliente",
    avatar_url: null,
    createdAt: "2024-03-01T11:30:00.000Z",
  },
  {
    id: 3,
    nombre: "Lucas Fernández",
    email: "lucas.fernandez@email.com",
    password_hash: "hashed_password_placeholder",
    rol: "cliente",
    avatar_url: null,
    createdAt: "2024-03-05T14:00:00.000Z",
  },
  {
    id: 4,
    nombre: "Sofía Martínez",
    email: "sofia.martinez@email.com",
    password_hash: "hashed_password_placeholder",
    rol: "cliente",
    avatar_url: null,
    createdAt: "2024-03-10T16:45:00.000Z",
  },
];

// ─── PEDIDOS ──────────────────────────────────────────────────────────────────

/**
 * Estados posibles de un pedido:
 * "pendiente" → "procesando" → "enviado" → "entregado"
 *                                        ↘ "cancelado"
 */
export const pedidos = [
  {
    id: 1,
    usuario_id: 2,          // María García
    estado: "entregado",
    total: 299.98,
    direccion_envio: "Av. Corrientes 1234, CABA, Argentina",
    items: [
      { producto_id: 1, nombre: "Nike Air Max 270",      cantidad: 1, precio_unitario: 129.99 },
      { producto_id: 3, nombre: "Adidas Ultraboost 23",  cantidad: 1, precio_unitario: 179.99 },
    ],
    createdAt: "2024-04-10T15:20:00.000Z",
    updatedAt: "2024-04-14T09:00:00.000Z",
  },
  {
    id: 2,
    usuario_id: 3,          // Lucas Fernández
    estado: "enviado",
    total: 189.98,
    direccion_envio: "San Martín 567, Rosario, Santa Fe, Argentina",
    items: [
      { producto_id: 4, nombre: "Adidas Stan Smith",  cantidad: 1, precio_unitario: 89.99 },
      { producto_id: 7, nombre: "Converse Chuck Taylor", cantidad: 1, precio_unitario: 59.99 },
      { producto_id: 6, nombre: "Puma RS-X³",          cantidad: 1, precio_unitario: 39.99 },
    ],
    createdAt: "2024-04-18T10:00:00.000Z",
    updatedAt: "2024-04-20T12:30:00.000Z",
  },
  {
    id: 3,
    usuario_id: 4,          // Sofía Martínez
    estado: "procesando",
    total: 94.99,
    direccion_envio: "Belgrano 890, Córdoba Capital, Argentina",
    items: [
      { producto_id: 5, nombre: "New Balance 574", cantidad: 1, precio_unitario: 94.99 },
    ],
    createdAt: "2024-04-22T08:45:00.000Z",
    updatedAt: "2024-04-22T09:00:00.000Z",
  },
  {
    id: 4,
    usuario_id: 2,          // María García
    estado: "pendiente",
    total: 109.99,
    direccion_envio: "Av. Corrientes 1234, CABA, Argentina",
    items: [
      { producto_id: 2, nombre: "Nike Air Force 1 '07", cantidad: 1, precio_unitario: 109.99 },
    ],
    createdAt: "2024-04-25T19:10:00.000Z",
    updatedAt: "2024-04-25T19:10:00.000Z",
  },
  {
    id: 5,
    usuario_id: 3,          // Lucas Fernández
    estado: "cancelado",
    total: 99.99,
    direccion_envio: "San Martín 567, Rosario, Santa Fe, Argentina",
    items: [
      { producto_id: 6, nombre: "Puma RS-X³", cantidad: 1, precio_unitario: 99.99 },
    ],
    createdAt: "2024-04-12T14:00:00.000Z",
    updatedAt: "2024-04-13T08:20:00.000Z",
  },
];

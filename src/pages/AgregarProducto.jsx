import { useState, useEffect } from "react";
import { getMarcas, createProducto } from "../services/api";

export default function AgregarProducto() {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    talle: "",
    stock: "",
    marca_id: "",
    imagen_url: "",
  });

  const [marcas, setMarcas] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Cargar lista de marcas para el select desplegable
  useEffect(() => {
    getMarcas()
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.items || [];
        setMarcas(items);
      })
      .catch((err) => {
        console.error("Error al cargar marcas:", err.message);
      });
  }, []);

  // Actualiza los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones del formulario
  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El título es obligatorio";
    }

    if (!form.precio) {
      newErrors.precio = "El precio es obligatorio";
    } else if (Number(form.precio) <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }

    if (!form.talle) {
      newErrors.talle = "El talle es obligatorio";
    } else if (Number(form.talle) <= 0) {
      newErrors.talle = "El talle debe ser mayor a 0";
    }

    if (!form.stock && form.stock !== 0) {
      newErrors.stock = "El stock es obligatorio";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "El stock no puede ser negativo";
    }

    if (!form.marca_id) {
      newErrors.marca_id = "Debes seleccionar una marca";
    }

    return newErrors;
  };

  // Envío del formulario al backend (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const nuevoProducto = {
        nombre: form.nombre.trim(),
        precio: Number(form.precio),
        talle: Number(form.talle),
        stock: Number(form.stock),
        marca_id: Number(form.marca_id),
        imagen_url: form.imagen_url.trim() || null,
        activo: true,
      };

      await createProducto(nuevoProducto);

      setSuccessMessage("¡Producto agregado con éxito a la base de datos!");
      setForm({
        nombre: "",
        precio: "",
        talle: "",
        stock: "",
        marca_id: "",
        imagen_url: "",
      });
    } catch (err) {
      setErrors({ general: err.message || "Error al conectar con la API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Agregar Nuevo Producto
        </h1>
        <p className="text-sm text-gray-500">
          Completa el formulario para registrar una nueva zapatilla en el catálogo.
        </p>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-sm text-center">
          {successMessage}
        </div>
      )}

      {errors.general && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-lg text-sm text-center">
          {errors.general}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-xs space-y-4"
      >
        {/* Título / Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre del modelo *
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Nike Air Max 90"
            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
          />
          {errors.nombre && (
            <p className="text-xs text-rose-600 mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* Precio y Talle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Precio ($) *
            </label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 150000"
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
            />
            {errors.precio && (
              <p className="text-xs text-rose-600 mt-1">{errors.precio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Talle *
            </label>
            <input
              type="number"
              step="0.5"
              name="talle"
              value={form.talle}
              onChange={handleChange}
              placeholder="Ej: 41.5"
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
            />
            {errors.talle && (
              <p className="text-xs text-rose-600 mt-1">{errors.talle}</p>
            )}
          </div>
        </div>

        {/* Marca y Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Marca asociada *
            </label>
            <select
              name="marca_id"
              value={form.marca_id}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
            >
              <option value="">Selecciona una marca</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
            {errors.marca_id && (
              <p className="text-xs text-rose-600 mt-1">{errors.marca_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Stock disponible *
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Ej: 10"
              className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
            />
            {errors.stock && (
              <p className="text-xs text-rose-600 mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* URL de la Imagen */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            URL de la imagen (opcional)
          </label>
          <input
            type="text"
            name="imagen_url"
            value={form.imagen_url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/zapatilla.jpg"
            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-black"
          />
        </div>

        {/* Botón de Guardar */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-opacity cursor-pointer ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:opacity-85"
          }`}
        >
          {loading ? "Guardando en el servidor..." : "Registrar Producto"}
        </button>
      </form>
    </section>
  );
}

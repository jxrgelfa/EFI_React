import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../../services/api";
import { FavoritesContext } from "../../context/FavoritesContext";
import adidasImg from "../../assets/sneakers/ad-campus-negra.jpg";
import nbImg from "../../assets/sneakers/new-balance-530-verdes.webp";
import crocsImg from "../../assets/sneakers/CROCS-SNEAKERS.png";
import vansImg from "../../assets/sneakers/vans-knu.jpg";

/**
 * Zapatillas de respaldo con fotos locales para garantizar que la interfaz
 * nunca quede vacía si la base de datos aún no tiene ítems cargados.
 */
const FALLBACK_SNEAKERS = [
  {
    id: "f-1",
    nombre: 'adidas Originals Campus 00s "Core Black"',
    precio: 179999,
    imagen_url: adidasImg,
  },
  {
    id: "f-2",
    nombre: 'New Balance 530 "White / Olive Green"',
    precio: 195000,
    imagen_url: nbImg,
  },
  {
    id: "f-3",
    nombre: 'Crocs Echo Surge "Atmosphere Grey"',
    precio: 135000,
    imagen_url: crocsImg,
  },
  {
    id: "f-4",
    nombre: 'Vans Knu Skool "Black / White"',
    precio: 149999,
    imagen_url: vansImg,
  },
];

/**
 * Formateador de moneda a Pesos Argentinos (ARS).
 */
function formatCurrency(value) {
  if (typeof value === "number") {
    return `$ ${value.toLocaleString("es-AR")}`;
  }
  if (typeof value === "string") {
    if (value.startsWith("$")) return value;
    const num = parseFloat(value);
    return isNaN(num) ? value : `$ ${num.toLocaleString("es-AR")}`;
  }
  return "-";
}

function HeartButton({ isLiked, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
        isLiked
          ? "border-red-400 bg-white"
          : "border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-black/40 backdrop-blur-xs hover:scale-110 active:scale-95"
      }`}
      aria-label={isLiked ? "Quitar de favoritos" : "Añadir a favoritos"}
      title={isLiked ? "Quitar de favoritos" : "Guardar en favoritos"}
    >
      <svg
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
          isLiked
            ? "fill-red-500 stroke-red-500"
            : "fill-none stroke-neutral-700 dark:stroke-neutral-300 hover:stroke-black dark:hover:stroke-white"
        }`}
        viewBox="0 0 24 24"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export default function SneakerShowcase() {
  const [productos, setProductos] = useState([]);
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    getProductos()
      .then((data) => {
        // Maneja tanto un array directo como un objeto paginado { items: [...] }
        const lista = Array.isArray(data) ? data : data?.items || [];
        setProductos(lista);
      })
      .catch((err) => {
        console.warn("No se pudo conectar a la API de productos:", err.message);
      });
  }, []);

  // Si la API trae productos, toma los primeros 4. Si la base de datos está vacía, usa los de respaldo.
  const sneakersToDisplay =
    productos.length > 0 ? productos.slice(0, 4) : FALLBACK_SNEAKERS;

  return (
    <section className="w-full pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera sección estilo Footdistrict: Título + subcategoría */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Novedades
          </h2>
          <div className="flex items-center gap-6 mt-1 text-xs sm:text-sm font-medium">
            <span className="border-b-2 border-black dark:border-white pb-0.5 text-black dark:text-white cursor-pointer">
              Hombre
            </span>
            <Link
              to="/productos"
              className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              Ver todo &rarr;
            </Link>
          </div>
        </div>

        {/* Grilla de productos: sin recuadros, marcos ni bordes contenedores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {sneakersToDisplay.map((sneaker) => {
            const isLiked = isFavorite(sneaker.id);
            const imageSrc = sneaker.imagen_url || sneaker.image || adidasImg;
            const title = sneaker.nombre || sneaker.name || "Zapatilla";
            const price = formatCurrency(sneaker.precio ?? sneaker.price);

            return (
              <div key={sneaker.id} className="group flex flex-col relative">
                {/* Botón flotante de favoritos */}
                <div className="absolute top-2 right-2 z-20">
                  <HeartButton
                    isLiked={isLiked}
                    onToggle={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(sneaker);
                    }}
                  />
                </div>

                <Link
                  to={sneaker.id?.toString().startsWith("f-") ? "/productos" : `/producto/${sneaker.id}`}
                  className="flex flex-col flex-1 focus:outline-none"
                  aria-label={`Ver ${title}`}
                >
                  {/* Espacio de la foto sin recuadro ni borde alguno */}
                  <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title}
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Título y Precio en Pesos Argentinos (ARS) */}
                  <div className="mt-3 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-normal text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white mt-1 tracking-tight">
                      {price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

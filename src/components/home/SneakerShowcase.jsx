import { useState } from "react";
import { Link } from "react-router-dom";
import adidasImg from "../../assets/sneakers/ad-campus-negra.jpg";
import nbImg from "../../assets/sneakers/new-balance-530-verdes.webp";
import crocsImg from "../../assets/sneakers/CROCS-SNEAKERS.png";
import vansImg from "../../assets/sneakers/vans-knu.jpg";

/**
 * Listado de zapatillas destacadas estilo Footdistrict.
 * - Sin recuadros, marcos ni bordes contenedores.
 * - La imagen se integra directamente y de forma "smooth" con el fondo de la web.
 * - Precios expresados en Pesos Argentinos (ARS).
 */
const FEATURED_SNEAKERS = [
  {
    id: 1,
    name: 'adidas Originals Campus 00s "Core Black"',
    price: "$ 179.999",
    image: adidasImg,
  },
  {
    id: 2,
    name: 'New Balance 530 "White / Olive Green"',
    price: "$ 195.000",
    image: nbImg,
  },
  {
    id: 3,
    name: 'Crocs Echo Surge "Atmosphere Grey"',
    price: "$ 135.000",
    image: crocsImg,
  },
  {
    id: 4,
    name: 'Vans Knu Skool "Black / White"',
    price: "$ 149.999",
    image: vansImg,
  },
];

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
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

        {/* Grilla de productos: sin recuadros ni marcos contenedores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURED_SNEAKERS.map((sneaker) => {
            const isLiked = Boolean(favorites[sneaker.id]);

            return (
              <div key={sneaker.id} className="group flex flex-col">
                <Link
                  to="/productos"
                  className="flex flex-col flex-1 focus:outline-none"
                  aria-label={`Ver ${sneaker.name}`}
                >
                  {/* Espacio de la foto sin recuadro ni borde alguno */}
                  <div className="relative aspect-square w-full flex items-center justify-center overflow-hidden">
                    {/* Botón flotante de favoritos */}
                    <div className="absolute top-2 right-2 z-10">
                      <HeartButton
                        isLiked={isLiked}
                        onToggle={(e) => toggleFavorite(e, sneaker.id)}
                      />
                    </div>

                    {/* Imagen directa en la web de forma fluida */}
                    <img
                      src={sneaker.image}
                      alt={sneaker.name}
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Título y Precio en Pesos Argentinos (ARS) */}
                  <div className="mt-3 flex flex-col">
                    <h3 className="text-xs sm:text-sm font-normal text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                      {sneaker.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white mt-1 tracking-tight">
                      {sneaker.price}
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

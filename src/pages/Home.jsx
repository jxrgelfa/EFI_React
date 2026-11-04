import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SneakerShowcase from "../components/home/SneakerShowcase";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* Banner Hero a pantalla completa */}
      <Hero />

      {/* Grilla de zapatillas estilo Footdistrict sin marcos ni recuadros */}
      <SneakerShowcase />

      {/* Banner de llamada a la acción / Cultura Sneaker */}
      <section className="border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100/60 dark:bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            Cultura Sneaker & Streetwear
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Descubrí los lanzamientos más esperados, colaboraciones exclusivas y clásicos atemporales seleccionados para vos.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/productos"
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full hover:opacity-85 transition-opacity"
            >
              Explorar Catálogo
            </Link>
            <Link
              to="/favoritos"
              className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-colors"
            >
              Mis Favoritos
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de suscripción a Newsletter estilo Footdistrict */}
      <NewsletterSection />
    </div>
  );
}

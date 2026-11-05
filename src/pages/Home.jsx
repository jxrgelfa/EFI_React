import Hero from "../components/Hero";
import SneakerShowcase from "../components/home/SneakerShowcase";

export default function Home() {
  return (
    <div className="w-full">
      {/* Banner Hero a pantalla completa */}
      <Hero />

      {/* Grilla de novedades de zapatillas */}
      <SneakerShowcase />
    </div>
  );
}

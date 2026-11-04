import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="w-full">
      <Link
        to="/productos"
        className="block w-full focus:outline-none cursor-pointer"
        aria-label="Ir al catálogo de productos - Nueva Colección New Balance 530"
      >
        <img
          src={heroImage}
          alt="SneakerStore - Cambia el Ritmo - Nueva Colección New Balance 530"
          className="w-full h-auto object-cover block"
        />
      </Link>
    </section>
  );
}

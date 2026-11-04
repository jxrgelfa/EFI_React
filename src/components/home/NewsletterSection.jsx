import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="border-t border-neutral-200 dark:border-neutral-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">
          Suscríbete a nuestra Newsletter
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          Entérate antes que nadie de los drops exclusivos, sorteos, ofertas y lanzamientos de zapatillas.
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-sm font-medium text-neutral-900 dark:text-white">
            🎉 ¡Gracias por suscribirte a SneakerStore!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
              required
              className="flex-1 px-4 py-3 text-sm rounded-none border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black hover:opacity-85 transition-opacity cursor-pointer"
            >
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

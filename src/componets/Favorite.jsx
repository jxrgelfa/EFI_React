import { useContext } from "react"
import { Link } from "react-router-dom"
import { FavoritesContext } from "../context/FavoritesContext"

export default function Favorites() {
  const {favorites,removeFromFavorites,updateQuantity,clearFavorites,totalPrice,} = 
    useContext(FavoritesContext)

  if (favorites.length === 0) {
    return (
      <div className="max-w-3xl mx-auto pt-6 px-4 w-full">
        <h1 className="text-3xl font-bold">Tu lista de favoritos está vacía</h1>
        <Link
          to="/products" className="text-sm text-rose-400 hover:underline mt-2 inline-block">
             Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto pt-6 px-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Favoritos</h1>
        <button
          onClick={clearFavorites}
          className="text-sm text-gray-800 hover:text-red-400 cursor-pointer"
        >
          Vaciar favoritos
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {favorites.map((item) => (
          <li key={item.id} className="flex items-center gap-4 bg-zinc-800 p-4 rounded-lg">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 object-cover rounded bg-zinc-900"
            />

            <div className="flex-1">
              <Link to={`/products/${item.id}`} className="font-semibold hover:underline">
                {item.title}
              </Link>
              <p className="text-rose-400 font-semibold">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label="Quitar una unidad"
                className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                aria-label="Agregar una unidad"
                className="w-8 h-8 rounded bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromFavorites(item.id)}
              aria-label={`Eliminar ${item.title}`}
              className="text-rose-400 hover:text-red-400 cursor-pointer"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-6 bg-zinc-800 p-4 rounded-lg">
        <span className="text-lg">Total</span>
        <span className="text-2xl font-bold text-rose-400"> ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
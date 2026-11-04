import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Comprueba si un producto ya está guardado en favoritos
  const isFavorite = (id) => {
    return favorites.some((item) => String(item.id) === String(id));
  };

  // Agrega o quita el producto de favoritos (Toggle)
  const toggleFavorite = (product) => {
    if (!product) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      }
      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre || product.name || "Zapatilla",
          precio: Number(product.precio ?? 0),
          imagen_url: product.imagen_url || "",
        },
      ];
    });
  };

  // Quita un producto puntual de favoritos
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  // Vacía toda la lista de favoritos
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

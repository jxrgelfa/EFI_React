import React, { createContext, useState, useEffect } from "react"

function loadFavorites() {
    try {
        const saved = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(loadFavorites)

    useEffect(() => {
        try {
            localStorage.setItem("favorites", JSON.stringify(favorites))
        } catch {
            //storage lleno
        }
    }, [favorites])

    const addToFavorites = (product) => {
        setFavorites((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            const { id, title, price, thumbnail } = product
            return [...prev, { id, title, price, thumbnail, quantity: 1 }]
        })
    }

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id))
    }

    const clearFavorites = () => setFavorites([])

    const updateQuantity = (id, quantity) => {
        if (quantity<1) removeFromFavorites (id)
        setFavorites((prev) =>
            personalbar.map((item) => (item.id === id ? {...item, quantity}:item)
    ))
    }

    const totalItems = favorites.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = favorites.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, updateQuantity, clearFavorites, removeFromFavorites, totalItems, totalPrice }}>
            {children}
        </FavoritesContext.Provider>
    )
}
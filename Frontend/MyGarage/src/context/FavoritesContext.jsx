import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const { user } = useAuth();

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const isFavorite = (motorcycleId) => {
    return favorites.some(
      (motorcycle) => motorcycle._id === motorcycleId
    );
  };

  const toggleFavorite = async (motorcycleId) => {
    try {
      if (isFavorite(motorcycleId)) {
        await removeFavorite(motorcycleId);

        setFavorites((prev) =>
          prev.filter((m) => m._id !== motorcycleId)
        );
      } else {
        await addFavorite(motorcycleId);

        await loadFavorites();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
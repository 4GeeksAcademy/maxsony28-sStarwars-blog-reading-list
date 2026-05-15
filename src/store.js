export const initialStore = () => ({
  people: JSON.parse(localStorage.getItem("people")) || [],
  planets: JSON.parse(localStorage.getItem("planets")) || [],
  vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  // Nuevo: caché para no repetir peticiones a la API en la vista detallada
  detailsCache: JSON.parse(localStorage.getItem("detailsCache")) || {} 
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_DATA":
      const updatedStore = { ...store, [action.payload.entity]: action.payload.data };
      localStorage.setItem(action.payload.entity, JSON.stringify(action.payload.data));
      return updatedStore;

    case "ADD_FAVORITE":
      if (store.favorites.some(fav => fav.uid === action.payload.uid && fav.type === action.payload.type)) {
        return store;
      }
      const newFavorites = [...store.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return { ...store, favorites: newFavorites };

    case "REMOVE_FAVORITE":
      const filteredFavorites = store.favorites.filter(
        fav => !(fav.uid === action.payload.uid && fav.type === action.payload.type)
      );
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return { ...store, favorites: filteredFavorites };

    // Nuevo: Guardar detalles individuales en el caché local
    case "CACHE_DETAILS":
      const cacheKey = `${action.payload.type}-${action.payload.uid}`;
      const newCache = { ...store.detailsCache, [cacheKey]: action.payload.details };
      localStorage.setItem("detailsCache", JSON.stringify(newCache));
      return { ...store, detailsCache: newCache };

    default:
      return store;
  }
}
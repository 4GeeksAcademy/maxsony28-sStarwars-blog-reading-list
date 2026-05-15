import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Unificamos todos los elementos para el buscador
  const allItems = [
    ...store.people.map(item => ({ ...item, type: "people" })),
    ...store.planets.map(item => ({ ...item, type: "planets" })),
    ...store.vehicles.map(item => ({ ...item, type: "vehicles" }))
  ];

  const filteredItems = searchQuery === "" 
    ? [] 
    : allItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleRemoveFavorite = (e, uid, type) => {
    e.stopPropagation(); // Evita que se cierre el dropdown al hacer clic en el basurero
    dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
  };

  const handleSearchSelect = (type, uid) => {
    setSearchQuery("");
    navigate(`/single/${type}/${uid}`);
  };

  return (
    <nav className="navbar navbar-warning bg-dark px-4 mb-0 border-bottom border-white">
      <Link to="/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1920px-Star_Wars_Logo.svg.png" 
          alt="Star Wars" 
          style={{ height: "40px" }} 
        />
      </Link>

      <div className="d-flex align-items-center position-relative">
        {/* Barra de búsqueda */}
        <div className="me-3 position-relative">
          <input 
            type="text" 
            className="form-control bg-dark text-light border-secondary" 
            placeholder="Search databank..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredItems.length > 0 && (
            <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, top: "100%" }}>
              {filteredItems.slice(0, 5).map((item) => (
                <li 
                  key={`${item.type}-${item.uid}`} 
                  className="list-group-item list-group-item-action bg-dark text-light border-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSearchSelect(item.type, item.uid)}
                >
                  {item.name} <small className="text-muted float-end">{item.type}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dropdown de Favoritos */}
        <div className="dropdown">
          <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
            {store.favorites.length === 0 ? (
              <li><span className="dropdown-item">Empty</span></li>
            ) : (
              store.favorites.map((fav) => (
                <li key={`${fav.type}-${fav.uid}`} className="d-flex justify-content-between align-items-center px-2 py-1">
                  <Link to={`/single/${fav.type}/${fav.uid}`} className="dropdown-item text-truncate" style={{ maxWidth: "150px" }}>
                    {fav.name}
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={(e) => handleRemoveFavorite(e, fav.uid, fav.type)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
import React from "react";
import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const imgUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/${type}/${item.uid}.jpg`;
  const fallbackImgUrl = "https://placehold.co/400x550/282727/dddddd?text=Image+Not+Found";

  const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === type);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: { uid: item.uid, type } });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: { uid: item.uid, name: item.name, type } });
    }
  };

  return (
    <div className="card mx-2 flex-shrink-0 databank-card" style={{ width: "16rem" }}>
      <div className="card-img-container">
        <img 
          src={imgUrl} 
          className="card-img-top" 
          alt={item.name} 
          style={{ height: "320px", objectFit: "cover", objectPosition: "top" }}
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = fallbackImgUrl; 
          }}
        />
      </div>
      <div className="card-body d-flex flex-column p-3">
        <h5 className="databank-title mb-4">{item.name}</h5>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link 
            to={`/single/${type}/${item.uid}`} 
            className="text-light text-decoration-none fw-bold" 
            style={{ fontSize: "0.85rem", borderBottom: "1px solid #ed1d24", paddingBottom: "2px" }}
          >
            READ MORE
          </Link>
          <button className="btn btn-link text-warning p-0 border-0" onClick={handleFavorite}>
            <i className={`fa-heart ${isFavorite ? "fa-solid" : "fa-regular"} fs-5`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};
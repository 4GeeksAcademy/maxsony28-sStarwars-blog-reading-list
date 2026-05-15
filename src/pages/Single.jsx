import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Single = () => {
  const { type, uid } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer(); // Conectamos el store global
  
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar el spinner

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); // Iniciamos el spinner
      const cacheKey = `${type}-${uid}`;

      // 1. Verificamos si los datos ya existen en nuestro caché local
      if (store.detailsCache && store.detailsCache[cacheKey]) {
        setDetails(store.detailsCache[cacheKey]);
        setLoading(false);
        return; // Detenemos la función, ¡no gastamos recursos de red!
      }

      // 2. Si no están en caché, hacemos la petición a la API
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const data = await response.json();
        const fetchedDetails = data.result.properties;
        
        setDetails(fetchedDetails);

        // 3. Despachamos la acción para guardar este resultado en el store/caché
        dispatch({ 
          type: "CACHE_DETAILS", 
          payload: { type, uid, details: fetchedDetails } 
        });
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false); // Apagamos el spinner sin importar si hubo éxito o error
      }
    };

    fetchDetails();
  }, [type, uid]); // Se ejecuta si cambia el tipo o el uid en la URL

  // Spinner de Bootstrap renderizado mientras se cargan los datos
  if (loading || !details) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-danger" role="status" style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const imgUrl = `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/${type}/${uid}.jpg`;

  return (
    <div className="container mt-5 text-light">
      
      {/* Botón para volver a Home */}
      <button 
        className="btn btn-outline-danger mb-4" 
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
      </button>

      <div className="row">
        <div className="col-md-6 text-center">
          <img 
            src={imgUrl} 
            alt={details?.name} 
            className="img-fluid rounded" 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = "https://placehold.co/600x600/212529/cccccc?text=Data+Not+Found"; 
            }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-4">{details.name}</h1>
          <p className="lead mt-3">
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
          </p>
        </div>
      </div>

      <hr className="bg-danger border-2 border-top border-danger my-4" />

      {/* Renderizado dinámico de propiedades */}
      <div className="row text-center text-danger">
        {type === "people" && (
          <>
            <div className="col-2"><strong>Name</strong><br/>{details.name}</div>
            <div className="col-2"><strong>Birth Year</strong><br/>{details.birth_year}</div>
            <div className="col-2"><strong>Gender</strong><br/>{details.gender}</div>
            <div className="col-2"><strong>Height</strong><br/>{details.height}</div>
            <div className="col-2"><strong>Skin Color</strong><br/>{details.skin_color}</div>
            <div className="col-2"><strong>Eye Color</strong><br/>{details.eye_color}</div>
          </>
        )}
        {type === "planets" && (
          <>
            <div className="col-2"><strong>Name</strong><br/>{details.name}</div>
            <div className="col-2"><strong>Climate</strong><br/>{details.climate}</div>
            <div className="col-2"><strong>Population</strong><br/>{details.population}</div>
            <div className="col-2"><strong>Orbital Period</strong><br/>{details.orbital_period}</div>
            <div className="col-2"><strong>Rotation Period</strong><br/>{details.rotation_period}</div>
            <div className="col-2"><strong>Diameter</strong><br/>{details.diameter}</div>
          </>
        )}
        {type === "vehicles" && (
          <>
            <div className="col-2"><strong>Name</strong><br/>{details.name}</div>
            <div className="col-2"><strong>Model</strong><br/>{details.model}</div>
            <div className="col-2"><strong>Class</strong><br/>{details.vehicle_class}</div>
            <div className="col-2"><strong>Passengers</strong><br/>{details.passengers}</div>
            <div className="col-2"><strong>Length</strong><br/>{details.length}</div>
            <div className="col-2"><strong>Crew</strong><br/>{details.crew}</div>
          </>
        )}
      </div>
    </div>
  );
};
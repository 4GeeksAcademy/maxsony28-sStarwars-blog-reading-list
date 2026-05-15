import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { StoreProvider, useGlobalReducer } from "../hooks/useGlobalReducer";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const AppContent = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async (entity) => {
      try {
        console.log(`Intentando descargar 100 resultados de: ${entity}...`);
        
        // Añadimos page=1 para ser más específicos con la API
        const response = await fetch(`https://www.swapi.tech/api/${entity}?page=1&limit=100`);
        
        if (!response.ok) {
          throw new Error(`¡Error en la petición! Estado: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Éxito con ${entity}. Datos recibidos:`, data.results);
        
        dispatch({ type: "SET_DATA", payload: { entity, data: data.results } });
      } catch (error) {
        console.error(`Ocurrió un error trayendo ${entity}:`, error);
      }
    };

    if (store.people.length === 0) fetchData("people");
    if (store.planets.length === 0) fetchData("planets");
    if (store.vehicles.length === 0) fetchData("vehicles");
  }, []);

  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  );
};

export const Layout = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};
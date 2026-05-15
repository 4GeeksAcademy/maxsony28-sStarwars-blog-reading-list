import React from "react";
import  {useGlobalReducer}  from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Home = () => {
  const { store } = useGlobalReducer();

  const renderList = (title, items, type) => (
    <div className="mb-5 pt-3">
      <div className="d-flex align-items-center mb-4 px-3">
        <h4 className="text-light text-uppercase fw-bold m-0 pe-3" style={{ letterSpacing: "2px" }}>
          {title}
        </h4>
        <div className="flex-grow-1 border-bottom" style={{ borderColor: "#444" }}></div>
      </div>
      <div className="d-flex flex-nowrap overflow-auto px-3 pb-4" style={{ gap: "10px" }}>
        {items.map((item) => (
          <Card key={`${type}-${item.uid}`} item={item} type={type} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-4" style={{ minHeight: "100vh" }}>
      {renderList("Characters", store.people, "people")}
      {renderList("Planets", store.planets, "planets")}
      {renderList("Vehicles", store.vehicles, "vehicles")}
    </div>
  );
};
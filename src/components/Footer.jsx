import React from "react";

export const Footer = () => (
  <footer 
    className="footer mt-auto py-4 text-center" 
    style={{ backgroundColor: "#151515", borderTop: "1px solid #333" }}
  >
    <p className="text-light mb-0" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>
      STAR WARS DATABANK <br/>
      <span className="text-white" style={{ fontSize: "0.8rem" }}>May the Force be with you.</span>
    </p>
  </footer>
);
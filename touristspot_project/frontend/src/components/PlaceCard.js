
import React from "react";

export default function PlaceCard({ place, onOpen }) {
  return (
    <div 
      onClick={() => onOpen(place)}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      {/* <img
  src={`http://localhost:5000/${place.image?.replace("uploads", "images") || "default.jpg"}`}
  alt={place.name || "Place"}
/> */}
<img
  src={`http://localhost:5000/${place.default_photo}`}
  alt={place.name}
  style={{ width: "400px", height: "200px", borderRadius: "5px" }}
/>


      <h4>{place.name}</h4>
    </div>
  );
}

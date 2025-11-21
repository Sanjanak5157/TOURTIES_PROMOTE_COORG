import React from "react";

export default function PlacesToGoPage({ onBack, places, onPlaceClick }) {
  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      <button
        onClick={onBack}
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Back
      </button>

      <h1 style={{ color: "#2c5530", marginBottom: "30px" }}>🗺️ Places to Go in Coorg</h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px"
      }}>
        {places.map((place) => (
          <div 
            key={place.id}
            onClick={() => onPlaceClick(place)}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={place.image || "http://localhost:5000/images/default.jpg"}
              alt={place.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            />
            <h3 style={{ color: "#2c5530", margin: "0 0 10px 0" }}>{place.name}</h3>
            <p style={{ color: "#666", margin: 0 }}>{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
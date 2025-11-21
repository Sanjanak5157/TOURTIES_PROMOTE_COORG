import React from "react";

export default function CitiesPage({ onBack }) {
  const coorgCities = [
    {
      name: "Madikeri",
      description: "The capital city of Coorg district, known for its scenic beauty and historical significance.",
      image: "http://localhost:5000/images/madikeri.jpg",
      attractions: ["Raja's Seat", "Madikeri Fort", "Omkareshwara Temple"]
    },
    {
      name: "Kushalnagar",
      description: "Famous for Tibetan settlements and the beautiful Namdroling Monastery (Golden Temple).",
      image: "http://localhost:5000/images/kushalnagar.jpg",
      attractions: ["Golden Temple", "Tibetan Market", "Cauvery Nisargadhama"]
    },
    {
      name: "Virajpet",
      description: "Scenic town in southern Coorg known for coffee plantations and spice gardens.",
      image: "http://localhost:5000/images/virajpet.jpg",
      attractions: ["Coffee Estates", "Spice Plantations", "Iruppu Falls"]
    },
    {
      name: "Somwarpet",
      description: "Known for its lush coffee plantations, spice gardens, and beautiful landscapes.",
      image: "http://localhost:5000/images/somwarpet.jpg",
      attractions: ["Coffee Plantations", "Mallalli Falls", "Pushpagiri Wildlife Sanctuary"]
    }
  ];

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

      <h1 style={{ color: "#2c5530", marginBottom: "30px" }}>🏙️ Cities in Coorg</h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "25px"
      }}>
        {coorgCities.map((city, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={city.image}
              alt={city.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
              onError={(e) => {
                e.currentTarget.src = "http://localhost:5000/images/default.jpg";
              }}
            />
            <h3 style={{ color: "#2c5530", margin: "0 0 10px 0" }}>{city.name}</h3>
            <p style={{ color: "#666", margin: "0 0 15px 0" }}>{city.description}</p>
            
            <div>
              <h4 style={{ color: "#2c5530", margin: "0 0 10px 0" }}>Main Attractions:</h4>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {city.attractions.map((attraction, idx) => (
                  <li key={idx} style={{ color: "#666", marginBottom: "5px" }}>{attraction}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
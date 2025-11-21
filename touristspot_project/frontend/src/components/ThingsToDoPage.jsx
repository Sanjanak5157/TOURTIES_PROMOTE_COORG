import React from "react";

export default function ThingsToDoPage({ onBack }) {
  const thingsToDo = [
    {
      category: "Outdoor Activities",
      items: [
        {
          name: "Robusta Rally",
          description: "We are delighted to invite you to the BlueBand Robusta Rally 2025, Round 3 of the FMSCI Indian National Rally Championship, taking place amidst the scenic coffee trails of Kodagu, Karnataka. 17. Dates: November 14-16, 2025. Location: Kodagu, Karnataka",
          image: "http://localhost:5000/videos/Robusta_Rally.mp4"
        },
        {
          name: "Trekking in Coorg",
          description: "Explore the beautiful trails and hills of Coorg including Tadiandamol and Brahmagiri peaks.",
          image: "http://localhost:5000/images/trekking-coorg.jpg"
        },
        {
          name: "River Rafting",
          description: "Adventure sports in Coorg's rivers with professional guides and safety equipment.",
          image: "http://localhost:5000/images/river-rafting.jpg"
        }
      ]
    },
    {
      category: "Climbing",
      items: [
        {
          name: "Rock Climbing",
          description: "Adventure climbing in Coorg's hills with trained instructors and proper gear.",
          image: "http://localhost:5000/images/rock-climbing.jpg"
        }
      ]
    },
    {
      category: "Must-see Nature Attractions",
      items: [
        {
          name: "Coffee Plantation Tour",
          description: "Walk through lush coffee estates and learn about coffee processing.",
          image: "http://localhost:5000/images/coffee-tour.jpg"
        },
        {
          name: "Wildlife Safari",
          description: "Explore Nagarhole National Park and spot elephants, tigers, and other wildlife.",
          image: "http://localhost:5000/images/wildlife-safari.jpg"
        }
      ]
    },
    {
      category: "Art & Culture",
      items: [
        {
          name: "Coorgi Culture",
          description: "Experience traditional Kodava culture, dress, and customs.",
          image: "http://localhost:5000/images/coorg-culture.jpg"
        },
        {
          name: "Traditional Dance",
          description: "Watch traditional Kodava dance performances and cultural shows.",
          image: "http://localhost:5000/images/traditional-dance.jpg"
        }
      ]
    },
    {
      category: "Food and Drink",
      items: [
        {
          name: "Coorgi Cuisine",
          description: "Taste authentic Pandi Curry, Kadumbuttu, and other Coorg delicacies.",
          image: "http://localhost:5000/images/coorg-cuisine.jpg"
        },
        {
          name: "Coffee Tasting",
          description: "Experience fresh Coorg coffee at local plantations and cafes.",
          image: "http://localhost:5000/images/coffee-tasting.jpg"
        }
      ]
    },
    {
      category: "Family Fun",
      items: [
        {
          name: "Toy Train Ride",
          description: "Enjoy scenic toy train rides through beautiful landscapes.",
          image: "http://localhost:5000/images/toy-train.jpg"
        },
        {
          name: "Boating",
          description: "Relaxing boat rides in Coorg's lakes and reservoirs.",
          image: "http://localhost:5000/images/boating.jpg"
        }
      ]
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
          border: "1px solid #0e0e0eff",
          borderRadius: "6px",
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Back
      </button>

      <h1 style={{ color: "#2c5530", marginBottom: "30px" }}>🎯 Things to Do in Coorg</h1>
      
      {thingsToDo.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: "40px" }}>
          <h2 style={{ 
            color: "#2c5530", 
            margin: "0 0 20px 0",
            paddingBottom: "10px",
            borderBottom: "2px solid #e0e0e0"
          }}>
            {category.category}
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {category.items.map((item, itemIndex) => (
              <div 
                key={itemIndex}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "15px"
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "http://localhost:5000/images/default.jpg";
                  }}
                />
                <h3 style={{ color: "#2c5530", margin: "0 0 10px 0" }}>{item.name}</h3>
                <p style={{ color: "#666", margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
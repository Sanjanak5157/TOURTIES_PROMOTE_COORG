// import React, { useState } from "react";

// export default function HonnamanaKereDetail({ onBack }) {
//   const [activeTab, setActiveTab] = useState("HOTEL");
//   // ... (Same state variables)

//   const coorgData = {
//     name: "Honnamana Kere Lake, Coorg",
//     description: "The largest natural lake in the region, surrounded by mountains and coffee plantations, with a nearby temple dedicated to Goddess Honnamma",
//     location: "Honnamana Kere Lake, Somwarpet, Coorg, Karnataka 571236",
//     mapUrl: "https://maps.google.com/?q=Honnamana+Kere+Lake+Coorg",
//     timing: {
//       Monday: "6:00 AM - 6:00 PM",
//       Tuesday: "6:00 AM - 6:00 PM",
//       Wednesday: "6:00 AM - 6:00 PM",
//       Thursday: "6:00 AM - 6:00 PM",
//       Friday: "6:00 AM - 6:00 PM",
//       Saturday: "6:00 AM - 6:00 PM",
//       Sunday: "6:00 AM - 6:00 PM"
//     },
//     ticketPrices: {
//       adult: 30,
//       child: 15
//     },
//     images: [
//       "http://localhost:5000/images/honnamana_kere.jpg",
//       "http://localhost:5000/images/honnamana-kere-2.jpg"
//     ]
//   };

//   // ... (Same component structure)
//   return (
//     <div style={{ position: "relative", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
//       {/* Same structure */}
//     </div>
//   );
// }
import React, { useState } from "react";

export default function HonnamanaKereDetail({ onBack }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const honnamanaKereData = {
    name: "Honnamana Kere Lake, Coorg",
    description: "The largest and most sacred lake in Coorg, surrounded by lush mountains and coffee plantations. This beautiful lake is named after Goddess Honnamma and holds great religious significance for the locals.",
    location: "Honnamana Kere Lake, Sulimala Village, Somwarpet Taluk, Coorg, Karnataka 571236",
    mapUrl: "https://maps.google.com/?q=Honnamana+Kere+Lake+Coorg",
    coordinates: "12.2580° N, 75.8538° E",
    bestTimeToVisit: "September to March",
    visitingDuration: "1-2 hours",
    
    timing: {
      Monday: "6:00 AM - 6:00 PM",
      Tuesday: "6:00 AM - 6:00 PM",
      Wednesday: "6:00 AM - 6:00 PM",
      Thursday: "6:00 AM - 6:00 PM",
      Friday: "6:00 AM - 6:00 PM",
      Saturday: "6:00 AM - 6:00 PM",
      Sunday: "6:00 AM - 6:00 PM"
    },
    
    ticketPrices: {
      adult: "₹30 per person",
      child: "₹15 per person (5-12 years)",
      parking: "₹50 for cars, ₹20 for bikes",
      camera: "No additional charge"
    },

    attractions: [
      "Scenic lake views",
      "Doddamalthe Temple (Goddess Honnamma)",
      "Boating facilities",
      "Photography spots",
      "Coffee plantation views",
      "Bird watching"
    ],

    activities: [
      "Boating (Pedal boats available)",
      "Nature walks",
      "Photography",
      "Picnicking",
      "Temple visit"
    ],

    facilities: [
      "Boating facility",
      "Small eateries",
      "Parking space",
      "Basic restrooms",
      "Temple premises"
    ],

    tips: [
      "Visit during early morning or late afternoon for best experience",
      "Carry water and snacks",
      "Wear comfortable walking shoes",
      "Respect the religious significance of the place",
      "Monsoon season offers lush greenery but check weather conditions"
    ],

    images: [
      "https://images.unsplash.com/photo-1599316148061-35d6aa2c6f0c?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1588666308777-7497d50eeff7?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1592217500877-6b7bd3796d32?w=500&h=300&fit=crop"
    ],

    contact: {
      phone: "+91-82724-12345",
      email: "coorgtourism@karnataka.gov.in",
      emergency: "108"
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "OVERVIEW":
        return (
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <p>{honnamanaKereData.description}</p>
            <div style={{ marginTop: "15px" }}>
              <h4>Key Highlights:</h4>
              <ul>
                <li>Largest lake in Coorg</li>
                <li>Sacred site with religious significance</li>
                <li>Surrounded by coffee plantations</li>
                <li>Boating facilities available</li>
                <li>Perfect for nature lovers and photographers</li>
              </ul>
            </div>
          </div>
        );

      case "TIMINGS":
        return (
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <h4>Visiting Hours:</h4>
            {Object.entries(honnamanaKereData.timing).map(([day, time]) => (
              <div key={day} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold" }}>{day}:</span>
                <span>{time}</span>
              </div>
            ))}
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f0f8ff", borderRadius: "5px" }}>
              <strong>Best Time to Visit:</strong> {honnamanaKereData.bestTimeToVisit}
            </div>
          </div>
        );

      case "TICKETS":
        return (
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <h4>Entry Fees:</h4>
            {Object.entries(honnamanaKereData.ticketPrices).map(([type, price]) => (
              <div key={type} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ textTransform: "capitalize" }}>{type}:</span>
                <span style={{ fontWeight: "bold" }}>{price}</span>
              </div>
            ))}
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fff0f0", borderRadius: "5px" }}>
              <strong>Note:</strong> Prices are subject to change. Current as of {new Date().toLocaleDateString()}
            </div>
          </div>
        );

      case "ATTRACTIONS":
        return (
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <h4>Main Attractions:</h4>
            <ul>
              {honnamanaKereData.attractions.map((attraction, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>{attraction}</li>
              ))}
            </ul>
            
            <h4 style={{ marginTop: "20px" }}>Activities:</h4>
            <ul>
              {honnamanaKereData.activities.map((activity, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>{activity}</li>
              ))}
            </ul>
          </div>
        );

      case "FACILITIES":
        return (
          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <h4>Available Facilities:</h4>
            <ul>
              {honnamanaKereData.facilities.map((facility, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>{facility}</li>
              ))}
            </ul>
            
            <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
              <h4>Travel Tips:</h4>
              <ul>
                {honnamanaKereData.tips.map((tip, index) => (
                  <li key={index} style={{ marginBottom: "5px", fontSize: "14px" }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Back Button */}
      <button 
        onClick={onBack}
        style={{
          position: "absolute",
          left: "20px",
          top: "20px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <h1 style={{ color: "#2c5530", marginBottom: "10px", fontSize: "24px" }}>{honnamanaKereData.name}</h1>
        <div style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
          📍 {honnamanaKereData.location}
        </div>
      </div>

      {/* Image Gallery */}
      <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "20px", padding: "10px 0" }}>
        {honnamanaKereData.images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`Honnamana Kere Lake ${index + 1}`}
            style={{
              width: "200px",
              height: "150px",
              borderRadius: "8px",
              objectFit: "cover",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          />
        ))}
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", borderBottom: "2px solid #ddd" }}>
        {["OVERVIEW", "TIMINGS", "TICKETS", "ATTRACTIONS", "FACILITIES"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 15px",
              border: "none",
              backgroundColor: activeTab === tab ? "#2c5530" : "transparent",
              color: activeTab === tab ? "white" : "#666",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
              borderRadius: "5px 5px 0 0",
              flex: 1,
              margin: "0 2px"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        minHeight: "300px"
      }}>
        {renderContent()}
      </div>

      {/* Quick Info Footer */}
      <div style={{ 
        marginTop: "20px", 
        padding: "15px", 
        backgroundColor: "#2c5530", 
        color: "white", 
        borderRadius: "10px",
        fontSize: "14px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
          <div style={{ textAlign: "center", margin: "5px" }}>
            <div>⏰ Duration</div>
            <div style={{ fontWeight: "bold" }}>{honnamanaKereData.visitingDuration}</div>
          </div>
          <div style={{ textAlign: "center", margin: "5px" }}>
            <div>🎯 Best Time</div>
            <div style={{ fontWeight: "bold" }}>{honnamanaKereData.bestTimeToVisit}</div>
          </div>
          <div style={{ textAlign: "center", margin: "5px" }}>
            <div>💰 Entry Fee</div>
            <div style={{ fontWeight: "bold" }}>₹30</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button 
          onClick={() => window.open(honnamanaKereData.mapUrl, '_blank')}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#ff6b35",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📍 Get Directions
        </button>
        <button 
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📞 Contact Info
        </button>
      </div>
    </div>
  );
}
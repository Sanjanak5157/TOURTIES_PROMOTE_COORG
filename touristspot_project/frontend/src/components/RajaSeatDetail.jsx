import React, { useState } from "react";

export default function RajaSeatDetail({ onBack }) {
  const [activeTab, setActiveTab] = useState("HOTEL");
  const [selectedItem, setSelectedItem] = useState(null);

  // Raja's Seat data
  const rajaSeatData = {
    name: "Raja's Seat, Coorg",
    default_photo: "images/raja_seat.jpg",
    description: "Famous sunset viewpoint and garden in Madikeri"
  };

  // Hotels near Raja's Seat
  const hotels = [
    {
      id: 1,
      type: "hotel",
      name: "The Tamara Coorg",
      contact: "+91-82736-61789",
      foodPrice: "₹1,200 - ₹3,500",
      address: "Kabbinakad, Coorg, Karnataka 571234",
      mapUrl: "https://maps.google.com/?q=The+Tamara+Coorg+Kabbinakad",
      image: "images/tamara-coorg.jpg",
      distance: "15 km from Raja's Seat",
      rating: "4.5/5",
      amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"]
    },
    {
      id: 2,
      type: "hotel",
      name: "Club Mahindra Madikeri",
      contact: "+91-98765-43210",
      foodPrice: "₹800 - ₹2,500",
      address: "Madikeri, Coorg, Karnataka 571201",
      mapUrl: "https://maps.google.com/?q=Club+Mahindra+Madikeri",
      image: "images/club-mahindra.jpg",
      distance: "2 km from Raja's Seat",
      rating: "4.3/5",
      amenities: ["Swimming Pool", "Kids Club", "Multi-cuisine Restaurant"]
    }
  ];

  // Homestays near Raja's Seat
  const homestays = [
    {
      id: 1,
      type: "homestay",
      name: "Madikeri Heritage Homestay",
      contact: "+91-94481-12345",
      foodPrice: "₹400 - ₹800",
      address: "Near Raja's Seat, Madikeri, Coorg 571201",
      mapUrl: "https://maps.google.com/?q=Madikeri+Heritage+Homestay",
      image: "images/heritage-homestay.jpg",
      distance: "1 km from Raja's Seat",
      rating: "4.2/5",
      amenities: ["Heritage Building", "Home-cooked Food", "Garden View"]
    },
    {
      id: 2,
      type: "homestay",
      name: "Raja's View Homestay",
      contact: "+91-94802-23456",
      foodPrice: "₹350 - ₹700",
      address: "Raja's Seat Road, Madikeri, Coorg 571201",
      mapUrl: "https://maps.google.com/?q=Raja+View+Homestay+Madikeri",
      image: "images/raja-view-homestay.jpg",
      distance: "0.5 km from Raja's Seat",
      rating: "4.4/5",
      amenities: ["Sunset View", "Traditional Food", "Walking Distance"]
    }
  ];

  // Lodges near Raja's Seat
  const lodges = [
    {
      id: 1,
      type: "lodge",
      name: "Madikeri Tourist Lodge",
      contact: "+91-97415-67890",
      foodPrice: "₹300 - ₹600",
      address: "Madikeri Main Road, Coorg 571201",
      mapUrl: "https://maps.google.com/?q=Madikeri+Tourist+Lodge",
      image: "images/tourist-lodge.jpg",
      distance: "1.5 km from Raja's Seat",
      rating: "3.9/5",
      amenities: ["Budget Stay", "Central Location", "Car Rental"]
    }
  ];

  // Food Stalls near Raja's Seat
  const foodStalls = [
    {
      id: 1,
      type: "food",
      name: "Raja's Seat Street Food",
      image: "images/raja-street-food.jpg",
      speciality: "Local Coorg Snacks & Fresh Coffee"
    },
    {
      id: 2,
      type: "food",
      name: "Madikeri Local Delights",
      image: "images/madikeri-delights.jpg",
      speciality: "Coorgi Pandi Curry & Akki Roti"
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  const handleFoodButtonClick = (item) => {
    alert(`Food Menu for ${item.name}\n\n🍽️ Price Range: ${item.foodPrice}\n📞 Contact: ${item.contact}\n📍 ${item.distance}`);
  };

  // Detail View for Hotel, Homestay, Lodge
  if (selectedItem && selectedItem.type !== "food") {
    return (
      <div style={{ 
        position: "relative", 
        textAlign: "center", 
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <button
          onClick={handleBackToList}
          aria-label="Back to list"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ← Back to List
        </button>

        <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
          {selectedItem.name}
        </h2>

        <div style={{ position: "relative" }}>
          <img
            src={`http://localhost:5000/${selectedItem.image || "images/default.jpg"}`}
            alt={selectedItem.name}
            style={{ 
              width: "100%", 
              maxWidth: "400px", 
              height: "200px", 
              borderRadius: "5px", 
              objectFit: "cover",
              marginBottom: "10px"
            }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "http://localhost:5000/images/default.jpg";
            }}
          />
          <div style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255,255,255,0.9)",
            padding: "5px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            ⭐ {selectedItem.rating}
          </div>
        </div>

        <div style={{
          textAlign: "left",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid #eee",
          marginBottom: "15px"
        }}>
          <h3 style={{ marginBottom: "15px" }}>{selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Information</h3>
          
          <div style={{ marginBottom: "10px" }}>
            <strong>📞 Contact:</strong> {selectedItem.contact}
          </div>
          
          <div style={{ marginBottom: "10px" }}>
            <strong>📍 Address:</strong> {selectedItem.address}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>📏 Distance:</strong> {selectedItem.distance}
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <strong>🍽️ Food Price Range:</strong> {selectedItem.foodPrice}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong>🏨 Amenities:</strong>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" }}>
              {selectedItem.amenities.map((amenity, index) => (
                <span key={index} style={{
                  background: "#e9ecef",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  fontSize: "12px"
                }}>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => window.open(selectedItem.mapUrl, '_blank')}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4285f4",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              📍 View on Google Maps
            </button>
            
            <button
              onClick={() => handleFoodButtonClick(selectedItem)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#34a853",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              🍽️ Food Menu
            </button>

            <button
              onClick={() => window.open(`tel:${selectedItem.contact}`)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff6b35",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              📞 Call Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Food Stall Detail View
  if (selectedItem && selectedItem.type === "food") {
    return (
      <div style={{ 
        position: "relative", 
        textAlign: "center", 
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <button
          onClick={handleBackToList}
          aria-label="Back to list"
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: 6,
            padding: "6px 10px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ← Back to List
        </button>

        <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
          {selectedItem.name}
        </h2>

        <img
          src={`http://localhost:5000/${selectedItem.image || "images/default.jpg"}`}
          alt={selectedItem.name}
          style={{ 
            width: "100%", 
            maxWidth: "400px", 
            height: "250px", 
            borderRadius: "5px", 
            objectFit: "cover",
            marginBottom: "20px"
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "http://localhost:5000/images/default.jpg";
          }}
        />

        <div style={{
          textAlign: "left",
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid #eee"
        }}>
          <h3 style={{ marginBottom: "15px" }}>Food Speciality</h3>
          
          <div style={{ 
            padding: "15px", 
            backgroundColor: "white", 
            borderRadius: "5px",
            border: "1px solid #ddd"
          }}>
            <p style={{ margin: 0, fontSize: "16px", color: "#2c5530" }}>
              🍛 <strong>{selectedItem.speciality}</strong>
            </p>
          </div>

          <div style={{ marginTop: "20px", color: "#666" }}>
            <p>📍 <strong>Location:</strong> Near Raja's Seat, Madikeri</p>
            <p>🕒 <strong>Timing:</strong> 7:00 AM - 10:00 PM</p>
            <p>💰 <strong>Price Range:</strong> ₹50 - ₹300</p>
          </div>
        </div>
      </div>
    );
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "HOTEL": return hotels;
      case "Homestay": return homestays;
      case "Lodge": return lodges;
      case "Food Stall": return foodStalls;
      default: return [];
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case "HOTEL": return "🏨 Hotels Near Raja's Seat";
      case "Homestay": return "🏡 Homestays Near Raja's Seat";
      case "Lodge": return "🛖 Lodges Near Raja's Seat";
      case "Food Stall": return "🍽️ Food Stalls Near Raja's Seat";
      default: return "";
    }
  };

  const currentData = getCurrentData();

  // Main View with Lists
  return (
    <div style={{ 
      position: "relative", 
      textAlign: "center", 
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto"
    }}>
      {/* Back button */}
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Place name */}
      <h2 style={{ 
        marginTop: "40px", 
        marginBottom: "10px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#2c5530"
      }}>
        {rajaSeatData.name}
      </h2>
      
      <p style={{ 
        marginBottom: "20px",
        color: "#666",
        fontSize: "14px"
      }}>
        {rajaSeatData.description}
      </p>

      {/* Main image */}
      <div style={{ marginBottom: "30px" }}>
        <img
          src={`http://localhost:5000/${rajaSeatData.default_photo || "images/default.jpg"}`}
          alt={rajaSeatData.name}
          style={{ 
            width: "100%", 
            maxWidth: "400px", 
            height: "200px", 
            borderRadius: "5px", 
            objectFit: "cover",
            border: "1px solid #ddd"
          }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "http://localhost:5000/images/default.jpg";
          }}
        />
      </div>

      {/* Navigation tabs */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>
        {["HOTEL", "Homestay", "Food Stall", "Lodge"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: activeTab === tab ? "#2c5530" : "#f5f5f5",
              color: activeTab === tab ? "white" : "black",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.3s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div style={{
        textAlign: "left",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "5px",
        border: "1px solid #eee"
      }}>
        <h3 style={{ 
          marginBottom: "15px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#2c5530"
        }}>
          {getSectionTitle()}
        </h3>
        
        {activeTab === "Food Stall" ? (
          // Food Stall Grid View
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px"
          }}>
            {currentData.map((stall) => (
              <div 
                key={stall.id}
                onClick={() => handleItemClick(stall)}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  textAlign: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={`http://localhost:5000/${stall.image || "images/default.jpg"}`}
                  alt={stall.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    marginBottom: "10px"
                  }}
                />
                <h4 style={{ 
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#2c5530"
                }}>
                  {stall.name}
                </h4>
                <p style={{ 
                  margin: 0,
                  fontSize: "13px",
                  color: "#666"
                }}>
                  {stall.speciality}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // List View for Hotel, Homestay, Lodge
          currentData.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4 style={{ 
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#2c5530"
                }}>
                  {item.name}
                </h4>
                <span style={{
                  background: "#2c5530",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "bold"
                }}>
                  ⭐ {item.rating}
                </span>
              </div>
              
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
                📍 {item.distance}
              </div>
              
              <div style={{ fontSize: "14px", color: "#666" }}>
                <div style={{ marginBottom: "4px" }}>
                  <strong>📞 Contact:</strong> {item.contact}
                </div>
                <div style={{ marginBottom: "4px" }}>
                  <strong>🍽️ Food Price:</strong> {item.foodPrice}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>📍 Address:</strong> {item.address}
                </div>
              </div>
              
              <div style={{ 
                marginTop: "10px", 
                fontSize: "12px", 
                color: "#2c5530",
                fontWeight: "bold"
              }}>
                👆 Click to view details, map and food menu →
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
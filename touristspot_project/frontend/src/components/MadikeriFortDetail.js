
import React, { useState } from "react";

export default function MadikeriFortDetail({ onBack }) {
  const [activeTab, setActiveTab] = useState("HOTEL");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTiming, setShowTiming] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    adults: 0,
    children: 0
  });

  const coorgData = {
    name: "Madikeri Fort, Coorg",
    description: "A historic 17th-century fort housing a palace, a museum, and a clock tower, reflecting Gothic and Islamic architecture",
    location: "Madikeri Fort, Madikeri, Coorg, Karnataka 571201",
    mapUrl: "https://maps.google.com/?q=Madikeri+Fort+Coorg",
    timing: {
      Monday: "10:00 AM - 5:30 PM",
      Tuesday: "10:00 AM - 5:30 PM",
      Wednesday: "10:00 AM - 5:30 PM",
      Thursday: "10:00 AM - 5:30 PM",
      Friday: "10:00 AM - 5:30 PM",
      Saturday: "10:00 AM - 5:30 PM",
      Sunday: "10:00 AM - 5:30 PM"
    },
    ticketPrices: {
      adult: 20,
      child: 10
    },
    images: [
      "http://localhost:5000/images/madikeri_fort.jpg",
      "http://localhost:5000/images/madikeri-fort-2.jpg",
      "http://localhost:5000/images/madikeri-fort-3.jpg"
    ]
  };

  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coorgData.images.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [coorgData.images.length]);

  const hotels = [
    {
      id: 1,
      type: "hotel",
      name: "Fort View Hotel",
      contact: "+91-82736-61795",
      foodPrice: "₹900 - ₹2,800",
      address: "Madikeri Town, Near Fort, Coorg",
      mapUrl: "https://maps.google.com/?q=Fort+View+Hotel+Madikeri",
      image: "http://localhost:5000/images/fort-view-hotel.jpg",
      distance: "500 m from Fort",
      rating: "4.1/5",
      amenities: ["Fort View", "City Center", "Restaurant", "Free WiFi"]
    }
  ];

  const homestays = [
    {
      id: 1,
      type: "homestay",
      name: "Madikeri Heritage Homestay",
      contact: "+91-94481-12351",
      foodPrice: "₹400 - ₹800",
      address: "Madikeri Town, Coorg",
      mapUrl: "https://maps.google.com/?q=Madikeri+Heritage+Homestay",
      image: "http://localhost:5000/images/heritage-homestay.jpg",
      distance: "1 km from Fort",
      rating: "4.2/5",
      amenities: ["Heritage Stay", "Home Food", "City Tour", "Garden"]
    }
  ];

  const lodges = [
    {
      id: 1,
      type: "lodge",
      name: "Town Center Lodge",
      contact: "+91-97415-67896",
      foodPrice: "₹250 - ₹500",
      address: "Madikeri Main Road, Coorg",
      mapUrl: "https://maps.google.com/?q=Town+Center+Lodge+Madikeri",
      image: "http://localhost:5000/images/town-lodge.jpg",
      distance: "800 m from Fort",
      rating: "3.8/5",
      amenities: ["Budget Stay", "City Access", "Basic Amenities"]
    }
  ];

  const foodStalls = [
    {
      id: 1,
      type: "food",
      name: "Fort Street Food",
      image: "http://localhost:5000/images/fort-street-food.jpg",
      speciality: "Local Coorgi Snacks & Traditional Pandi Curry"
    }
  ];

  const handleItemClick = (item) => setSelectedItem(item);
  const handleBackToList = () => setSelectedItem(null);
  const handleFoodButtonClick = (item) => {
    alert(`Food Menu for ${item.name}\n\n🍽️ Price Range: ${item.foodPrice}\n📞 Contact: ${item.contact}\n📍 ${item.distance}`);
  };

  const handleTicketChange = (type, value) => {
    setTicketDetails(prev => ({
      ...prev,
      [type]: Math.max(0, value)
    }));
  };

  const calculateTotal = () => {
    return (ticketDetails.adults * coorgData.ticketPrices.adult) + 
           (ticketDetails.children * coorgData.ticketPrices.child);
  };

  if (selectedItem && selectedItem.type !== "food") {
    return (
      <div style={{ position: "relative", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={handleBackToList} style={{ position: "absolute", top: 12, left: 12, background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: 16, cursor: "pointer" }}>← Back to List</button>
        <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>{selectedItem.name}</h2>
        <div style={{ position: "relative" }}>
          <img src={selectedItem.image} alt={selectedItem.name} style={{ width: "100%", maxWidth: "400px", height: "200px", borderRadius: "5px", objectFit: "cover", marginBottom: "10px" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "http://localhost:5000/images/default.jpg"; }} />
          <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.9)", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>⭐ {selectedItem.rating}</div>
        </div>
        <div style={{ textAlign: "left", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px", border: "1px solid #eee", marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "15px" }}>{selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Information</h3>
          <div style={{ marginBottom: "10px" }}><strong>📞 Contact:</strong> {selectedItem.contact}</div>
          <div style={{ marginBottom: "10px" }}><strong>📍 Address:</strong> {selectedItem.address}</div>
          <div style={{ marginBottom: "10px" }}><strong>📏 Distance:</strong> {selectedItem.distance}</div>
          <div style={{ marginBottom: "15px" }}><strong>🍽️ Food Price Range:</strong> {selectedItem.foodPrice}</div>
          <div style={{ marginBottom: "15px" }}><strong>🏨 Amenities:</strong><div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" }}>{selectedItem.amenities.map((amenity, index) => (<span key={index} style={{ background: "#e9ecef", padding: "4px 8px", borderRadius: "12px", fontSize: "12px" }}>{amenity}</span>))}</div></div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={() => window.open(selectedItem.mapUrl, '_blank')} style={{ padding: "10px 20px", backgroundColor: "#4285f4", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}>📍 View on Google Maps</button>
            <button onClick={() => handleFoodButtonClick(selectedItem)} style={{ padding: "10px 20px", backgroundColor: "#34a853", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}>🍽️ Food Menu</button>
            <button onClick={() => window.open(`tel:${selectedItem.contact}`)} style={{ padding: "10px 20px", backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "5px" }}>📞 Call Now</button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedItem && selectedItem.type === "food") {
    return (
      <div style={{ position: "relative", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
        <button onClick={handleBackToList} style={{ position: "absolute", top: 12, left: 12, background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: 16, cursor: "pointer" }}>← Back to List</button>
        <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>{selectedItem.name}</h2>
        <img src={selectedItem.image} alt={selectedItem.name} style={{ width: "100%", maxWidth: "400px", height: "250px", borderRadius: "5px", objectFit: "cover", marginBottom: "20px" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "http://localhost:5000/images/default.jpg"; }} />
        <div style={{ textAlign: "left", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px", border: "1px solid #eee" }}>
          <h3 style={{ marginBottom: "15px" }}>Food Speciality</h3>
          <div style={{ padding: "15px", backgroundColor: "white", borderRadius: "5px", border: "1px solid #ddd" }}><p style={{ margin: 0, fontSize: "16px", color: "#2c5530" }}>🍛 <strong>{selectedItem.speciality}</strong></p></div>
          <div style={{ marginTop: "20px", color: "#666" }}><p>📍 <strong>Location:</strong> Near Madikeri Fort, City Center</p><p>🕒 <strong>Timing:</strong> 8:00 AM - 10:00 PM</p><p>💰 <strong>Price Range:</strong> ₹50 - ₹300</p></div>
        </div>
      </div>
    );
  }

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
      case "HOTEL": return "🏨 Hotels Near Madikeri Fort";
      case "Homestay": return "🏡 Homestays Near Madikeri Fort";
      case "Lodge": return "🛖 Lodges Near Madikeri Fort";
      case "Food Stall": return "🍽️ Food Stalls Near Madikeri Fort";
      default: return "";
    }
  };

  const currentData = getCurrentData();

  return (
    <div style={{ position: "relative", textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 12, left: 12, background: "#fff", border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: 16, cursor: "pointer" }}>← Back</button>
      <h2 style={{ marginTop: "40px", marginBottom: "10px", fontSize: "24px", fontWeight: "bold", color: "#2c5530" }}>{coorgData.name}</h2>
      <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px" }}>{coorgData.description}</p>

      <div style={{ marginBottom: "30px", position: "relative", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
        <img src={coorgData.images[currentSlide]} alt={`${coorgData.name} ${currentSlide + 1}`} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "http://localhost:5000/images/default.jpg"; }} />
        <div style={{ position: "absolute", bottom: "15px", right: "15px", display: "flex", gap: "8px" }}>{coorgData.images.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} style={{ width: "12px", height: "12px", borderRadius: "50%", border: "none", backgroundColor: currentSlide === index ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />))}</div>
      </div>

      <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px", border: "1px solid #eee", marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "bold", color: "#2c5530", textAlign: "center" }}>📍 Location & Details</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "20px" }}>
          <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#2c5530" }}>🗺️ Location</h4>
            <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#666" }}>{coorgData.location}</p>
            <button onClick={() => window.open(coorgData.mapUrl, '_blank')} style={{ padding: "10px 15px", backgroundColor: "#4285f4", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>📍 Open in Google Maps</button>
          </div>
          <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h4 style={{ margin: "0 0 15px 0", color: "#2c5530" }}>🎫 Ticket Details</h4>
            <div style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}><span>Adult: ₹{coorgData.ticketPrices.adult}</span><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><button onClick={() => handleTicketChange('adults', ticketDetails.adults - 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>-</button><span>{ticketDetails.adults}</span><button onClick={() => handleTicketChange('adults', ticketDetails.adults + 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>+</button></div></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Child: ₹{coorgData.ticketPrices.child}</span><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><button onClick={() => handleTicketChange('children', ticketDetails.children - 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>-</button><span>{ticketDetails.children}</span><button onClick={() => handleTicketChange('children', ticketDetails.children + 1)} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #ccc", background: "white", cursor: "pointer" }}>+</button></div></div>
            </div>
            <div style={{ padding: "10px", backgroundColor: "#e8f5e8", borderRadius: "6px", textAlign: "center" }}><strong>Total: ₹{calculateTotal()}</strong></div>
          </div>
          <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#2c5530" }}>🕒 Timing</h4>
            <button onClick={() => setShowTiming(!showTiming)} style={{ padding: "10px 15px", backgroundColor: showTiming ? "#2c5530" : "#f0f0f0", color: showTiming ? "white" : "#333", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", width: "100%", transition: "all 0.3s ease" }}>{showTiming ? "Hide Weekly Timing" : "Show Weekly Timing"}</button>
            {showTiming && (<div style={{ marginTop: "15px" }}>{Object.entries(coorgData.timing).map(([day, time]) => (<div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: "14px" }}><span style={{ fontWeight: "bold" }}>{day}:</span><span>{time}</span></div>))}</div>)}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
        {["HOTEL", "Homestay", "Food Stall", "Lodge"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "12px 20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: activeTab === tab ? "#2c5530" : "#f5f5f5", color: activeTab === tab ? "white" : "black", cursor: "pointer", fontSize: "14px", fontWeight: "bold", transition: "all 0.3s" }}>{tab}</button>
        ))}
      </div>

      <div style={{ textAlign: "left", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "5px", border: "1px solid #eee" }}>
        <h3 style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold", color: "#2c5530" }}>{getSectionTitle()}</h3>
        {activeTab === "Food Stall" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
            {currentData.map((stall) => (
              <div key={stall.id} onClick={() => handleItemClick(stall)} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", textAlign: "center" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"; }}>
                <img src={stall.image} alt={stall.name} style={{ width: "100%", height: "120px", borderRadius: "5px", objectFit: "cover", marginBottom: "10px" }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "http://localhost:5000/images/default.jpg"; }} />
                <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold", color: "#2c5530" }}>{stall.name}</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{stall.speciality}</p>
              </div>
            ))}
          </div>
        ) : (
          currentData.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item)} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "15px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8f9fa"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: "bold", color: "#2c5530" }}>{item.name}</h4>
                <span style={{ background: "#2c5530", color: "white", padding: "2px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>⭐ {item.rating}</span>
              </div>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>📍 {item.distance}</div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                <div style={{ marginBottom: "4px" }}><strong>📞 Contact:</strong> {item.contact}</div>
                <div style={{ marginBottom: "4px" }}><strong>🍽️ Food Price:</strong> {item.foodPrice}</div>
                <div style={{ marginBottom: "8px" }}><strong>📍 Address:</strong> {item.address}</div>
              </div>
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#2c5530", fontWeight: "bold" }}>👆 Click to view details, map and food menu →</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
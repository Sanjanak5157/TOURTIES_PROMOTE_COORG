
// import React, { useState, useEffect } from "react";
// import PlaceGrid from "./components/PlaceGrid";
// import PlaceDetail from "./components/PlaceDetail";
// import RajaSeatDetail from "./components/RajaSeatDetail";
// import PlacesToGoPage from "./components/PlacesToGoPage";
// import CitiesPage from "./components/CitiesPage";
// import ThingsToDoPage from "./components/ThingsToDoPage";
// import ReviewsPage from "./components/ReviewsPage";
// import { fetchPlaces } from "./api";
// import ChikliholeDetail from "./components/ChikliholeDetail";
// import NagarholeDetail from "./components/NagarholeDetail";
// import GoldenTempleDetail from "./components/GoldenTempleDetail";
// import DubareDetail from "./components/DubareDetail";
// import TalakaveriDetail from "./components/TalakaveriDetail";
// import MadikeriFortDetail from "./components/MadikeriFortDetail";
// import IruppuFallsDetail from "./components/IruppuFallsDetail";
// import TadiandamolDetail from "./components/TadiandamolDetail";
// import MandalpattiDetail from "./components/MandalpattiDetail";
// import HonnamanaKereDetail from "./components/HonnamanaKereDetail";

// export default function App() {
//   const [places, setPlaces] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [q, setQ] = useState("");
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [currentPage, setCurrentPage] = useState("home"); // 'home', 'places', 'cities', 'things', 'reviews', 'place-detail'

//   // Coorg places slideshow data
//   const coorgSlides = [
//     {
//       id: 1,
//       name: "Abbey Falls",
//       image: "http://localhost:5000/images/abbey-falls.jpg",
//       description: "Beautiful waterfall in the Brahmagiri Range"
//     },
//     {
//       id: 2,
//       name: "Raja Seat",
//       image: "http://localhost:5000/images/raja_seat.jpg",
//       description: "Famous sunset viewpoint in Madikeri"
//     },
//     {
//       id: 3,
//       name: "Golden Temple",
//       image: "http://localhost:5000/images/golden-temple.jpg",
//       description: "Namdroling Monastery Buddhist temple"
//     },
//     {
//       id: 4,
//       name: "Coffee Plantation",
//       image: "http://localhost:5000/images/coffee-plantation.jpg",
//       description: "Lush coffee estates of Coorg"
//     },
//     {
//       id: 5,
//       name: "Tadiandamol Peak",
//       image: "http://localhost:5000/images/tadiandamol.jpg",
//       description: "Highest peak in Coorg with stunning views"
//     },
//     {
//       id: 6,
//       name: "Nagarhole National Park",
//       image: "http://localhost:5000/images/nagarhole-national-park.jpg",
//       description: "A protected wildlife area in Karnataka and known as Rajiv Gandhi National Park"
//     }
//   ];

//   // Things to Do categories with backend images
//   const thingsToDo = [
//     {
//       category: "Outdoor Activities",
//       items: [
//         {
//           name: "Trekking in Coorg",
//           description: "Explore the beautiful trails and hills of Coorg",
//           image: "http://localhost:5000/images/trekking-coorg.jpg"
//         },
//         {
//           name: "River Rafting",
//           description: "Adventure sports in Coorg's rivers",
//           image: "http://localhost:5000/images/river-rafting.jpg"
//         }
//       ]
//     },
//     {
//       category: "Climbing",
//       items: [
//         {
//           name: "Rock Climbing",
//           description: "Adventure climbing in Coorg's hills",
//           image: "http://localhost:5000/images/rock-climbing.jpg"
//         }
//       ]
//     },
//     {
//       category: "Must-see Nature Attractions",
//       items: [
//         {
//           name: "Coffee Plantation Tour",
//           description: "Walk through lush coffee estates",
//           image: "http://localhost:5000/images/coffee-tour.jpg"
//         },
//         {
//           name: "Wildlife Safari",
//           description: "Explore Nagarhole National Park",
//           image: "http://localhost:5000/images/wildlife-safari.jpg"
//         }
//       ]
//     },
//     {
//       category: "Art & Culture",
//       items: [
//         {
//           name: "Coorgi Culture",
//           description: "Experience traditional Kodava culture",
//           image: "http://localhost:5000/images/coorg-culture.jpg"
//         },
//         {
//           name: "Traditional Dance",
//           description: "Watch traditional Kodava dance performances",
//           image: "http://localhost:5000/images/traditional-dance.jpg"
//         }
//       ]
//     },
//     {
//       category: "Food and Drink",
//       items: [
//         {
//           name: "Coorgi Cuisine",
//           description: "Taste authentic Pandi Curry and other delicacies",
//           image: "http://localhost:5000/images/coorg-cuisine.jpg"
//         },
//         {
//           name: "Coffee Tasting",
//           description: "Experience fresh Coorg coffee",
//           image: "http://localhost:5000/images/coffee-tasting.jpg"
//         }
//       ]
//     },
//     {
//       category: "Family Fun",
//       items: [
//         {
//           name: "Toy Train Ride",
//           description: "Enjoy scenic toy train rides",
//           image: "http://localhost:5000/images/toy-train.jpg"
//         },
//         {
//           name: "Boating",
//           description: "Relaxing boat rides in Coorg's lakes",
//           image: "http://localhost:5000/images/boating.jpg"
//         }
//       ]
//     }
//   ];

//   // Main cities in Coorg
//   const coorgCities = [
//     {
//       name: "Madikeri",
//       description: "The capital city of Coorg district",
//       image: "http://localhost:5000/images/madikeri.jpg"
//     },
//     {
//       name: "Kushalnagar",
//       description: "Famous for Tibetan settlements and monasteries",
//       image: "http://localhost:5000/images/kushalnagar.jpg"
//     },
//     {
//       name: "Virajpet",
//       description: "Scenic town in southern Coorg",
//       image: "http://localhost:5000/images/virajpet.jpg"
//     },
//     {
//       name: "Somwarpet",
//       description: "Known for coffee plantations and spice gardens",
//       image: "http://localhost:5000/images/somwarpet.jpg"
//     }
//   ];

//   // Auto slide change every 10 seconds
//   useEffect(() => {
//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % coorgSlides.length);
//     }, 10000);

//     return () => clearInterval(slideInterval);
//   }, [coorgSlides.length]);

//   // Load data from backend
//   useEffect(() => {
//     fetchPlaces().then(setPlaces).catch(() => setPlaces([]));
//   }, []);

//   // Filter places to avoid duplicates - only show unique places
//   const uniquePlaces = Array.from(new Map(places.map(place => [place.name, place])).values());
  
//   const filtered = uniquePlaces.filter((p) =>
//     (p.name || "").toLowerCase().includes(q.toLowerCase())
//   );

//   const handlePlaceClick = (place) => {
//     setSelected(place);
//     setCurrentPage("place-detail");
//   };

//   // Render different pages based on currentPage state
//   if (currentPage === "places") {
//     return <PlacesToGoPage 
//       onBack={() => setCurrentPage("home")} 
//       places={coorgSlides}
//       onPlaceClick={handlePlaceClick}
//     />;
//   }

//   if (currentPage === "cities") {
//     return <CitiesPage onBack={() => setCurrentPage("home")} />;
//   }

//   if (currentPage === "things") {
//     return <ThingsToDoPage onBack={() => setCurrentPage("home")} />;
//   }

//   if (currentPage === "reviews") {
//     return <ReviewsPage onBack={() => setCurrentPage("home")} />;
//   }

//   if (currentPage === "place-detail" && selected) {
//     // Special case for Raja's Seat
//     if (selected.name === "Raja Seat") {
//       return <RajaSeatDetail onBack={() => {
//         setSelected(null);
//         setCurrentPage("home");
//       }} />;
//     }
    
//     // Regular place detail page
//     return <PlaceDetail 
//       place={selected} 
//       onBack={() => {
//         setSelected(null);
//         setCurrentPage("home");
//       }} 
//     />;
//   }

//   // HOME PAGE - All your existing code remains the same below
//   return (
//     <div style={{ 
//       fontFamily: "Arial, sans-serif",
//       minHeight: "100vh",
//       overflowX: "hidden",
//       backgroundColor: "#f5f5f5"
//     }}>
//       {/* Coorg Slideshow Section - FULL SCREEN WIDTH */}
//       <div style={{ 
//         width: "100%",
//         position: "relative",
//         marginBottom: "30px"
//       }}>
//         <div style={{
//           position: "relative",
//           width: "100%",
//           overflow: "hidden"
//         }}>
//           {/* Slide Image - Full Screen Width */}
//           <img
//             src={coorgSlides[currentSlide].image}
//             alt={coorgSlides[currentSlide].name}
//             style={{
//               width: "100%",
//               height: "350px",
//               objectFit: "cover",
//               display: "block"
//             }}
//             onError={(e) => {
//               e.currentTarget.src = "http://localhost:5000/images/default.jpg";
//             }}
//           />
          
//           {/* Dark Overlay for Better Text Readability */}
//           <div style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
//           }}></div>
          
//           {/* Left Corner Title */}
//           <div style={{
//             position: "absolute",
//             top: "20px",
//             left: "40px",
//             color: "white",
//             textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
//           }}>
//             <h1 style={{
//               margin: 0,
//               fontSize: "36px",
//               fontWeight: "bold",
//               fontStyle: "italic"
//             }}>
//               Visit Coorg
//             </h1>
//           </div>

//           {/* Center Title */}
//           <div style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "white",
//             textAlign: "center",
//             textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
//           }}>
//             <h1 style={{
//               margin: 0,
//               fontSize: "48px",
//               fontWeight: "bold",
//               fontStyle: "italic"
//             }}>
//               Make Life an Adventure Welcome to Coorg
//             </h1>
//           </div>

//           {/* Slide Overlay Text */}
//           <div style={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             right: 0,
//             color: "white",
//             padding: "30px 40px",
//             textAlign: "left"
//           }}>
//             <h2 style={{ 
//               margin: "0 0 10px 0",
//               fontSize: "32px",
//               fontWeight: "bold",
//               textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
//             }}>
//               {coorgSlides[currentSlide].name}
//             </h2>
//             <p style={{ 
//               margin: 0,
//               fontSize: "18px",
//               opacity: 0.95,
//               textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
//               maxWidth: "600px"
//             }}>
//               {coorgSlides[currentSlide].description}
//             </p>
//           </div>

//           {/* Slide Indicators */}
//           <div style={{
//             position: "absolute",
//             bottom: "25px",
//             right: "40px",
//             display: "flex",
//             gap: "10px"
//           }}>
//             {coorgSlides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 style={{
//                   width: "14px",
//                   height: "14px",
//                   borderRadius: "50%",
//                   border: "none",
//                   backgroundColor: currentSlide === index ? "#fff" : "rgba(255,255,255,0.5)",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
//                 }}
//               />
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev - 1 + coorgSlides.length) % coorgSlides.length)}
//             style={{
//               position: "absolute",
//               left: "30px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "rgba(255,255,255,0.9)",
//               border: "none",
//               borderRadius: "50%",
//               width: "60px",
//               height: "60px",
//               fontSize: "24px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//               transition: "all 0.3s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = "rgba(255,255,255,1)";
//               e.target.style.transform = "translateY(-50%) scale(1.1)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.9)";
//               e.target.style.transform = "translateY(-50%) scale(1)";
//             }}
//           >
//             ‹
//           </button>
//           <button
//             onClick={() => setCurrentSlide((prev) => (prev + 1) % coorgSlides.length)}
//             style={{
//               position: "absolute",
//               right: "30px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               background: "rgba(255,255,255,0.9)",
//               border: "none",
//               borderRadius: "50%",
//               width: "60px",
//               height: "60px",
//               fontSize: "24px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//               transition: "all 0.3s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.background = "rgba(255,255,255,1)";
//               e.target.style.transform = "translateY(-50%) scale(1.1)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.background = "rgba(255,255,255,0.9)";
//               e.target.style.transform = "translateY(-50%) scale(1)";
//             }}
//           >
//             ›
//           </button>
//         </div>
//       </div>

//       {/* Quick Access Sections Below Slideshow */}
//       <div style={{
//         maxWidth: "1200px",
//         margin: "0 auto 30px auto",
//         padding: "0 20px"
//       }}>
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//           gap: "20px"
//         }}>
//           {/* Places to Go */}
//           <div style={{
//             backgroundColor: "white",
//             padding: "25px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//             border: "2px solid transparent"
//           }}
//           onClick={() => setCurrentPage("places")}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-5px)";
//             e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//             e.currentTarget.style.borderColor = "#2c5530";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//             e.currentTarget.style.borderColor = "transparent";
//           }}
//           >
//             <h3 style={{
//               margin: "0 0 15px 0",
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#2c5530",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px"
//             }}>
//               🗺️ Places to Go
//             </h3>
//             <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
//               Discover all tourist places in Coorg with detailed information
//             </p>
//           </div>

//           {/* Visit Our Cities */}
//           <div style={{
//             backgroundColor: "white",
//             padding: "25px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//             border: "2px solid transparent"
//           }}
//           onClick={() => setCurrentPage("cities")}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-5px)";
//             e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//             e.currentTarget.style.borderColor = "#2c5530";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//             e.currentTarget.style.borderColor = "transparent";
//           }}
//           >
//             <h3 style={{
//               margin: "0 0 15px 0",
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#2c5530",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px"
//             }}>
//               🏙️ Visit Our Cities
//             </h3>
//             <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
//               Explore the main cities and towns in Coorg district
//             </p>
//           </div>

//           {/* Things to Do */}
//           <div style={{
//             backgroundColor: "white",
//             padding: "25px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             cursor: "pointer",
//             transition: "all 0.3s ease",
//             border: "2px solid transparent"
//           }}
//           onClick={() => setCurrentPage("things")}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-5px)";
//             e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//             e.currentTarget.style.borderColor = "#2c5530";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//             e.currentTarget.style.borderColor = "transparent";
//           }}
//           >
//             <h3 style={{
//               margin: "0 0 15px 0",
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#2c5530",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px"
//             }}>
//               🎯 Things to Do
//             </h3>
//             <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
//               Discover activities and experiences in Coorg
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div style={{
//         maxWidth: "1200px",
//         margin: "0 auto",
//         padding: "0 20px 20px 20px"
//       }}>
//         {!selected && (
//           <>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: "25px",
//                 gap: "15px"
//               }}
//             >
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Search places in Coorg..."
//                 style={{
//                   flex: 1,
//                   padding: "12px 16px",
//                   borderRadius: "25px",
//                   fontSize: "16px",
//                   border: "2px solid #e0e0e0",
//                   outline: "none",
//                   transition: "all 0.3s ease"
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = "#2c5530";
//                   e.target.style.boxShadow = "0 0 0 3px rgba(44, 85, 48, 0.1)";
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = "#e0e0e0";
//                   e.target.style.boxShadow = "none";
//                 }}
//               />
//               <button
//                 onClick={() => setCurrentPage("reviews")}
//                 style={{
//                   padding: "12px 24px",
//                   borderRadius: "25px",
//                   fontSize: "16px",
//                   backgroundColor: "#2c5530",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   transition: "all 0.3s ease",
//                   whiteSpace: "nowrap"
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#1e3a1f";
//                   e.target.style.transform = "translateY(-2px)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#2c5530";
//                   e.target.style.transform = "translateY(0)";
//                 }}
//               >
//                 Reviews
//               </button>
//             </div>

//             <h3 style={{
//               marginBottom: "20px",
//               color: "#2c5530",
//               fontSize: "24px",
//               fontWeight: "bold",
//               borderBottom: "2px solid #e0e0e0",
//               paddingBottom: "10px"
//             }}>
//               List of Places in Coorg
//             </h3>
            
//             {filtered.length > 0 ? (
//               <PlaceGrid places={filtered} onOpen={handlePlaceClick} />
//             ) : (
//               <div style={{
//                 textAlign: "center",
//                 padding: "40px",
//                 color: "#666",
//                 fontSize: "18px"
//               }}>
//                 {q ? `No places found for "${q}"` : "No places available"}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
// // 219 
// // 263
import React, { useState, useEffect } from "react";
import PlaceGrid from "./components/PlaceGrid";
import PlaceDetail from "./components/PlaceDetail";
import RajaSeatDetail from "./components/RajaSeatDetail";
import PlacesToGoPage from "./components/PlacesToGoPage";
import CitiesPage from "./components/CitiesPage";
import ThingsToDoPage from "./components/ThingsToDoPage";
import ReviewsPage from "./components/ReviewsPage";
import { fetchPlaces } from "./api";

// Import all the new detail components
import ChikliholeDetail from "./components/ChikliholeDetail";
import NagarholeDetail from "./components/NagarholeDetail";
import GoldenTempleDetail from "./components/GoldenTempleDetail";
import DubareDetail from "./components/DubareDetail";
import TalakaveriDetail from "./components/TalakaveriDetail";
import MadikeriFortDetail from "./components/MadikeriFortDetail";
import IruppuFallsDetail from "./components/IruppuFallsDetail";
import TadiandamolDetail from "./components/TadiandamolDetail";
import MandalpattiDetail from "./components/MandalpattiDetail";
import HonnamanaKereDetail from "./components/HonnamanaKereDetail";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [q, setQ] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'places', 'cities', 'things', 'reviews', 'place-detail'

  // Coorg places slideshow data
  const coorgSlides = [
    {
      id: 1,
      name: "Abbey Falls",
      image: "http://localhost:5000/images/abbey-falls.jpg",
      description: "Beautiful waterfall in the Brahmagiri Range"
    },
    {
      id: 2,
      name: "Raja Seat",
      image: "http://localhost:5000/images/raja_seat.jpg",
      description: "Famous sunset viewpoint in Madikeri"
    },
    {
      id: 3,
      name: "Golden Temple",
      image: "http://localhost:5000/images/golden-temple.jpg",
      description: "Namdroling Monastery Buddhist temple"
    },
    {
      id: 4,
      name: "Coffee Plantation",
      image: "http://localhost:5000/images/coffee-plantation.jpg",
      description: "Lush coffee estates of Coorg"
    },
    {
      id: 5,
      name: "Tadiandamol Peak",
      image: "http://localhost:5000/images/tadiandamol.jpg",
      description: "Highest peak in Coorg with stunning views"
    },
    {
      id: 6,
      name: "Nagarhole National Park",
      image: "http://localhost:5000/images/nagarhole-national-park.jpg",
      description: "A protected wildlife area in Karnataka and known as Rajiv Gandhi National Park"
    }
  ];

  // Things to Do categories with backend images
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
          description: "Explore the beautiful trails and hills of Coorg",
          image: "http://localhost:5000/images/trekking-coorg.jpg"
        },
        {
          name: "River Rafting",
          description: "Adventure sports in Coorg's rivers",
          image: "http://localhost:5000/images/river-rafting.jpg"
        }
      ]
    },
    {
      category: "Climbing",
      items: [
        {
          name: "Rock Climbing",
          description: "Adventure climbing in Coorg's hills",
          image: "http://localhost:5000/images/rock-climbing.jpg"
        }
      ]
    },
    {
      category: "Must-see Nature Attractions",
      items: [
        {
          name: "Coffee Plantation Tour",
          description: "Walk through lush coffee estates",
          image: "http://localhost:5000/images/coffee-tour.jpg"
        },
        {
          name: "Wildlife Safari",
          description: "Explore Nagarhole National Park",
          image: "http://localhost:5000/images/wildlife-safari.jpg"
        }
      ]
    },
    {
      category: "Art & Culture",
      items: [
        {
          name: "Coorgi Culture",
          description: "Experience traditional Kodava culture",
          image: "http://localhost:5000/images/coorg-culture.jpg"
        },
        {
          name: "Traditional Dance",
          description: "Watch traditional Kodava dance performances",
          image: "http://localhost:5000/images/traditional-dance.jpg"
        }
      ]
    },
    {
      category: "Food and Drink",
      items: [
        {
          name: "Coorgi Cuisine",
          description: "Taste authentic Pandi Curry and other delicacies",
          image: "http://localhost:5000/images/coorg-cuisine.jpg"
        },
        {
          name: "Coffee Tasting",
          description: "Experience fresh Coorg coffee",
          image: "http://localhost:5000/images/coffee-tasting.jpg"
        }
      ]
    },
    {
      category: "Family Fun",
      items: [
        {
          name: "Toy Train Ride",
          description: "Enjoy scenic toy train rides",
          image: "http://localhost:5000/images/toy-train.jpg"
        },
        {
          name: "Boating",
          description: "Relaxing boat rides in Coorg's lakes",
          image: "http://localhost:5000/images/boating.jpg"
        }
      ]
    }
  ];

  // Main cities in Coorg
  const coorgCities = [
    {
      name: "Madikeri",
      description: "The capital city of Coorg district",
      image: "http://localhost:5000/images/madikeri.jpg"
    },
    {
      name: "Kushalnagar",
      description: "Famous for Tibetan settlements and monasteries",
      image: "http://localhost:5000/images/kushalnagar.jpg"
    },
    {
      name: "Virajpet",
      description: "Scenic town in southern Coorg",
      image: "http://localhost:5000/images/virajpet.jpg"
    },
    {
      name: "Somwarpet",
      description: "Known for coffee plantations and spice gardens",
      image: "http://localhost:5000/images/somwarpet.jpg"
    }
  ];

  // Auto slide change every 10 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coorgSlides.length);
    }, 10000);

    return () => clearInterval(slideInterval);
  }, [coorgSlides.length]);

  // Load data from backend
  useEffect(() => {
    fetchPlaces().then(setPlaces).catch(() => setPlaces([]));
  }, []);

  // Filter places to avoid duplicates - only show unique places
  const uniquePlaces = Array.from(new Map(places.map(place => [place.name, place])).values());
  
  const filtered = uniquePlaces.filter((p) =>
    (p.name || "").toLowerCase().includes(q.toLowerCase())
  );

  // const handlePlaceClick = (place) => {
  //   setSelected(place);
  //   setCurrentPage("place-detail");
  // };
  const handlePlaceClick = (place) => {
  console.log("🟢 CLICKED PLACE:", place.name);
  console.log("🟢 Place ID:", place.id);
  console.log("🟢 Full place object:", place);
  setSelected(place);
  setCurrentPage("place-detail");
};

  // Render different pages based on currentPage state
  if (currentPage === "places") {
    return <PlacesToGoPage 
      onBack={() => setCurrentPage("home")} 
      places={coorgSlides}
      onPlaceClick={handlePlaceClick}
    />;
  }

  if (currentPage === "cities") {
    return <CitiesPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "things") {
    return <ThingsToDoPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "reviews") {
    return <ReviewsPage onBack={() => setCurrentPage("home")} />;
  }

  if (currentPage === "place-detail" && selected) {
    // Route to specific detail components based on place name
    switch(selected.name) {
      case "Raja Seat":
        return <RajaSeatDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Chiklihole Reservoir":
        return <ChikliholeDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Nagarhole National Park":
        return <NagarholeDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Golden Temple":
        return <GoldenTempleDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Dubare Elephant Camp":
        return <DubareDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Talakaveri":
        return <TalakaveriDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Madikeri Fort":
        return <MadikeriFortDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Iruppu Falls":
        return <IruppuFallsDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Tadiandamol Peak":
        return <TadiandamolDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Mandalpatti Viewpoint":
        return <MandalpattiDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      case "Honnamana Kere Lake":
        return <HonnamanaKereDetail onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
      default:
        // Regular place detail page for Abbey Falls and others
        return <PlaceDetail place={selected} onBack={() => { setSelected(null); setCurrentPage("home"); }} />;
    }
  }
// ---------------------------------------------------------
// const formData = new FormData();
// formData.append('video', videoFile); // required
// formData.append('place_id', '1'); // optional
// formData.append('hotel_id', '2'); // optional
// formData.append('title', 'My Travel Video'); // optional
// formData.append('description', 'Beautiful scenery from my trip'); // optional

// fetch('http://localhost:5000/api/videos', {
//     method: 'POST',
//     body: formData
// })
// .then(response => response.json())
// .then(data => {
//     console.log('Upload success:', data);
//     // Video will be available at: http://localhost:5000/videos/filename.mp4
// })
// .catch(error => {
//     console.error('Upload failed:', error);
// });

// -------------------------------------------------------------------------

  // HOME PAGE - All your existing code remains the same below
  return (
    <div style={{ 
      fontFamily: "Arial, sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
      backgroundColor: "#f5f5f5"
    }}>
      {/* Coorg Slideshow Section - FULL SCREEN WIDTH */}
      <div style={{ 
        width: "100%",
        position: "relative",
        marginBottom: "30px"
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          overflow: "hidden"
        }}>
          {/* Slide Image - Full Screen Width */}
          <img
            src={coorgSlides[currentSlide].image}
            alt={coorgSlides[currentSlide].name}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              display: "block"
            }}
            onError={(e) => {
              e.currentTarget.src = "http://localhost:5000/images/default.jpg";
            }}
          />
          
          {/* Dark Overlay for Better Text Readability */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
          }}></div>
          
          {/* Left Corner Title */}
          <div style={{
            position: "absolute",
            top: "20px",
            left: "40px",
            color: "white",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: "bold",
              fontStyle: "italic"
            }}>
              Visit Coorg
            </h1>
          </div>

          {/* Center Title */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
          }}>
            <h1 style={{
              margin: 0,
              fontSize: "48px",
              fontWeight: "bold",
              fontStyle: "italic"
            }}>
              Make Life an Adventure Welcome to Coorg
            </h1>
          </div>

          {/* Slide Overlay Text */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            color: "white",
            padding: "30px 40px",
            textAlign: "left"
          }}>
            <h2 style={{ 
              margin: "0 0 10px 0",
              fontSize: "32px",
              fontWeight: "bold",
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)"
            }}>
              {coorgSlides[currentSlide].name}
            </h2>
            <p style={{ 
              margin: 0,
              fontSize: "18px",
              opacity: 0.95,
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
              maxWidth: "600px"
            }}>
              {coorgSlides[currentSlide].description}
            </p>
          </div>

          {/* Slide Indicators */}
          <div style={{
            position: "absolute",
            bottom: "25px",
            right: "40px",
            display: "flex",
            gap: "10px"
          }}>
            {coorgSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: currentSlide === index ? "#fff" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.4)"
                }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + coorgSlides.length) % coorgSlides.length)}
            style={{
              position: "absolute",
              left: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,1)";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.9)";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % coorgSlides.length)}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,1)";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.9)";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Quick Access Sections Below Slideshow */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto 30px auto",
        padding: "0 20px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {/* Places to Go */}
          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "2px solid transparent"
          }}
          onClick={() => setCurrentPage("places")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            e.currentTarget.style.borderColor = "#2c5530";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
          >
            <h3 style={{
              margin: "0 0 15px 0",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#2c5530",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              🗺️ Places to Go
            </h3>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Discover all tourist places in Coorg with detailed information
            </p>
          </div>

          {/* Visit Our Cities */}
          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "2px solid transparent"
          }}
          onClick={() => setCurrentPage("cities")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            e.currentTarget.style.borderColor = "#2c5530";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
          >
            <h3 style={{
              margin: "0 0 15px 0",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#2c5530",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              🏙️ Visit Our Cities
            </h3>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Explore the main cities and towns in Coorg district
            </p>
          </div>

          {/* Things to Do */}
          <div style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "2px solid transparent"
          }}
          onClick={() => setCurrentPage("things")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            e.currentTarget.style.borderColor = "#2c5530";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            e.currentTarget.style.borderColor = "transparent";
          }}
          >
            <h3 style={{
              margin: "0 0 15px 0",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#2c5530",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              🎯 Things to Do
            </h3>
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
              Discover activities and experiences in Coorg
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px 20px 20px"
      }}>
        {!selected && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                gap: "15px"
              }}
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search places in Coorg..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "25px",
                  fontSize: "16px",
                  border: "2px solid #e0e0e0",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2c5530";
                  e.target.style.boxShadow = "0 0 0 3px rgba(44, 85, 48, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                onClick={() => setCurrentPage("reviews")}
                style={{
                  padding: "12px 24px",
                  borderRadius: "25px",
                  fontSize: "16px",
                  backgroundColor: "#2c5530",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#1e3a1f";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#2c5530";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Reviews
              </button>
            </div>

            <h3 style={{
              marginBottom: "20px",
              color: "#2c5530",
              fontSize: "24px",
              fontWeight: "bold",
              borderBottom: "2px solid #e0e0e0",
              paddingBottom: "10px"
            }}>
              List of Places in Coorg
            </h3>
            
            {filtered.length > 0 ? (
              <PlaceGrid places={filtered} onOpen={handlePlaceClick} />
            ) : (
              <div style={{
                textAlign: "center",
                padding: "40px",
                color: "#666",
                fontSize: "18px"
              }}>
                {q ? `No places found for "${q}"` : "No places available"}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
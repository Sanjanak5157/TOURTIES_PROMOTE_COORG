// import React from 'react'
// import PlaceCard from './PlaceCard'

// export default function PlaceGrid({places, onOpen}){
//   if(!places || places.length===0) return <div>No places found</div>
//   return (
//     <div className="grid">
//       {places.map(p => <PlaceCard key={p.id} place={p} onOpen={onOpen} />)}
//     </div>
//   )
// }
import React from "react";
import PlaceCard from "./PlaceCard";
import "./placegrid.css";

export default function PlaceGrid({ places, onOpen }) {
  return (
    <div className="place-grid">
      {places.map((p) => (
        <PlaceCard key={p.id} place={p} onOpen={onOpen} />
      ))}
    </div>
  );
}




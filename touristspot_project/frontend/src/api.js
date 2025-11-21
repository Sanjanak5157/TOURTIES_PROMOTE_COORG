const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchPlaces() {
  const res = await fetch(`${API_BASE}/places`);
  return res.json();
}
export async function fetchPlace(id){
  const res = await fetch(`${API_BASE}/place/${id}`);
  return res.json();
}
export async function fetchHotels(placeId){
  const res = await fetch(`${API_BASE}/place/${placeId}/hotels`);
  return res.json();
}
export async function fetchFoods(hotelId){
  const res = await fetch(`${API_BASE}/hotel/${hotelId}/foods`);
  return res.json();
}

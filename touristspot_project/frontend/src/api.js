const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';
// ------------------------------- API CALLS for chatbot--------------------------------
// Chatbot API functions
export const sendChatMessage = async (message) => {
  try {
    const response = await fetch('http://localhost:5000/api/chatbot/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Chatbot API error:', error);
    return {
      response: "I'm having trouble connecting. Here are some Coorg highlights: Visit Abbey Falls, try Pandi Curry, explore coffee plantations!",
      suggestions: ['Best places?', 'Weather info?', 'Hotels?']
    };
  }
};

export const getChatbotSuggestions = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/chatbot/suggestions');
    return await response.json();
  } catch (error) {
    console.error('Chatbot suggestions error:', error);
    return {
      suggestions: [
        "Best places in Coorg?",
        "Weather in December?",
        "Hotels in Madikeri?",
        "Local food to try?"
      ]
    };
  }
};
// ------------------------------- API CALLS END --------------------------------

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

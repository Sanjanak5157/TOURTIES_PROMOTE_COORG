import React, { useState, useEffect } from "react";

export default function ReviewsPage({ onBack }) {
  const [review, setReview] = useState({
    spotName: "",
    description: "",
    image: null
  });
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch existing reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setReview(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('spotName', review.spotName);
    formData.append('description', review.description);
    if (review.image) {
      formData.append('image', review.image);
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews(prev => [newReview, ...prev]);
        setReview({ spotName: "", description: "", image: null });
        setMessage("Review submitted successfully!");
        
        // Clear file input
        document.getElementById('imageInput').value = "";
        
        // Refresh reviews list
        fetchReviews();
      } else {
        setMessage("Error submitting review. Please try again.");
      }
    } catch (error) {
      setMessage("Error submitting review. Please try again.");
    }
  };

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

      <h1 style={{ color: "#2c5530", marginBottom: "30px" }}>✍️ Share Your Experience</h1>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px"
      }}>
        {/* Review Form */}
        <div>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ color: "#2c5530", margin: "0 0 20px 0" }}>Add Your Review</h3>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
                Spot Name *
              </label>
              <input
                type="text"
                name="spotName"
                value={review.spotName}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
                placeholder="Enter the name of the tourist spot"
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
                Description *
              </label>
              <textarea
                name="description"
                value={review.description}
                onChange={handleInputChange}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "16px",
                  resize: "vertical"
                }}
                placeholder="Share your experience and review..."
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#333" }}>
                Upload Image
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px"
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2c5530",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Submit Review
            </button>

            {message && (
              <p style={{ 
                marginTop: "15px", 
                padding: "10px",
                backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
                color: message.includes("success") ? "#155724" : "#721c24",
                borderRadius: "4px",
                textAlign: "center"
              }}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Recent Reviews */}
        <div>
          <h3 style={{ color: "#2c5530", margin: "0 0 20px 0" }}>Recent Reviews</h3>
          
          {reviews.length === 0 ? (
            <div style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              color: "#666"
            }}>
              No reviews yet. Be the first to share your experience!
            </div>
          ) : (
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {reviews.map((reviewItem) => (
                <div 
                  key={reviewItem.id}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "15px"
                  }}
                >
                  <h4 style={{ color: "#2c5530", margin: "0 0 10px 0" }}>{reviewItem.spot_name}</h4>
                  <p style={{ color: "#666", margin: "0 0 10px 0" }}>{reviewItem.description}</p>
                  {reviewItem.image_path && (
                    <img
                      src={`http://localhost:5000/images/${reviewItem.image_path}`}
                      alt={reviewItem.spot_name}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "6px"
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <p style={{ color: "#999", fontSize: "12px", margin: "10px 0 0 0" }}>
                    Posted on: {new Date(reviewItem.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
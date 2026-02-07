import numpy as np
import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import warnings
warnings.filterwarnings('ignore')

class CoorgChatbot:
    def __init__(self):
        self.model = None
        self.lemmatizer = WordNetLemmatizer()
        
        # Download NLTK data
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('wordnet', quiet=True)
        
        # Enhanced training data with specific place names
        self.training_data = [
            # Greetings
            {"text": "hello", "intent": "greeting", "response": "Hello! Welcome to Coorg Tourism Assistant. How can I help you today?"},
            {"text": "hi", "intent": "greeting", "response": "Hi there! I'm here to help you explore beautiful Coorg. What would you like to know?"},
            {"text": "hey", "intent": "greeting", "response": "Hey! Ready to discover Coorg? Ask me anything!"},
            
            # Specific Places - Abbey Falls
            {"text": "abbey falls", "intent": "abbey_falls", "response": "🌊 Abbey Falls is one of the most popular waterfalls in Coorg, located about 8 km from Madikeri. It's 70 feet high and surrounded by coffee plantations! Timings: 9:00 AM to 5:00 PM. Entry fee: ₹20 per person."},
            {"text": "tell me about abbey falls", "intent": "abbey_falls", "response": "🌊 Abbey Falls is a beautiful waterfall in the Brahmagiri Range near Madikeri. Best visited post-monsoon (October to December) when the water flow is maximum."},
            {"text": "how to reach abbey falls", "intent": "abbey_falls", "response": "🌊 Abbey Falls is 8 km from Madikeri town. Take a taxi or auto-rickshaw. It's well-marked and easy to find."},
            {"text": "abbey falls timings", "intent": "abbey_falls", "response": "🌊 Abbey Falls timings: 9:00 AM to 5:00 PM every day. Best time to visit is in the morning to avoid crowds."},
            
            # Specific Places - Raja Seat
            {"text": "raja seat", "intent": "raja_seat", "response": "🌅 Raja Seat is a famous sunset viewpoint in Madikeri with beautiful gardens and a toy train. Entry fee: ₹10 for adults, ₹5 for children. Timings: 6:00 AM to 7:00 PM."},
            {"text": "tell me about raja seat", "intent": "raja_seat", "response": "🌅 Raja Seat offers panoramic views of the valleys. It has musical fountains that operate in the evenings. Perfect for photography during sunset!"},
            {"text": "raja seat timing", "intent": "raja_seat", "response": "🌅 Raja Seat is open from 6:00 AM to 7:00 PM daily. Musical fountain show: 6:30 PM to 7:00 PM."},
            
            # Specific Places - Nagarhole
            {"text": "nagarhole", "intent": "nagarhole", "response": "🐘 Nagarhole National Park (Rajiv Gandhi National Park) is a UNESCO World Heritage Site. Safari timings: Morning 6:00 AM and Evening 3:00 PM. Bookings should be made in advance."},
            {"text": "nagarhole national park", "intent": "nagarhole", "response": "🐘 Nagarhole is famous for tigers, elephants, deer, and various bird species. Jeep safari costs around ₹300-500 per person."},
            {"text": "nagarhole safari", "intent": "nagarhole", "response": "🐘 Nagarhole Safari details: Morning slot: 6:00 AM - 9:00 AM, Evening slot: 3:00 PM - 6:00 PM. Closed on Tuesdays."},
            
            # Specific Places - Golden Temple
            {"text": "golden temple", "intent": "golden_temple", "response": "🕌 Golden Temple (Namdroling Monastery) in Bylakuppe has magnificent 40-foot golden statues of Buddha. Entry: Free. Timings: 9:00 AM to 6:00 PM."},
            {"text": "bylakuppe golden temple", "intent": "golden_temple", "response": "🕌 Bylakuppe's Golden Temple is the largest Tibetan settlement in South India. Photography allowed. Peaceful atmosphere perfect for meditation."},
            
            # Specific Places - Dubare
            {"text": "dubare", "intent": "dubare", "response": "🐘 Dubare Elephant Camp on River Cauvery offers elephant bathing, feeding, and rides. Timings: 9:00 AM to 5:30 PM. Elephant interaction: ₹1000-1500 per person."},
            {"text": "dubare elephant camp", "intent": "dubare", "response": "🐘 At Dubare, you can watch elephants being bathed by mahouts, feed them bananas, and learn about elephant conservation."},
            
            # Specific Places - Tadiandamol
            {"text": "tadiandamol", "intent": "tadiandamol", "response": "⛰️ Tadiandamol is the highest peak in Coorg (1,748 meters). Trek difficulty: Moderate. Duration: 4-5 hours up and down. Best to hire a local guide."},
            {"text": "tadiandamol trek", "intent": "tadiandamol", "response": "⛰️ Tadiandamol trek starts from Nalaknad Palace. Need permission from forest department. Best months: October to February."},
            
            # General Place Queries
            {"text": "what are the best places in coorg", "intent": "places", "response": "📍 Top 10 places in Coorg:\n1. Abbey Falls\n2. Raja Seat\n3. Nagarhole National Park\n4. Golden Temple\n5. Dubare Elephant Camp\n6. Tadiandamol Peak\n7. Madikeri Fort\n8. Iruppu Falls\n9. Mandalpatti\n10. Honnamana Kere Lake"},
            {"text": "places to visit in coorg", "intent": "places", "response": "📍 Must-visit: Abbey Falls (waterfall), Raja Seat (sunset), Nagarhole (wildlife), Golden Temple (culture), Dubare (elephants), Coffee Plantations (scenery)!"},
            {"text": "popular tourist spots", "intent": "places", "response": "📍 Most popular: Abbey Falls, Raja Seat, and Nagarhole National Park. These are the top 3 visited places in Coorg."},
            
            # Timing/Season
            {"text": "best time to visit coorg", "intent": "timing", "response": "📅 Best time: October to March (pleasant weather 15-25°C).\nMonsoon: June-September (lush greenery, rain).\nSummer: April-May (warm, 25-35°C)."},
            {"text": "weather in coorg", "intent": "timing", "response": "🌤️ Coorg climate:\n• Summer (Mar-May): 15-35°C\n• Monsoon (Jun-Sep): Heavy rain, 18-28°C\n• Winter (Oct-Feb): 10-25°C"},
            {"text": "coorg in december", "intent": "timing", "response": "🎄 December is perfect! Pleasant weather (10-25°C), clear skies, Christmas celebrations in resorts, ideal for all activities."},
            
            # Transportation
            {"text": "how to reach coorg", "intent": "transport", "response": "🚗 How to reach Coorg:\n✈️ Air: Mangalore (160 km) or Bangalore (260 km) airports\n🚂 Train: Mysore (120 km) station\n🚌 Road: KSRTC buses from Bangalore, Mysore, Mangalore"},
            {"text": "distance from bangalore to coorg", "intent": "transport", "response": "🗺️ Bangalore to Coorg: 250-270 km\n⏱️ Travel time: 5-6 hours by car\n🚌 Bus: Regular KSRTC buses (₹400-800)\n🚗 Taxi: ₹4000-6000 one way"},
            
            # Accommodation
            {"text": "hotels in coorg", "intent": "accommodation", "response": "🏨 Accommodation options:\n• Luxury Resorts: ₹8000-15000/night\n• Homestays: ₹2000-5000/night\n• Budget Hotels: ₹1000-3000/night\n• Popular areas: Madikeri, Kushalnagar"},
            {"text": "where to stay in madikeri", "intent": "accommodation", "response": "🏨 Madikeri hotels:\n• Luxury: The Windflower Resort, Taj Madikeri\n• Mid-range: Hotel Coorg International\n• Budget: Many homestays and guesthouses"},
            
            # Food
            {"text": "coorg food", "intent": "food", "response": "🍛 Must-try Coorgi dishes:\n• Pandi Curry (pork)\n• Kadambuttu (rice dumplings)\n• Bamboo Shoot Curry\n• Akki Roti\n• Noolputtu\n• Coorg Coffee (best in India!)"},
            {"text": "what to eat in coorg", "intent": "food", "response": "🍽️ Food experience:\n• Breakfast: Akki Roti with chutney\n• Lunch: Pandi Curry with Kadambuttu\n• Evening: Coorg coffee with banana chips\n• Try at: Coorg Cuisine, Taste of Coorg restaurants"},
            
            # Activities
            {"text": "things to do in coorg", "intent": "activities", "response": "🎯 Top activities:\n1. Trekking (Tadiandamol, Brahmagiri)\n2. Wildlife Safari (Nagarhole)\n3. Coffee Plantation Tour\n4. River Rafting (Barapole River)\n5. Elephant Bathing (Dubare)\n6. Cultural Shows"},
            {"text": "trekking in coorg", "intent": "activities", "response": "🥾 Best treks:\n• Tadiandamol (1748m) - 4-5 hours\n• Brahmagiri Hills - Moderate difficulty\n• Nishani Motte - Easier trek\n• Need: Guide, water, good shoes, permission for some treks"},
            
            # Shopping
            {"text": "shopping in coorg", "intent": "shopping", "response": "🛍️ What to buy:\n• Coffee Beans (fresh from estates)\n• Spices: Cardamom, Pepper, Vanilla\n• Honey (organic)\n• Homemade Chocolates\n• Kodava Traditional Jewelry\n• Handicrafts & Wooden Items"},
            
            # Culture
            {"text": "coorg culture", "intent": "culture", "response": "🎎 Kodava Culture:\n• Traditional attire: Kupya (men), Sari with unique style (women)\n• Festivals: Keil Podh (April), Cauvery Sankramana (Oct)\n• Martial arts: Kodava martial traditions\n• Unique surnames and clan system"},
            
            # Help
            {"text": "help", "intent": "help", "response": "ℹ️ I can help with:\n• Places to visit\n• Best time to visit\n• How to reach\n• Accommodation\n• Food recommendations\n• Activities & Adventures\n• Shopping tips\n• Cultural information"},
            {"text": "what can you do", "intent": "help", "response": "🤖 I'm your Coorg travel assistant! Ask me about:\n• Specific places (Abbey Falls, Raja Seat, etc.)\n• Travel planning\n• Weather information\n• Festival dates\n• Restaurant recommendations\n• Budget tips"},
            
            # Thanks/Goodbye
            {"text": "thank you", "intent": "thanks", "response": "🙏 You're welcome! Have a wonderful time in Coorg. Feel free to ask if you need more help!"},
            {"text": "thanks", "intent": "thanks", "response": "😊 Happy to help! Enjoy your Coorg adventure and don't forget to try the Pandi Curry!"},
            {"text": "bye", "intent": "goodbye", "response": "👋 Goodbye! Hope you have an amazing trip to Coorg! Safe travels!"},
            {"text": "goodbye", "intent": "goodbye", "response": "👋 Goodbye! May your Coorg journey be filled with beautiful memories!"},
        ]
    
    def preprocess_text(self, text):
        """Clean and preprocess input text"""
        text = text.lower()
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        words = nltk.word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        words = [self.lemmatizer.lemmatize(word) for word in words if word not in stop_words]
        return ' '.join(words)
    
    def train_model(self):
        """Train the chatbot model"""
        print("=" * 60)
        print("TRAINING COORG TOURISM CHATBOT MODEL")
        print("=" * 60)
        
        texts = [self.preprocess_text(item["text"]) for item in self.training_data]
        intents = [item["intent"] for item in self.training_data]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(texts, intents, test_size=0.2, random_state=42)
        
        # Create and train pipeline with better parameters
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=2000, ngram_range=(1, 3), min_df=1, max_df=0.9)),
            ('clf', MultinomialNB(alpha=0.01))
        ])
        
        self.model.fit(X_train, y_train)
        
        # Test accuracy
        train_accuracy = self.model.score(X_train, y_train)
        test_accuracy = self.model.score(X_test, y_test)
        
        print(f"\n📊 Model Performance:")
        print(f"   Training accuracy: {train_accuracy:.2%}")
        print(f"   Testing accuracy: {test_accuracy:.2%}")
        print(f"   Training examples: {len(self.training_data)}")
        
        # Save model
        with open('coorg_chatbot_model.pkl', 'wb') as f:
            pickle.dump(self.model, f)
        
        # Save training data
        with open('chatbot_training_data.json', 'w') as f:
            json.dump(self.training_data, f, indent=4)
        
        print(f"\n💾 Model saved as 'coorg_chatbot_model.pkl'")
        print(f"📝 Training data saved as 'chatbot_training_data.json'")
        
        # Show sample predictions
        print(f"\n🧪 Sample Predictions:")
        test_samples = ["abbey falls", "raja seat", "best time to visit", "coorg food", "how to reach"]
        for sample in test_samples:
            processed = self.preprocess_text(sample)
            intent = self.model.predict([processed])[0]
            confidence = np.max(self.model.predict_proba([processed]))
            print(f"   '{sample}' -> {intent} ({confidence:.2%})")
        
        print("\n" + "=" * 60)
        print("✅ TRAINING COMPLETE!")
        print("=" * 60)
        
        return self.model
    
    def predict_intent(self, text):
        """Predict intent from user input"""
        if not self.model:
            try:
                with open('coorg_chatbot_model.pkl', 'rb') as f:
                    self.model = pickle.load(f)
                print("✅ Chatbot model loaded from file")
            except Exception as e:
                print(f"❌ Error loading model: {e}")
                print("📚 Training new model...")
                self.train_model()
        
        try:
            processed_text = self.preprocess_text(text)
            intent = self.model.predict([processed_text])[0]
            confidence = np.max(self.model.predict_proba([processed_text]))
            return intent, confidence
        except Exception as e:
            print(f"❌ Prediction error: {e}")
            return "unknown", 0.0
    
    def get_response(self, user_input):
        """Get response based on user input"""
        # First, try to get intent from model
        intent, confidence = self.predict_intent(user_input)
        
        print(f"🔍 DEBUG: Query: '{user_input}' -> Intent: '{intent}', Confidence: {confidence:.2%}")
        
        # If confidence is low, try keyword matching
        if confidence < 0.15:
            user_lower = user_input.lower()
            
            # Enhanced keyword matching for common queries
            keyword_responses = {
                'abbey': "🌊 Abbey Falls is a beautiful waterfall 8 km from Madikeri. Open 9 AM - 5 PM. Entry: ₹20.",
                'falls': "🌊 Abbey Falls is the most popular waterfall in Coorg. 70 feet high, surrounded by coffee plantations.",
                'raja seat': "🌅 Raja Seat is a famous sunset viewpoint in Madikeri with gardens. Entry: ₹10. Open 6 AM - 7 PM.",
                'nagarhole': "🐘 Nagarhole National Park: Wildlife sanctuary with safaris at 6 AM and 3 PM.",
                'golden temple': "🕌 Golden Temple in Bylakuppe: Tibetan monastery with golden statues. Open 9 AM - 6 PM.",
                'dubare': "🐘 Dubare Elephant Camp: Bathe and feed elephants. Open 9 AM - 5:30 PM.",
                'tadiandamol': "⛰️ Tadiandamol: Highest peak in Coorg (1748m). Trek takes 4-5 hours.",
                'coffee': "☕ Coorg is famous for Arabica coffee! Visit coffee estates for tours and tasting.",
                'madikeri': "🏙️ Madikeri is Coorg's capital. Visit Raja Seat, Abbey Falls, and Madikeri Fort.",
                'food': "🍛 Try Pandi Curry (pork), Kadambuttu (rice dumplings), and authentic Coorg coffee!",
                'weather': "🌤️ Best time: Oct-Mar. Monsoon: Jun-Sep (lush). Summer: Apr-May (warm).",
                'hotel': "🏨 Options: Resorts (₹3000+), Homestays (₹1500-3000), Hotels (₹1000-2000).",
                'reach': "🚗 By air: Mangalore/Bangalore. By train: Mysore. By road: Well-connected.",
                'best time': "📅 October to March for pleasant weather. December is perfect!",
            }
            
            for keyword, response in keyword_responses.items():
                if keyword in user_lower:
                    return response
            
            # Generic fallback
            return f"🤔 I can help with information about '{user_input}' in Coorg. Try asking about:\n• Specific places (Abbey Falls, Raja Seat)\n• Best time to visit\n• How to reach\n• Accommodation\n• Food recommendations"
        
        # Get response for predicted intent
        for item in self.training_data:
            if item['intent'] == intent:
                return item['response']
        
        return "I can help with Coorg travel information. What would you like to know?"

if __name__ == "__main__":
    print("🚀 INITIALIZING COORG TOURISM CHATBOT")
    print("=" * 60)
    
    chatbot = CoorgChatbot()
    chatbot.train_model()
    
    print("\n🎯 TESTING CHATBOT")
    print("=" * 60)
    
    test_questions = [
        "Hello",
        "Abbey Falls",
        "Raja Seat",
        "What are the best places in Coorg?",
        "Best time to visit?",
        "How to reach Coorg?",
        "Coorg food recommendations",
        "Thank you",
        "Goodbye"
    ]
    
    for question in test_questions:
        print(f"\nYou: {question}")
        response = chatbot.get_response(question)
        print(f"Bot: {response}")
    
    print("\n" + "=" * 60)
    print("✅ CHATBOT IS READY TO USE!")
    print("=" * 60)
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from typing import Dict, List, Union
import os

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Healthcare knowledge base
health_data: Dict[str, Dict[str, Union[List[str], str]]] = {
    "fever": {
        "symptoms": ["high temperature", "chills", "sweating", "headache", "muscle aches"],
        "medicines": ["Acetaminophen/Paracetamol", "Ibuprofen"],
        "precautions": [
            "Rest well and stay hydrated",
            "Use light clothing and keep room temperature comfortable",
            "Take lukewarm baths",
            "Monitor temperature regularly",
            "Seek immediate medical attention if temperature exceeds 103°F (39.4°C)"
        ]
    },
    "cold": {
        "symptoms": ["runny nose", "sore throat", "cough", "congestion", "mild fever"],
        "medicines": ["Antihistamines", "Decongestants", "Throat lozenges"],
        "precautions": [
            "Get plenty of rest",
            "Stay hydrated with warm fluids",
            "Use a humidifier",
            "Gargle with warm salt water",
            "Wash hands frequently to prevent spread"
        ]
    },
    "headache": {
        "symptoms": ["pain in head", "sensitivity to light", "nausea", "fatigue"],
        "medicines": ["Aspirin", "Ibuprofen", "Acetaminophen"],
        "precautions": [
            "Rest in a quiet, dark room",
            "Apply cold or warm compress",
            "Stay hydrated",
            "Maintain regular sleep schedule",
            "Consider stress management techniques"
        ]
    }
}

def get_response(user_input: str) -> Dict[str, str]:
    """
    Process user input and return appropriate medical information.
    
    Args:
        user_input (str): User's message containing symptoms or condition
        
    Returns:
        Dict[str, str]: Response containing medical advice and response type
    """
    try:
        # Convert input to lowercase for better matching
        user_input = user_input.lower()
        
        # Check for emergency keywords
        # Check for a greeting message like "hello"
        greeting_keywords = ["hello", "hi", "hey", "greetings", "good morning", "good evening",  "good afternoon"]
        for greeting in greeting_keywords:
            if greeting in user_input:
                return {
                    "response": "Hello, what's your problem? Please specify in detail, and I can help you.",
                    "type": "greeting"
                }
        
        # Check for emergency keywords
        emergency_keywords = ["chest pain", "difficulty breathing", "unconscious", "severe bleeding", "stroke", "heart attack"]
        for keyword in emergency_keywords:
            if keyword in user_input:
                return {
                    "response": "⚠️ This seems like a medical emergency. Please call emergency services (108) immediately or visit the nearest emergency room.",
                    "type": "emergency"
                }
            
        
        # Check for condition matches
        for condition, data in health_data.items():
            if condition in user_input or any(symptom in user_input for symptom in data["symptoms"]):
                response = (
                    f"Based on your symptoms, this might be {condition.upper()}.\n\n"
                    f"📋 Recommended medicines:\n"
                    + "\n".join(f"• {med}" for med in data["medicines"])
                    + f"\n\n⚕️ Precautions:\n"
                    + "\n".join(f"• {prec}" for prec in data["precautions"])
                    + "\n\n⚠️ Please consult a healthcare professional for proper diagnosis and treatment."
                )
                return {
                    "response": response,
                    "type": "medical_advice"
                }
        
        return {
            "response": "I'm not sure about those symptoms. Could you please provide more details? Remember, I can help with common conditions like fever, cold, or headache. For any serious concerns, please consult a healthcare professional.",
            "type": "unclear"
        }
    
    except Exception as e:
        logger.error(f"Error processing message: {str(e)}")
        return {
            "response": "I apologize, but I encountered an error processing your message. Please try again or rephrase your question.",
            "type": "error"
        }

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle incoming chat requests and return appropriate responses.
    
    Expected JSON payload: {"message": "user message here"}
    Returns JSON: {"response": "assistant response here"}
    """
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                "error": "Invalid request. Please provide a message."
            }), 400
        
        user_message = data['message']
        response = get_response(user_message)
        
        return jsonify(response)
    
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint to verify the API is running."""
    return jsonify({"status": "healthy", "message": "API is running"}), 200

if __name__ == '__main__':
    # Get port from environment variable or default to 5600
    port = int(os.environ.get('PORT', 4500))
    
    # Run the Flask application
    app.run(host='0.0.0.0', port=port, debug=False)
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

# Initialize Flask app
app = Flask(__name__)

# Load the trained model (ensure the model is in the same directory or provide the correct path)
MODEL_PATH =  os.path.join(os.path.dirname(__file__), 'model_v1.h5')
model = load_model(MODEL_PATH)

# Define image preprocessing function
def preprocess_image(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Resize image to the required input size for the model
    resized_image = cv2.resize(gray, (224, 224))  # Assuming 128x128 is the input size required by the model
    
    # Normalize pixel values between 0 and 1
    normalized_image = resized_image / 255.0
    
    # Expand dimensions to match model input shape (1, 128, 128, 1) for grayscale image
    input_image = np.expand_dims(normalized_image, axis=(0, -1))
    
    return input_image

@app.route('/predict', methods=['POST'])
def predict():
    # Check if an image file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    # Get the file from the request
    file = request.files['file']
    
    # Read the image file in OpenCV format
    npimg = np.fromstring(file.read(), np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
    # Preprocess the image for the model
    preprocessed_image = preprocess_image(image)
    
    # Make a prediction
    prediction = model.predict(preprocessed_image)
    
    # Get the predicted class (assuming binary classification: 0 - No Tumor, 1 - Tumor)
    predicted_class = np.argmax(prediction, axis=1)[0]
    
    # Return the prediction result
    if predicted_class == 0:
        result = "No Tumor"
    else:
        result = "Tumor"
    
    return jsonify({'prediction': result})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

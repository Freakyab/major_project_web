# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from tensorflow.keras.models import load_model
# import numpy as np
# import cv2
# import os

# # Initialize Flask app
# app = Flask(__name__)

# # Enable CORS for the app
# CORS(app)

# # Load the trained model
# MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model_v1.h5')

# try:
#     model = load_model(MODEL_PATH)
#     print("Model loaded successfully")
# except Exception as e: 
#     print(f"Error loading model: {e}")
#     model = None  # Set model to None to handle it later

# def preprocess_image(image):
#     resized_image = cv2.resize(image, (224, 224))
#     normalized_image = resized_image / 255.0
#     input_image = np.expand_dims(normalized_image, axis=0)
#     return input_image

# @app.route('/predict', methods=['POST'])
# def predict():
#     if model is None:
#         return jsonify({'error': 'Model not loaded properly'}), 500
    
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file provided'}), 400
    
#     file = request.files['file']
#     npimg = np.frombuffer(file.read(), np.uint8)
#     image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
#     if image is None:
#         return jsonify({'error': 'Invalid image'}), 400

#     preprocessed_image = preprocess_image(image)
    
#     # Make a prediction
#     try:
#         prediction = model.predict(preprocessed_image)
#         predicted_class = np.argmax(prediction, axis=1)[0]
#         print(f"Predicted class: {predicted_class}")
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

#     # Map predicted class to result
#     result_map = {
#         0: "Glioma tumor",
#         1: "Meningioma tumor",
#         2: "Pituitary tumor"
#     }

#     result = result_map.get(predicted_class, "Unknown class")
    
#     return jsonify({'prediction': result})

# # Run the Flask app
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for the app
CORS(app)

# Paths for models
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model_v1.h5')
MRI_CLASSIFIER_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'brain_mri_classifier.h5')

# Load the models
try:
    tumor_model = load_model(MODEL_PATH)
    mri_classifier_model = load_model(MRI_CLASSIFIER_MODEL_PATH)
    print("Models loaded successfully")
except Exception as e:
    print(f"Error loading models: {e}")
    tumor_model = None  # Set to None to handle errors in the predict function
    mri_classifier_model = None

# Preprocess image for both models
def preprocess_image(image, target_size=(224, 224)):
    resized_image = cv2.resize(image, target_size)
    normalized_image = resized_image / 255.0
    input_image = np.expand_dims(normalized_image, axis=0)
    return input_image

@app.route('/predict', methods=['POST'])
def predict():
    if tumor_model is None or mri_classifier_model is None:
        return jsonify({'error': 'Models not loaded properly'}), 500
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    npimg = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
    if image is None:
        return jsonify({'error': 'Invalid image'}), 400

    preprocessed_image = preprocess_image(image)

    # First, check if the image is an MRI
    try:
        is_mri_prediction = mri_classifier_model.predict(preprocessed_image)
        is_mri = np.argmax(is_mri_prediction, axis=1)[0]  # Assume 1 = MRI, 0 = Not MRI
        print(f"Is MRI: {is_mri}")
        if is_mri == 0:
            return jsonify({'prediction': 'Input provide is not image of valid MRI.'})
    except Exception as e:
        return jsonify({'error': f'Error in MRI classification: {e}'})

    # Proceed with tumor classification if it is an MRI
    try:
        prediction = tumor_model.predict(preprocessed_image)
        predicted_class = np.argmax(prediction, axis=1)[0]
        print(f"Predicted class: {predicted_class}")
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Map predicted class to result
    result_map = {
        0: "Glioma tumor",
        1: "Meningioma tumor",
        2: "Pituitary tumor"
    }

    result = result_map.get(predicted_class, "Unknown class")
    result = f"Predicted class for the provided MRI image is: {result}"
    return jsonify({'prediction': result })

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

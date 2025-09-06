from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import os
import json
from dotenv import load_dotenv

load_dotenv()

# Optional imports for ML models
try:
    import tensorflow as tf
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False

try:
    import torch
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False

try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client (optional)
if SUPABASE_AVAILABLE and os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_KEY"):
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None

# Load ML model (placeholder - replace with your model loading code)
model = None
if TF_AVAILABLE:
    try:
        model = tf.keras.models.load_model('model.h5')  # Assuming TensorFlow model
        print("TensorFlow model loaded successfully")
    except Exception as e:
        print(f"Could not load TensorFlow model: {e}")
        model = None
elif TORCH_AVAILABLE:
    try:
        model = torch.load('model.pth')  # Assuming PyTorch model
        print("PyTorch model loaded successfully")
    except Exception as e:
        print(f"Could not load PyTorch model: {e}")
        model = None

if model is None:
    print("No ML model loaded. Using mock predictions for development.")

@app.post("/predict")
async def predict_breed(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Read image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # Preprocess image (adjust based on your model)
    image = image.resize((224, 224))  # Example size
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    # Make prediction
    if model:
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = np.max(predictions)
        
        # Map to breed name (replace with your class labels)
        breeds = ['Gir Cattle', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Murrah Buffalo', 'Jaffrabadi Buffalo', 'Nili Ravi Buffalo', 'Surti Buffalo']
        predicted_breed = breeds[predicted_class]
    else:
        # Mock prediction for development
        breeds = ['Gir Cattle', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Murrah Buffalo', 'Jaffrabadi Buffalo', 'Nili Ravi Buffalo', 'Surti Buffalo']
        predicted_breed = breeds[np.random.randint(0, len(breeds))]
        confidence = 0.85 + np.random.random() * 0.15  # Random confidence between 85-100%
    
    # Store in Supabase (optional)
    if supabase:
        try:
            supabase.table('predictions').insert({
                'breed': predicted_breed,
                'confidence': float(confidence),
                'user_id': 'anonymous'  # You can get user_id from authentication headers
            }).execute()
        except Exception as e:
            print(f"Error storing in DB: {e}")
    
    return {
        "breed": predicted_breed,
        "confidence": confidence
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

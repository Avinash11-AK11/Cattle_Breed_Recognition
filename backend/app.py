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
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # React app URLs
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
    try:
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
        
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image
        try:
            contents = await file.read()
            image = Image.open(io.BytesIO(contents))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
                
        except Exception as img_error:
            print(f"Image processing error: {img_error}")
            raise HTTPException(status_code=400, detail=f"Invalid image file: {str(img_error)}")
        
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
            # Mock prediction for development - use your actual breed names
            # Based on your database, these are some of the breeds you have:
            breeds = ['Gir', 'Sahiwal', 'Red Sindhi', 'Tharparkar', 'Amritmahal', 'Ayrshire', 'Bargur', 'Bhadawari', 'Murrah', 'Banni']
            predicted_breed = breeds[np.random.randint(0, len(breeds))]
            confidence = 0.85 + np.random.random() * 0.15  # Random confidence between 85-100%
    
        # Store in Supabase and get breed info from your database
        prediction_id = None
        breed_info = None
        seasonal_info = None
        
        if supabase:
            try:
                # First get breed info from your breeds table (using ILIKE for partial matching)
                breed_result = supabase.table('breeds').select('*').ilike('name', f'%{predicted_breed}%').execute()
                if breed_result.data:
                    breed_info = breed_result.data[0]
                    breed_id = breed_info['id']
                    
                    # Get seasonal information for this breed
                    seasonal_result = supabase.table('seasonal_info').select('*').eq('breed_id', breed_id).execute()
                    if seasonal_result.data:
                        seasonal_info = seasonal_result.data
                        
                    # Format breed info to handle None values
                    formatted_breed_info = {
                        "id": breed_info['id'],
                        "name": breed_info['name'],
                        "region": breed_info['region'] or "Region not specified",
                        "milk_yield": breed_info['milk_yield'] or "Milk yield data not available",
                        "price_range": breed_info.get('price_range') or "Price information not available"
                    }
                
                # Store prediction in predictions table (if it exists)
                try:
                    result = supabase.table('predictions').insert({
                        'breed': predicted_breed,
                        'confidence': float(confidence),
                        'user_id': 'anonymous'
                    }).execute()
                    if result.data:
                        prediction_id = result.data[0]['id']
                        print(f"Prediction stored in database with ID: {prediction_id}")
                except Exception as pred_e:
                    print(f"Could not store prediction (predictions table might not exist): {pred_e}")
                    
            except Exception as e:
                print(f"Error accessing database: {e}")
                # Return basic response if database fails
                return {
                    "breed": predicted_breed,
                    "confidence": confidence,
                    "error": "Database connection issue"
                }
        
        return {
            "breed": predicted_breed,
            "confidence": confidence,
            "prediction_id": prediction_id,
            "breed_info": formatted_breed_info if 'formatted_breed_info' in locals() else None,
            "seasonal_info": seasonal_info if 'seasonal_info' in locals() else None
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/breeds")
async def get_all_breeds():
    """Get all available breeds from database"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table('breeds').select('*').execute()
        return {"breeds": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/breeds/{breed_id}/seasonal")
async def get_breed_seasonal_info(breed_id: int):
    """Get seasonal information for a specific breed"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Get breed info
        breed_result = supabase.table('breeds').select('*').eq('id', breed_id).execute()
        if not breed_result.data:
            raise HTTPException(status_code=404, detail="Breed not found")
        
        # Get seasonal info
        seasonal_result = supabase.table('seasonal_info').select('*').eq('breed_id', breed_id).execute()
        
        return {
            "breed": breed_result.data[0],
            "seasonal_info": seasonal_result.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/breeds/region/{region}")
async def get_breeds_by_region(region: str):
    """Get all breeds from a specific region"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table('breeds').select('*').eq('region', region).execute()
        return {"breeds": result.data, "region": region}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/seasonal/{season}")
async def get_seasonal_recommendations(season: str):
    """Get seasonal care recommendations for all breeds"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Get seasonal info for specific season
        seasonal_result = supabase.table('seasonal_info').select('*, breeds(name, region)').eq('season', season).execute()
        
        return {
            "season": season,
            "recommendations": seasonal_result.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/breeds/{breed_name}")
async def get_breed_by_name(breed_name: str):
    """Get specific breed information by name"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table('breeds').select('*').eq('name', breed_name).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Breed not found")
        return {"breed": result.data[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/predictions")
async def get_user_predictions(user_id: str = "anonymous"):
    """Get user's prediction history"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        result = supabase.table('predictions').select('*').eq('user_id', user_id).order('created_at', desc=True).limit(10).execute()
        return {"predictions": result.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.post("/feedback")
async def submit_feedback(prediction_id: int, is_correct: bool, correct_breed: str = None):
    """Submit feedback on prediction accuracy"""
    if not supabase:
        raise HTTPException(status_code=503, detail="Database not available")
    
    try:
        # Update the prediction with feedback
        feedback_data = {"is_confirmed": is_correct}
        if correct_breed and not is_correct:
            feedback_data["feedback"] = f"Correct breed: {correct_breed}"
        
        result = supabase.table('predictions').update(feedback_data).eq('id', prediction_id).execute()
        return {"message": "Feedback submitted successfully", "updated": len(result.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    db_status = "connected" if supabase else "disconnected"
    model_status = "loaded" if model else "not loaded"
    
    return {
        "status": "healthy",
        "database": db_status,
        "ml_model": model_status,
        "timestamp": "2024-01-01T00:00:00Z"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

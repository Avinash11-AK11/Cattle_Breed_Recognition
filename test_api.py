"""
Simple test to check if the API is working with your database
"""
import requests
import json

def test_api():
    print("🧪 Testing API with your database...")
    
    # Test the breeds endpoint
    try:
        response = requests.get("http://localhost:8001/breeds")
        if response.status_code == 200:
            data = response.json()
            breeds = data.get('breeds', [])
            print(f"✅ Breeds endpoint working! Found {len(breeds)} breeds")
            print("Sample breeds:")
            for breed in breeds[:3]:
                print(f"  - {breed['name']} from {breed['region']}")
        else:
            print(f"❌ Breeds endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Error testing breeds endpoint: {e}")
    
    # Test a specific breed
    try:
        response = requests.get("http://localhost:8001/breeds/Gir")
        if response.status_code == 200:
            data = response.json()
            breed = data.get('breed')
            print(f"✅ Specific breed endpoint working!")
            print(f"  Gir breed info: {breed['region']}")
            print(f"  Milk yield: {breed['milk_yield']}")
        else:
            print(f"❌ Specific breed endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Error testing specific breed endpoint: {e}")
    
    # Test health check
    try:
        response = requests.get("http://localhost:8001/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check: Database {data['database']}, Model {data['ml_model']}")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Error testing health endpoint: {e}")

if __name__ == "__main__":
    test_api()

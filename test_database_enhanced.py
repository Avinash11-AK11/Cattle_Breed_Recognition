"""
Enhanced test script for your Supabase database with breeds and seasonal_info tables
"""
import os
import sys
sys.path.append('backend')

from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from root .env file  
load_dotenv('.env')

def test_database_connection():
    """Test basic database connection"""
    print("🔍 Testing Supabase Connection...")
    
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        print("❌ Error: SUPABASE_URL or SUPABASE_KEY not found")
        print("📝 Check your backend/.env file")
        return None
    
    try:
        supabase: Client = create_client(supabase_url, supabase_key)
        print("✅ Supabase client created successfully")
        return supabase
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return None

def test_breeds_table(supabase):
    """Test breeds table operations"""
    print("\n📋 Testing breeds table...")
    
    try:
        # Fetch all breeds
        result = supabase.table('breeds').select('*').execute()
        
        if result.data:
            print(f"✅ Found {len(result.data)} breeds in database:")
            for breed in result.data[:5]:  # Show first 5
                print(f"   ID: {breed['id']} | Name: {breed['name']} | Region: {breed['region']}")
                print(f"      Milk Yield: {breed['milk_yield']} | Price: {breed['price_range']}")
            
            if len(result.data) > 5:
                print(f"   ... and {len(result.data) - 5} more breeds")
                
            return result.data
        else:
            print("⚠️ No breeds found in database")
            return []
            
    except Exception as e:
        print(f"❌ Error accessing breeds table: {e}")
        return []

def test_seasonal_info_table(supabase, breeds):
    """Test seasonal_info table operations"""
    print("\n🌱 Testing seasonal_info table...")
    
    try:
        # Get seasonal info for all breeds
        result = supabase.table('seasonal_info').select('*').execute()
        
        if result.data:
            print(f"✅ Found {len(result.data)} seasonal entries:")
            
            # Group by breed
            seasonal_by_breed = {}
            for entry in result.data:
                breed_id = entry['breed_id']
                if breed_id not in seasonal_by_breed:
                    seasonal_by_breed[breed_id] = []
                seasonal_by_breed[breed_id].append(entry)
            
            # Show sample data
            for breed_id, entries in list(seasonal_by_breed.items())[:3]:
                breed_name = next((b['name'] for b in breeds if b['id'] == breed_id), f"ID:{breed_id}")
                print(f"   Breed: {breed_name}")
                for entry in entries:
                    print(f"      Season: {entry['season']} | Diseases: {entry['diseases'][:50]}...")
                    print(f"      Nutrition: {entry['nutrition'][:50]}...")
                
        else:
            print("⚠️ No seasonal info found in database")
            
    except Exception as e:
        print(f"❌ Error accessing seasonal_info table: {e}")

def test_api_simulation(supabase):
    """Simulate the API prediction flow"""
    print("\n🤖 Testing API prediction simulation...")
    
    try:
        # Simulate a prediction result
        predicted_breed_name = "Gir"  # Example
        
        # Find breed in database
        breed_result = supabase.table('breeds').select('*').ilike('name', f'%{predicted_breed_name}%').execute()
        
        if breed_result.data:
            breed = breed_result.data[0]
            breed_id = breed['id']
            
            print(f"✅ Found predicted breed: {breed['name']}")
            print(f"   Region: {breed['region']}")
            print(f"   Milk Yield: {breed['milk_yield']}")
            print(f"   Price Range: {breed['price_range']}")
            
            # Get seasonal info for this breed
            seasonal_result = supabase.table('seasonal_info').select('*').eq('breed_id', breed_id).execute()
            
            if seasonal_result.data:
                print(f"   Seasonal info available for {len(seasonal_result.data)} seasons:")
                for season in seasonal_result.data:
                    print(f"      {season['season']}: {season['diseases'][:30]}...")
            else:
                print("   No seasonal info found for this breed")
                
        else:
            print(f"❌ Breed '{predicted_breed_name}' not found in database")
            
    except Exception as e:
        print(f"❌ Error in API simulation: {e}")

def add_sample_data(supabase):
    """Add some sample data if tables are empty"""
    print("\n➕ Checking if sample data is needed...")
    
    try:
        # Check breeds table
        breeds_result = supabase.table('breeds').select('id').limit(1).execute()
        
        if not breeds_result.data:
            print("📝 Adding sample breed data...")
            sample_breeds = [
                {
                    "name": "Gir",
                    "region": "Gujarat", 
                    "milk_yield": "1500-2000 kg/lactation",
                    "price_range": "50000-80000 INR"
                },
                {
                    "name": "Sahiwal", 
                    "region": "Punjab",
                    "milk_yield": "2000-3000 kg/lactation", 
                    "price_range": "60000-100000 INR"
                }
            ]
            
            breeds_insert = supabase.table('breeds').insert(sample_breeds).execute()
            if breeds_insert.data:
                print(f"✅ Added {len(breeds_insert.data)} sample breeds")
                
                # Add seasonal info for these breeds
                seasonal_data = []
                for breed in breeds_insert.data:
                    breed_id = breed['id']
                    seasonal_data.extend([
                        {
                            "breed_id": breed_id,
                            "season": "Summer",
                            "diseases": "Heat stress, mastitis, foot rot",
                            "nutrition": "High water intake, mineral supplements, green fodder"
                        },
                        {
                            "breed_id": breed_id,
                            "season": "Winter", 
                            "diseases": "Respiratory issues, joint problems",
                            "nutrition": "Energy-rich feed, vitamin supplements, dry fodder"
                        }
                    ])
                
                seasonal_insert = supabase.table('seasonal_info').insert(seasonal_data).execute()
                if seasonal_insert.data:
                    print(f"✅ Added {len(seasonal_insert.data)} seasonal entries")
        else:
            print("✅ Sample data already exists")
            
    except Exception as e:
        print(f"❌ Error adding sample data: {e}")

def main():
    print("🚀 Enhanced Supabase Database Test")
    print("=" * 50)
    
    # Test connection
    supabase = test_database_connection()
    if not supabase:
        return
    
    # Add sample data if needed
    add_sample_data(supabase)
    
    # Test tables
    breeds = test_breeds_table(supabase)
    test_seasonal_info_table(supabase, breeds)
    
    # Test API simulation
    test_api_simulation(supabase)
    
    print("\n" + "=" * 50)
    print("✅ Database test completed!")
    print("💡 You can now start the backend server:")
    print("   cd backend && python app.py")

if __name__ == "__main__":
    main()

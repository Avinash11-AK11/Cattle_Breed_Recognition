"""
Simple test to read your existing Supabase data
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv('.env')

def main():
    print("🚀 Testing Your Supabase Data")
    print("=" * 40)
    
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if not supabase_url or not supabase_key:
        print("❌ Environment variables not found")
        return
        
    try:
        supabase: Client = create_client(supabase_url, supabase_key)
        print("✅ Connected to Supabase")
        
        # Test breeds table
        print("\n📋 BREEDS DATA:")
        breeds_result = supabase.table('breeds').select('*').execute()
        
        if breeds_result.data:
            print(f"Found {len(breeds_result.data)} breeds:")
            for i, breed in enumerate(breeds_result.data[:10], 1):
                print(f"  {i}. ID: {breed.get('id', 'N/A')}")
                print(f"     Name: {breed.get('name', 'N/A')}")
                print(f"     Region: {breed.get('region', 'N/A')}")
                print(f"     Milk Yield: {breed.get('milk_yield', 'N/A')}")
                print(f"     Price Range: {breed.get('price_range', 'Not set')}")
                print()
        else:
            print("No breeds found")
            
        # Test seasonal_info table  
        print("🌱 SEASONAL INFO DATA:")
        seasonal_result = supabase.table('seasonal_info').select('*').execute()
        
        if seasonal_result.data:
            print(f"Found {len(seasonal_result.data)} seasonal entries:")
            for i, entry in enumerate(seasonal_result.data[:5], 1):
                print(f"  {i}. Breed ID: {entry.get('breed_id', 'N/A')}")
                print(f"     Season: {entry.get('season', 'N/A')}")
                print(f"     Diseases: {entry.get('diseases', 'N/A')[:50]}...")
                print(f"     Nutrition: {entry.get('nutrition', 'N/A')[:50]}...")
                print()
        else:
            print("No seasonal info found")
            
        # Test prediction simulation
        if breeds_result.data:
            print("🤖 TESTING ML PREDICTION FLOW:")
            sample_breed = breeds_result.data[0]
            breed_name = sample_breed['name']
            breed_id = sample_breed['id']
            
            print(f"Simulating prediction: '{breed_name}'")
            print(f"✅ Breed found in database")
            print(f"   ID: {breed_id}")
            print(f"   Region: {sample_breed.get('region', 'N/A')}")
            print(f"   Milk Yield: {sample_breed.get('milk_yield', 'N/A')}")
            print(f"   Price: {sample_breed.get('price_range') or 'Price not set'}")
            
            # Get seasonal info for this breed
            seasonal_for_breed = supabase.table('seasonal_info').select('*').eq('breed_id', breed_id).execute()
            
            if seasonal_for_breed.data:
                print(f"   Seasonal care available for {len(seasonal_for_breed.data)} seasons")
                for season_data in seasonal_for_breed.data:
                    print(f"   - {season_data['season']}: {season_data['diseases'][:30]}...")
            else:
                print("   No seasonal info for this breed")
                
        print("\n" + "=" * 40)
        print("✅ Database connection successful!")
        print("Your data structure looks good.")
        
        if not breeds_result.data:
            print("💡 Add some breed data to test ML integration")
        elif breeds_result.data and not breeds_result.data[0].get('price_range'):
            print("💡 Consider adding price_range data for complete breed info")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()

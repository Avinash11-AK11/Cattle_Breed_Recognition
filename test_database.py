"""
Test script to verify Supabase database connection
Run this to test your database setup
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

def test_supabase_connection():
    print("🔍 Testing Supabase Connection...")
    
    # Get environment variables from root .env file
    supabase_url = os.getenv("VITE_SUPABASE_URL")
    supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")
    
    if not supabase_url or not supabase_key:
        print("❌ Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env file")
        print("📝 Please check your .env file contains:")
        print("   VITE_SUPABASE_URL=https://cultzdsxvrwdhikyperg.supabase.co")
        print("   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key")
        return False
    
    print(f"📡 Supabase URL: {supabase_url}")
    print(f"🔑 API Key: {supabase_key[:20]}...")
    
    try:
        # Create Supabase client
        supabase: Client = create_client(supabase_url, supabase_key)
        print("✅ Supabase client created successfully")
        
        # Test connection by fetching breeds table
        result = supabase.table('breeds').select('id, name, region, milk_yield, price_range').limit(3).execute()
        
        if result.data:
            print("✅ Database connection successful!")
            print("📋 Sample breeds found:")
            for breed in result.data:
                print(f"   - {breed['name']} | Region: {breed['region']} | Milk Yield: {breed['milk_yield']} | Price: {breed['price_range']}")
        else:
            print("⚠️  Connection successful but no breeds found in your breeds table.")
            print("💡 Add some breed data to test the connection fully.")
        
        return True
        
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_predictions_table():
    print("\n🔍 Testing Database Tables...")
    
    try:
        supabase_url = os.getenv("VITE_SUPABASE_URL")
        supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")
        supabase: Client = create_client(supabase_url, supabase_key)
        
        # Test breeds table
        print("📋 Testing breeds table...")
        breeds_result = supabase.table('breeds').select('*').limit(5).execute()
        
        if breeds_result.data:
            print(f"✅ Found {len(breeds_result.data)} breeds:")
            for breed in breeds_result.data:
                print(f"   - {breed['name']} | Region: {breed['region']} | Milk Yield: {breed['milk_yield']}")
        else:
            print("⚠️ No breeds found in database")
        
        # Test seasonal_info table
        print("\n🌱 Testing seasonal_info table...")
        seasonal_result = supabase.table('seasonal_info').select('*').limit(5).execute()
        
        if seasonal_result.data:
            print(f"✅ Found {len(seasonal_result.data)} seasonal entries:")
            for entry in seasonal_result.data:
                print(f"   - Breed ID: {entry['breed_id']} | Season: {entry['season']}")
                print(f"     Diseases: {entry['diseases'][:50]}...")
                print(f"     Nutrition: {entry['nutrition'][:50]}...")
        else:
            print("⚠️ No seasonal info found")
            
        return True
        
    except Exception as e:
        print(f"❌ Database table test failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Supabase Database Connection Test\n")
    
    connection_ok = test_supabase_connection()
    
    if connection_ok:
        test_predictions_table()
        print("\n✅ Database setup is working correctly!")
        print("💡 You can now run the backend server with:")
        print("   .venv\\Scripts\\python.exe backend/app.py")
    else:
        print("\n❌ Database setup needs attention")
        print("📝 Please check:")
        print("   1. Your .env file has correct SUPABASE_URL and SUPABASE_KEY")
        print("   2. Run the SQL commands in database_setup.sql in your Supabase dashboard")
        print("   3. Ensure your Supabase project is active")

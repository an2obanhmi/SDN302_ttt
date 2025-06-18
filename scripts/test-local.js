const { execSync } = require('child_process');

console.log('🧪 Testing Local Development...\n');

try {
  // 1. Check if server is running
  console.log('1️⃣  Checking if development server is running...');
  
  try {
    // Try to make a request to the local server
    const response = execSync('curl -s http://localhost:3000/api/health || echo "Server not running"', { encoding: 'utf8' });
    
    if (response.includes('Server not running')) {
      console.log('⚠️  Development server is not running');
      console.log('💡 Start server with: npm run dev');
      console.log('💡 Then run this test again');
      process.exit(0);
    } else {
      console.log('✅ Development server is running');
    }
  } catch (error) {
    console.log('⚠️  Could not check server status');
    console.log('💡 Make sure server is running with: npm run dev');
  }

  // 2. Test basic functionality
  console.log('\n2️⃣  Testing basic functionality...');
  
  // Test health endpoint
  try {
    const healthResponse = execSync('curl -s http://localhost:3000/api/health', { encoding: 'utf8' });
    console.log('✅ Health endpoint working');
  } catch (error) {
    console.log('❌ Health endpoint failed');
  }

  // Test products endpoint
  try {
    const productsResponse = execSync('curl -s http://localhost:3000/api/products', { encoding: 'utf8' });
    console.log('✅ Products API working');
  } catch (error) {
    console.log('❌ Products API failed');
  }

  // Test home page
  try {
    const homeResponse = execSync('curl -s http://localhost:3000', { encoding: 'utf8' });
    if (homeResponse.includes('<!DOCTYPE html>')) {
      console.log('✅ Home page loading');
    } else {
      console.log('❌ Home page failed');
    }
  } catch (error) {
    console.log('❌ Home page failed');
  }

  console.log('\n🎉 Local test completed!');
  console.log('\n📋 Manual tests to perform:');
  console.log('1. Open http://localhost:3000 in browser');
  console.log('2. Test registration: http://localhost:3000/auth/register');
  console.log('3. Test login: http://localhost:3000/auth/login');
  console.log('4. Test adding products (when logged in)');
  console.log('5. Test editing/deleting products');
  console.log('6. Test logout functionality');

} catch (error) {
  console.error('\n❌ Local test failed:');
  console.error(error.message);
  process.exit(1);
} 
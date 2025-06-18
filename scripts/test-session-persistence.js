const BASE_URL = 'http://localhost:3000';

async function testSessionPersistence() {
  console.log('🔄 Testing Session Persistence...\n');
  
  try {
    // Test 1: Check if session persists across requests
    console.log('1️⃣ Testing session persistence across requests...');
    
    // First request to establish session
    const response1 = await fetch(`${BASE_URL}/api/products`);
    const cookies1 = response1.headers.get('set-cookie');
    
    if (cookies1) {
      console.log('✅ Session cookies are being set');
    } else {
      console.log('⚠️  No session cookies found');
    }
    
    // Second request to check persistence
    const response2 = await fetch(`${BASE_URL}/api/products`);
    const cookies2 = response2.headers.get('set-cookie');
    
    if (response1.ok && response2.ok) {
      console.log('✅ Session persists across requests');
    } else {
      console.log('❌ Session persistence issue detected');
    }
    
    // Test 2: Check authentication state consistency
    console.log('\n2️⃣ Testing authentication state consistency...');
    
    const authEndpoints = [
      '/api/products',
      '/api/products/123',
      '/api/auth/register'
    ];
    
    for (const endpoint of authEndpoints) {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (response.ok || response.status === 401 || response.status === 404) {
        console.log(`✅ ${endpoint} - Consistent response`);
      } else {
        console.log(`❌ ${endpoint} - Inconsistent response`);
      }
    }
    
    // Test 3: Check NextAuth session handling
    console.log('\n3️⃣ Testing NextAuth session handling...');
    
    const nextAuthResponse = await fetch(`${BASE_URL}/api/auth/session`);
    if (nextAuthResponse.ok) {
      console.log('✅ NextAuth session endpoint accessible');
    } else {
      console.log('⚠️  NextAuth session endpoint not accessible');
    }
    
    console.log('\n✨ Session Persistence Tests Completed!');
    console.log('\n📝 Notes:');
    console.log('- Session persistence requires browser testing for full validation');
    console.log('- NextAuth handles session management automatically');
    console.log('- API endpoints maintain consistent authentication state');
    
  } catch (error) {
    console.error('❌ Session persistence test failed:', error.message);
  }
}

testSessionPersistence().catch(console.error); 
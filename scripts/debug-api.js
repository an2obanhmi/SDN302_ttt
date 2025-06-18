const BASE_URL = 'http://localhost:3000/api';

async function debugAPI() {
  console.log('🔍 Debugging API endpoints...\n');
  
  // Test POST endpoint
  try {
    console.log('Testing POST /api/products...');
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        image: 'test.jpg'
      })
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response text (first 200 chars):', text.substring(0, 200));
    
    if (text.startsWith('<!DOCTYPE')) {
      console.log('❌ Response is HTML, not JSON');
    } else {
      try {
        const json = JSON.parse(text);
        console.log('✅ Response is valid JSON:', json);
      } catch (e) {
        console.log('❌ Response is not valid JSON');
      }
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test PUT endpoint
  try {
    console.log('Testing PUT /api/products...');
    const response = await fetch(`${BASE_URL}/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: '507f1f77bcf86cd799439011',
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        image: 'updated.jpg'
      })
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response text (first 200 chars):', text.substring(0, 200));
    
    if (text.startsWith('<!DOCTYPE')) {
      console.log('❌ Response is HTML, not JSON');
    } else {
      try {
        const json = JSON.parse(text);
        console.log('✅ Response is valid JSON:', json);
      } catch (e) {
        console.log('❌ Response is not valid JSON');
      }
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

debugAPI().catch(console.error); 
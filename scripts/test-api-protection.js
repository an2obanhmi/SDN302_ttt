const BASE_URL = 'http://localhost:3000/api';

// Test functions
async function testPublicAccess() {
  console.log('🔍 Testing public access (GET /api/products)...');
  
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Public GET /api/products - SUCCESS');
      console.log(`   Found ${data.data?.length || 0} products`);
    } else {
      console.log('❌ Public GET /api/products - FAILED');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ Public GET /api/products - ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

async function testProtectedEndpoints() {
  console.log('\n🔒 Testing protected endpoints without authentication...');
  
  const protectedTests = [
    {
      method: 'POST',
      url: '/products',
      data: {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        image: 'test.jpg'
      }
    },
    {
      method: 'PUT',
      url: '/products',
      data: {
        id: '507f1f77bcf86cd799439011',
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        image: 'updated.jpg'
      }
    },
    {
      method: 'DELETE',
      url: '/products?id=507f1f77bcf86cd799439011'
    }
  ];

  for (const test of protectedTests) {
    try {
      const options = {
        method: test.method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (test.data) {
        options.body = JSON.stringify(test.data);
      }

      const response = await fetch(`${BASE_URL}${test.url}`, options);
      
      // Kiểm tra content-type trước khi parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (response.status === 401) {
          console.log(`✅ ${test.method} ${test.url} - CORRECTLY BLOCKED (401)`);
          console.log(`   Error: ${data.error}`);
        } else {
          console.log(`❌ ${test.method} ${test.url} - SHOULD BE BLOCKED`);
          console.log(`   Status: ${response.status}`);
        }
      } else {
        const text = await response.text();
        console.log(`❌ ${test.method} ${test.url} - INVALID RESPONSE TYPE`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Content-Type: ${contentType}`);
        console.log(`   Response: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`❌ ${test.method} ${test.url} - ERROR`);
      console.log(`   Error: ${error.message}`);
    }
  }
}

async function testSpecificProductEndpoints() {
  console.log('\n🔒 Testing specific product endpoints without authentication...');
  
  const testId = '507f1f77bcf86cd799439011';
  
  // Test public GET
  try {
    const response = await fetch(`${BASE_URL}/products/${testId}`);
    const data = await response.json();
    
    if (response.status === 404) {
      console.log('✅ GET /api/products/[id] - CORRECTLY HANDLED (404 for non-existent)');
    } else if (response.ok) {
      console.log('✅ GET /api/products/[id] - SUCCESS (public access)');
    } else {
      console.log('❌ GET /api/products/[id] - UNEXPECTED');
    }
  } catch (error) {
    console.log('❌ GET /api/products/[id] - ERROR');
    console.log(`   Error: ${error.message}`);
  }

  // Test protected PUT
  try {
    const response = await fetch(`${BASE_URL}/products/${testId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        image: 'updated.jpg'
      })
    });
    const data = await response.json();
    
    if (response.status === 401) {
      console.log('✅ PUT /api/products/[id] - CORRECTLY BLOCKED (401)');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ PUT /api/products/[id] - SHOULD BE BLOCKED');
      console.log(`   Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ PUT /api/products/[id] - ERROR');
    console.log(`   Error: ${error.message}`);
  }

  // Test protected DELETE
  try {
    const response = await fetch(`${BASE_URL}/products/${testId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    
    if (response.status === 401) {
      console.log('✅ DELETE /api/products/[id] - CORRECTLY BLOCKED (401)');
      console.log(`   Error: ${data.error}`);
    } else {
      console.log('❌ DELETE /api/products/[id] - SHOULD BE BLOCKED');
      console.log(`   Status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ DELETE /api/products/[id] - ERROR');
    console.log(`   Error: ${error.message}`);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting API Protection Tests...\n');
  
  await testPublicAccess();
  await testProtectedEndpoints();
  await testSpecificProductEndpoints();
  
  console.log('\n✨ API Protection Tests Completed!');
  console.log('\n📝 Summary:');
  console.log('- Public endpoints (GET) should be accessible');
  console.log('- Protected endpoints (POST, PUT, DELETE) should return 401 for unauthenticated users');
  console.log('- Proper error messages should be returned');
}

// Run tests
runTests().catch(console.error); 
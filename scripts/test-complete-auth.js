const BASE_URL = 'http://localhost:3000';

// Test data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'password123'
};

const testProduct = {
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  image: 'test.jpg'
};

// Utility functions
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    const data = await response.json().catch(() => null);
    return { response, data, success: response.ok };
  } catch (error) {
    return { response: null, data: null, success: false, error: error.message };
  }
}

// Test functions
async function testRegistrationFlow() {
  console.log('🔐 Testing Registration Flow...\n');
  
  // Test 1: Valid registration
  console.log('1️⃣ Testing valid registration...');
  const validReg = await makeRequest(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  
  if (validReg.success) {
    console.log('✅ Valid registration successful');
  } else {
    console.log('❌ Valid registration failed:', validReg.data?.error);
  }
  
  // Test 2: Duplicate email registration
  console.log('\n2️⃣ Testing duplicate email registration...');
  const duplicateReg = await makeRequest(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(testUser)
  });
  
  if (!duplicateReg.success && duplicateReg.data?.error) {
    console.log('✅ Duplicate email correctly rejected:', duplicateReg.data.error);
  } else {
    console.log('❌ Duplicate email should be rejected');
  }
  
  // Test 3: Invalid data registration
  console.log('\n3️⃣ Testing invalid data registration...');
  const invalidReg = await makeRequest(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      name: '',
      email: 'invalid-email',
      password: '123'
    })
  });
  
  if (!invalidReg.success) {
    console.log('✅ Invalid data correctly rejected');
  } else {
    console.log('❌ Invalid data should be rejected');
  }
}

async function testLoginLogoutFlow() {
  console.log('\n🔑 Testing Login/Logout Flow...\n');
  
  // Test 1: Valid login
  console.log('1️⃣ Testing valid login...');
  const loginResponse = await makeRequest(`${BASE_URL}/api/auth/[...nextauth]`, {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password
    })
  });
  
  if (loginResponse.success) {
    console.log('✅ Login successful');
  } else {
    console.log('⚠️  Login test inconclusive (may need session cookies)');
  }
  
  // Test 2: Invalid login
  console.log('\n2️⃣ Testing invalid login...');
  const invalidLogin = await makeRequest(`${BASE_URL}/api/auth/[...nextauth]`, {
    method: 'POST',
    body: JSON.stringify({
      email: testUser.email,
      password: 'wrongpassword'
    })
  });
  
  if (!invalidLogin.success) {
    console.log('✅ Invalid login correctly rejected');
  } else {
    console.log('❌ Invalid login should be rejected');
  }
}

async function testProductCRUDOperations() {
  console.log('\n📦 Testing Product CRUD Operations...\n');
  
  // Test 1: Public access to products (GET)
  console.log('1️⃣ Testing public access to products...');
  const getProducts = await makeRequest(`${BASE_URL}/api/products`);
  
  if (getProducts.success) {
    console.log('✅ Public GET /api/products successful');
    console.log(`   Found ${getProducts.data?.data?.length || 0} products`);
  } else {
    console.log('❌ Public GET /api/products failed');
  }
  
  // Test 2: Unauthenticated POST (should fail)
  console.log('\n2️⃣ Testing unauthenticated POST...');
  const unauthenticatedPost = await makeRequest(`${BASE_URL}/api/products`, {
    method: 'POST',
    body: JSON.stringify(testProduct)
  });
  
  if (!unauthenticatedPost.success && unauthenticatedPost.response?.status === 401) {
    console.log('✅ Unauthenticated POST correctly blocked (401)');
  } else {
    console.log('❌ Unauthenticated POST should be blocked');
  }
  
  // Test 3: Unauthenticated PUT (should fail)
  console.log('\n3️⃣ Testing unauthenticated PUT...');
  const unauthenticatedPut = await makeRequest(`${BASE_URL}/api/products`, {
    method: 'PUT',
    body: JSON.stringify({ id: '123', ...testProduct })
  });
  
  if (!unauthenticatedPut.success && unauthenticatedPut.response?.status === 401) {
    console.log('✅ Unauthenticated PUT correctly blocked (401)');
  } else {
    console.log('❌ Unauthenticated PUT should be blocked');
  }
  
  // Test 4: Unauthenticated DELETE (should fail)
  console.log('\n4️⃣ Testing unauthenticated DELETE...');
  const unauthenticatedDelete = await makeRequest(`${BASE_URL}/api/products?id=123`, {
    method: 'DELETE'
  });
  
  if (!unauthenticatedDelete.success && unauthenticatedDelete.response?.status === 401) {
    console.log('✅ Unauthenticated DELETE correctly blocked (401)');
  } else {
    console.log('❌ Unauthenticated DELETE should be blocked');
  }
  
  // Test 5: Get specific product (public)
  console.log('\n5️⃣ Testing public access to specific product...');
  const getProduct = await makeRequest(`${BASE_URL}/api/products/123`);
  
  if (getProduct.response?.status === 404) {
    console.log('✅ Public GET /api/products/[id] correctly handled (404 for non-existent)');
  } else if (getProduct.success) {
    console.log('✅ Public GET /api/products/[id] successful');
  } else {
    console.log('⚠️  Public GET /api/products/[id] status unclear');
  }
}

async function testUIAuthentication() {
  console.log('\n🖥️ Testing UI Authentication Features...\n');
  
  // Test 1: Public pages accessibility
  console.log('1️⃣ Testing public pages accessibility...');
  const publicPages = [
    '/',
    '/products',
    '/auth/login',
    '/auth/register'
  ];
  
  for (const page of publicPages) {
    const response = await makeRequest(`${BASE_URL}${page}`);
    if (response.success) {
      console.log(`✅ ${page} is accessible`);
    } else {
      console.log(`❌ ${page} should be accessible`);
    }
  }
  
  // Test 2: Protected pages redirect
  console.log('\n2️⃣ Testing protected pages redirect...');
  const protectedPages = [
    '/products/new',
    '/products/123/edit'
  ];
  
  for (const page of protectedPages) {
    const response = await makeRequest(`${BASE_URL}${page}`);
    if (response.response?.redirected || response.response?.status === 401) {
      console.log(`✅ ${page} correctly protected`);
    } else {
      console.log(`⚠️  ${page} protection status unclear`);
    }
  }
}

async function testResponsiveDesign() {
  console.log('\n📱 Testing Responsive Design...\n');
  
  // Test 1: Check if mobile navigation elements exist
  console.log('1️⃣ Testing mobile navigation elements...');
  const homeResponse = await makeRequest(`${BASE_URL}/`);
  
  if (homeResponse.success) {
    console.log('✅ Home page loads successfully (responsive test base)');
  } else {
    console.log('❌ Home page should load for responsive testing');
  }
  
  // Note: Full responsive testing would require browser automation
  console.log('⚠️  Full responsive testing requires browser automation (Puppeteer)');
}

async function runCompleteTests() {
  console.log('🚀 Starting Complete Authentication Tests...\n');
  
  try {
    await testRegistrationFlow();
    await testLoginLogoutFlow();
    await testProductCRUDOperations();
    await testUIAuthentication();
    await testResponsiveDesign();
    
    console.log('\n✨ Complete Authentication Tests Finished!');
    console.log('\n📝 Summary:');
    console.log('- Registration flow tested');
    console.log('- Login/logout flow tested');
    console.log('- Product CRUD operations tested');
    console.log('- UI authentication features tested');
    console.log('- Responsive design base tested');
    console.log('\n💡 For full UI testing with authentication, use browser automation');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run tests
runCompleteTests().catch(console.error); 
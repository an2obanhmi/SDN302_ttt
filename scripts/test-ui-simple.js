const BASE_URL = 'http://localhost:3000';

async function testUISimple() {
  console.log('🧪 Testing UI Authentication Features (Simple)...\n');
  
  try {
    // Test 1: Check if products page is accessible
    console.log('1️⃣ Testing public access to products page...');
    const productsResponse = await fetch(`${BASE_URL}/products`);
    
    if (productsResponse.ok) {
      console.log('✅ Products page is publicly accessible');
    } else {
      console.log('❌ Products page should be publicly accessible');
    }
    
    // Test 2: Check if new product page redirects (should be protected)
    console.log('\n2️⃣ Testing new product page protection...');
    const newProductResponse = await fetch(`${BASE_URL}/products/new`);
    
    if (newProductResponse.redirected) {
      console.log('✅ New product page correctly redirects (protected)');
    } else if (newProductResponse.status === 401) {
      console.log('✅ New product page returns 401 (protected)');
    } else {
      console.log('⚠️  New product page protection status unclear');
    }
    
    // Test 3: Check if edit product page redirects (should be protected)
    console.log('\n3️⃣ Testing edit product page protection...');
    const editProductResponse = await fetch(`${BASE_URL}/products/123/edit`);
    
    if (editProductResponse.redirected) {
      console.log('✅ Edit product page correctly redirects (protected)');
    } else if (editProductResponse.status === 401) {
      console.log('✅ Edit product page returns 401 (protected)');
    } else {
      console.log('⚠️  Edit product page protection status unclear');
    }
    
    // Test 4: Check if login page is accessible
    console.log('\n4️⃣ Testing login page accessibility...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`);
    
    if (loginResponse.ok) {
      console.log('✅ Login page is accessible');
    } else {
      console.log('❌ Login page should be accessible');
    }
    
    // Test 5: Check if register page is accessible
    console.log('\n5️⃣ Testing register page accessibility...');
    const registerResponse = await fetch(`${BASE_URL}/auth/register`);
    
    if (registerResponse.ok) {
      console.log('✅ Register page is accessible');
    } else {
      console.log('❌ Register page should be accessible');
    }
    
    console.log('\n✨ Simple UI Tests Completed!');
    console.log('\n📝 Manual Testing Checklist:');
    console.log('- Visit /products - should show products without edit/delete buttons');
    console.log('- Visit /products/new - should redirect to login');
    console.log('- Visit /products/[id]/edit - should redirect to login');
    console.log('- Login and check if edit/delete buttons appear');
    console.log('- Login and check if "Add Product" button appears in navigation');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the development server is running: npm run dev');
  }
}

testUISimple().catch(console.error); 
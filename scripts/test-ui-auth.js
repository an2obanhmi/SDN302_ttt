const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';

async function testUIAuthentication() {
  console.log('🧪 Testing UI Authentication Features...\n');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 100,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Test 1: Check public access to products page
    console.log('1️⃣ Testing public access to products page...');
    await page.goto(`${BASE_URL}/products`);
    await page.waitForSelector('.group', { timeout: 5000 });
    
    // Check if edit/delete buttons are NOT visible (unauthenticated)
    const editButtons = await page.$$('[title="Chỉnh sửa sản phẩm"]');
    const deleteButtons = await page.$$('[title="Xóa sản phẩm"]');
    
    if (editButtons.length === 0 && deleteButtons.length === 0) {
      console.log('✅ Edit/Delete buttons correctly hidden for unauthenticated users');
    } else {
      console.log('❌ Edit/Delete buttons should be hidden for unauthenticated users');
    }
    
    // Test 2: Check navigation for unauthenticated users
    console.log('\n2️⃣ Testing navigation for unauthenticated users...');
    await page.goto(`${BASE_URL}`);
    await page.waitForSelector('nav', { timeout: 5000 });
    
    // Check if "Add Product" button is NOT visible
    const addProductButtons = await page.$$('[title="Thêm sản phẩm mới"]');
    if (addProductButtons.length === 0) {
      console.log('✅ Add Product button correctly hidden for unauthenticated users');
    } else {
      console.log('❌ Add Product button should be hidden for unauthenticated users');
    }
    
    // Check if login/register links are visible
    const loginLinks = await page.$$('a[href="/auth/login"]');
    const registerLinks = await page.$$('a[href="/auth/register"]');
    
    if (loginLinks.length > 0 && registerLinks.length > 0) {
      console.log('✅ Login/Register links correctly visible for unauthenticated users');
    } else {
      console.log('❌ Login/Register links should be visible for unauthenticated users');
    }
    
    // Test 3: Test protected routes redirect
    console.log('\n3️⃣ Testing protected routes redirect...');
    
    // Try to access new product page
    await page.goto(`${BASE_URL}/products/new`);
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/login')) {
      console.log('✅ New product page correctly redirects to login');
    } else {
      console.log('❌ New product page should redirect to login');
    }
    
    // Try to access edit product page
    await page.goto(`${BASE_URL}/products/123/edit`);
    await page.waitForTimeout(2000);
    
    const editUrl = page.url();
    if (editUrl.includes('/auth/login')) {
      console.log('✅ Edit product page correctly redirects to login');
    } else {
      console.log('❌ Edit product page should redirect to login');
    }
    
    // Test 4: Test authenticated user features (if we can simulate login)
    console.log('\n4️⃣ Testing authenticated user features...');
    
    // Go to login page
    await page.goto(`${BASE_URL}/auth/login`);
    await page.waitForSelector('form', { timeout: 5000 });
    
    // Fill login form (you'll need to provide valid credentials)
    await page.type('input[name="email"]', 'test@example.com');
    await page.type('input[name="password"]', 'password123');
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Check if we're logged in (this depends on your login implementation)
    const userInfo = await page.$$('.text-text-light');
    if (userInfo.length > 0) {
      console.log('✅ User authentication working');
      
      // Check if "Add Product" button is now visible
      const addProductButtonsAfterLogin = await page.$$('[title="Thêm sản phẩm mới"]');
      if (addProductButtonsAfterLogin.length > 0) {
        console.log('✅ Add Product button correctly visible for authenticated users');
      } else {
        console.log('❌ Add Product button should be visible for authenticated users');
      }
      
      // Go to products page and check edit/delete buttons
      await page.goto(`${BASE_URL}/products`);
      await page.waitForSelector('.group', { timeout: 5000 });
      
      const editButtonsAfterLogin = await page.$$('[title="Chỉnh sửa sản phẩm"]');
      const deleteButtonsAfterLogin = await page.$$('[title="Xóa sản phẩm"]');
      
      if (editButtonsAfterLogin.length > 0 && deleteButtonsAfterLogin.length > 0) {
        console.log('✅ Edit/Delete buttons correctly visible for authenticated users');
      } else {
        console.log('❌ Edit/Delete buttons should be visible for authenticated users');
      }
    } else {
      console.log('⚠️  Could not verify authenticated user features (login may have failed)');
    }
    
    console.log('\n✨ UI Authentication Tests Completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Check if puppeteer is available
try {
  require.resolve('puppeteer');
  testUIAuthentication().catch(console.error);
} catch (e) {
  console.log('⚠️  Puppeteer not installed. Installing...');
  console.log('Run: npm install puppeteer');
  console.log('Then run: node scripts/test-ui-auth.js');
} 
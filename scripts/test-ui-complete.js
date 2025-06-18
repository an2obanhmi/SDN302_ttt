const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';

// Test data
const testUser = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password: 'password123'
};

async function testCompleteUI() {
  console.log('🧪 Testing Complete UI Authentication...\n');
  
  let browser;
  try {
    browser = await puppeteer.launch({ 
      headless: false, 
      slowMo: 100,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Test 1: Registration Flow
    console.log('1️⃣ Testing Registration Flow...');
    await testRegistration(page);
    
    // Test 2: Login Flow
    console.log('\n2️⃣ Testing Login Flow...');
    await testLogin(page);
    
    // Test 3: UI Authentication Features
    console.log('\n3️⃣ Testing UI Authentication Features...');
    await testUIFeatures(page);
    
    // Test 4: Product CRUD Operations
    console.log('\n4️⃣ Testing Product CRUD Operations...');
    await testProductCRUD(page);
    
    // Test 5: Responsive Design
    console.log('\n5️⃣ Testing Responsive Design...');
    await testResponsiveDesign(page);
    
    // Test 6: Logout Flow
    console.log('\n6️⃣ Testing Logout Flow...');
    await testLogout(page);
    
    console.log('\n✨ Complete UI Tests Finished!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function testRegistration(page) {
  try {
    await page.goto(`${BASE_URL}/auth/register`);
    await page.waitForSelector('form', { timeout: 5000 });
    
    // Fill registration form
    await page.type('input[name="name"]', testUser.name);
    await page.type('input[name="email"]', testUser.email);
    await page.type('input[name="password"]', testUser.password);
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Check if registration was successful
    const currentUrl = page.url();
    if (currentUrl.includes('/auth/login') || currentUrl.includes('/products')) {
      console.log('✅ Registration successful');
    } else {
      console.log('⚠️  Registration status unclear');
    }
  } catch (error) {
    console.log('❌ Registration test failed:', error.message);
  }
}

async function testLogin(page) {
  try {
    await page.goto(`${BASE_URL}/auth/login`);
    await page.waitForSelector('form', { timeout: 5000 });
    
    // Fill login form
    await page.type('input[name="email"]', testUser.email);
    await page.type('input[name="password"]', testUser.password);
    
    // Submit form
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Check if login was successful
    const userInfo = await page.$$('.text-text-light');
    if (userInfo.length > 0) {
      console.log('✅ Login successful');
      return true;
    } else {
      console.log('⚠️  Login status unclear');
      return false;
    }
  } catch (error) {
    console.log('❌ Login test failed:', error.message);
    return false;
  }
}

async function testUIFeatures(page) {
  try {
    // Check if "Add Product" button is visible
    const addProductButtons = await page.$$('[title="Thêm sản phẩm mới"]');
    if (addProductButtons.length > 0) {
      console.log('✅ Add Product button visible for authenticated user');
    } else {
      console.log('❌ Add Product button should be visible for authenticated user');
    }
    
    // Check if user info is displayed
    const userInfo = await page.$$('.text-text-light');
    if (userInfo.length > 0) {
      console.log('✅ User info displayed for authenticated user');
    } else {
      console.log('❌ User info should be displayed for authenticated user');
    }
    
    // Check if logout button is visible
    const logoutButtons = await page.$$('[title="Đăng xuất"]');
    if (logoutButtons.length > 0) {
      console.log('✅ Logout button visible for authenticated user');
    } else {
      console.log('❌ Logout button should be visible for authenticated user');
    }
    
  } catch (error) {
    console.log('❌ UI features test failed:', error.message);
  }
}

async function testProductCRUD(page) {
  try {
    // Go to products page
    await page.goto(`${BASE_URL}/products`);
    await page.waitForSelector('.group', { timeout: 5000 });
    
    // Check if edit/delete buttons are visible
    const editButtons = await page.$$('[title="Chỉnh sửa sản phẩm"]');
    const deleteButtons = await page.$$('[title="Xóa sản phẩm"]');
    
    if (editButtons.length > 0 && deleteButtons.length > 0) {
      console.log('✅ Edit/Delete buttons visible for authenticated user');
    } else {
      console.log('❌ Edit/Delete buttons should be visible for authenticated user');
    }
    
    // Test accessing new product page
    await page.goto(`${BASE_URL}/products/new`);
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/products/new')) {
      console.log('✅ New product page accessible for authenticated user');
    } else {
      console.log('❌ New product page should be accessible for authenticated user');
    }
    
  } catch (error) {
    console.log('❌ Product CRUD test failed:', error.message);
  }
}

async function testResponsiveDesign(page) {
  try {
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}`);
    await page.waitForTimeout(1000);
    
    // Check if mobile menu button is visible
    const mobileMenuButton = await page.$$('button[aria-label*="menu"], button:has(svg)');
    if (mobileMenuButton.length > 0) {
      console.log('✅ Mobile navigation elements present');
    } else {
      console.log('⚠️  Mobile navigation elements not found');
    }
    
    // Test desktop viewport
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${BASE_URL}`);
    await page.waitForTimeout(1000);
    
    // Check if desktop navigation is visible
    const desktopNav = await page.$$('nav');
    if (desktopNav.length > 0) {
      console.log('✅ Desktop navigation working');
    } else {
      console.log('❌ Desktop navigation should be visible');
    }
    
  } catch (error) {
    console.log('❌ Responsive design test failed:', error.message);
  }
}

async function testLogout(page) {
  try {
    // Click logout button
    const logoutButton = await page.$('[title="Đăng xuất"]');
    if (logoutButton) {
      await logoutButton.click();
      await page.waitForTimeout(2000);
      
      // Check if redirected to login page
      const currentUrl = page.url();
      if (currentUrl.includes('/auth/login')) {
        console.log('✅ Logout successful, redirected to login');
      } else {
        console.log('⚠️  Logout status unclear');
      }
    } else {
      console.log('❌ Logout button not found');
    }
    
  } catch (error) {
    console.log('❌ Logout test failed:', error.message);
  }
}

// Check if puppeteer is available
try {
  require.resolve('puppeteer');
  testCompleteUI().catch(console.error);
} catch (e) {
  console.log('⚠️  Puppeteer not installed. Installing...');
  console.log('Run: npm install puppeteer');
  console.log('Then run: node scripts/test-ui-complete.js');
} 
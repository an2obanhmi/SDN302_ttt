const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Testing Production Build...\n');

try {
  // 1. Clean previous build
  console.log('1️⃣  Cleaning previous build...');
  if (fs.existsSync('.next')) {
    if (process.platform === 'win32') {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    } else {
      execSync('rm -rf .next', { stdio: 'inherit' });
    }
  }
  console.log('✅ Cleaned previous build\n');

  // 2. Install dependencies
  console.log('2️⃣  Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');

  // 3. Run TypeScript check
  console.log('3️⃣  Running TypeScript check...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed\n');

  // 4. Run linting
  console.log('4️⃣  Running linting...');
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');

  // 5. Build for production
  console.log('5️⃣  Building for production...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Production build successful\n');

  // 6. Check build output
  console.log('6️⃣  Checking build output...');
  if (fs.existsSync('.next')) {
    console.log('✅ Build directory created');
    // Không kiểm tra static-pages/server-pages vì Next 14 có thể không tạo thư mục này
  } else {
    throw new Error('Build directory not found');
  }

  console.log('\n🎉 Production build test completed successfully!');
  console.log('✅ Ready for deployment to Vercel');
  
  // 7. Display build summary
  console.log('\n📊 Build Summary:');
  console.log('- TypeScript: ✅ Passed');
  console.log('- Linting: ✅ Passed');
  console.log('- Build: ✅ Successful');
  console.log('- Build Directory: ✅ .next exists');
  
  console.log('\n🚀 Next steps:');
  console.log('1. Push code to GitHub');
  console.log('2. Connect repository to Vercel');
  console.log('3. Set environment variables in Vercel dashboard');
  console.log('4. Deploy!');

} catch (error) {
  console.error('\n❌ Production build test failed:');
  console.error(error.message);
  process.exit(1);
} 
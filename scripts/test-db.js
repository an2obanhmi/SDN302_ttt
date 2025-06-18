const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Test database connection and User model
async function testDatabase() {
  try {
    console.log('🔌 Đang kết nối database...');
    
    // Load environment variables from .env.local
    require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI không được tìm thấy trong file .env.local');
    }
    
    console.log('📝 MONGODB_URI:', process.env.MONGODB_URI.substring(0, 20) + '...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối database thành công!');
    
    // Test User model
    const User = require('../models/User').default;
    
    // Test creating a user
    console.log('🧪 Đang test tạo user...');
    const testUser = new User({
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 12),
      name: 'Test User',
      role: 'user'
    });
    
    await testUser.save();
    console.log('✅ Tạo user thành công:', testUser.email);
    
    // Test finding user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('✅ Tìm user thành công:', foundUser.email);
    
    // Test password comparison
    const isPasswordValid = await bcrypt.compare('password123', foundUser.password);
    console.log('✅ So sánh mật khẩu:', isPasswordValid);
    
    // Clean up - delete test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('🧹 Đã xóa user test');
    
    console.log('🎉 Tất cả test đều thành công!');
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Đã ngắt kết nối database');
    }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDatabase();
}

module.exports = testDatabase; 
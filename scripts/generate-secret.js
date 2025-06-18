const crypto = require('crypto');

// Generate a secure random string for NEXTAUTH_SECRET
const secret = crypto.randomBytes(32).toString('base64');

console.log('🔐 Generated NEXTAUTH_SECRET:');
console.log('');
console.log(secret);
console.log('');
console.log('📝 Copy this value to your environment variables:');
console.log('NEXTAUTH_SECRET=' + secret);
console.log('');
console.log('⚠️  Keep this secret secure and never commit it to version control!'); 
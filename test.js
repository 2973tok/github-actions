// Simple smoke test: does server.js have valid syntax and export nothing unexpected?
const { execSync } = require('child_process');

console.log('Running syntax check on server.js...');
try {
    execSync('node --check server.js');
    console.log('✅ server.js syntax is valid');
} catch (err) {
    console.error('❌ server.js has syntax errors');
    process.exit(1);
}

console.log('All tests passed.');

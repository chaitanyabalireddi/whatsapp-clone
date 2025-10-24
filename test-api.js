const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`)
};

let authToken = null;
let testUserId = null;

// Test data
const testUsers = [
  {
    username: 'alice_test',
    email: 'alice@test.com',
    password: 'test123'
  },
  {
    username: 'bob_test',
    email: 'bob@test.com',
    password: 'test123'
  }
];

async function testRegister() {
  log.info('Testing user registration...');
  try {
    const response = await axios.post(`${API_URL}/auth/register`, testUsers[0]);
    authToken = response.data.token;
    testUserId = response.data.user._id;
    log.success(`User registered: ${response.data.user.username}`);
    return true;
  } catch (error) {
    if (error.response?.data?.error?.includes('already exists')) {
      log.warn('User already exists, trying login...');
      return await testLogin();
    }
    log.error(`Registration failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testLogin() {
  log.info('Testing user login...');
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: testUsers[0].email,
      password: testUsers[0].password
    });
    authToken = response.data.token;
    testUserId = response.data.user._id;
    log.success(`User logged in: ${response.data.user.username}`);
    return true;
  } catch (error) {
    log.error(`Login failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testGetCurrentUser() {
  log.info('Testing get current user...');
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success(`Current user: ${response.data.username}`);
    return true;
  } catch (error) {
    log.error(`Get current user failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testSearchUsers() {
  log.info('Testing user search...');
  try {
    const response = await axios.get(`${API_URL}/users/search?query=test`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success(`Found ${response.data.length} users`);
    return true;
  } catch (error) {
    log.error(`User search failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function testGetChats() {
  log.info('Testing get chats...');
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success(`Found ${response.data.length} chats`);
    return true;
  } catch (error) {
    log.error(`Get chats failed: ${error.response?.data?.error || error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('\n========================================');
  console.log('WhatsApp Clone API Tests');
  console.log('========================================\n');

  // Check if server is running
  log.info('Checking if server is running...');
  try {
    await axios.get('http://localhost:5000');
    log.success('Server is running');
  } catch (error) {
    log.error('Server is not running! Please start the server first.');
    log.info('Run: cd server && npm start');
    process.exit(1);
  }

  console.log('');

  // Run tests
  const tests = [
    testRegister,
    testGetCurrentUser,
    testSearchUsers,
    testGetChats
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait between tests
  }

  // Summary
  console.log('\n========================================');
  console.log('Test Summary');
  console.log('========================================');
  console.log(`Total: ${tests.length}`);
  log.success(`Passed: ${passed}`);
  if (failed > 0) {
    log.error(`Failed: ${failed}`);
  }
  console.log('========================================\n');
}

// Run tests
runTests().catch(error => {
  log.error(`Test suite failed: ${error.message}`);
  process.exit(1);
});


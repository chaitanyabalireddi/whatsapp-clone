const os = require('os');
const http = require('http');

// Colors
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

// Get local IP address
function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

// Test HTTP connection
function testConnection(url, port, name) {
  return new Promise((resolve) => {
    const req = http.get(`http://${url}:${port}`, (res) => {
      log.success(`${name} is accessible at http://${url}:${port}`);
      resolve(true);
    });

    req.on('error', (err) => {
      log.error(`${name} not accessible at http://${url}:${port}`);
      console.log(`  Error: ${err.message}`);
      resolve(false);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      log.error(`${name} connection timeout at http://${url}:${port}`);
      resolve(false);
    });
  });
}

async function runNetworkTests() {
  console.log('\n========================================');
  console.log('WhatsApp Clone - Network Test');
  console.log('========================================\n');

  // Get IP address
  const localIP = getLocalIPAddress();

  if (!localIP) {
    log.error('Could not detect local IP address');
    console.log('Please check your network connection\n');
    return;
  }

  log.info(`Local IP Address: ${localIP}`);
  console.log('');

  // Test localhost
  console.log('Testing localhost connections...\n');
  
  const localhostBackend = await testConnection('localhost', 5000, 'Backend (localhost)');
  const localhostFrontend = await testConnection('localhost', 3000, 'Frontend (localhost)');

  console.log('');

  // Test network IP
  console.log('Testing network IP connections...\n');
  
  const networkBackend = await testConnection(localIP, 5000, 'Backend (network)');
  const networkFrontend = await testConnection(localIP, 3000, 'Frontend (network)');

  console.log('');

  // Summary
  console.log('========================================');
  console.log('Network Configuration Summary');
  console.log('========================================\n');

  console.log('Access URLs:');
  console.log('');
  console.log('On this computer:');
  console.log(`  Frontend: http://localhost:3000 ${localhostFrontend ? '✓' : '✗'}`);
  console.log(`  Backend:  http://localhost:5000 ${localhostBackend ? '✓' : '✗'}`);
  console.log('');

  console.log('On other devices (same WiFi):');
  console.log(`  Frontend: http://${localIP}:3000 ${networkFrontend ? '✓' : '✗'}`);
  console.log(`  Backend:  http://${localIP}:5000 ${networkBackend ? '✓' : '✗'}`);
  console.log('');

  // Recommendations
  if (!localhostBackend || !localhostFrontend) {
    log.warn('Servers are not running!');
    console.log('Please start the application first: npm run dev\n');
  } else if (!networkBackend || !networkFrontend) {
    log.warn('Network access is blocked!');
    console.log('Possible solutions:');
    console.log('1. Check firewall settings (ports 3000 and 5000)');
    console.log('2. Run setup-network.bat (Windows) or setup-network.sh (Mac/Linux)');
    console.log('3. See NETWORK_SETUP.md for detailed instructions\n');
  } else {
    log.success('All tests passed! Your app is accessible from other devices');
    console.log('');
    console.log('Next steps:');
    console.log('1. Make sure other device is on the same WiFi');
    console.log(`2. Open http://${localIP}:3000 on other device`);
    console.log('3. Register and start chatting!\n');
  }

  console.log('========================================\n');
}

// Run tests
runNetworkTests().catch(error => {
  log.error(`Test failed: ${error.message}`);
  process.exit(1);
});


# Network Setup - Access from Multiple Devices

This guide helps you access your WhatsApp Clone from multiple devices on the same network (e.g., laptop and phone).

## 🌐 Quick Setup for Multiple Devices

### Step 1: Find Your Computer's IP Address

#### Windows:
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually WiFi or Ethernet).
Example: `192.168.1.100`

#### Mac/Linux:
```bash
# Mac
ifconfig | grep "inet " | grep -v 127.0.0.1

# Linux
hostname -I
# or
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Your IP will look like:** `192.168.1.xxx` or `10.0.0.xxx`

### Step 2: Update Environment Configuration

Replace `YOUR_IP_ADDRESS` with your actual IP address (e.g., `192.168.1.100`)

#### Update `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development

# Allow connections from your network
CLIENT_URL=http://YOUR_IP_ADDRESS:3000
```

Example:
```env
CLIENT_URL=http://192.168.1.100:3000
```

#### Update `client/.env`:
```env
REACT_APP_API_URL=http://YOUR_IP_ADDRESS:5000/api
REACT_APP_SOCKET_URL=http://YOUR_IP_ADDRESS:5000
```

Example:
```env
REACT_APP_API_URL=http://192.168.1.100:5000/api
REACT_APP_SOCKET_URL=http://192.168.1.100:5000
```

### Step 3: Update CORS Configuration

The server is already configured to accept the `CLIENT_URL` from environment variables, so no code changes needed!

### Step 4: Allow Firewall Access (Windows)

When you start the server, Windows Firewall might ask for permission. Click **"Allow access"** for both private and public networks.

Or manually add firewall rules:
```bash
# Run as Administrator in PowerShell
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="React App" dir=in action=allow protocol=TCP localport=3000
```

### Step 5: Start the Application

```bash
# Install dependencies if not done
npm run install-all

# Start both servers
npm run dev
```

### Step 6: Access from Other Devices

**On your computer:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

**On other devices (same WiFi network):**
- Frontend: `http://YOUR_IP_ADDRESS:3000`
- Backend: `http://YOUR_IP_ADDRESS:5000`

Example:
- Frontend: `http://192.168.1.100:3000`
- Backend: `http://192.168.1.100:5000`

---

## 📱 Testing Scenarios

### Scenario 1: Laptop + Phone
1. **Laptop**: Access `http://localhost:3000`
   - Register as Alice
   
2. **Phone**: Access `http://192.168.1.100:3000`
   - Register as Bob
   
3. **Chat**: Send messages and see real-time updates!

### Scenario 2: Two Phones
1. **Phone 1**: Access `http://192.168.1.100:3000`
   - Register as Alice
   
2. **Phone 2**: Access `http://192.168.1.100:3000`
   - Register as Bob
   
3. **Chat**: Test mobile experience!

### Scenario 3: Multiple Laptops
1. **Laptop 1**: Your development machine
2. **Laptop 2**: Friend's laptop on same WiFi
3. Both access via IP address

---

## 🔥 Firewall Configuration

### Windows Firewall

**Option 1: GUI Method**
1. Open Windows Defender Firewall
2. Click "Advanced settings"
3. Click "Inbound Rules" → "New Rule"
4. Select "Port" → Next
5. TCP → Specific ports: `3000, 5000` → Next
6. Allow the connection → Next
7. Apply to all profiles → Next
8. Name: "WhatsApp Clone" → Finish

**Option 2: Command Line** (Run as Administrator)
```powershell
# Allow Node.js and React
netsh advfirewall firewall add rule name="WhatsApp Clone Backend" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="WhatsApp Clone Frontend" dir=in action=allow protocol=TCP localport=3000
```

### Mac Firewall
```bash
# Mac typically allows by default, but if needed:
# System Preferences → Security & Privacy → Firewall → Firewall Options
# Add Node and allow incoming connections
```

### Linux Firewall (UFW)
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
sudo ufw reload
```

---

## 🚀 Quick Network Test

### 1. Test Backend Accessibility
From any device on the network:
```bash
# Replace with your IP
curl http://192.168.1.100:5000
```

Should return:
```json
{"message":"WhatsApp Clone API is running"}
```

### 2. Test Frontend Accessibility
Open browser on any device:
```
http://192.168.1.100:3000
```

Should show the login page.

### 3. Test WebSocket Connection
Open browser console on any device and check for WebSocket connection:
```javascript
// Should see in Network tab:
// ws://192.168.1.100:5000/socket.io/...
```

---

## 🔧 Troubleshooting

### ❌ Cannot Access from Phone/Other Device

**Check 1: Same Network**
```bash
# On both devices, check if on same WiFi network
# Phone: Settings → WiFi → Network name
# Laptop: Check WiFi name
```

**Check 2: IP Address is Correct**
```bash
# Windows: Run ipconfig again
ipconfig

# Look for IPv4 Address (not 127.0.0.1)
```

**Check 3: Firewall**
```bash
# Temporarily disable firewall to test (Windows)
# If it works, add proper firewall rules
```

**Check 4: Port Listening**
```bash
# Windows: Check if ports are open
netstat -an | findstr "3000 5000"

# Should show:
# TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING
# TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING
```

### ❌ CORS Errors

If you see CORS errors in browser console:

1. **Verify CLIENT_URL in server/.env**
```env
CLIENT_URL=http://192.168.1.100:3000
```

2. **Restart the server** after changing .env files
```bash
# Stop with Ctrl+C and restart
npm run dev
```

### ❌ WebSocket Connection Failed

1. **Check Socket URL in client/.env**
```env
REACT_APP_SOCKET_URL=http://192.168.1.100:5000
```

2. **Rebuild React app** after changing .env
```bash
cd client
# Stop the dev server (Ctrl+C)
# Restart it
npm start
```

### ❌ Connection Timeout

**Check if services are running:**
```bash
# Backend should be on 5000
curl http://192.168.1.100:5000

# Frontend should be on 3000
curl http://192.168.1.100:3000
```

### ❌ IP Address Changes

Your IP might change when you reconnect to WiFi.

**Solution: Check IP again**
```bash
ipconfig  # Windows
```

**Or use Static IP:**
1. Router settings → DHCP → Reserve IP
2. Or set static IP in network adapter settings

---

## 📱 Mobile Testing Tips

### Optimize for Mobile
The app is already responsive, but here are tips:

1. **Use Chrome/Safari on Mobile**
   - Better WebSocket support
   - Better debugging tools

2. **Test Portrait and Landscape**
   - Rotate device to test UI

3. **Test on Different Networks**
   - WiFi vs Mobile Data (for production)

4. **Check Console Logs**
   - Mobile Safari: Settings → Safari → Advanced → Web Inspector
   - Mobile Chrome: chrome://inspect on desktop

### Mobile Browser Access

**iPhone/iPad:**
```
Safari → http://192.168.1.100:3000
```

**Android:**
```
Chrome → http://192.168.1.100:3000
```

---

## 🌍 Access from Internet (Optional)

For accessing from different networks (not just local WiFi):

### Option 1: ngrok (Quick & Easy)
```bash
# Install ngrok: https://ngrok.com/download

# Expose backend
ngrok http 5000

# Expose frontend
ngrok http 3000

# Update .env files with ngrok URLs
```

### Option 2: Port Forwarding
1. Router settings → Port Forwarding
2. Forward ports 3000 and 5000 to your computer's local IP
3. Access via your public IP: `http://YOUR_PUBLIC_IP:3000`

**Warning:** Only do this for testing! Use proper hosting for production.

### Option 3: Cloud Deployment
See `DEPLOYMENT.md` for deploying to Heroku, AWS, etc.

---

## 📊 Network Testing Checklist

Before testing with multiple devices:

- [ ] Found computer's local IP address
- [ ] Updated `server/.env` with correct IP
- [ ] Updated `client/.env` with correct IP
- [ ] Allowed ports 3000 & 5000 in firewall
- [ ] Both devices on same WiFi network
- [ ] Backend accessible from other device
- [ ] Frontend accessible from other device
- [ ] WebSocket connects successfully
- [ ] Can register users from both devices
- [ ] Real-time messaging works

---

## 🎯 Quick Reference

**Find IP:**
```bash
ipconfig  # Windows
```

**Update Files:**
- `server/.env` → Update CLIENT_URL
- `client/.env` → Update API and Socket URLs

**Firewall:**
```bash
# Windows (as Admin)
netsh advfirewall firewall add rule name="WhatsApp 3000" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="WhatsApp 5000" dir=in action=allow protocol=TCP localport=5000
```

**Access:**
- Computer: `http://localhost:3000`
- Other devices: `http://YOUR_IP:3000`

**Test:**
```bash
curl http://YOUR_IP:5000
```

---

**Now you can chat between your laptop and phone! 📱💻**


# Quick Start Guide - 5 Minutes to Chat! ⚡

## Option 1: Automated Setup (Recommended)

### Windows Users:
```bash
# 1. Run setup script
setup.bat

# 2. Start the application
start.bat
```

### Mac/Linux Users:
```bash
# 1. Make scripts executable
chmod +x setup.sh start.sh

# 2. Run setup script
./setup.sh

# 3. Start the application
./start.sh
```

## Option 2: Manual Setup

### Step 1: Install Dependencies (2 minutes)
```bash
npm run install-all
```

Or manually:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### Step 2: Start MongoDB (1 minute)

**Windows:**
- Start MongoDB service from Windows Services
- Or run: `"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"`

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**
```bash
mongosh
# If it connects, MongoDB is running!
```

### Step 3: Start the Application (1 minute)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend app on http://localhost:3000

### Step 4: Create Test Accounts (1 minute)

1. **Open Browser:** http://localhost:3000

2. **Register First User:**
   - Click "Sign Up"
   - Username: `alice`
   - Email: `alice@test.com`
   - Password: `123456`
   - Click "Sign Up"

3. **Register Second User (in new incognito/private window):**
   - Open http://localhost:3000 in incognito mode
   - Username: `bob`
   - Email: `bob@test.com`
   - Password: `123456`
   - Click "Sign Up"

### Step 5: Start Chatting! (30 seconds)

**As Alice:**
1. Click "New Chat" button (comment icon)
2. Search for "bob"
3. Click on Bob's name
4. Type a message and hit send!

**As Bob:**
- Watch the message appear in real-time! 🎉

## Test All Features

### ✅ One-on-One Chat
- Send messages between Alice and Bob
- See real-time delivery
- Check read receipts (✓ ✓✓)

### ✅ Online Status
- Both users should show green online indicator
- Close one window and see them go offline

### ✅ Typing Indicators
- Start typing and see "..." appear for other user

### ✅ Group Chat
1. Click "New Group" button (users icon)
2. Enter group name: "Test Group"
3. Search and add multiple users
4. Click "Create Group"
5. Send messages to the group!

### ✅ Profile Management
1. Click on your avatar in sidebar
2. Click "Profile"
3. Update username, bio, or avatar URL
4. Click "Save Changes"

### ✅ Emojis
1. Open any chat
2. Click the smile icon
3. Select an emoji
4. Send the message! 😊

## Verify Installation

### Check Backend:
```bash
curl http://localhost:5000
# Should return: {"message":"WhatsApp Clone API is running"}
```

### Run API Tests:
```bash
node test-api.js
```

### Check Frontend:
- Open http://localhost:3000
- You should see the login page

### Check MongoDB:
```bash
mongosh
use whatsapp-clone
db.users.find().pretty()
# Should show your registered users
```

## Common Issues & Solutions

### ❌ Port Already in Use
**Error:** `EADDRINUSE :::5000` or `:::3000`

**Solution:**
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### ❌ MongoDB Connection Failed
**Error:** `MongooseServerSelectionError`

**Solution:**
1. Make sure MongoDB is running:
   ```bash
   # Check if running
   ps aux | grep mongod  # Mac/Linux
   
   # Start MongoDB
   mongod  # or use brew services/systemctl
   ```

2. Check connection string in `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
   ```

### ❌ Dependencies Not Installing
**Error:** npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules server/node_modules client/node_modules
rm package-lock.json server/package-lock.json client/package-lock.json

# Reinstall
npm run install-all
```

### ❌ WebSocket Connection Failed
**Error:** Socket.io connection issues

**Solution:**
1. Make sure backend is running on port 5000
2. Check `client/.env`:
   ```
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```
3. Restart both servers

### ❌ CORS Errors
**Error:** Access-Control-Allow-Origin

**Solution:**
Check `server/.env`:
```
CLIENT_URL=http://localhost:3000
```

## Test the Full Chat Flow

### Scenario 1: First Conversation
1. Alice searches for Bob
2. Alice sends: "Hey Bob! 👋"
3. Bob receives message instantly
4. Bob replies: "Hi Alice! How are you?"
5. Alice sees message with read receipt

### Scenario 2: Group Chat
1. Alice creates group: "Friends"
2. Alice adds Bob and Carol
3. Alice sends: "Welcome everyone!"
4. All members receive message
5. Everyone can reply

### Scenario 3: Online/Offline
1. Alice and Bob both online (green dot)
2. Bob closes browser
3. Alice sees Bob go offline
4. Bob reopens browser
5. Alice sees Bob come online

## Development Tips

### Watch Logs
```bash
# Terminal 1 - Backend logs
cd server
npm start

# Terminal 2 - Frontend logs
cd client
npm start
```

### Database GUI
```bash
# Install MongoDB Compass
# Connect to: mongodb://localhost:27017
# Browse whatsapp-clone database
```

### Browser DevTools
- Open Console (F12)
- Check Network tab for API calls
- Monitor WebSocket connections
- View React components

## Next Steps

✅ **Application is running!** Here's what to do next:

1. **Explore Features:**
   - Try all chat features
   - Create multiple test users
   - Test on mobile browser

2. **Customize:**
   - Change colors in CSS files
   - Update branding
   - Modify UI components

3. **Deploy:**
   - Follow `DEPLOYMENT.md`
   - Use Docker or cloud platforms
   - Set up your domain

4. **Extend:**
   - Add file uploads
   - Implement voice messages
   - Add video calls

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for production
- 🔧 Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- 📝 See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions

## Success Checklist

- [ ] MongoDB is running
- [ ] Dependencies installed (node_modules folders exist)
- [ ] Backend started (http://localhost:5000 accessible)
- [ ] Frontend started (http://localhost:3000 shows login page)
- [ ] Created 2 test users
- [ ] Sent messages between users
- [ ] Messages appear in real-time
- [ ] Online status works
- [ ] Typing indicator works
- [ ] Read receipts show

**If all checked, you're ready to go! 🎉**

---

**Happy Chatting! 💬**


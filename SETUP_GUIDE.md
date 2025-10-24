# WhatsApp Clone - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
# Install all dependencies at once
npm run install-all
```

Or manually:
```bash
npm install
cd server && npm install
cd ../client && npm install
cd ..
```

### Step 2: Start MongoDB
```bash
# Make sure MongoDB is running
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: Start MongoDB service from Services
```

### Step 3: Run the Application
```bash
# Start both frontend and backend
npm run dev
```

### Step 4: Open Browser
- Go to http://localhost:3000
- Register a new account
- Open another browser/incognito window
- Register another account
- Start chatting!

## 📋 Detailed Setup Instructions

### Prerequisites Checklist
- ✅ Node.js v16+ installed
- ✅ npm or yarn installed
- ✅ MongoDB installed and running
- ✅ Git installed

### Environment Configuration

#### Server (.env file already created)
The `server/.env` file has been created with default values. For production:
1. Change `JWT_SECRET` to a strong random string
2. Update `MONGODB_URI` if using MongoDB Atlas
3. Set `NODE_ENV=production`

#### Client (.env file already created)
The `client/.env` file has been created with local development URLs.
For production, update to your deployed backend URL.

### MongoDB Setup Options

#### Option 1: Local MongoDB
```bash
# Install MongoDB (if not installed)
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB
mongod
```

#### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

### Running in Different Modes

#### Development Mode (with hot reload)
```bash
npm run dev
```

#### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start backend
cd ../server
npm start
```

#### Docker Mode
```bash
docker-compose up --build
```

## 🧪 Testing the Application

### Create Test Accounts

1. **First User**
   - Go to http://localhost:3000/register
   - Username: `alice`
   - Email: `alice@test.com`
   - Password: `123456`

2. **Second User**
   - Open incognito/private window
   - Go to http://localhost:3000/register
   - Username: `bob`
   - Email: `bob@test.com`
   - Password: `123456`

3. **Start Chatting**
   - As Alice: Click "New Chat" → Search "bob" → Start conversation
   - As Bob: See the message appear in real-time!

### Test All Features

- ✅ **Authentication**: Register, Login, Logout
- ✅ **User Search**: Search for other users
- ✅ **One-on-One Chat**: Send messages between two users
- ✅ **Real-time**: Messages appear instantly
- ✅ **Online Status**: Green dot when user is online
- ✅ **Typing Indicator**: See when someone is typing
- ✅ **Read Receipts**: Single/double check marks
- ✅ **Group Chat**: Create groups with multiple users
- ✅ **Emojis**: Add emojis to messages
- ✅ **Profile**: Update username, bio, avatar

## 🐛 Troubleshooting

### MongoDB Won't Start
```bash
# Check if MongoDB is installed
mongod --version

# Check if port 27017 is in use
# macOS/Linux
lsof -i :27017

# Windows
netstat -ano | findstr :27017
```

### Port Already in Use
```bash
# Change ports in .env files
# Backend: Change PORT in server/.env
# Frontend: Start with PORT=3001 npm start
```

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Socket.io Connection Issues
- Check that backend is running on port 5000
- Verify `REACT_APP_SOCKET_URL` in `client/.env`
- Check browser console for errors
- Disable browser extensions that might block WebSocket

### CORS Errors
- Verify `CLIENT_URL` in `server/.env` matches your frontend URL
- Check that CORS is enabled in `server/index.js`

## 📱 Mobile Testing

### Test on Mobile Device

1. Find your computer's IP address:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. Update URLs (e.g., if IP is 192.168.1.100):
   - Frontend: http://192.168.1.100:3000
   - Backend: http://192.168.1.100:5000

3. Update `client/.env`:
```env
REACT_APP_API_URL=http://192.168.1.100:5000/api
REACT_APP_SOCKET_URL=http://192.168.1.100:5000
```

4. Open on mobile: http://192.168.1.100:3000

## 🔐 Security Checklist for Production

- ✅ Change JWT_SECRET to a strong random string
- ✅ Use HTTPS for both frontend and backend
- ✅ Enable MongoDB authentication
- ✅ Set up rate limiting
- ✅ Use environment variables for all secrets
- ✅ Enable CORS only for your domain
- ✅ Keep dependencies updated
- ✅ Add input validation
- ✅ Implement proper error handling

## 📊 Performance Tips

### Backend Optimization
- Use MongoDB indexes
- Implement pagination for messages
- Cache frequently accessed data
- Use compression middleware

### Frontend Optimization
- Lazy load components
- Implement virtual scrolling for long chats
- Optimize images
- Use React.memo for expensive components

## 🎯 Next Steps

After setting up:
1. Customize the UI colors and theme
2. Add your logo and branding
3. Implement file uploads with cloud storage
4. Add voice/video calling
5. Deploy to production

## 💡 Pro Tips

- Use MongoDB Compass to view database contents
- Use Postman to test API endpoints
- Check browser DevTools Console for errors
- Monitor Network tab for API calls
- Use React Developer Tools for debugging

## 📞 Need Help?

If you encounter issues:
1. Check the main README.md
2. Review error messages carefully
3. Check MongoDB logs
4. Check server logs
5. Check browser console

Happy coding! 🚀


# WhatsApp Clone - Full-Stack Real-Time Chat Application

A fully functional WhatsApp-like chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication.

## 🚀 Features

- **User Authentication** - Secure registration and login with JWT
- **Real-Time Messaging** - Instant message delivery using Socket.io
- **One-on-One Chat** - Private conversations between users
- **Group Chat** - Create and manage group conversations
- **Online Status** - See who's online in real-time
- **Typing Indicators** - Know when someone is typing
- **Read Receipts** - Message delivery and read status (✓ ✓✓)
- **User Search** - Find and start conversations with other users
- **Profile Management** - Update username, bio, and avatar
- **Modern UI** - Beautiful WhatsApp-inspired dark theme interface
- **Emoji Support** - Express yourself with emojis
- **File Sharing** - Share images and files (ready for implementation)
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Emoji Picker React** - Emoji selection
- **Moment.js** - Date formatting
- **React Toastify** - Notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🔧 Installation & Setup

### Method 1: Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd whatsappclone
```

#### 2. Install Dependencies
```bash
# Install root dependencies (for running both servers)
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

#### 3. Configure Environment Variables

**Server Configuration** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/whatsapp-clone
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Client Configuration** (`client/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

#### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS/Linux
sudo systemctl start mongod

# Or if using MongoDB service
mongod
```

#### 5. Run the Application

**Option A: Run both servers concurrently (Recommended)**
```bash
npm run dev
```

**Option B: Run servers separately**

Terminal 1 - Start Backend:
```bash
cd server
npm start
```

Terminal 2 - Start Frontend:
```bash
cd client
npm start
```

#### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

### Method 2: Docker Deployment (Production Ready)

#### 1. Prerequisites
- Docker
- Docker Compose

#### 2. Build and Run with Docker
```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

#### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

The Docker setup includes:
- MongoDB container
- Backend server container
- Frontend (React + Nginx) container
- Persistent MongoDB data volumes
- Automatic container restart

## 📁 Project Structure

```
whatsappclone/
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ChatListItem/
│   │   │   ├── ChatWindow/
│   │   │   ├── GroupChatModal/
│   │   │   ├── MessageItem/
│   │   │   ├── ProfileModal/
│   │   │   ├── Sidebar/
│   │   │   ├── UserSearch/
│   │   │   └── ProtectedRoute.js
│   │   ├── context/         # React Context API
│   │   │   ├── AuthContext.js
│   │   │   └── ChatContext.js
│   │   ├── pages/           # Page components
│   │   │   ├── Chat.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── utils/           # Utilities
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                   # Node.js backend
│   ├── config/              # Configuration
│   │   └── database.js
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/              # Mongoose models
│   │   ├── Chat.js
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── message.js
│   │   └── user.js
│   ├── socket/              # Socket.io handlers
│   │   └── socketHandler.js
│   ├── index.js             # Server entry point
│   └── package.json
│
├── docker-compose.yml        # Docker composition
├── Dockerfile.server         # Server Docker image
├── Dockerfile.client         # Client Docker image
├── nginx.conf               # Nginx configuration
└── README.md                # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Users
- `GET /api/users/search?query={query}` - Search users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/contacts` - Get user contacts
- `POST /api/users/contacts` - Add contact

### Chats
- `POST /api/chats` - Create/access one-on-one chat
- `GET /api/chats` - Get all user chats
- `POST /api/chats/group` - Create group chat
- `PUT /api/chats/group/rename` - Rename group
- `PUT /api/chats/group/add` - Add user to group
- `PUT /api/chats/group/remove` - Remove user from group

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/:chatId` - Get chat messages
- `PUT /api/messages/read/:messageId` - Mark as read
- `DELETE /api/messages/:messageId` - Delete message

## 🔌 Socket.io Events

### Client to Server
- `setup` - Initialize user connection
- `join-chat` - Join a chat room
- `leave-chat` - Leave a chat room
- `typing` - Emit typing indicator
- `stop-typing` - Stop typing indicator
- `new-message` - Send new message
- `message-read` - Mark message as read

### Server to Client
- `connected` - Connection established
- `message-received` - New message received
- `typing` - User is typing
- `stop-typing` - User stopped typing
- `user-online` - User came online
- `user-offline` - User went offline
- `message-read-update` - Message read status updated

## 🎨 UI Features

- **WhatsApp-inspired dark theme**
- **Smooth animations and transitions**
- **Responsive design for all screen sizes**
- **Real-time online status indicators**
- **Message read receipts (single/double check marks)**
- **Typing indicators with animated dots**
- **Emoji picker integration**
- **Beautiful modal dialogs**
- **Toast notifications for user feedback**

## 🚀 Deployment

### Deploy to Production

#### Environment Variables for Production
Make sure to set these environment variables:

**Backend:**
- `NODE_ENV=production`
- `MONGODB_URI=<your-mongodb-atlas-uri>`
- `JWT_SECRET=<strong-secret-key>`
- `CLIENT_URL=<your-frontend-url>`

**Frontend:**
- `REACT_APP_API_URL=<your-backend-api-url>`
- `REACT_APP_SOCKET_URL=<your-backend-socket-url>`

#### Deployment Platforms

**Backend Options:**
- Heroku
- Railway
- Render
- DigitalOcean
- AWS EC2

**Frontend Options:**
- Vercel
- Netlify
- Heroku
- AWS S3 + CloudFront

**Database:**
- MongoDB Atlas (recommended)
- Self-hosted MongoDB

### Docker Deployment
Use the provided `docker-compose.yml` for containerized deployment:

```bash
docker-compose up -d
```

## 🧪 Testing

### Register Test Users
1. Navigate to http://localhost:3000/register
2. Create 2 or more test accounts
3. Login with different accounts in different browsers
4. Start chatting!

### Test Features
- ✅ Register new user
- ✅ Login with credentials
- ✅ Search for users
- ✅ Start one-on-one chat
- ✅ Send text messages
- ✅ Real-time message delivery
- ✅ Online/offline status
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Create group chat
- ✅ Group messaging
- ✅ Profile update
- ✅ Emoji picker
- ✅ Logout

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Make sure MongoDB is running

**CORS Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```
Solution: Check that `CLIENT_URL` in server/.env matches your frontend URL

**Socket Connection Failed:**
```
WebSocket connection failed
```
Solution: Check that Socket.io is properly configured and backend is running

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: Kill the process using the port or change the PORT in .env

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- HTTP-only cookies support (optional)
- Input validation
- MongoDB injection prevention
- XSS protection

## 🎯 Future Enhancements

- [ ] Voice messages
- [ ] Video calls
- [ ] Voice calls
- [ ] File upload to cloud storage (Cloudinary/AWS S3)
- [ ] Message reactions
- [ ] Message forwarding
- [ ] Stories/Status feature
- [ ] End-to-end encryption
- [ ] Push notifications
- [ ] Message search
- [ ] Archive chats
- [ ] Block users
- [ ] Report users

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 📧 Contact

For any questions or feedback, please reach out:
- Email: your.email@example.com
- GitHub: @yourusername

---

**Happy Chatting! 💬**


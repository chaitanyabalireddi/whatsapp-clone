# WhatsApp Clone API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Auth Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "https://via.placeholder.com/150",
    "bio": "Hey there! I am using WhatsApp Clone.",
    "isOnline": false,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "https://via.placeholder.com/150",
    "isOnline": true
  },
  "token": "jwt_token_here"
}
```

### Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "user_id",
  "username": "john_doe",
  "email": "john@example.com",
  "avatar": "https://via.placeholder.com/150",
  "bio": "Hey there! I am using WhatsApp Clone.",
  "isOnline": true,
  "contacts": ["contact_id_1", "contact_id_2"]
}
```

### Update Profile
**PUT** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "username": "john_updated",
  "bio": "New bio message",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "username": "john_updated",
    "bio": "New bio message",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### Logout
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### Search Users
**GET** `/api/users/search?query=<search_term>`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `query` (string, required): Search term for username or email

**Response (200):**
```json
[
  {
    "_id": "user_id",
    "username": "alice",
    "email": "alice@example.com",
    "avatar": "https://via.placeholder.com/150",
    "isOnline": true
  },
  {
    "_id": "user_id_2",
    "username": "alice_smith",
    "email": "alice.smith@example.com",
    "avatar": "https://via.placeholder.com/150",
    "isOnline": false
  }
]
```

### Get User by ID
**GET** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "user_id",
  "username": "alice",
  "email": "alice@example.com",
  "avatar": "https://via.placeholder.com/150",
  "bio": "Hey there!",
  "isOnline": true,
  "lastSeen": "2025-01-01T12:00:00.000Z"
}
```

### Get Contacts
**GET** `/api/users/contacts`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "contact_id_1",
    "username": "alice",
    "email": "alice@example.com",
    "avatar": "https://via.placeholder.com/150",
    "isOnline": true
  },
  {
    "_id": "contact_id_2",
    "username": "bob",
    "email": "bob@example.com",
    "avatar": "https://via.placeholder.com/150",
    "isOnline": false
  }
]
```

### Add Contact
**POST** `/api/users/contacts`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "user_id_to_add"
}
```

**Response (200):**
```json
{
  "_id": "current_user_id",
  "username": "john_doe",
  "contacts": [
    {
      "_id": "contact_id_1",
      "username": "alice"
    },
    {
      "_id": "contact_id_2",
      "username": "bob"
    }
  ]
}
```

---

## Chat Endpoints

### Create/Access One-on-One Chat
**POST** `/api/chats`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "userId": "other_user_id"
}
```

**Response (200/201):**
```json
{
  "_id": "chat_id",
  "isGroupChat": false,
  "participants": [
    {
      "_id": "user_id_1",
      "username": "john_doe",
      "avatar": "https://via.placeholder.com/150",
      "isOnline": true
    },
    {
      "_id": "user_id_2",
      "username": "alice",
      "avatar": "https://via.placeholder.com/150",
      "isOnline": false
    }
  ],
  "latestMessage": {
    "_id": "message_id",
    "content": "Hello!",
    "sender": {
      "_id": "user_id_1",
      "username": "john_doe"
    },
    "createdAt": "2025-01-01T12:00:00.000Z"
  },
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

### Get All Chats
**GET** `/api/chats`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "chat_id_1",
    "isGroupChat": false,
    "participants": [...],
    "latestMessage": {...},
    "updatedAt": "2025-01-01T12:00:00.000Z"
  },
  {
    "_id": "chat_id_2",
    "isGroupChat": true,
    "chatName": "Family Group",
    "participants": [...],
    "groupAdmin": {...},
    "latestMessage": {...},
    "updatedAt": "2025-01-01T11:00:00.000Z"
  }
]
```

### Create Group Chat
**POST** `/api/chats/group`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "chatName": "Project Team",
  "users": ["user_id_1", "user_id_2", "user_id_3"]
}
```

**Response (201):**
```json
{
  "_id": "group_chat_id",
  "isGroupChat": true,
  "chatName": "Project Team",
  "participants": [
    {
      "_id": "user_id_1",
      "username": "alice"
    },
    {
      "_id": "user_id_2",
      "username": "bob"
    },
    {
      "_id": "current_user_id",
      "username": "john_doe"
    }
  ],
  "groupAdmin": {
    "_id": "current_user_id",
    "username": "john_doe"
  },
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

### Rename Group
**PUT** `/api/chats/group/rename`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "chatId": "group_chat_id",
  "chatName": "New Group Name"
}
```

**Response (200):**
```json
{
  "_id": "group_chat_id",
  "chatName": "New Group Name",
  "isGroupChat": true,
  "participants": [...],
  "groupAdmin": {...}
}
```

### Add User to Group
**PUT** `/api/chats/group/add`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "chatId": "group_chat_id",
  "userId": "user_to_add_id"
}
```

**Response (200):**
```json
{
  "_id": "group_chat_id",
  "chatName": "Project Team",
  "participants": [
    {...},
    {
      "_id": "new_user_id",
      "username": "new_member"
    }
  ],
  "groupAdmin": {...}
}
```

### Remove User from Group
**PUT** `/api/chats/group/remove`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "chatId": "group_chat_id",
  "userId": "user_to_remove_id"
}
```

**Response (200):**
```json
{
  "_id": "group_chat_id",
  "chatName": "Project Team",
  "participants": [...],
  "groupAdmin": {...}
}
```

---

## Message Endpoints

### Send Message
**POST** `/api/messages`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Text):**
```json
{
  "chatId": "chat_id",
  "content": "Hello, how are you?",
  "messageType": "text"
}
```

**Request Body (Image/File):**
```json
{
  "chatId": "chat_id",
  "content": "Check this out!",
  "messageType": "image",
  "fileUrl": "https://example.com/image.jpg",
  "fileName": "image.jpg"
}
```

**Response (201):**
```json
{
  "_id": "message_id",
  "chat": {
    "_id": "chat_id",
    "participants": [...]
  },
  "sender": {
    "_id": "sender_id",
    "username": "john_doe",
    "avatar": "https://via.placeholder.com/150"
  },
  "content": "Hello, how are you?",
  "messageType": "text",
  "readBy": [],
  "deliveredTo": ["user_id_1"],
  "createdAt": "2025-01-01T12:00:00.000Z",
  "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

### Get Messages for a Chat
**GET** `/api/messages/:chatId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "_id": "message_id_1",
    "sender": {
      "_id": "user_id_1",
      "username": "john_doe",
      "avatar": "https://via.placeholder.com/150"
    },
    "content": "Hello!",
    "messageType": "text",
    "readBy": [
      {
        "user": "user_id_2",
        "readAt": "2025-01-01T12:01:00.000Z"
      }
    ],
    "createdAt": "2025-01-01T12:00:00.000Z"
  },
  {
    "_id": "message_id_2",
    "sender": {
      "_id": "user_id_2",
      "username": "alice"
    },
    "content": "Hi there!",
    "messageType": "text",
    "readBy": [],
    "createdAt": "2025-01-01T12:00:30.000Z"
  }
]
```

### Mark Message as Read
**PUT** `/api/messages/read/:messageId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "_id": "message_id",
  "content": "Hello!",
  "readBy": [
    {
      "user": "current_user_id",
      "readAt": "2025-01-01T12:05:00.000Z"
    }
  ]
}
```

### Delete Message
**DELETE** `/api/messages/:messageId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Message deleted successfully"
}
```

---

## Socket.io Events

### Client to Server Events

#### Setup Connection
**Event:** `setup`

**Payload:**
```json
{
  "_id": "user_id",
  "username": "john_doe"
}
```

#### Join Chat Room
**Event:** `join-chat`

**Payload:**
```json
"chat_id"
```

#### Leave Chat Room
**Event:** `leave-chat`

**Payload:**
```json
"chat_id"
```

#### Typing Indicator
**Event:** `typing`

**Payload:**
```json
{
  "chatId": "chat_id",
  "user": {
    "_id": "user_id",
    "username": "john_doe"
  }
}
```

#### Stop Typing
**Event:** `stop-typing`

**Payload:**
```json
{
  "chatId": "chat_id",
  "user": {
    "_id": "user_id",
    "username": "john_doe"
  }
}
```

#### Send Message (Socket)
**Event:** `new-message`

**Payload:**
```json
{
  "_id": "message_id",
  "chat": {
    "_id": "chat_id",
    "participants": [...]
  },
  "sender": {
    "_id": "sender_id",
    "username": "john_doe"
  },
  "content": "Hello!",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

#### Mark as Read (Socket)
**Event:** `message-read`

**Payload:**
```json
{
  "messageId": "message_id",
  "chatId": "chat_id",
  "userId": "user_id"
}
```

### Server to Client Events

#### Connected
**Event:** `connected`

**Payload:** None

#### Message Received
**Event:** `message-received`

**Payload:**
```json
{
  "_id": "message_id",
  "chat": {...},
  "sender": {...},
  "content": "New message",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

#### User Typing
**Event:** `typing`

**Payload:**
```json
{
  "chatId": "chat_id",
  "user": {
    "_id": "user_id",
    "username": "alice"
  }
}
```

#### User Stopped Typing
**Event:** `stop-typing`

**Payload:**
```json
{
  "chatId": "chat_id",
  "user": {
    "_id": "user_id",
    "username": "alice"
  }
}
```

#### User Online
**Event:** `user-online`

**Payload:**
```json
"user_id"
```

#### User Offline
**Event:** `user-offline`

**Payload:**
```json
{
  "userId": "user_id",
  "lastSeen": "2025-01-01T12:00:00.000Z"
}
```

#### Message Read Update
**Event:** `message-read-update`

**Payload:**
```json
{
  "messageId": "message_id",
  "userId": "user_id",
  "readAt": "2025-01-01T12:05:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong!",
  "message": "Detailed error message (development only)"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. For production, consider adding:
- Authentication endpoints: 5 requests per 15 minutes
- Message sending: 100 messages per minute
- API calls: 1000 requests per hour

---

## Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Chats:**
```bash
curl http://localhost:5000/api/chats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman

1. Import the API collection
2. Set base URL: `http://localhost:5000/api`
3. Add token to Authorization → Bearer Token
4. Test all endpoints

---

## WebSocket Testing

Use Socket.io client or browser console:

```javascript
const socket = io('http://localhost:5000');

socket.emit('setup', { _id: 'user_id', username: 'john' });

socket.on('connected', () => {
  console.log('Connected!');
});

socket.on('message-received', (message) => {
  console.log('New message:', message);
});
```

---

**API Version:** 1.0.0  
**Last Updated:** 2025


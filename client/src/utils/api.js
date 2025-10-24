import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  logout: () => api.post('/auth/logout'),
};

// User APIs
export const userAPI = {
  searchUsers: (query) => api.get(`/users/search?query=${query}`),
  getUserById: (id) => api.get(`/users/${id}`),
  getContacts: () => api.get('/users/contacts'),
  addContact: (userId) => api.post('/users/contacts', { userId }),
};

// Chat APIs
export const chatAPI = {
  accessChat: (userId) => api.post('/chats', { userId }),
  getChats: () => api.get('/chats'),
  createGroupChat: (data) => api.post('/chats/group', data),
  renameGroup: (chatId, chatName) => api.put('/chats/group/rename', { chatId, chatName }),
  addToGroup: (chatId, userId) => api.put('/chats/group/add', { chatId, userId }),
  removeFromGroup: (chatId, userId) => api.put('/chats/group/remove', { chatId, userId }),
};

// Message APIs
export const messageAPI = {
  sendMessage: (data) => api.post('/messages', data),
  getMessages: (chatId) => api.get(`/messages/${chatId}`),
  markAsRead: (messageId) => api.put(`/messages/read/${messageId}`),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
};

export default api;


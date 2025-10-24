# Railway Deployment Guide

## 🚀 Deploy to Railway (Easiest Method)

### **Step 1: Create Railway Account**
1. Go to: https://railway.app
2. Click "Login" → "GitHub"
3. Authorize Railway

### **Step 2: Deploy Backend**

1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your WhatsApp Clone repo
4. Choose "server" folder
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://ballireddychaitanya_db_user:Chaitu999@cluster0.6upwi0v.mongodb.net/?appName=Cluster0
   JWT_SECRET=your_super_secret_key_here
   CLIENT_URL=https://your-frontend-url.railway.app
   ```
6. Deploy!

### **Step 3: Deploy Frontend**

1. Click "New Project" again
2. Choose "Deploy from GitHub repo"
3. Select your WhatsApp Clone repo
4. Choose "client" folder
5. Set environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   REACT_APP_SOCKET_URL=https://your-backend-url.railway.app
   ```
6. Deploy!

### **Step 4: Update MongoDB Atlas**

1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add: `0.0.0.0/0` (allow all)
4. Save

### **Step 5: Update CORS**

In Railway backend settings, update:
```
CLIENT_URL=https://your-frontend-url.railway.app
```

## 🎯 Your Live URLs:

- **Frontend:** `https://your-app.railway.app`
- **Backend:** `https://your-backend.railway.app`

## 📱 Share with Anyone:

Send them: `https://your-app.railway.app`

## 💰 Cost:
- **Railway:** Free tier available
- **MongoDB Atlas:** Free
- **Total:** $0/month

## ✅ Benefits:
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Auto-deploy from GitHub
- ✅ Environment variables
- ✅ Logs and monitoring
- ✅ Global CDN

## 🚀 Quick Deploy:

1. Push code to GitHub
2. Connect Railway to GitHub
3. Set environment variables
4. Deploy!
5. Share URL with anyone!

---

**Your app will be live on the internet in minutes!** 🌐

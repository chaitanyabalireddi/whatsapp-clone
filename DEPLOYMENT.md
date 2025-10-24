# Deployment Guide - WhatsApp Clone

This guide covers deploying your WhatsApp Clone to various platforms.

## 🚀 Deployment Options

1. **Docker (Recommended)** - Complete containerized deployment
2. **Heroku** - Easy platform for beginners
3. **Vercel + Railway** - Frontend on Vercel, Backend on Railway
4. **AWS** - Full control with EC2, S3, and MongoDB Atlas
5. **DigitalOcean** - Droplets with Docker

---

## 1. Docker Deployment (Recommended)

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Clone and Configure**
```bash
git clone <your-repo>
cd whatsappclone
```

2. **Set Environment Variables**

Create `.env` file in root:
```env
JWT_SECRET=your_production_secret_key_min_32_chars
MONGODB_URI=mongodb://mongodb:27017/whatsapp-clone
```

3. **Build and Run**
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Deploy to Production Server

1. **Copy files to server**
```bash
scp -r * user@your-server:/path/to/app
```

2. **SSH into server and run**
```bash
ssh user@your-server
cd /path/to/app
docker-compose up -d
```

3. **Set up domain and SSL**
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

---

## 2. Heroku Deployment

### Backend (Server)

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create your-whatsapp-backend
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-frontend-url.vercel.app
```

5. **Create Procfile** (in server directory)
```
web: node index.js
```

6. **Deploy**
```bash
cd server
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a your-whatsapp-backend
git push heroku main
```

### Frontend (Client)

Deploy to Vercel:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd client
vercel
```

3. **Set Environment Variables in Vercel Dashboard**
```env
REACT_APP_API_URL=https://your-whatsapp-backend.herokuapp.com/api
REACT_APP_SOCKET_URL=https://your-whatsapp-backend.herokuapp.com
```

---

## 3. Railway Deployment

### Backend

1. **Create account at railway.app**

2. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

3. **Deploy Backend**
```bash
cd server
railway login
railway init
railway up
```

4. **Add MongoDB**
- Add MongoDB plugin in Railway dashboard

5. **Set Environment Variables**
```bash
railway variables set JWT_SECRET=your_secret
railway variables set NODE_ENV=production
```

### Frontend (Vercel)

Same as Heroku frontend deployment above.

---

## 4. AWS Deployment

### Prerequisites
- AWS Account
- EC2 instance (Ubuntu recommended)
- MongoDB Atlas account

### Backend on EC2

1. **Launch EC2 Instance**
- Amazon Linux 2 or Ubuntu
- t2.micro (free tier)
- Configure security group (ports 22, 80, 443, 5000)

2. **Connect to Instance**
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install Git and Clone**
```bash
sudo apt-get install git
git clone your-repo
cd whatsappclone/server
npm install
```

5. **Set up PM2**
```bash
sudo npm install -g pm2
pm2 start index.js --name whatsapp-server
pm2 startup
pm2 save
```

6. **Configure Nginx**
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

7. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

### Frontend on S3 + CloudFront

1. **Build React App**
```bash
cd client
npm run build
```

2. **Create S3 Bucket**
- Create bucket with unique name
- Enable static website hosting
- Upload build folder contents

3. **Set up CloudFront**
- Create CloudFront distribution
- Point to S3 bucket
- Enable HTTPS

4. **Update Environment Variables**
Update API URLs in your build configuration

---

## 5. MongoDB Atlas Setup

### Create Database

1. **Sign up at mongodb.com/cloud/atlas**

2. **Create Cluster**
- Choose free M0 tier
- Select region closest to your server

3. **Create Database User**
- Database Access → Add New User
- Create username and password

4. **Whitelist IP**
- Network Access → Add IP Address
- Add 0.0.0.0/0 for all IPs (or specific IPs)

5. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/whatsapp-clone?retryWrites=true&w=majority
```

6. **Update Environment Variables**
```bash
MONGODB_URI=your_connection_string
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string (min 32 characters)
- [ ] Enable HTTPS for both frontend and backend
- [ ] Set up CORS to only allow your frontend domain
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for all secrets
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Add input validation
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Enable MongoDB IP whitelist
- [ ] Set up regular backups
- [ ] Add monitoring (UptimeRobot, Pingdom)

---

## 📊 Environment Variables Summary

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_min_32_characters
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_SOCKET_URL=https://your-backend-domain.com
```

---

## 🔧 Post-Deployment

### Testing

1. **Register new user**
2. **Login**
3. **Search for users**
4. **Send messages**
5. **Create groups**
6. **Test real-time features**
7. **Test on mobile devices**

### Monitoring

Set up monitoring for:
- Server uptime
- API response times
- Error rates
- Database performance
- WebSocket connections

### Recommended Tools
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry
- **Analytics**: Google Analytics
- **Performance**: New Relic, DataDog

---

## 🚨 Troubleshooting

### WebSocket Connection Issues
- Ensure backend supports WebSocket (HTTP/1.1)
- Check firewall settings
- Enable WebSocket in load balancer/proxy

### CORS Errors
- Update CLIENT_URL in backend
- Set proper CORS headers
- Check protocol (http vs https)

### Database Connection Errors
- Verify MongoDB URI
- Check IP whitelist
- Verify database user credentials

### Build Errors
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all environment variables are set

---

## 📈 Scaling Considerations

### For High Traffic

1. **Use Load Balancer**
   - Distribute traffic across multiple servers
   - AWS ALB, Nginx load balancing

2. **Enable Clustering**
   - Use Node.js cluster module
   - PM2 cluster mode

3. **Redis for Socket.io**
   - Use Redis adapter for Socket.io
   - Enables horizontal scaling

4. **CDN for Static Files**
   - CloudFront, Cloudflare
   - Faster asset delivery

5. **Database Optimization**
   - Add indexes
   - Use replica sets
   - Implement caching (Redis)

---

## 💰 Cost Estimate

### Free Tier (Development)
- MongoDB Atlas: Free (M0)
- Heroku: Free (with limitations)
- Vercel: Free (hobby)
- **Total: $0/month**

### Basic Production
- MongoDB Atlas: $0-9/month (M2)
- Railway/Render: $7/month
- Vercel: Free
- **Total: ~$7-16/month**

### Medium Scale
- MongoDB Atlas: $57/month (M10)
- AWS EC2: $10/month
- CloudFront: $5/month
- **Total: ~$72/month**

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Good luck with your deployment! 🚀**


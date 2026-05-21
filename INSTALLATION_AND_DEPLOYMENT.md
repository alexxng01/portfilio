# 🎯 Complete Installation & Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [First-Time Setup](#first-time-setup)
3. [Running the Application](#running-the-application)
4. [Admin Panel Guide](#admin-panel-guide)
5. [Production Deployment](#production-deployment)
6. [Performance Optimization](#performance-optimization)

---

## Local Development Setup

### System Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Disk Space**: ~200MB
- **OS**: Windows, macOS, or Linux

### Verify Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Both should show version numbers (e.g., v18.17.0, 8.19.0)
```

---

## First-Time Setup

### Step 1: Navigate to Project Directory
```bash
cd "/Users/alex/Desktop/dash/coding/Rahul kumar Mahato (Port)"
```

### Step 2: Install All Dependencies (One Command)
```bash
npm run install-all
```

This will:
- Install root dependencies
- Install backend dependencies (`server/`)
- Install frontend dependencies (`client/`)

**Time required**: 2-5 minutes depending on internet speed

### Step 3: Setup Environment Files

Backend environment:
```bash
cd server
cp .env.example .env
# Edit .env with your values (optional for development)
cd ..
```

Default `.env` already created:
```
PORT=5000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
```

### Step 4: Verify Installation

```bash
# Check if folders exist
ls -la server/node_modules/    # Should show packages
ls -la client/node_modules/    # Should show packages

# Check databases
ls -la server/portfolio.db     # Will create on first run

# Check key files
ls -la client/src/pages/       # Should show all page components
ls -la server/                 # Should show index.js
```

---

## Running the Application

### Development Mode (Recommended for First Time)

**Start Everything:**
```bash
npm run dev
```

This command:
1. Starts backend on `http://localhost:5000`
2. Starts frontend on `http://localhost:3000`
3. Auto-reloads on file changes
4. Shows detailed logs

**Expected Output:**
```
> npm run dev

> concurrently "npm run dev:server" "npm run dev:client"

[1] > portfolio-server@1.0.0 dev
[1] > node --watch index.js
[1] Server running on http://localhost:3000:5000
[0] 
[0] > portfolio-client@1.0.0 dev
[0] > vite
[0] VITE v5.0.0  ready in 123 ms
[0] ➜  Local:   http://localhost:3000
[0] ➜  press h to show help
```

### Access Points
- **Frontend**: Open `http://localhost:3000` in browser
- **Backend API**: `http://localhost:5000/api/*`
- **Admin Panel**: `http://localhost:3000/admin/login`

### Stop the Application
Press `Ctrl+C` in the terminal

### Individual Component Start

**Start only backend:**
```bash
npm run dev:server
```

**Start only frontend:**
```bash
npm run dev:client
```

---

## Admin Panel Guide

### First Login
1. Open `http://localhost:3000/admin/login`
2. Enter credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. Click "Login"

### Admin Features

#### 1. Portfolio Data Management
**Path**: `/admin/dashboard/portfolio`

Edit:
- **Name**: Your full name
- **Title**: Professional title (e.g., "Full Stack Developer")
- **Bio**: Professional bio (shown on home page)
- **Email**: Contact email
- **Phone**: Phone number
- **Theme**: Dark or Light mode
- **Primary Color**: Main accent color (default: #0ef)
- **Secondary Color**: Background color (default: #071b27)

Click "Update Portfolio" to save changes.

#### 2. Skills Management
**Path**: `/admin/dashboard/skills`

**Add New Skill:**
1. Select Category (Frontend Development, Backend Development, Design & Tools)
2. Enter Skill Name (e.g., React.js, Node.js)
3. Set Proficiency Percentage (0-100)
4. Click "Add Skill"

**Edit Skill:**
1. Click "Edit" button on skill
2. Modify details
3. Click "Update Skill"

**Delete Skill:**
1. Click "Delete" button
2. Confirm deletion

#### 3. Projects Management
**Path**: `/admin/dashboard/projects`

**Add New Project:**
1. Enter Project Title
2. Write Project Description
3. Upload Image (URL)
4. Add Technologies (comma-separated, e.g., "React, Node.js, MongoDB")
5. Add GitHub Link (optional)
6. Add Live Demo Link (optional)
7. Check "Mark as Featured" if it's a showcase project
8. Click "Add Project"

**Edit Project:**
1. Click "Edit" button on project
2. Modify details
3. Click "Update Project"

**Delete Project:**
1. Click "Delete" button
2. Confirm deletion

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Change admin password
- [ ] Update JWT_SECRET to secure value
- [ ] Test all features locally
- [ ] Review and update all portfolio data
- [ ] Optimize images
- [ ] Update social media links
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify contact form functionality

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Or build individually:
npm run build:client    # Creates client/dist/
npm run build:server    # No build needed for Node.js
```

**Output:**
- Frontend build: `client/dist/` (~150KB gzipped)
- Backend: Ready to run as-is

### Option 1: Deploy to Vercel (Recommended for Quick Start)

**Frontend on Vercel:**
1. Push code to GitHub
2. Go to `vercel.com`
3. Click "New Project"
4. Select GitHub repository
5. Set build command: `npm run build:client`
6. Set output directory: `client/dist`
7. Deploy

**Backend on Vercel (Serverless):**
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Deploy to Heroku

**Heroku Setup:**
```bash
npm install -g heroku
heroku login
heroku create your-app-name
```

**For backend:**
```bash
cd server
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

**For frontend:**
```bash
cd client
npm run build
# Use static hosting (Netlify, Vercel, or Heroku static)
```

### Option 3: Deploy to Your Own Server

**Prerequisites:**
- SSH access to server
- Node.js installed on server
- Domain name (optional)
- SSL certificate (recommended)

**Steps:**
```bash
# 1. SSH into server
ssh user@your-server.com

# 2. Clone repository or upload files
git clone <your-repo-url>
cd your-project

# 3. Install dependencies
npm run install-all

# 4. Setup environment
cd server
nano .env
# Set:
# PORT=5000
# JWT_SECRET=<secure-random-string>
# NODE_ENV=production

# 5. Build frontend
cd ../client
npm run build
cd ..

# 6. Start with PM2 (process manager)
npm install -g pm2
pm2 start server/index.js --name "portfolio-api"
pm2 startup
pm2 save

# 7. Setup reverse proxy (nginx)
# Configure nginx to serve frontend and proxy API calls
```

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve frontend
    location / {
        root /home/user/portfolio/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to backend
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Environment Variables for Production

Create `server/.env`:
```
PORT=5000
JWT_SECRET=CHANGE_THIS_TO_A_SECURE_RANDOM_STRING
NODE_ENV=production
DATABASE_URL=postgresql://...  # If using PostgreSQL
```

Generate secure JWT_SECRET:
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Result: a1b2c3d4e5f6...
```

---

## Performance Optimization

### Frontend Optimization

1. **Minification**: Vite does this automatically
2. **Code Splitting**: Lazy load routes with React.lazy()
3. **Image Optimization**: Use WebP format, compress images
4. **Caching**: Browser caches static assets
5. **CDN**: Serve images from CDN

### Backend Optimization

1. **Database Indexing**: Already configured for SQLite
2. **Query Optimization**: Use pagination for large datasets
3. **Caching**: Implement Redis for frequent queries
4. **Compression**: Enable gzip in Express

Add gzip compression:
```javascript
// In server/index.js
import compression from 'compression';
app.use(compression());
```

### Database Migration (for production)

Replace SQLite with PostgreSQL:

```bash
npm install pg
```

Update database connection in `server/index.js`:
```javascript
// Instead of SQLite
const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

---

## Monitoring & Maintenance

### Health Checks
```bash
# Check if backend is running
curl http://localhost:5000/api/portfolio

# Check frontend
curl http://localhost:3000
```

### Log Monitoring
```bash
# View backend logs
pm2 logs portfolio-api

# View all logs
pm2 logs
```

### Database Backup
```bash
# Backup SQLite database
cp server/portfolio.db server/portfolio.db.backup

# Backup PostgreSQL
pg_dump -U username database_name > backup.sql
```

### Regular Maintenance
1. **Weekly**: Review logs for errors
2. **Monthly**: Backup database
3. **Quarterly**: Update dependencies (`npm update`)
4. **Yearly**: Security audit

---

## Troubleshooting Deployment

### Issue: Port 5000 in Use
```bash
# Find and kill process
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Issue: Database Locked
```bash
# Restart backend
pm2 restart portfolio-api

# Or manually restart Node.js
```

### Issue: High Memory Usage
```bash
# Check process memory
ps aux | grep node

# Restart if needed
pm2 restart portfolio-api
```

### Issue: SSL Certificate
```bash
# Use Let's Encrypt (free)
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
```

---

## Post-Deployment

### Verify Everything Works
1. [ ] Frontend loads
2. [ ] Admin login works
3. [ ] Can edit portfolio data
4. [ ] Skills and projects display
5. [ ] Contact form submits
6. [ ] Images load
7. [ ] Mobile responsive
8. [ ] No console errors

### Update Domain
1. Update DNS records to point to server
2. Update social media links to new URL
3. Update email links if needed

### Monitor Performance
```bash
# Check uptime
curl -I https://yourdomain.com

# Monitor with cron job
# Add to crontab:
0 * * * * curl https://yourdomain.com > /dev/null 2>&1
```

---

## Scaling for Growth

### When Needing More Power

**Database**: Migrate to PostgreSQL or MongoDB
```bash
npm install pg  # PostgreSQL
# Or
npm install mongoose  # MongoDB
```

**Caching**: Add Redis
```bash
npm install redis
```

**CDN**: Use CloudFlare or AWS CloudFront

**Load Balancing**: Use Nginx or HAProxy

**Microservices**: Split into multiple services

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Update JWT_SECRET
- [ ] Use HTTPS/SSL
- [ ] Enable CORS only for needed domains
- [ ] Validate all user inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Setup firewall rules
- [ ] Regular security audits

```bash
# Check for security vulnerabilities
npm audit
npm audit fix
```

---

## Support & Help

1. **Documentation**: Read `README.md`
2. **Troubleshooting**: Check `TROUBLESHOOTING.md`
3. **Directory**: See `DIRECTORY_STRUCTURE.md`
4. **Quick Start**: Follow `QUICKSTART.md`

---

**Ready to deploy! 🚀** Follow these steps carefully for a smooth production deployment.

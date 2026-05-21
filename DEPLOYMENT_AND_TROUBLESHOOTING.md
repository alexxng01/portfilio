# 🚀 DEPLOYMENT & TROUBLESHOOTING GUIDE

## Getting Started: One Command!

```bash
# Install all dependencies and start both servers
npm run install-all && npm run dev
```

This will:
1. Install root dependencies
2. Install server dependencies
3. Install client dependencies
4. Start backend on `http://localhost:5001`
5. Start frontend on `http://localhost:3000`

---

## 🌐 Access Your Application

Once running, access:

| App | URL | Purpose |
|-----|-----|---------|
| Public Portfolio | `http://localhost:3000` | View your portfolio |
| Admin Panel | `http://localhost:3000/admin` | Manage content |
| Backend API | `http://localhost:5001` | REST API endpoint |

---

## 🔑 Admin Login

Use these credentials:

```
Email:    admin@portfolio.com
Password: admin123
```

⚠️ **Change these immediately in production!**

To change credentials:
1. Delete `portfolio.db`
2. Restart the server (new database will be created)
3. Or update directly in the database using a SQLite editor

---

## 🆘 TROUBLESHOOTING

### Issue: Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5001` or `:3000`

**Solution**:
```bash
# Kill processes on port 5001 (backend)
lsof -ti:5001 | xargs kill -9

# Kill processes on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Then restart
npm run dev
```

### Issue: Module Not Found

**Problem**: `Error: Cannot find module 'express'` or similar

**Solution**:
```bash
# Reinstall all dependencies
npm run install-all

# Or just the server/client
cd server && npm install
cd ../client && npm install
cd ..
```

### Issue: Database Errors

**Problem**: `Error: database disk image is malformed` or database won't open

**Solution**:
```bash
# Delete and recreate database
rm server/portfolio.db

# Restart server (will auto-create with fresh schema)
npm run dev
```

### Issue: Admin Login Not Working

**Problem**: Login fails with error message

**Solution**:
1. Check backend is running on port 5001
2. Check browser console for error details
3. Verify database exists: `ls server/portfolio.db`
4. Check `.env` file has `JWT_SECRET`
5. Delete and recreate database if necessary

### Issue: Changes Not Saving

**Problem**: Edit form saves but changes don't appear

**Solution**:
1. Check network tab in browser DevTools
2. Verify backend is running
3. Check backend console for error messages
4. Verify you're logged in (check auth token in localStorage)
5. Try refreshing the page

### Issue: Frontend Won't Load

**Problem**: Blank page or errors in console

**Solution**:
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: CORS Errors

**Problem**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Backend CORS is already configured
- Check that backend is running on `http://localhost:5001`
- Verify frontend is on `http://localhost:3000`
- Don't access via IP address if using localhost

---

## 📝 Environment Configuration

Check/create `.env` file in server directory:

```env
PORT=5001
JWT_SECRET=your-secure-random-key-change-in-production
NODE_ENV=development
```

---

## 🏗️ Changing Port Numbers

To use different ports:

1. **Backend** (server/.env):
```env
PORT=5000
```

2. **Frontend** (client/vite.config.js):
```javascript
export default {
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```

---

## 📦 Production Deployment

### Before Deploying:

1. **Change Default Credentials**
   - Update admin email and password
   - Generate secure JWT secret

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Environment Variables**
   - Set `NODE_ENV=production`
   - Use secure JWT_SECRET
   - Update CORS origin to your domain

4. **Database**
   - Use production database
   - Regular backups
   - Never commit `.db` file without encryption

### Deployment Options:

#### Option 1: Vercel (Frontend) + Heroku (Backend)

**Frontend (Vercel)**:
```bash
vercel deploy
```

**Backend (Heroku)**:
```bash
heroku create your-app-name
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

#### Option 2: Docker

Create `Dockerfile` in root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY server server
COPY client client

WORKDIR /app/client
RUN npm install && npm run build

WORKDIR /app

EXPOSE 5001
CMD ["npm", "start"]
```

#### Option 3: Self-Hosted (AWS, DigitalOcean, etc.)

```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone your-repo.git
cd your-repo

# Install and build
npm run install-all
npm run build

# Start with PM2 for persistence
npm install -g pm2
pm2 start server/index.js --name "portfolio-api"
pm2 start "cd client && npm run dev" --name "portfolio-web"
pm2 save
```

---

## 🔍 Verifying Everything Works

### Backend Health Check:

```bash
# In browser or curl
curl http://localhost:5001/api/portfolio
```

Should return JSON with portfolio data.

### API Test All Endpoints:

```bash
# Test login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'

# Should return { token: "..." }
```

### Database Verification:

```bash
# Install sqlite3 if needed
# brew install sqlite3 (macOS)
# apt-get install sqlite3 (Linux)

# Check database
sqlite3 server/portfolio.db

# In sqlite3:
# .tables                          # See all tables
# SELECT * FROM portfolio_data;   # Check data
# .quit                            # Exit
```

---

## 🐛 Debug Mode

Enable debug logging:

```bash
# Frontend (add to client/src/main.jsx)
window.DEBUG = true;

# Backend (add to server/index.js)
const DEBUG = process.env.DEBUG === 'true';
if (DEBUG) console.log('Debug:', ...);
```

Run with debug:
```bash
DEBUG=true npm run dev
```

---

## 📱 Mobile Testing

Test on mobile devices:

```bash
# Find your local IP
ipconfig getifaddr en0    # macOS
hostname -I               # Linux

# Access on mobile
http://YOUR_IP:3000
```

---

## 🔐 Security Checklist

- [ ] Changed default admin credentials
- [ ] Set secure JWT_SECRET (minimum 32 characters)
- [ ] Configured CORS for production domain
- [ ] Database backup strategy in place
- [ ] HTTPS enabled in production
- [ ] Environment variables secured
- [ ] No sensitive data in git commits
- [ ] Regular security updates for dependencies

---

## 📊 Performance Optimization

### Frontend:
- Vite build already optimized
- Tailwind CSS purges unused styles
- Image optimization with lazy loading (can add)

### Backend:
- Database queries optimized with indexes
- API responses cached (can add)
- Request throttling implemented (can add)

### Database:
- Consider adding indexes for frequently queried fields
- Archive old data if database grows large

---

## 📚 Useful Commands

```bash
# Check if ports are in use
lsof -i :5001    # Check port 5001
lsof -i :3000    # Check port 3000

# See what's running on a port
netstat -ltnp | grep 5001

# Start development
npm run dev

# Just backend
npm run dev:server

# Just frontend
npm run dev:client

# Build for production
npm run build

# View built files
npm run preview

# Check database size
du -h server/portfolio.db
```

---

## 🆘 Still Having Issues?

1. **Check logs carefully** - Read error messages completely
2. **Google the error** - Most issues have solutions online
3. **Check .env file** - Ensure PORT and JWT_SECRET are set
4. **Restart everything** - Kill processes and start fresh
5. **Clear cache** - Delete node_modules and reinstall
6. **Check node version** - Use Node.js 16+ (check with `node -v`)

---

## ✅ Verification Checklist After Setup

- [ ] `npm run dev` starts without errors
- [ ] Frontend loads at `http://localhost:3000`
- [ ] Admin panel at `http://localhost:3000/admin/login` is accessible
- [ ] Can login with provided credentials
- [ ] Can edit home page and changes appear
- [ ] Database file exists: `server/portfolio.db`
- [ ] No errors in browser console
- [ ] No errors in terminal/backend logs

---

## 🎉 All Set!

Your portfolio is now deployed and ready to use! 

For updates and changes, just modify content in the admin panel. Everything syncs automatically!

Happy coding! 🚀

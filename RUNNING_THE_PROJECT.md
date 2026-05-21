# 🚀 Running the Full-Stack Portfolio Application

## ✅ Project Status: RUNNING

Both the backend and frontend servers are now running successfully!

### 📊 Server Status
- **Backend Server**: ✅ Running on `http://localhost:5001`
- **Frontend Server**: ✅ Running on `http://localhost:3000`
- **Database**: ✅ SQLite (`server/portfolio.db`)

## 🌐 Access the Application

### Main Portfolio Site
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Features**:
  - Home page with Typed.js animation
  - About section
  - Services showcase
  - Skills display
  - Projects portfolio
  - Contact form (saves to database)

### Admin Panel
- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Credentials**:
  - **Email**: `admin@portfolio.com`
  - **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials immediately in production!

## ��️ How to Stop the Servers

### Option 1: From VS Code Terminal
Press `Ctrl+C` in each terminal window where the servers are running.

### Option 2: Kill Processes
```bash
# Kill backend server
pkill -f "node.*index.js"

# Kill frontend server
pkill -f "vite"
```

### Option 3: Kill by Port
```bash
# Backend (port 5001)
lsof -i :5001 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Frontend (port 3000)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

## 🔄 How to Restart the Servers

### Quick Restart (in separate terminal windows)
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

## 📝 Backend API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/verify` - Verify JWT token

### Portfolio Data
- `GET /api/portfolio` - Get portfolio info
- `PUT /api/portfolio` - Update portfolio (requires auth)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill (requires auth)
- `PUT /api/skills/:id` - Update skill (requires auth)
- `DELETE /api/skills/:id` - Delete skill (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Contact Messages
- `GET /api/contact` - Get all messages (requires auth)
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete message (requires auth)

## 🧪 Testing the Application

### Test Checklist
- [ ] Frontend loads without errors
- [ ] All pages are accessible (Home, About, Services, Skills, Projects, Contact)
- [ ] Contact form works and saves to database
- [ ] Admin login page loads
- [ ] Login with default credentials works
- [ ] Admin dashboard displays correctly
- [ ] Can edit portfolio information
- [ ] Can add/edit/delete skills
- [ ] Can add/edit/delete projects
- [ ] Theme switching works
- [ ] Images load correctly
- [ ] Responsive design works on mobile

### Browser Console
- Open Developer Tools: `F12` or `Cmd+Option+I`
- Check **Console** tab for any JavaScript errors
- Check **Network** tab to verify API calls are successful

### Server Logs
- Backend logs appear in the terminal where you ran `npm run dev`
- Look for any error messages or failed requests

## 📁 Important Files

### Backend
- `server/index.js` - Main server file
- `server/.env` - Environment variables (PORT, JWT_SECRET)
- `server/portfolio.db` - SQLite database

### Frontend
- `client/src/main.jsx` - React entry point
- `client/src/App.jsx` - Main App component
- `client/src/context/ThemeContext.jsx` - Global state management
- `client/src/pages/` - Page components
- `client/src/components/Header.jsx` - Navigation header

### Configuration
- `client/vite.config.js` - Vite configuration (includes API proxy)
- `client/tailwind.config.js` - Tailwind CSS configuration
- `client/postcss.config.js` - PostCSS configuration
- `server/.env` - Server environment variables

## 🔧 Troubleshooting

### Port Already in Use
If you see "EADDRINUSE" error:
```bash
# Kill the process using the port
lsof -i :5001 | grep LISTEN | awk '{print $2}' | xargs kill -9
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Frontend Not Loading
1. Ensure backend is running (check terminal for "Server running on...")
2. Check browser console for errors
3. Verify API proxy is set correctly in `vite.config.js`

### API Calls Failing
1. Ensure backend server is running on port 5001
2. Check network tab in browser dev tools
3. Verify `.env` file has correct PORT value

### Database Issues
1. Delete `server/portfolio.db` to reset
2. Restart the backend server to reinitialize
3. The database will be recreated with default schema

## 📚 Documentation

- **README.md** - Project overview
- **QUICKSTART.md** - Quick setup guide
- **INSTALLATION_AND_DEPLOYMENT.md** - Deployment instructions
- **TROUBLESHOOTING.md** - Common issues and solutions
- **DIRECTORY_STRUCTURE.md** - Project file structure
- **SETUP_VERIFICATION.md** - Setup verification guide

## 🎯 Next Steps

### Before Production
1. Change admin credentials in `.env` or database
2. Update JWT_SECRET to a strong random string
3. Set NODE_ENV to "production"
4. Build the frontend: `cd client && npm run build`

### Deployment Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, Render, AWS EC2, DigitalOcean

### Environment Variables
Update these in `server/.env`:
- `PORT` - Server port (default: 5001)
- `JWT_SECRET` - Secret key for JWT tokens (CHANGE THIS!)
- `NODE_ENV` - Set to "production" for deployment

## 📞 Support

For issues, refer to:
1. TROUBLESHOOTING.md
2. Check server terminal for error messages
3. Check browser console for client errors
4. Verify all dependencies are installed: `npm install`

---

**Status**: ✅ Application is running and ready!
**Backend**: http://localhost:5001
**Frontend**: http://localhost:3000
**Admin Panel**: http://localhost:3000/admin/login

Have fun exploring your new full-stack portfolio! 🎉

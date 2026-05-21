# Getting Started - Full-Stack Portfolio Application

## 📋 Quick Summary

Your portfolio has been successfully converted from a static website to a modern full-stack web application with:

- **Frontend**: React.js with Vite and Tailwind CSS
- **Backend**: Node.js/Express with SQLite database
- **Admin Panel**: Secure authentication and content management
- **Database**: SQLite for data persistence
- **API**: RESTful API for all data operations

## ✅ Prerequisites

Before you can run the application, make sure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. A code editor (VS Code, WebStorm, etc.)

## 🚀 Quick Start (Fastest Way)

### Option 1: Using the Startup Script (Recommended for macOS/Linux)

```bash
# Make the script executable (if needed)
chmod +x start-dev.sh

# Run the script
./start-dev.sh
```

The script will:
- Check for Node.js installation
- Install dependencies (if not already installed)
- Start both backend and frontend servers
- Display URLs and credentials

### Option 2: Manual Startup

**Terminal 1 - Start the Backend:**
```bash
cd server
npm run dev
```
Backend will run on: `http://localhost:5000`

**Terminal 2 - Start the Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on: `http://localhost:3000`

## 🌐 Access Your Application

Once both servers are running:

1. **Main Website**: http://localhost:3000
2. **Admin Panel**: http://localhost:3000/admin/login

### Default Admin Credentials
- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

⚠️ **Security Note**: Change these credentials immediately in a production environment!

## 📊 What You Can Do in the Admin Panel

1. **Edit Portfolio Info**
   - Update your name, title, bio, and contact information
   - Change profile colors and theme

2. **Manage Skills**
   - Add, edit, or delete skills
   - Organize skills by category

3. **Manage Projects**
   - Add new projects with descriptions
   - Upload project images
   - Add project links

4. **Manage Contact Messages**
   - View messages from the contact form
   - Delete messages

5. **Customize Theme**
   - Switch between dark and light themes
   - Change primary and secondary colors

## 📁 Project Structure

```
portfolio/
├── server/                 # Node.js/Express backend
│   ├── index.js          # Main server file
│   ├── portfolio.db      # SQLite database (auto-created)
│   ├── package.json
│   └── .env              # Environment variables
│
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # React pages/components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Theme and data context
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
│
├── images/              # Your portfolio images
├── cv/                  # Your CV files
├── start-dev.sh        # Startup script
└── [Documentation files]
```

## 🔧 Common Commands

### Backend (in `server` directory)
```bash
npm run dev      # Start dev server with hot reload
npm start        # Start production server
npm run build    # Build for production
```

### Frontend (in `client` directory)
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🐛 Troubleshooting

### Port Already in Use
If you get "EADDRINUSE" error:

```bash
# Kill the process using port 5000 (backend)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill the process using port 3000 (frontend)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Issues
If you have problems with the database:

```bash
# Reset the database (delete and restart)
rm server/portfolio.db
cd server && npm run dev
```

### Dependencies Issues
If you see module not found errors:

```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

### CORS Errors
Make sure both servers are running:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:3000`

## 📚 Documentation Files

- **README.md** - Project overview and features
- **QUICKSTART.md** - Quick setup guide
- **INSTALLATION_AND_DEPLOYMENT.md** - Detailed deployment instructions
- **TROUBLESHOOTING.md** - Common issues and solutions
- **SETUP_VERIFICATION.md** - Current setup status
- **DIRECTORY_STRUCTURE.md** - Detailed file structure
- **PROJECT_COMPLETE.md** - Completion summary

## 🌍 Deployment

When ready to deploy:

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```
   This creates a `dist` folder with production files.

2. **Deploy Frontend**
   - Upload `client/dist` to Vercel, Netlify, or any static hosting
   - Update the backend API URL in vite.config.js

3. **Deploy Backend**
   - Deploy to Heroku, Railway, Render, or any Node.js hosting
   - Set environment variables on the host
   - Keep the database secure

See **INSTALLATION_AND_DEPLOYMENT.md** for detailed deployment steps.

## 🔐 Security Notes

1. **Change Admin Password**
   - Log in to admin panel
   - Update credentials immediately

2. **Environment Variables**
   - Change `JWT_SECRET` in `.env`
   - Use strong secrets in production

3. **Database**
   - Backup `server/portfolio.db` regularly
   - Use proper database hosting for production

4. **API Security**
   - All admin endpoints require valid JWT token
   - Passwords are hashed with bcrypt

## 💡 Tips & Tricks

1. **Hot Reload Development**
   - Changes to code automatically refresh without restarting
   - Frontend: Instant refresh (Vite)
   - Backend: Auto-restart (nodemon with --watch)

2. **Database Inspection**
   ```bash
   sqlite3 server/portfolio.db
   .tables              # See all tables
   SELECT * FROM admin; # View admin users
   ```

3. **API Testing**
   Use the included test script:
   ```bash
   ./test-api.sh
   ```

4. **Logs**
   When using start-dev.sh:
   - Backend logs: `server.log`
   - Frontend logs: `client.log`

## ✨ Next Steps

1. ✅ Start the application using `./start-dev.sh`
2. ✅ Visit http://localhost:3000 to see your site
3. ✅ Log in to admin panel with default credentials
4. ✅ Update your information and projects
5. ✅ Change admin password
6. ✅ Test all features
7. ✅ Build for production when ready
8. ✅ Deploy!

## 📞 Support Resources

For more detailed information:
- Check TROUBLESHOOTING.md for common issues
- Review INSTALLATION_AND_DEPLOYMENT.md for production setup
- See DIRECTORY_STRUCTURE.md for file organization

## ✅ Verification Checklist

Before declaring the setup complete, verify:

- [ ] Both servers start without errors
- [ ] Can access frontend at localhost:3000
- [ ] Can access admin login at localhost:3000/admin/login
- [ ] Default credentials work
- [ ] Can view all pages (Home, About, Skills, Projects)
- [ ] Contact form works
- [ ] Can add/edit content in admin panel
- [ ] Images load correctly
- [ ] Theme switching works
- [ ] Database file exists at server/portfolio.db

---

**🎉 Your portfolio is now a full-stack application ready to use and deploy!**

For questions or issues, refer to the documentation files in the root directory.

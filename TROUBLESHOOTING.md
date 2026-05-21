# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000` or `:::5000`

**Solutions**:

**Mac/Linux:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or do both at once:
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:5000)
```

**Windows:**
```bash
# Find what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F
```

**Alternative**: Change the port in `client/vite.config.js` or `server/.env`

---

### 2. Dependencies Installation Fails

**Error**: `npm ERR!` or `yarn error`

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock files
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
rm -rf server/node_modules server/package-lock.json

# Reinstall
npm run install-all
```

**For Mac with Node version issues:**
```bash
# Update npm
npm install -g npm@latest

# Retry installation
npm run install-all
```

---

### 3. Backend Won't Start

**Error**: `Cannot find module 'express'` or similar

**Check**:
1. Navigate to server directory: `cd server`
2. Install dependencies: `npm install`
3. Check `.env` file exists with correct values
4. Try starting again: `npm run dev`

**Fix database issues:**
```bash
# Remove corrupted database
rm server/portfolio.db

# Restart server (it will recreate)
npm run dev
```

---

### 4. Frontend Won't Load

**Error**: Blank page, 404, or connection errors

**Check**:
1. Port 3000 is in use: `http://localhost:3000`
2. Browser console for errors (F12)
3. Backend is running on port 5000
4. Check proxy settings in `client/vite.config.js`

**Vite config check:**
```javascript
// Should have proxy config
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

---

### 5. Admin Login Fails

**Error**: "Invalid credentials" message

**Verify**:
- Default email: `admin@portfolio.com`
- Default password: `admin123`
- JWT_SECRET is set in `server/.env`
- Server is running

**Reset credentials**:
1. Delete `server/portfolio.db`
2. Restart server (auto-recreates with defaults)
3. Login again with default credentials

---

### 6. CORS Errors

**Error**: `Access to XMLHttpRequest ... blocked by CORS policy`

**In browser console**: 
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:3000' has been blocked by CORS
```

**Check**:
1. Backend is running
2. `server/index.js` has `app.use(cors())`
3. Check proxy in `client/vite.config.js`

**Try**:
```bash
# Restart both frontend and backend
npm run dev
```

---

### 7. Database Errors

**Error**: `SQLITE_CANTOPEN` or database locked

**Solutions**:
```bash
# Stop server (Ctrl+C)

# Remove database
rm server/portfolio.db

# Restart server
npm run dev
```

**If still having issues:**
```bash
# Check if database file exists
ls -la server/portfolio.db

# Check write permissions
chmod 644 server/portfolio.db

# Try again
npm run dev
```

---

### 8. Tailwind CSS Not Styling

**Error**: Styles not applied, everything looks plain

**Check**:
1. `client/src/index.css` has `@tailwind` directives
2. `client/tailwind.config.js` exists and is correct
3. `client/postcss.config.js` exists
4. Try clearing browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

**Restart dev server:**
```bash
# Stop (Ctrl+C)
# Start fresh
npm run dev
```

---

### 9. Images Not Loading

**Error**: Portfolio images show as broken links

**Check**:
1. Images are in `images/` directory (at root, not in client/)
2. Vite is configured to serve static files
3. Image paths are correct

**Fix**:
```bash
# Ensure images directory exists
ls -la images/

# If using in React, ensure path is correct:
<img src="/images/ME.jpeg" />  <!-- With leading slash -->
```

---

### 10. TypeScript Errors (if you added TypeScript)

**Error**: Various TypeScript compilation errors

**Note**: This is a JavaScript project by default

**If you need TypeScript**, install it:
```bash
npm install --save-dev typescript @types/node @types/react
```

---

### 11. Can't Access Admin Panel

**Error**: Page not found or redirects to login

**Check**:
1. URL is exactly: `http://localhost:3000/admin/login`
2. Frontend is running on port 3000
3. Try logging out and in again
4. Clear browser cache

**If still stuck:**
```bash
# Open browser DevTools (F12)
# Go to Storage → Cookies/Local Storage
# Delete any stored tokens
# Refresh page
```

---

### 12. Projects/Skills Not Showing

**Error**: Empty sections on frontend

**Check**:
1. Backend API is running
2. Open browser DevTools → Network tab
3. Try: `http://localhost:5000/api/projects`
4. Should see JSON data
5. If empty, add data via admin panel

**Debug API**:
```bash
# Test API endpoint
curl http://localhost:5000/api/projects

# Or in terminal:
curl http://localhost:5000/api/portfolio
```

---

### 13. Admin Panel Not Saving Data

**Error**: Changes don't persist or show "Error updating..."

**Check**:
1. Token is valid (not expired)
2. Backend is running
3. Database has write permissions
4. Check server logs for errors

**View server logs:**
```bash
# In another terminal window
cd server
npm run dev
# Look at console output
```

---

### 14. Mobile Menu Not Working

**Error**: Hamburger menu doesn't open/close

**Check**:
1. You're on mobile size (< 640px width)
2. Browser DevTools → Responsive mode
3. Check `Header.jsx` has toggle logic
4. No JavaScript errors (F12 → Console)

**Test**:
```bash
# Open DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
# Try hamburger menu
```

---

### 15. Email Form Not Working

**Error**: Contact form doesn't submit

**Check**:
1. All fields are filled
2. Email format is valid
3. Backend is running
4. Check browser console for errors

**Test submission:**
```javascript
// In browser console (F12):
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    subject: 'Test',
    message: 'Test message'
  })
})
```

---

## Advanced Debugging

### Enable Detailed Logging

**In `server/index.js`, add:**
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### Check Environment Variables

```bash
# Linux/Mac
env | grep PORT
env | grep JWT

# Windows (PowerShell)
Get-ChildItem env: | Where-Object {$_.Name -match "PORT|JWT"}
```

### Database Debug

```bash
# Open SQLite CLI (if installed)
sqlite3 server/portfolio.db

# List all tables
.tables

# Check admin table
SELECT * FROM admin;

# Exit
.quit
```

### Browser Network Inspection

1. Open DevTools (F12)
2. Go to "Network" tab
3. Perform action (e.g., admin login)
4. Look at request/response
5. Check status codes (200=ok, 401=auth failed, 500=server error)

---

## Getting Help

1. **Check this file first** - Most common issues are here
2. **Look at browser console** - F12 → Console tab
3. **Check server logs** - Terminal output where you ran `npm run dev`
4. **Review README.md** - Has full documentation
5. **Check GitHub issues** - If using version control

---

## Still Stuck?

Try these steps in order:

1. **Restart everything**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Clear and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   rm -rf client/node_modules client/package-lock.json
   rm -rf server/node_modules server/package-lock.json
   npm run install-all
   ```

3. **Reset database**
   ```bash
   rm server/portfolio.db
   npm run dev
   ```

4. **Check Node version**
   ```bash
   node --version  # Should be v14+
   npm --version
   ```

5. **Update npm**
   ```bash
   npm install -g npm@latest
   ```

---

## Emergency: Factory Reset

If everything is broken:

```bash
# Clean everything
rm -rf node_modules server/node_modules client/node_modules
rm -rf package-lock.json server/package-lock.json client/package-lock.json
rm -rf server/portfolio.db
rm -rf client/dist server/dist

# Start fresh
npm run install-all
npm run dev
```

---

**You've got this! 💪** Most issues are simple to fix once you know where to look.

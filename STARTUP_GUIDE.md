# 🎬 STEP-BY-STEP STARTUP GUIDE

## Welcome! 👋

Your portfolio CMS is ready to use. This guide will walk you through getting it running in **3 simple steps**.

---

## 📋 Prerequisites Check

Before you start, verify you have:

- ✅ Node.js installed (version 14 or higher)
- ✅ npm or yarn installed
- ✅ This project folder open
- ✅ Terminal/Command prompt ready

**Check your Node.js version:**
```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show version number
```

If you don't have Node.js, download from https://nodejs.org

---

## 🚀 Step 1: Install All Dependencies (2 minutes)

### What This Does
Downloads all the npm packages needed for both the backend (server) and frontend (client).

### The Command
```bash
npm run install-all
```

### What You Should See
```
> npm install
added 150 packages...

> cd server && npm install
added 50 packages...

> cd ../client && npm install
added 300 packages...

✅ Installation complete!
```

### Troubleshooting
- **Takes too long?** It's normal, first time can take 2-5 minutes
- **Error about permission?** Try `sudo npm run install-all`
- **Module not found?** Your Node.js might be out of date, update it
- **Still stuck?** Delete `node_modules` folders and try again:
  ```bash
  rm -rf node_modules server/node_modules client/node_modules
  npm run install-all
  ```

---

## ⚡ Step 2: Start Both Servers (1 minute)

### What This Does
Starts the backend (Express server on port 5001) and frontend (React dev server on port 3000).

### The Command
```bash
npm run dev
```

### What You Should See

**Backend starting:**
```
> cd server && npm run dev

Server running on http://localhost:5001
Database connected ✅
```

**Frontend starting:**
```
> cd client && npm run dev

Vite v5.0.0 ready in XX ms

➜  Local:   http://localhost:3000/
➜  Network: http://...
```

### This means everything is running! ✅

### Troubleshooting

**Error: "Port 5001 already in use"?**
```bash
# Kill the process using the port
lsof -ti:5001 | xargs kill -9
# Then try again
npm run dev
```

**Error: "Port 3000 already in use"?**
```bash
# Kill the process using the port
lsof -ti:3000 | xargs kill -9
# Then try again
npm run dev
```

**Error: "Cannot find module"?**
```bash
# Reinstall packages
npm run install-all
npm run dev
```

**Backend shows error but frontend loads?**
- Check that `server/portfolio.db` exists
- If not, delete it and restart (it will auto-create)
- Check `.env` file exists in server folder

---

## 🌐 Step 3: Access Your Portfolio (1 minute)

### Now Visit These URLs

Open your web browser and go to:

#### 1️⃣ Your Public Portfolio
```
http://localhost:3000
```
**What you'll see:** Your portfolio homepage with all your information

#### 2️⃣ Admin Panel Login
```
http://localhost:3000/admin/login
```
**What you'll see:** Admin login form

### Login with These Credentials

```
Email:    admin@portfolio.com
Password: admin123
```

#### 3️⃣ Admin Dashboard (After Login)
```
http://localhost:3000/admin/dashboard
```
**What you'll see:** Admin control panel with sidebar menu

---

## 🎯 Test: Edit Your First Content

Let's verify everything works by editing something:

### 1. Go to Admin Dashboard
- Visit `http://localhost:3000/admin/dashboard`
- You should already be logged in

### 2. Click "🏠 Edit Home Page"
- Click the "🏠 Edit Home Page" link in the sidebar

### 3. Edit Your Name
- Find the "Name" field
- Change it to something (e.g., "John Doe Test")
- Click "Save Changes"

### 4. Check the Update
- Go back to `http://localhost:3000`
- Your new name should be displayed!
- ✅ If it changed, everything is working!

---

## ✨ What You Can Now Do

### View Your Portfolio (Public Site)
```
http://localhost:3000
```

Navigate to all sections:
- 🏠 Home - Your introduction
- ℹ️ About - Your background
- 💼 Services - What you offer
- ⭐ Skills - Your expertise
- 🚀 Projects - Your portfolio projects
- 📧 Contact - Contact information

### Edit Content (Admin Panel)
```
http://localhost:3000/admin/dashboard
```

Click on sidebar items to edit:
- 🏠 Edit Home Page
- ℹ️ Edit About Section
- 💼 Edit Services
- 📧 Edit Contact Section
- ⭐ Manage Skills (add/edit/delete)
- 🚀 Manage Projects (add/edit/delete)

---

## 🎨 First Things to Customize

### 1. Update Your Home Page (5 minutes)

Go to: `http://localhost:3000/admin/dashboard/home`

Edit these fields:
```
Your Name:      [Your actual name]
Your Title:     [e.g., "Full-Stack Developer"]
Bio:            [Your bio]
Email:          [your@email.com]
Phone:          [Your phone number]
Profession 1:   [Your main skill]
Profession 2:   [Another skill]
Profession 3:   [Yet another skill]
Profile Image:  [/images/ME.jpeg] (or upload your photo)
CV File:        [/cv/cv-3.docx] (or add your CV)
Facebook:       [https://facebook.com/yourprofile]
Instagram:      [https://instagram.com/yourprofile]
WhatsApp:       [https://wa.me/YOUR_NUMBER]
TikTok:         [https://tiktok.com/@yourprofile]
```

Then click "Save Changes" and visit `http://localhost:3000` to see updates instantly!

### 2. Add Your Projects (10 minutes)

Go to: `http://localhost:3000/admin/dashboard/projects`

Click "Add Project" and fill in:
```
Title:          [Project name]
Description:    [What does it do?]
Image:          [/images/project1.png]
Technologies:   [React, Node.js, Tailwind CSS]
GitHub Link:    [https://github.com/yourname/project]
Live Link:      [https://project-demo.com]
```

### 3. Add Your Skills (5 minutes)

Go to: `http://localhost:3000/admin/dashboard/skills`

Click "Add Skill" for each skill:
```
Name:           [Skill name]
Category:       [Frontend / Backend / Tools / etc]
Percentage:     [1-100]
```

Your skills will show up with progress bars on the Skills page!

---

## 🔄 Typical Usage Flow

### Day 1: Setup
1. Run `npm run install-all`
2. Run `npm run dev`
3. Login and explore
4. Update your home page with real info
5. Add your projects
6. Add your skills

### Day 2-7: Customization
1. Add project images to `/images` folder
2. Update project descriptions
3. Add more skills
4. Update about section
5. Test on mobile devices

### Day 8+: Maintenance
1. Periodically update portfolio
2. Add new projects as you complete them
3. Update skills as you learn new tech
4. Keep database backed up

---

## 📊 Terminal Output Explained

### When starting backend (should see):
```bash
$ node --watch index.js
Server running on http://localhost:5001
Database connected ✅
```

This means:
- ✅ Backend is running
- ✅ Database is working
- ✅ Ready to accept API calls

### When starting frontend (should see):
```bash
$ vite
VITE v5.0.0 ready in 234 ms

➜  Local:   http://localhost:3000/
```

This means:
- ✅ Frontend is running
- ✅ Ready to view in browser
- ✅ Hot reload enabled (auto-refreshes when you edit)

---

## ⚠️ Important Notes

### ⚠️ Default Credentials (CHANGE THESE!)
Current login:
- Email: `admin@portfolio.com`
- Password: `admin123`

**For production**, you MUST change these! Update them in the admin panel after first login.

### ⚠️ Database File
- Location: `server/portfolio.db`
- Contains all your content
- **Backup regularly!**
- Don't delete it (unless you want to start fresh)

### ⚠️ Port Numbers
- Frontend: `3000`
- Backend: `5001`
- If ports are in use, kill the processes using them

---

## 🆘 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| Can't start npm | Install Node.js from nodejs.org |
| Port already in use | Kill process: `lsof -ti:5001 \| xargs kill -9` |
| Module not found | Run `npm run install-all` again |
| Page won't load | Check terminal for errors, refresh browser |
| Database error | Delete `server/portfolio.db` and restart |
| Login fails | Check backend is running on port 5001 |
| Changes not saving | Verify backend is running, check browser console |

---

## 📱 Test on Mobile

Want to test your portfolio on phone/tablet?

1. Find your computer's IP:
```bash
# Mac
ipconfig getifaddr en0

# Linux
hostname -I
```

2. On your phone/tablet, open:
```
http://YOUR_IP:3000
```

Example: `http://192.168.1.5:3000`

---

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ Terminal shows "Server running on port 5001"
- ✅ Terminal shows "Vite... ready in XX ms"
- ✅ `http://localhost:3000` loads your portfolio
- ✅ `http://localhost:3000/admin/login` shows login form
- ✅ Can login with provided credentials
- ✅ Admin dashboard loads with sidebar menu
- ✅ Can edit home page and see changes instantly
- ✅ No errors in browser console
- ✅ No errors in terminal

---

## 📚 Next Steps

Once you're up and running:

1. **Read Documentation**
   - `FINAL_VERIFICATION_CHECKLIST.md` - Complete feature list
   - `DEPLOYMENT_AND_TROUBLESHOOTING.md` - Deployment guide
   - `README_COMPLETE.md` - Technical details

2. **Customize Your Content**
   - Update all home page fields
   - Add your real projects
   - Add your actual skills
   - Upload your profile photo

3. **Test Thoroughly**
   - Test on desktop, tablet, mobile
   - Try all editing functions
   - Verify changes persist
   - Check database backups

4. **Deploy When Ready**
   - Build for production
   - Deploy to hosting
   - Set up domain
   - Update security settings

---

## 💡 Pro Tips

1. **Professions** - Use 3 short phrases for the typing animation (e.g., "Full-Stack Developer", "Web Designer", "Problem Solver")

2. **Images** - Keep images in `/images` folder, reference as `/images/filename.ext`

3. **CV** - Keep CV in `/cv` folder, reference as `/cv/cv-3.docx`

4. **Technologies** - In projects, separate technologies with commas: "React, Node.js, Tailwind CSS"

5. **Links** - Always include protocol in links: `https://github.com/yourname` not just `github.com/yourname`

---

## 🎯 Keep the Terminal Running!

**Important:** Don't close the terminal while you're using the app!

- The terminal is running both servers
- If you close it, your app stops working
- To stop: Press `Ctrl+C` in terminal
- To restart: Run `npm run dev` again

---

## 📞 Something Went Wrong?

1. **Read the error message carefully**
2. **Check the troubleshooting section above**
3. **Verify both servers are running**
4. **Check ports aren't in use**
5. **Try restarting everything:**
   ```bash
   # Stop current process (Ctrl+C)
   # Then restart
   npm run dev
   ```

---

## ✅ Final Checklist

Before you say "I'm done with setup":

- [ ] Ran `npm run install-all` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Frontend loads at `http://localhost:3000`
- [ ] Admin panel accessible at `http://localhost:3000/admin/login`
- [ ] Can login with provided credentials
- [ ] Can see admin dashboard
- [ ] Can edit a field and see changes
- [ ] Changes persist after refresh
- [ ] No errors in browser console
- [ ] No errors in terminal

If all checkboxes are ticked, you're ready to go! ✅

---

## 🎊 You're Ready!

Your portfolio CMS is now running and ready to use!

```
┌─────────────────────────────────────────┐
│  🚀 Your Portfolio is LIVE!             │
│  📍 http://localhost:3000               │
│  🔐 Admin: http://localhost:3000/admin  │
│                                          │
│  Happy Creating! 🎉                     │
└─────────────────────────────────────────┘
```

Enjoy your new professional portfolio CMS! 🎉

---

**Next read:** `00_READ_ME_FIRST.md` for the big picture overview

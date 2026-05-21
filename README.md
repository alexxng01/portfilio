# Rahul Kumar Mahato - Full Stack Portfolio

A modern, fully responsive portfolio built with React.js, Node.js, Tailwind CSS, and SQLite. Features an admin panel for managing portfolio content, theme customization, and more.

## 🚀 Features

- **React.js Frontend** - Modern, component-based UI
- **Node.js Backend** - RESTful API with Express.js
- **Tailwind CSS** - Beautiful, utility-first styling (all original styles preserved)
- **Admin Panel** - Secure authentication and content management
  - Edit portfolio information (name, bio, email, phone)
  - Manage skills and expertise levels
  - Add/edit/delete projects
  - Customize theme and colors
- **Responsive Design** - Mobile-first approach
- **Database** - SQLite for data persistence
- **JWT Authentication** - Secure admin access

## 📋 Project Structure

```
rahul-portfolio/
├── server/                    # Node.js Backend
│   ├── package.json
│   ├── index.js              # Main server file
│   ├── .env.example
│   └── portfolio.db          # SQLite database
│
├── client/                   # React.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # Theme context
│   │   ├── index.css        # Global styles + Tailwind
│   │   ├── main.jsx
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── images/                  # Portfolio images
├── package.json            # Root package.json
└── README.md
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Clone/Setup the Project

```bash
cd "Rahul kumar Mahato (Port)"
```

### Step 2: Install Dependencies

```bash
# Install all dependencies at once
npm run install-all

# Or manually:
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Step 3: Setup Environment Variables

Create `.env` file in the `server` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
```

### Step 4: Run the Application

**Development Mode (with auto-reload):**

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend client on `http://localhost:3000`

**Production Build:**

```bash
npm run build
npm start
```

## 🔐 Admin Panel Access

### Default Credentials
- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

### Accessing Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Enter credentials
3. Access dashboard at `http://localhost:3000/admin/dashboard`

### Admin Features

#### Portfolio Data
- Edit name, title, and bio
- Update contact email and phone
- Customize primary and secondary colors
- Change theme (dark/light)

#### Skills Management
- Add new skills with categories (Frontend, Backend, Design & Tools, etc.)
- Set skill proficiency levels (0-100%)
- Edit or delete existing skills
- Organize by category

#### Projects Management
- Add new projects with title, description, and links
- Upload project images or use URLs
- Tag technologies used
- Mark projects as featured
- Add GitHub and live demo links
- Edit or delete projects

## 📱 Pages & Sections

- **Home** - Hero section with typed animation
- **About** - Personal introduction and education info
- **Services** - Services offered (UI/UX Design, Web Design, App Development)
- **Skills** - Technical skills organized by category with progress bars
- **Projects** - Featured projects with images and technologies
- **Contact** - Contact form with email and social links

## 🎨 Customization

### Changing Colors
1. Login to admin panel
2. Go to Portfolio Data section
3. Update Primary and Secondary colors using color picker
4. Changes apply in real-time

### Adding Skills
1. Admin Dashboard → Skills
2. Select category (Frontend Development, Backend Development, Design & Tools, etc.)
3. Enter skill name and proficiency percentage
4. Click "Add Skill"

### Adding Projects
1. Admin Dashboard → Projects
2. Fill in project details (title, description, technologies)
3. Add GitHub and live demo links
4. Upload image or paste image URL
5. Mark as featured if desired
6. Click "Add Project"

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Portfolio
- `GET /api/portfolio` - Fetch portfolio data
- `PUT /api/portfolio` - Update portfolio data (requires auth)

### Skills
- `GET /api/skills` - Fetch all skills
- `POST /api/skills` - Add skill (requires auth)
- `PUT /api/skills/:id` - Update skill (requires auth)
- `DELETE /api/skills/:id` - Delete skill (requires auth)

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Add project (requires auth)
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Social Links
- `GET /api/social-links` - Fetch social links
- `PUT /api/social-links/:id` - Update social link (requires auth)

### Contact
- `POST /api/contact` - Submit contact form

## 🔒 Security Notes

1. **Change Default Credentials** - Update admin password in production
2. **Update JWT Secret** - Change `JWT_SECRET` in `.env`
3. **Use HTTPS** - Always use HTTPS in production
4. **Database Backup** - Regularly backup `portfolio.db`
5. **Environment Variables** - Never commit `.env` file to git

## 📦 Dependencies

### Backend
- express - Web framework
- cors - Cross-Origin Resource Sharing
- sqlite3 - Database
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- dotenv - Environment variables

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- typed.js - Typing animation
- tailwindcss - Utility CSS framework

## 🚀 Deployment

### Backend (Node.js)
Deploy to services like:
- Heroku
- Railway
- Render
- Vercel (with serverless functions)
- AWS Lambda

### Frontend (React/Vite)
Deploy to services like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Database
Consider upgrading SQLite to:
- PostgreSQL
- MongoDB
- MySQL

## 📝 Notes

- All original portfolio styles have been preserved and integrated with Tailwind CSS
- Responsive design works on all devices (mobile, tablet, desktop)
- The burger menu appears only on mobile devices
- Admin panel is only accessible via `/admin/login` route
- JWT tokens expire after 24 hours

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### Database Issues
Delete `portfolio.db` and restart server to reinitialize:
```bash
rm server/portfolio.db
npm run dev
```

### CORS Errors
Check that backend URL in client is correct. Update in `client/vite.config.js` if needed.

## 📞 Support

For issues or questions, check the console for error messages or:
1. Ensure all dependencies are installed
2. Verify environment variables are set
3. Check that ports 3000 and 5000 are available
4. Review server logs for detailed error information

## 📄 License

ISC License

---

**Built with ❤️ by Rahul Kumar Mahato**

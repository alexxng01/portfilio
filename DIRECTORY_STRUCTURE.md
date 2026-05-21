# 📁 Project Directory Structure

## Complete File Layout

```
Rahul kumar Mahato (Port)/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick start guide
├── 📄 CONVERSION_COMPLETE.md       # Conversion summary
├── 📄 package.json                 # Root npm config
├── 📄 .gitignore                   # Git ignore rules
│
├── 📁 images/                      # Portfolio images (KEEP THESE!)
│   ├── ME.jpeg
│   ├── E-comerce.png
│   ├── task-management.png
│   ├── website.png
│   └── ... other images
│
├── 📁 server/                      # ⚙️  NODE.JS BACKEND
│   ├── 📄 package.json
│   ├── 📄 index.js                 # Main server file (Express API)
│   ├── 📄 .env                     # Environment variables
│   ├── 📄 .env.example
│   ├── 📄 portfolio.db             # SQLite database (auto-created)
│   └── 📁 node_modules/            # Dependencies
│
├── 📁 client/                      # ⚛️  REACT.JS FRONTEND
│   ├── 📄 package.json
│   ├── 📄 index.html               # Vite entry point
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   │
│   ├── 📁 src/                     # Source files
│   │   ├── 📄 main.jsx             # React entry point
│   │   ├── 📄 App.jsx              # Main component
│   │   ├── 📄 App.css              # App styles
│   │   ├── 📄 index.css            # Tailwind + Global styles
│   │   │
│   │   ├── 📁 components/          # Reusable components
│   │   │   └── 📄 Header.jsx       # Navigation header
│   │   │
│   │   ├── 📁 pages/               # Page components
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 About.jsx
│   │   │   ├── 📄 Services.jsx
│   │   │   ├── 📄 Skills.jsx
│   │   │   ├── 📄 Projects.jsx
│   │   │   ├── 📄 Contact.jsx
│   │   │   ├── 📄 Admin.jsx
│   │   │   ├── 📄 AdminLogin.jsx
│   │   │   ├── 📄 AdminDashboard.jsx
│   │   │   ├── 📄 AdminPortfolio.jsx
│   │   │   ├── 📄 AdminSkills.jsx
│   │   │   └── 📄 AdminProjects.jsx
│   │   │
│   │   ├── 📁 context/             # Global state management
│   │   │   └── 📄 ThemeContext.jsx # Theme & portfolio data context
│   │   │
│   │   └── 📁 utils/               # Utility functions (optional)
│   │
│   ├── 📁 public/                  # Static assets
│   └── 📁 node_modules/            # Dependencies
│
└── 📁 cv/                          # CV files
    └── cv-3.docx
```

## 🗂️ Key Directories Explained

### Backend (`server/`)
- **Purpose**: Node.js API server
- **Main File**: `index.js`
- **Database**: `portfolio.db` (SQLite)
- **Port**: 5000
- **Key Features**: Authentication, CRUD APIs, Database management

### Frontend (`client/`)
- **Purpose**: React.js web application
- **Entry Point**: `index.html` → `main.jsx` → `App.jsx`
- **Build Tool**: Vite
- **CSS**: Tailwind CSS
- **Port**: 3000
- **Key Features**: UI components, routing, admin panel

### Components (`client/src/components/`)
Reusable React components:
- `Header.jsx` - Navigation and mobile menu

### Pages (`client/src/pages/`)
Full-page components (routed):
- `Home.jsx` - Hero section
- `About.jsx` - About me section
- `Services.jsx` - Services offered
- `Skills.jsx` - Technical skills
- `Projects.jsx` - Project portfolio
- `Contact.jsx` - Contact form
- Admin panel pages (Admin.jsx, AdminLogin.jsx, etc.)

### Context (`client/src/context/`)
Global state management:
- `ThemeContext.jsx` - Manages theme colors and portfolio data

## 📊 File Relationships

```
┌─────────────────────────────────────┐
│     index.html (client/)            │
└──────────────┬──────────────────────┘
               │ loads
               ↓
┌─────────────────────────────────────┐
│      main.jsx                       │ Creates React root
└──────────────┬──────────────────────┘
               │ renders
               ↓
┌─────────────────────────────────────┐
│    ThemeProvider                    │ Provides global theme
└──────────────┬──────────────────────┘
               │ wraps
               ↓
┌─────────────────────────────────────┐
│       App.jsx                       │ Main router
└────────┬─────────────────┬──────────┘
         │                 │
         ↓                 ↓
    ┌─────────┐     ┌─────────────┐
    │ Routes  │     │   Header    │
    │ (Pages) │     │ (All pages) │
    └─────────┘     └─────────────┘
```

## 🔄 Data Flow

```
┌─────────────────────┐
│   User interacts    │
│   with frontend     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────────┐
│  React component calls  │
│  API via axios          │
└──────────┬──────────────┘
           │
           ↓
┌──────────────────────────┐
│  Node.js API endpoint    │
│  authenticates (JWT)     │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Database query          │
│  (SQLite)                │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Response sent back      │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Frontend updates UI     │
│  with new data           │
└──────────────────────────┘
```

## 💾 Database Tables

```
portfolio.db (SQLite)
│
├── admin
│   ├── id (PRIMARY KEY)
│   ├── email
│   └── password (hashed)
│
├── portfolio_data
│   ├── id (PRIMARY KEY)
│   ├── name
│   ├── title
│   ├── bio
│   ├── email
│   ├── phone
│   ├── theme
│   ├── primary_color
│   ├── secondary_color
│   └── updated_at
│
├── skills
│   ├── id (PRIMARY KEY)
│   ├── category
│   ├── name
│   ├── percentage
│   ├── icon
│   ├── order_index
│   └── updated_at
│
├── projects
│   ├── id (PRIMARY KEY)
│   ├── title
│   ├── description
│   ├── image
│   ├── technologies
│   ├── github_link
│   ├── live_link
│   ├── featured
│   ├── order_index
│   └── updated_at
│
└── social_links
    ├── id (PRIMARY KEY)
    ├── platform
    ├── url
    ├── icon
    └── updated_at
```

## 🚀 Environment Variables

### Backend (`server/.env`)
```
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Frontend (Vite auto-setup)
- Uses `VITE_` prefix for environment variables
- Automatically available in build

## 📦 npm Scripts

### Root (`package.json`)
```json
{
  "install-all": "Install all dependencies",
  "dev": "Start both frontend and backend",
  "build": "Build for production",
  "start": "Start backend server"
}
```

### Client (`client/package.json`)
```json
{
  "dev": "Start Vite dev server (port 3000)",
  "build": "Build production bundle",
  "preview": "Preview production build"
}
```

### Server (`server/package.json`)
```json
{
  "dev": "Start server with auto-reload",
  "start": "Start server normally"
}
```

## 🎯 Quick Navigation

**Want to...?**

- **Change styling** → Edit `client/src/index.css` or use Tailwind classes
- **Add a page** → Create in `client/src/pages/` and add route in `App.jsx`
- **Add API endpoint** → Add route in `server/index.js`
- **Change database schema** → Modify SQL in `server/index.js` (initDb function)
- **Customize theme** → Use admin panel or edit in `ThemeContext.jsx`
- **Deploy** → Build frontend with `npm run build:client`, deploy backend separately

---

**All files are organized logically and easy to navigate!** 🗂️

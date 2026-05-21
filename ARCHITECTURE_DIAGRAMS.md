# 🎨 Visual Architecture & Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PORTFOLIO APPLICATION                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐                ┌────────────────┐      │
│  │   FRONTEND     │                │    BACKEND     │      │
│  │   (React)      │────────HTTP───→│  (Express)     │      │
│  │                │←───────JSON─────│   / SQLite     │      │
│  └────────────────┘                └────────────────┘      │
│         │                                    │               │
│         │                                    │               │
│  ┌──────▼──────────────┐            ┌───────▼──────┐       │
│  │   Components        │            │  Database    │       │
│  │  ┌──────────────┐   │            │  ┌────────┐  │       │
│  │  │ Header       │   │            │  │teamwork│  │       │
│  │  │ Teamwork     │   │            │  │projects│  │       │
│  │  │ AdminTeamwork│   │            │  │skills  │  │       │
│  │  └──────────────┘   │            │  └────────┘  │       │
│  └─────────────────────┘            └──────────────┘       │
│         │                                                    │
│  ┌──────▼──────────────┐                                    │
│  │   Context           │                                    │
│  │  ┌──────────────┐   │                                    │
│  │  │ ThemeContext │   │                                    │
│  │  │ updateTheme()│   │                                    │
│  │  │ CSS Variables│   │                                    │
│  │  └──────────────┘   │                                    │
│  └─────────────────────┘                                    │
│         │                                                    │
│  ┌──────▼──────────────┐                                    │
│  │   Styling           │                                    │
│  │  ┌──────────────┐   │                                    │
│  │  │ App.css      │   │                                    │
│  │  │ --color-*    │   │                                    │
│  │  │ Animations   │   │                                    │
│  │  └──────────────┘   │                                    │
│  └─────────────────────┘                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Theme Color Update Flow (Real-Time)

```
USER ACTIONS:
   │
   ├─ Open Admin Panel
   │  └─ Click "Settings"
   │
   ├─ Click Color Picker
   │  └─ Select new color (Red)
   │
   ├─ Click "Update Portfolio"
   │  └─ Form submitted
   │
   └─ INSTANT RESULT: Page colors change!

TECHNICAL FLOW:

AdminPortfolio.jsx
   │
   ├─ handleSubmit() triggered
   │  └─ e.preventDefault()
   │
   ├─ axios.put('/api/portfolio', formData)
   │  └─ Sends new color to server
   │
   └─ Server
      ├─ UPDATE portfolio_data
      │  SET primary_color = '#FF0000'
      │
      └─ RESPONSE: { success: true }

FRONTEND REACTION:

   ├─ updateTheme() called
   │  ├─ setTheme(newTheme)
   │  │  └─ React state updated
   │  │
   │  └─ document.documentElement.style.setProperty()
   │     ├─ '--color-primary' = '#FF0000'
   │     └─ '--color-secondary' = '#071b27'
   │
   ├─ CSS Variables updated on root
   │  └─ Immediately affects all child elements
   │
   ├─ App useEffect watches theme
   │  └─ Re-applies CSS variables
   │
   └─ RESULT: All elements using var(--color-primary)
      now display in RED!

NO PAGE RELOAD NEEDED! ✅
Colors persist after refresh! ✅
```

---

## Teamwork Data Flow (Display)

```
1. USER VISITS HOMEPAGE
   │
   ├─ App.jsx mounts
   ├─ Teamwork component loads
   └─ useEffect triggers

2. API REQUEST
   │
   ├─ axios.get('/api/teamwork')
   └─ Request sent to server

3. SERVER PROCESSING
   │
   ├─ GET /api/teamwork route hit
   ├─ Query: SELECT * FROM teamwork
   ├─ ORDER BY order_index ASC
   └─ Return JSON array

4. RESPONSE RECEIVED
   │
   ├─ [
   │   {id:1, title:'UI/UX', image:'/images/code.jpeg'},
   │   {id:2, title:'UI/UX', image:'/images/img.jpeg'},
   │   {id:3, title:'UI/UX', image:'/images/fell.jpeg'}
   │ ]
   └─ setTeamwork(data)

5. REACT RENDERS
   │
   ├─ teamwork.map((item) => ...)
   ├─ Create JSX for each item
   ├─ Apply CSS classes:
   │  ├─ .teamwork-grid
   │  ├─ .teamwork-item
   │  ├─ .teamwork-image
   │  └─ .teamwork-overlay
   └─ Insert into DOM

6. USER SEES
   │
   ├─ Grid of 3 cards
   ├─ Images loaded
   ├─ Ready for interaction
   └─ ✅ READY!

7. USER HOVERS
   │
   ├─ CSS :hover triggers
   ├─ Image scales: 1.0 → 1.15
   ├─ Overlay expands: 0% → 100%
   ├─ Content fades in:
   │  ├─ Title (opacity 0 → 1)
   │  ├─ Description (opacity 0 → 1)
   │  └─ Link icon (opacity 0 → 1)
   └─ All with smooth transitions
```

---

## Admin Teamwork Management Flow

```
┌─────────────────────────────────────────┐
│      ADMIN TEAMWORK PANEL               │
│   (AdminTeamwork.jsx)                   │
├─────────────────────────────────────────┤
│                                          │
│  ADD ITEM FLOW:                         │
│  ├─ Fill form:                          │
│  │  ├─ Title: "New Project"             │
│  │  ├─ Description: "..."               │
│  │  ├─ Image: "/images/x.jpg"           │
│  │  └─ Order: 4                         │
│  │                                      │
│  ├─ Click "Add Item"                    │
│  │                                      │
│  ├─ Validation:                         │
│  │  └─ Check all fields filled          │
│  │                                      │
│  ├─ API POST /api/teamwork              │
│  │  ├─ Header: Authorization Bearer X   │
│  │  └─ Body: { title, desc, image... }  │
│  │                                      │
│  ├─ Server inserts to DB                │
│  │                                      │
│  └─ ✅ Item added, list refreshed       │
│                                          │
│                                          │
│  EDIT ITEM FLOW:                        │
│  ├─ Click "Edit" on item                │
│  │                                      │
│  ├─ Form populated with data            │
│  │  └─ Set editingId = item.id          │
│  │                                      │
│  ├─ Modify fields                       │
│  │                                      │
│  ├─ Click "Update"                      │
│  │                                      │
│  ├─ API PUT /api/teamwork/:id           │
│  │  └─ Send updated data                │
│  │                                      │
│  ├─ Server updates DB                   │
│  │                                      │
│  ├─ Form cleared, list refreshed        │
│  │                                      │
│  └─ ✅ Item updated                     │
│                                          │
│                                          │
│  DELETE ITEM FLOW:                      │
│  ├─ Click "Delete"                      │
│  │                                      │
│  ├─ Confirmation: "Are you sure?"       │
│  │                                      │
│  ├─ User confirms                       │
│  │                                      │
│  ├─ API DELETE /api/teamwork/:id        │
│  │  └─ Send item ID                     │
│  │                                      │
│  ├─ Server deletes from DB              │
│  │                                      │
│  ├─ List refreshed                      │
│  │                                      │
│  └─ ✅ Item deleted                     │
│                                          │
└─────────────────────────────────────────┘
```

---

## CSS Variable Application

```
BROWSER RENDERS PROCESS:

1. Initial Load
   ├─ Read :root CSS variables
   │  ├─ --color-primary: #0ef
   │  └─ --color-secondary: #071b27
   │
   └─ Apply to all elements
      ├─ color: var(--color-primary)
      ├─ background: var(--color-secondary)
      └─ box-shadow: 0 0 30px var(--color-primary)

2. Theme Update (via JavaScript)
   ├─ document.documentElement.style
   │  .setProperty('--color-primary', '#FF0000')
   │
   └─ Browser immediately re-renders
      ├─ All var(--color-primary) now red
      ├─ No page reload needed
      └─ Smooth instant update ✅

3. CSS Cascade Example:
   ├─ :root { --color-primary: #0ef; }
   ├─ .button { color: var(--color-primary); }
   ├─ .header { border: 2px solid var(--color-primary); }
   ├─ .link:hover { text-shadow: 0 0 10px var(--color-primary); }
   │
   └─ Change --color-primary
      └─ ALL above elements change instantly!
```

---

## Navigation Structure

```
PORTFOLIO HEADER
│
├─── Desktop Navigation (md:flex)
│    │
│    ├─ Home
│    ├─ About
│    ├─ Services
│    ├─ Skills
│    ├─ ⭐ Teamwork (NEW)
│    ├─ Projects
│    └─ Contact
│
├─── Mobile Navigation (md:hidden)
│    │
│    └─ ☰ Hamburger Menu
│       │
│       ├─ Home
│       ├─ About
│       ├─ Services
│       ├─ Skills
│       ├─ ⭐ Teamwork (NEW)
│       ├─ Projects
│       ├─ Contact
│       └─ Admin
│
└─── All links use href="#Section"
     └─ Smooth scroll to corresponding section
```

---

## File Organization

```
Portfolio Project
│
├── server/
│   └── index.js
│       ├── Database schema
│       │  ├── admin
│       │  ├── portfolio_data
│       │  ├── skills
│       │  ├── projects
│       │  ├── services_section
│       │  ├── about_section
│       │  ├── contact_section
│       │  └── ⭐ teamwork (NEW)
│       │
│       └── API Routes
│          ├── /api/auth/login
│          ├── /api/portfolio
│          ├── /api/skills
│          ├── /api/projects
│          ├── /api/services
│          ├── /api/about
│          ├── /api/contact
│          └── ⭐ /api/teamwork (NEW)
│
└── client/src/
    │
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Services.jsx
    │   ├── Skills.jsx
    │   ├── ⭐ Teamwork.jsx (NEW)
    │   ├── Projects.jsx
    │   ├── Contact.jsx
    │   ├── Admin.jsx
    │   ├── AdminHome.jsx
    │   ├── AdminAbout.jsx
    │   ├── AdminServices.jsx
    │   ├── AdminSkills.jsx
    │   ├── ⭐ AdminTeamwork.jsx (NEW)
    │   ├── AdminProjects.jsx
    │   ├── AdminContact.jsx
    │   └── AdminPortfolio.jsx
    │
    ├── components/
    │   └── Header.jsx (updated with Teamwork link)
    │
    ├── context/
    │   └── ThemeContext.jsx (updated with updateTheme)
    │
    ├── App.jsx (updated routes + theme)
    │
    └── App.css (updated with styles + variables)
```

---

## Data Model

```
DATABASE: portfolio.db

TABLE: teamwork
├── id (INTEGER PRIMARY KEY)
├── title (TEXT) - "UI/UX Design"
├── description (TEXT) - "Great code comes from..."
├── image (TEXT) - "/images/code.jpeg"
├── order_index (INTEGER) - 1, 2, 3...
└── updated_at (DATETIME) - timestamp

EXAMPLE RECORDS:
├─ {id: 1, title: "UI/UX Design", description: "...", image: "/images/code.jpeg", order_index: 1}
├─ {id: 2, title: "UI/UX Design", description: "...", image: "/images/img.jpeg", order_index: 2}
└─ {id: 3, title: "UI/UX Design", description: "...", image: "/images/fell.jpeg", order_index: 3}
```

---

## Component Lifecycle

```
HOMEPAGE LOAD:

App Component
│
├─ ThemeProvider Context
│  ├─ fetchPortfolioData()
│  │  └─ Apply theme colors
│  ├─ fetchAboutData()
│  ├─ fetchServicesData()
│  └─ fetchContactData()
│
└─ Main Routes
   └─ Home page route
      ├─ Header component
      ├─ Home section
      ├─ About section
      ├─ Services section
      ├─ Skills section
      ├─ ⭐ Teamwork section (NEW)
      │  ├─ useEffect
      │  └─ fetchTeamwork()
      │     └─ GET /api/teamwork
      │        └─ Render grid with 3 items
      ├─ Projects section
      └─ Contact section
```

---

**Diagrams Updated:** May 21, 2026  
**Architecture Status:** ✅ **DOCUMENTED**

All visual representations current and accurate! 📊

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import geoip from 'geoip-lite';

dotenv.config();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'your-app-password'
  }
});

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'your-email@gmail.com',
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Visitor tracking middleware
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/admin') && !req.path.startsWith('/api/login')) {
    const ip = req.ip || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown';
    
    // Store visitor info asynchronously (don't block request)
    if (db) {
      db.run(
        'INSERT INTO visitors (ip_address, location, page_viewed, user_agent) VALUES (?, ?, ?, ?)',
        [ip, location, req.path, req.get('user-agent')]
      ).catch(err => console.log('Visitor tracking error:', err));
    }
  }
  next();
});

// Database initialization
let db;

async function initDb() {
  db = await open({
    filename: path.join(__dirname, 'portfolio.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS portfolio_data (
      id INTEGER PRIMARY KEY,
      name TEXT,
      title TEXT,
      bio TEXT,
      email TEXT,
      phone TEXT,
      profession1 TEXT DEFAULT 'Frontend Developer',
      profession2 TEXT DEFAULT 'Backend Developer',
      profession3 TEXT DEFAULT 'Full-stack Developer',
      facebook TEXT DEFAULT 'https://www.facebook.com',
      instagram TEXT DEFAULT 'https://www.instagram.com',
      whatsapp TEXT DEFAULT 'https://wa.me/971508394178',
      tiktok TEXT DEFAULT 'https://www.tiktok.com',
      profile_image TEXT DEFAULT '/images/ME.jpeg',
      cv_file TEXT DEFAULT '/cv/cv-3.docx',
      theme TEXT DEFAULT 'dark',
      primary_color TEXT DEFAULT '#0ef',
      secondary_color TEXT DEFAULT '#071b27',
      home_text_color TEXT DEFAULT '#ededed',
      home_heading_color TEXT DEFAULT '#ffffff',
      home_bg_color TEXT DEFAULT 'rgb(15, 23, 42)',
      home_shadow_type TEXT DEFAULT 'glow-md',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY,
      category TEXT,
      name TEXT,
      percentage INTEGER,
      icon TEXT,
      order_index INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      image TEXT,
      technologies TEXT,
      github_link TEXT,
      live_link TEXT,
      featured BOOLEAN DEFAULT 0,
      order_index INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY,
      platform TEXT UNIQUE,
      url TEXT,
      icon TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS about_section (
      id INTEGER PRIMARY KEY,
      title TEXT DEFAULT 'About',
      subtitle TEXT DEFAULT 'Me',
      profession TEXT DEFAULT 'Full Stack Developer',
      paragraph1 TEXT,
      paragraph2 TEXT,
      paragraph3 TEXT,
      education TEXT DEFAULT 'Computer Science Student at Techspire College, Kathmandu',
      education_icon TEXT DEFAULT 'fas fa-graduation-cap',
      development_focus TEXT DEFAULT 'Full-stack web development with modern technologies and best practices',
      development_icon TEXT DEFAULT 'fas fa-code',
      design_philosophy TEXT DEFAULT 'Creating intuitive and beautiful user interfaces with Figma and modern design principles',
      design_icon TEXT DEFAULT 'fas fa-palette',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services_section (
      id INTEGER PRIMARY KEY,
      title TEXT DEFAULT 'Services',
      order_index INTEGER,
      icon TEXT,
      name TEXT,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_section (
      id INTEGER PRIMARY KEY,
      title TEXT DEFAULT 'Contact',
      subtitle TEXT DEFAULT 'Me',
      heading TEXT DEFAULT 'Lets work Together',
      description TEXT,
      contact_email TEXT,
      contact_phone TEXT,
      form_email TEXT DEFAULT 'rm91275@gmail.com',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS teamwork (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      image TEXT,
      order_index INTEGER,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY,
      ip_address TEXT,
      location TEXT,
      page_viewed TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_agent TEXT
    );

    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY,
      action TEXT,
      details TEXT,
      section TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      message TEXT,
      read BOOLEAN DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create default admin if not exists
  const admin = await db.get('SELECT * FROM admin WHERE email = ?', ['admin@portfolio.com']);
  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(
      'INSERT INTO admin (email, password) VALUES (?, ?)',
      ['admin@portfolio.com', hashedPassword]
    );
  }

  // Create default portfolio data if not exists
  const portfolioData = await db.get('SELECT * FROM portfolio_data');
  if (!portfolioData) {
    await db.run(`
      INSERT INTO portfolio_data (name, title, bio, email, phone, profession1, profession2, profession3, facebook, instagram, whatsapp, tiktok, profile_image, cv_file)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Rahul Mahato',
      'Full Stack Developer',
      'Building amazing web experiences',
      'rm91275@gmail.com',
      '+971508394178',
      'Frontend Developer',
      'Backend Developer',
      'Full-stack Developer',
      'https://www.facebook.com',
      'https://www.instagram.com',
      'https://wa.me/971508394178',
      'https://www.tiktok.com',
      '/images/ME.jpeg',
      '/cv/cv-3.docx'
    ]);
  }

  // Create default about section if not exists
  const aboutData = await db.get('SELECT * FROM about_section');
  if (!aboutData) {
    await db.run(`
      INSERT INTO about_section (paragraph1, paragraph2, paragraph3)
      VALUES (?, ?, ?)
    `, [
      "I'm a Computer Science student at Techspire College in Kathmandu, Nepal, with a deep passion for full-stack development and UI/UX design. I love turning complex problems into simple, beautiful, and intuitive solutions.",
      "My journey in technology started with curiosity about how things work behind the scenes. Now, I'm focused on building web applications that not only function well but also provide exceptional user experiences.",
      "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or learning about emerging technologies in the tech ecosystem."
    ]);
  }

  // Create default contact section if not exists
  const contactData = await db.get('SELECT * FROM contact_section');
  if (!contactData) {
    await db.run(`
      INSERT INTO contact_section (description, contact_email, contact_phone)
      VALUES (?, ?, ?)
    `, [
      "I'm always excited to connect with new people, explore fresh ideas, and bring creative visions to life. Whether you have a project in mind, a question about my work, or just want to say hello, I'd love to hear from you. Every great collaboration starts with a conversation — so don't hesitate to reach out and let's make something amazing together.",
      'rm91275@gmail.com',
      '+971508394178'
    ]);
  }

  // Create default services if not exists
  const servicesCount = await db.get('SELECT COUNT(*) as count FROM services_section');
  if (servicesCount.count === 0) {
    const services = [
      {
        name: 'UI/UX Design',
        description: 'Great code comes from collaboration. I love working with others to solve problems, share ideas, and build clean, innovative solutions. Let\'s create something extraordinary together.',
        icon: 'bx bx-code'
      },
      {
        name: 'Web Development',
        description: 'I love working side-by-side with a team — sharing ideas, solving problems, and turning code into something we\'re proud of. Collaboration makes every project better.',
        icon: 'bx bx-crop'
      },
      {
        name: 'Full Stack Development',
        description: 'I enjoy sitting with a team, turning ideas into designs, and watching them come alive on the screen. Creating together makes every project more exciting.',
        icon: 'bx bxl-apple'
      }
    ];

    for (let i = 0; i < services.length; i++) {
      await db.run(
        'INSERT INTO services_section (order_index, icon, name, description) VALUES (?, ?, ?, ?)',
        [i + 1, services[i].icon, services[i].name, services[i].description]
      );
    }
  }

  // Create default teamwork if not exists
  const teamworkCount = await db.get('SELECT COUNT(*) as count FROM teamwork');
  if (teamworkCount.count === 0) {
    const teamworkItems = [
      {
        title: 'UI/UX Design',
        description: 'Great code comes from collaboration. I love working with others to solve problems, share ideas, and build clean, innovative solutions. Let\'s create something extraordinary together.',
        image: '/images/code.jpeg'
      },
      {
        title: 'UI/UX Design',
        description: 'I love working side-by-side with a team — sharing ideas, solving problems, and turning code into something we\'re proud of. Collaboration makes every project better.',
        image: '/images/img.jpeg'
      },
      {
        title: 'UI/UX Design',
        description: 'I enjoy sitting with a team, turning ideas into designs, and watching them come alive on the screen. Creating together makes every project more exciting.',
        image: '/images/fell.jpeg'
      }
    ];

    for (let i = 0; i < teamworkItems.length; i++) {
      await db.run(
        'INSERT INTO teamwork (order_index, title, description, image) VALUES (?, ?, ?, ?)',
        [i + 1, teamworkItems[i].title, teamworkItems[i].description, teamworkItems[i].image]
      );
    }
  }
}

initDb().catch(console.error);

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await db.get('SELECT * FROM admin WHERE email = ?', [email]);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Portfolio Data Routes
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await db.get('SELECT * FROM portfolio_data');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

app.put('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    const { name, title, bio, email, phone, profession1, profession2, profession3, facebook, instagram, whatsapp, tiktok, profile_image, cv_file, theme, primary_color, secondary_color, home_text_color, home_heading_color, home_bg_color, home_shadow_type } = req.body;

    console.log('Updating portfolio with:', { name, title, theme, primary_color, secondary_color, home_text_color, home_heading_color, home_bg_color, home_shadow_type });

    // Build dynamic update query based on provided fields
    const fields = [];
    const values = [];

    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (title !== undefined) { fields.push('title = ?'); values.push(title); }
    if (bio !== undefined) { fields.push('bio = ?'); values.push(bio); }
    if (email !== undefined) { fields.push('email = ?'); values.push(email); }
    if (phone !== undefined) { fields.push('phone = ?'); values.push(phone); }
    if (profession1 !== undefined) { fields.push('profession1 = ?'); values.push(profession1); }
    if (profession2 !== undefined) { fields.push('profession2 = ?'); values.push(profession2); }
    if (profession3 !== undefined) { fields.push('profession3 = ?'); values.push(profession3); }
    if (facebook !== undefined) { fields.push('facebook = ?'); values.push(facebook); }
    if (instagram !== undefined) { fields.push('instagram = ?'); values.push(instagram); }
    if (whatsapp !== undefined) { fields.push('whatsapp = ?'); values.push(whatsapp); }
    if (tiktok !== undefined) { fields.push('tiktok = ?'); values.push(tiktok); }
    if (profile_image !== undefined) { fields.push('profile_image = ?'); values.push(profile_image); }
    if (cv_file !== undefined) { fields.push('cv_file = ?'); values.push(cv_file); }
    if (theme !== undefined) { fields.push('theme = ?'); values.push(theme); }
    if (primary_color !== undefined) { fields.push('primary_color = ?'); values.push(primary_color); }
    if (secondary_color !== undefined) { fields.push('secondary_color = ?'); values.push(secondary_color); }
    if (home_text_color !== undefined) { fields.push('home_text_color = ?'); values.push(home_text_color); }
    if (home_heading_color !== undefined) { fields.push('home_heading_color = ?'); values.push(home_heading_color); }
    if (home_bg_color !== undefined) { fields.push('home_bg_color = ?'); values.push(home_bg_color); }
    if (home_shadow_type !== undefined) { fields.push('home_shadow_type = ?'); values.push(home_shadow_type); }

    // Always update the timestamp
    fields.push('updated_at = CURRENT_TIMESTAMP');

    if (fields.length === 1) {
      // Only updated_at would be set
      return res.status(400).json({ message: 'No fields to update' });
    }

    const updateQuery = `UPDATE portfolio_data SET ${fields.join(', ')} WHERE id = 1`;
    
    console.log('Update query:', updateQuery);
    console.log('Update values:', values);

    await db.run(updateQuery, values);

    console.log('Portfolio updated successfully');
    res.json({ message: 'Portfolio updated successfully' });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Error updating portfolio: ' + error.message });
  }
});

// Skills Routes
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await db.all('SELECT * FROM skills ORDER BY category, order_index');
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

app.post('/api/skills', authenticateToken, async (req, res) => {
  try {
    const { category, name, percentage, icon, order_index } = req.body;

    await db.run(
      'INSERT INTO skills (category, name, percentage, icon, order_index) VALUES (?, ?, ?, ?, ?)',
      [category, name, percentage, icon, order_index]
    );

    res.json({ message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding skill' });
  }
});

app.put('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    const { category, name, percentage, icon, order_index } = req.body;

    await db.run(
      'UPDATE skills SET category = ?, name = ?, percentage = ?, icon = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [category, name, percentage, icon, order_index, req.params.id]
    );

    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill' });
  }
});

app.delete('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    await db.run('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.all('SELECT * FROM projects ORDER BY order_index');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { title, description, image, technologies, github_link, live_link, featured, order_index } = req.body;

    await db.run(
      `INSERT INTO projects (title, description, image, technologies, github_link, live_link, featured, order_index) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, image, technologies, github_link, live_link, featured, order_index]
    );

    res.json({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, image, technologies, github_link, live_link, featured, order_index } = req.body;

    await db.run(
      `UPDATE projects SET title = ?, description = ?, image = ?, technologies = ?, 
       github_link = ?, live_link = ?, featured = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, description, image, technologies, github_link, live_link, featured, order_index, req.params.id]
    );

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    await db.run('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// Social Links Routes
app.get('/api/social-links', async (req, res) => {
  try {
    const links = await db.all('SELECT * FROM social_links');
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social links' });
  }
});

app.put('/api/social-links/:id', authenticateToken, async (req, res) => {
  try {
    const { url } = req.body;

    await db.run(
      'UPDATE social_links SET url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [url, req.params.id]
    );

    res.json({ message: 'Social link updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating social link' });
  }
});

// About Section Routes
app.get('/api/about', async (req, res) => {
  try {
    const data = await db.get('SELECT * FROM about_section');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about data' });
  }
});

app.put('/api/about', authenticateToken, async (req, res) => {
  try {
    const { subtitle, profession, paragraph1, paragraph2, paragraph3, education, development_focus, design_philosophy } = req.body;

    await db.run(
      `UPDATE about_section SET 
        subtitle = ?, profession = ?, paragraph1 = ?, paragraph2 = ?, paragraph3 = ?,
        education = ?, development_focus = ?, design_philosophy = ?, updated_at = CURRENT_TIMESTAMP`,
      [subtitle, profession, paragraph1, paragraph2, paragraph3, education, development_focus, design_philosophy]
    );

    res.json({ message: 'About section updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating about section' });
  }
});

// Services Section Routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.all('SELECT * FROM services_section ORDER BY order_index');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services' });
  }
});

app.put('/api/services/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    await db.run(
      'UPDATE services_section SET name = ?, description = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, description, icon, req.params.id]
    );

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
});

// Contact Section Routes
app.get('/api/contact', async (req, res) => {
  try {
    const data = await db.get('SELECT * FROM contact_section');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact data' });
  }
});

app.put('/api/contact', authenticateToken, async (req, res) => {
  try {
    const { heading, description, contact_email, contact_phone, form_email } = req.body;

    await db.run(
      `UPDATE contact_section SET 
        heading = ?, description = ?, contact_email = ?, contact_phone = ?, form_email = ?, updated_at = CURRENT_TIMESTAMP`,
      [heading, description, contact_email, contact_phone, form_email]
    );

    res.json({ message: 'Contact section updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact section' });
  }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Here you can save to database or send email
    console.log('Contact form:', { name, email, subject, message });

    res.json({ message: 'Message received successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing contact form' });
  }
});

// Teamwork Routes
app.get('/api/teamwork', async (req, res) => {
  try {
    const data = await db.all('SELECT * FROM teamwork ORDER BY order_index ASC');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teamwork data' });
  }
});

app.post('/api/teamwork', authenticateToken, async (req, res) => {
  try {
    const { title, description, image, order_index } = req.body;

    await db.run(
      'INSERT INTO teamwork (title, description, image, order_index) VALUES (?, ?, ?, ?)',
      [title, description, image, order_index || 1]
    );

    res.json({ message: 'Teamwork item created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating teamwork item' });
  }
});

app.put('/api/teamwork/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, image, order_index } = req.body;

    await db.run(
      'UPDATE teamwork SET title = ?, description = ?, image = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, image, order_index, req.params.id]
    );

    res.json({ message: 'Teamwork item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating teamwork item' });
  }
});

app.delete('/api/teamwork/:id', authenticateToken, async (req, res) => {
  try {
    await db.run('DELETE FROM teamwork WHERE id = ?', [req.params.id]);
    res.json({ message: 'Teamwork item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teamwork item' });
  }
});

// ===== DASHBOARD & ANALYTICS ENDPOINTS =====

// Track activity
const trackActivity = async (action, details, section) => {
  try {
    await db.run(
      'INSERT INTO activities (action, details, section) VALUES (?, ?, ?)',
      [action, details, section]
    );
  } catch (error) {
    console.error('Error tracking activity:', error);
  }
};

// Dashboard stats endpoint
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    // Total visitors all time
    const totalVisitors = await db.get('SELECT COUNT(*) as count FROM visitors');
    
    // Today's visitors
    const todayVisitors = await db.get(
      `SELECT COUNT(*) as count FROM visitors 
       WHERE DATE(timestamp) = DATE('now')`
    );
    
    // Page views breakdown
    const pageViews = {};
    const pages = await db.all(
      `SELECT page_viewed, COUNT(*) as count FROM visitors 
       GROUP BY page_viewed ORDER BY count DESC`
    );
    pages.forEach(p => {
      pageViews[p.page_viewed] = p.count;
    });
    
    // Top locations
    const topLocations = {};
    const locations = await db.all(
      `SELECT location, COUNT(*) as count FROM visitors 
       WHERE location != 'Unknown'
       GROUP BY location ORDER BY count DESC LIMIT 10`
    );
    locations.forEach(l => {
      topLocations[l.location] = l.count;
    });
    
    // Recent activities
    const recentActivities = await db.all(
      `SELECT * FROM activities ORDER BY timestamp DESC LIMIT 20`
    );
    
    // Contact messages
    const messages = await db.all(
      `SELECT * FROM contact_messages ORDER BY createdAt DESC LIMIT 10`
    );
    
    res.json({
      totalVisitors: totalVisitors.count || 0,
      todayVisitors: todayVisitors.count || 0,
      pageViews,
      topLocations,
      recentActivities: recentActivities.map(a => ({
        ...a,
        timestamp: new Date(a.timestamp).toISOString()
      })),
      messages: messages.map(m => ({
        ...m,
        createdAt: new Date(m.createdAt).toISOString()
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
});

// Store contact message and send email
app.post('/api/contact/message', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Store in database
    await db.run(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    
    // Track activity
    await trackActivity('Contact Form Submitted', `From: ${name} (${email})`, 'contact');
    
    // Send email to admin
    const adminEmail = process.env.GMAIL_USER || 'rm91275@gmail.com';
    const emailHTML = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
    `;
    
    await sendEmail(adminEmail, `New Contact Form Submission from ${name}`, emailHTML);
    
    // Send confirmation email to user
    const userEmailHTML = `
      <h2>Thank You for Contacting Us!</h2>
      <p>Hi ${name},</p>
      <p>We received your message and will get back to you as soon as possible.</p>
      <p><strong>Your Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p>Best regards,<br>Rahul Kumar Mahato</p>
    `;
    
    await sendEmail(email, 'We Received Your Message', userEmailHTML);
    
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error storing contact message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Get all messages (admin only)
app.get('/api/contact/messages', authenticateToken, async (req, res) => {
  try {
    const messages = await db.all(
      'SELECT * FROM contact_messages ORDER BY createdAt DESC'
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Mark message as read
app.put('/api/contact/messages/:id/read', authenticateToken, async (req, res) => {
  try {
    await db.run(
      'UPDATE contact_messages SET read = 1 WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message' });
  }
});

// Delete message
app.delete('/api/contact/messages/:id', authenticateToken, async (req, res) => {
  try {
    await db.run(
      'DELETE FROM contact_messages WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

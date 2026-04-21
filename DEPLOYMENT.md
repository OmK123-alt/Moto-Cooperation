# 🚀 Deployment Guide - MOTO COOPERATION

## Project Overview
A full-stack Car & Bike community platform with:
- **Frontend**: HTML/CSS/JS responsive website
- **Backend**: Express.js API with admin dashboard
- **Data**: PostgreSQL persistence (seeded from existing JSON files on first run)
- **Media Uploads**: Vercel Blob for hero video storage

---

## 📋 Prerequisites
- **Node.js**: 14.0.0 or higher
- **npm**: 6.0.0 or higher
- **Git**: For version control

---

## 🏃 Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd moto-cooperation
npm run install-all
copy .env.example .env
```

Fill `.env` with:
- `DATABASE_URL`
- `JWT_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- optional `ADMIN_CREDENTIAL`, `ADMIN_PASSWORD`, `ADMIN_NAME`

### 2. Start Server
```bash
npm start
# OR manually:
cd backend && npm start
```

### 3. Access Application
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login**: uses `ADMIN_CREDENTIAL` / `ADMIN_PASSWORD` from environment

---

## 📁 Project Structure
```
moto-cooperation/
├── api/
│   └── [...path].js        (Vercel serverless entry)
├── backend/
│   ├── server.js           (Local entry)
│   ├── app.js              (Compatibility export)
│   ├── src/                (Structured backend layers)
│   ├── package.json
│   └── data/               (Seed bootstrap JSON files)
│       ├── products.json
│       ├── events.json
│       ├── builds.json
│       ├── contacts.json
│       ├── users.json
│       └── settings.json
├── frontend/
│   ├── index.html          (Main website)
│   ├── admin/
│   │   └── index.html      (Admin dashboard)
│   ├── css/                (Stylesheets)
│   ├── js/                 (Frontend scripts)
│   └── assets/             (Images & videos)
├── package.json
├── README.md
├── .gitignore
└── DEPLOYMENT.md           (This file)
```

---

## 🌐 Deployment Options

### Option 1: **Netlify + Render (Recommended)**

#### **Frontend to Netlify**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. **Build Command**: `echo 'skip'` (static only)
6. **Publish Directory**: `frontend`
7. Deploy!

#### **Backend to Render**
1. Go to [render.com](https://render.com)
2. Click "New +"  → "Web Service"
3. Connect GitHub repo
4. **Build Command**: `npm install`
5. **Start Command**: `cd backend && npm start`
6. **Environment Variables**: Add `JWT_SECRET=your-secret-key`
7. Deploy!

---

### Option 2: **Vercel (Full Stack)**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select repository
5. **Framework Preset**: "Other"
6. **Root Directory**: `.` (root)
7. **Build Command**: `npm install && cd backend && npm install`
8. **Output Directory**: `frontend`
9. **Start Command**: leave empty (Vercel uses `api/[...path].js`)
10. Add Environment Variables:
  - `DATABASE_URL=your-postgres-url`
  - `JWT_SECRET=your-secret-key`
  - `BLOB_READ_WRITE_TOKEN=your-vercel-blob-token`
    - `NODE_ENV=production`
11. Deploy!

---

### Option 3: **Railway (Simple)**

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Railway auto-detects Node.js
6. Add Environment Variables:
   - `JWT_SECRET=your-secret-key`
7. Deploy!

---

### Option 4: **Docker (VPS/Cloud)**

Create `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
WORKDIR /app/backend
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

Build & run:
```bash
docker build -t moto-cooperation .
docker run -p 3000:3000 -e JWT_SECRET=your-secret moto-cooperation
```

---

## 📊 Environment Variables

Create `.env` file in root or backend directory:

```env
# Server
NODE_ENV=production
PORT=3000

# JWT Authentication
JWT_SECRET=your-very-secure-secret-key-here

# Optional: Database (for future)
# DATABASE_URL=postgresql://...
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Remove hardcoded `ADMIN_PASS` from admin panel
- [ ] Enable HTTPS/SSL certificate
- [ ] Set up rate limiting on API endpoints
- [ ] Add CORS configuration for your domain
- [ ] Implement database instead of JSON files
- [ ] Hash user passwords (bcrypt)
- [ ] Add input validation & sanitization
- [ ] Set up error logging & monitoring
- [ ] Enable backups for data files
- [ ] Review all API endpoints for vulnerabilities

---

## 🗄️ Data Migration

### From JSON to PostgreSQL (Future)
1. Install `pg` and `dotenv` packages
2. Create database schema
3. Write migration script
4. Update API to use database

### Backup Strategy
```bash
# Backup data daily
0 0 * * * tar -czf /backups/moto-$(date +\%Y\%m\%d).tar.gz /app/backend/data/
```

---

## 📈 API Documentation

All endpoints located in `/backend/app.js`

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Save products (requires auth)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Save events (requires auth)

### Builds/Gallery
- `GET /api/builds` - Get all builds
- `POST /api/builds` - Save builds (requires auth)

### Users
- `GET /api/users` - Get all users (requires auth)
- `POST /api/register` - Register new user
- `POST /api/login` - Login user (returns JWT token)
- `DELETE /api/users/:id` - Delete user (requires auth)

### Contacts
- `GET /api/contact` - Get submissions
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete submission (requires auth)

---

## 🆘 Troubleshooting

### Server won't start
```bash
# Check port 3000 is free
lsof -i :3000
# Kill process if needed
kill -9 <PID>
```

### CORS errors
Update `app.js` to add CORS headers:
```javascript
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
```

### File upload not working
- Ensure `/frontend/assets` directory exists and is writable
- Check file size limit (default: 500MB)
- Verify disk space on server

### Authentication issues
- Verify `JWT_SECRET` is set
- Check token expiration (24 hours default)
- Clear browser localStorage and re-login

---

## 📞 Support

For issues or questions:
- Email: motocooperation0@gmail.com
- Phone: +91 76660 21301
- WhatsApp: https://wa.me/917666021301

---

## 📝 License
MIT License - See LICENSE file for details

---

**Last Updated**: April 21, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready

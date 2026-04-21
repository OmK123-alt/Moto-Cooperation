# MOTO COOPERATION 🏁

**Where builds become legends. A community-first automotive & motorcycle platform.**

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 What is Moto Cooperation?

A full-stack web platform for automotive and motorcycle enthusiasts to:
- ✅ **Host Community Meets** - Organize and attend local gatherings
- ✅ **Share Builds** - Showcase car & bike modification projects
- ✅ **Shop Parts** - Curated aftermarket parts for cars and bikes
- ✅ **Join Franchises** - Own a chapter and build your business
- ✅ **Manage Operations** - Admin dashboard for business management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- npm 6+
- Git

### Installation
```bash
git clone <repository-url>
cd moto-cooperation
npm run install-all
npm start
```

### Access
- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login**: `admin` / `moto2024`

---

## 📁 Project Structure

```
moto-cooperation/
├── backend/
│   ├── server.js              # Express server
│   ├── app.js                 # API routes
│   ├── auth.js                # JWT auth & roles
│   └── data/                  # JSON database
├── frontend/
│   ├── index.html             # Main website
│   ├── admin/
│   │   └── index.html         # Admin dashboard
│   ├── css/                   # Stylesheets
│   ├── js/                    # Frontend logic
│   └── assets/                # Images, videos
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

---

## ✨ Features

### 🌐 Public Website
- **Responsive Design** - Mobile, tablet, desktop
- **Hero Section** - Video background support
- **Event Listings** - Upcoming community meets
- **Build Gallery** - Filterable showcase (JDM, Euro, Stance, Track, Bikes)
- **Product Shop** - Browse and learn about parts
- **Contact Form** - Inquiries & franchise requests
- **Member Profiles** - User registration & login

### 🛠️ Admin Dashboard
| Feature | Capability |
|---------|-----------|
| **Dashboard** | Overview stats, quick actions |
| **Products** | Add/Edit/Delete parts, manage stock |
| **Events** | Create meets, set dates & locations |
| **Gallery** | Showcase builds with photos |
| **Contacts** | View inquiries, export to Excel |
| **Users** | Manage member accounts |
| **Reports** | Analytics & statistics |
| **Settings** | Hero video, branding |

### 🔒 Security Features
- JWT token-based authentication
- Role-based access control (6 roles available)
- Password protection
- Input validation
- CORS protection

---

## 📊 Data Models

### Users
```json
{
  "id": "u-1234567890",
  "name": "John Doe",
  "credential": "john@example.com",
  "password": "hashed_password",
  "role": "admin",
  "joinDate": "4/21/2026",
  "avatar": "JD"
}
```

### Products
```json
{
  "id": "mc-1234567890",
  "name": "Carbon Fiber Mudguard",
  "price": 15000,
  "category": "bike",
  "stock": 50,
  "image": "assets/images/mudguard.jpg",
  "featured": true
}
```

### Events
```json
{
  "id": "ev-1234567890",
  "name": "Underground Meet",
  "date": "22",
  "month": "April 2026",
  "location": "JSPM Wagholi, Pune",
  "featured": true
}
```

### Builds
```json
{
  "id": "b-1234567890",
  "name": "SUPRA",
  "builder": "Piyush",
  "category": "jdm",
  "image": "assets/images/supra.jpg",
  "featured": true
}
```

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | User login (returns JWT) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| POST | `/products` | Save/update products |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | Get all events |
| POST | `/events` | Save/update events |

### Builds
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/builds` | Get all builds |
| POST | `/builds` | Save/update builds |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| DELETE | `/users/:id` | Delete user |

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contact` | Get all contact submissions |
| POST | `/contact` | Submit contact form |
| DELETE | `/contact/:id` | Delete submission |

### Settings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/settings` | Get site settings |
| POST | `/hero-video` | Upload hero video |
| DELETE | `/hero-video` | Remove hero video |

---

## 🎨 Technology Stack

### Frontend
- HTML5
- CSS3 (Custom, no frameworks)
- Vanilla JavaScript
- Responsive Grid Layout

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- JWT (authentication)

### Data
- JSON files (easily migratable to PostgreSQL/MongoDB)
- File-based storage for assets

### Deployment
- Vercel, Netlify, Railway, Docker compatible
- Serverless-ready architecture

---

## 📈 Usage Statistics

- **Community Members**: 2,400+
- **Hosted Meets**: 180+
- **Build Projects**: 650+
- **City Chapters**: 12

---

## 🔐 Security Notes

### Current Implementation
- ✅ Structured for authentication
- ✅ Role-based permissions defined
- ✅ JWT token validation
- ⚠️ Admin credentials still partially hardcoded

### Recommended for Production
- [ ] Hash all passwords with bcrypt
- [ ] Move credentials to environment variables
- [ ] Enable HTTPS/SSL
- [ ] Set up rate limiting
- [ ] Add CORS headers
- [ ] Implement database
- [ ] Add request logging
- [ ] Enable backups
- [ ] Add error monitoring (Sentry, etc.)

---

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment guides:
- Local development
- Netlify + Render
- Vercel
- Railway
- Docker
- VPS

---

## 📞 Contact

**Moto Cooperation Headquarters**
- 📍 Pune, Maharashtra, India
- 📞 +91 76660 21301
- 💬 WhatsApp: https://wa.me/917666021301
- 📧 Email: motocooperation0@gmail.com
- 📸 Instagram: @moto.co.in

**Office Hours**
- Mon – Fri: 9:00 – 17:00
- Sat: 9:00 – 13:00

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- Admin panel credentials currently hardcoded (being refactored)
- Vercel deployment has limited file upload (read-only filesystem)
- Contact form email notifications require EmailJS setup
- Recommend database migration for production scale

---

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - How to deploy
- [API Documentation](./DEPLOYMENT.md#api-documentation) - API endpoints

---

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] Payment gateway (Razorpay)
- [ ] Email notifications
- [ ] User messaging system
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Real-time notifications

---

**Built with 🔥 for the automotive community**

*Last Updated: April 21, 2026*
*Version: 1.0.0*
*Status: Production Ready ✅*
- **Vercel** (free): `npx vercel` in terminal
- **GitHub Pages**: Push to repo → enable Pages in settings

---

## 📞 Contact Details
- Phone: +91 76660 21301
- Email: motocooperation0@gmail.com
- Instagram: @moto.co.in
- Location: Pune, Maharashtra, India

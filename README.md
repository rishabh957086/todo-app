# TaskMaster - Full-Stack To-Do List Application

A modern, production-ready full-stack To-Do List web application with glassmorphism UI, JWT authentication, real-time notifications, drag-and-drop functionality, and smart reminders.

## 🚀 Features

### Authentication
- ✅ User Registration (name, email, password)
- ✅ User Login / Logout
- ✅ JWT authentication (localStorage + HTTP-only cookies)
- ✅ Protected routes

### Task Management
- ✅ Add new tasks
- ✅ Edit tasks
- ✅ Delete tasks
- ✅ Mark tasks as completed/pending
- ✅ Add due date & time
- ✅ Task priority (Low, Medium, High)
- ✅ View all tasks for logged-in user

### Smart Reminders & Warnings
- ⏰ Toast notifications 15 minutes before due date
- ⚠️ Warning notifications for overdue tasks
- 🔴 Visual highlighting for overdue tasks (red border)

### UI/UX
- 🎨 Glassmorphism design using pure CSS (NO Tailwind)
- 🌓 Dark mode toggle
- 📱 Fully responsive design
- ✨ Smooth animations with Framer Motion
- 🔀 Drag & drop task reordering
- 🔍 Search & filter tasks
- 📊 Dashboard statistics
- 📄 Pagination

### Notifications
- ✅ Task added
- ✅ Task updated
- ✅ Task deleted
- ⏰ Reminder alerts
- ⚠️ Warning alerts

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router DOM** for routing
- **Axios** for API calls
- **Framer Motion** for animations
- **React Beautiful DnD** for drag & drop
- **React Toastify** for notifications
- **Pure CSS** for glassmorphism styling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Express Validator** for input validation
- **Cookie Parser** for HTTP-only cookies

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
d:\TO-DO LIST\
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── tasks.js              # Task routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── styles/
│   │   │   ├── global.css        # Global styles & glassmorphism
│   │   │   └── components.css    # Component-specific styles
│   │   ├── utils/
│   │   │   └── API.js            # Axios instance & API methods
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── .env
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
  - Query params: page, limit, priority, completed, search
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## 🎨 UI Features

### Glassmorphism Design
- Semi-transparent backgrounds
- Backdrop blur effects
- Soft shadows
- Border highlights

### Dark Mode
- Toggle between light and dark themes
- Preference saved in localStorage
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px+
- Flexible grid layouts

## 🚢 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Push to GitHub
3. Connect to Vercel/Netlify
4. Set environment variables
5. Deploy

## 🔒 Security Features

- Password hashing with bcrypt
- JWT tokens with expiration
- HTTP-only cookies for additional security
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Task ownership verification

## 🎯 Bonus Features

✅ Search tasks by title/description
✅ Filter by priority and status
✅ Sort by date, priority, due date
✅ Dark mode toggle
✅ Drag & drop reordering
✅ Pagination
✅ Statistics dashboard
✅ Smooth animations
✅ Toast notifications

## 📝 Notes

- Replace `MONGO_URI` with your MongoDB Atlas connection string
- Change `JWT_SECRET` to a strong, random string in production
- Update CORS origin in production to match your frontend URL
- The reminder system checks every 60 seconds while the app is open

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Tips

1. **MongoDB Atlas**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **JWT Secret**: Use a strong secret key generator for production
3. **Environment Variables**: Never commit `.env` files to version control
4. **Production Build**: Run `npm run build` for frontend before deploying

## 🐛 Troubleshooting

**Backend won't start:**
- Check if MongoDB URI is correct
- Verify port 5000 is not in use
- Check `.env` file exists

**Frontend won't start:**
- Run `npm install` again
- Check if port 5173 is available
- Verify `VITE_API_URL` is correct

**CORS errors:**
- Ensure backend CORS is configured for frontend URL
- Check if credentials: true is set

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ using React, Node.js, and MongoDB

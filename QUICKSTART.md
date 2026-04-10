# 🚀 Quick Start Guide - TaskMaster

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
6. Replace `<password>` with your database password

## Step 2: Configure Backend

1. Open `backend/.env` file
2. Replace the placeholder values:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/taskmaster
JWT_SECRET=make_this_a_very_long_random_string_for_security
NODE_ENV=development
```

**Important:** 
- Use your actual MongoDB connection string
- Make JWT_SECRET at least 32 characters long
- You can generate a secure secret using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

## Step 3: Start the Application

### Option 1: Using Two Termals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

Backend will start on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on: `http://localhost:5173`

### Option 2: Using VS Code Split Terminal

1. Open VS Code terminal
2. Split terminal (Ctrl + Shift + 5 or click split icon)
3. Run backend in left panel, frontend in right panel

## Step 4: Access the Application

1. Open your browser
2. Go to: `http://localhost:5173`
3. You'll be redirected to the login page
4. Click "Register here" to create a new account
5. After registration, you'll be automatically logged in

## Step 5: Try the Features

### Create Your First Task
1. Fill in the task form:
   - **Title**: "Complete my project" (required)
   - **Description**: "Finish the full-stack application" (optional)
   - **Priority**: Select Low, Medium, or High
   - **Due Date**: Choose a date and time
2. Click "Add Task"
3. You'll see a success notification!

### Try These Features
- ✅ Mark task as complete
- ✏️ Edit task details
- 🗑️ Delete a task
- 🔍 Search tasks
- 🎯 Filter by priority or status
- 📊 Sort by different criteria
- 🌓 Toggle dark mode
- 🔀 Drag and drop to reorder
- ⏰ Set due dates to test reminders

## Testing Reminders

1. Create a task with a due date 15 minutes from now
2. Wait or keep the app open
3. You'll receive a toast notification when it's 15 minutes before due
4. After the due time passes, you'll see a warning notification
5. The task card will have a red border indicating it's overdue

## Troubleshooting

### Backend won't connect to MongoDB
```
Error: querySrv ENOTFOUND _mongodb._tcp.your_connection_string
```
**Solution:** Update `MONGO_URI` in `backend/.env` with your actual MongoDB connection string

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** 
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Or kill the process using the port

### Frontend can't connect to backend
```
Network Error or CORS error
```
**Solution:**
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env` is correct
- Restart both servers

### Dependencies not installing
```
npm ERR! code ENOENT
```
**Solution:**
- Make sure you're in the correct directory
- Run `npm install` again
- Try `npm cache clean --force` then `npm install`

## Production Deployment

### Backend (Render)
1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Create new Web Service
4. Connect your repository
5. Set root directory to `backend`
6. Add environment variables
7. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy

## Next Steps

- [ ] Add your MongoDB connection string
- [ ] Start both servers
- [ ] Register an account
- [ ] Create tasks
- [ ] Explore all features
- [ ] Deploy to production

## Need Help?

Check the main [README.md](README.md) for detailed documentation.

---

Happy task managing! 🎉

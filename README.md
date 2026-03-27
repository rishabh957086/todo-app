# Todo App

A simple todo application with Node.js backend and vanilla JavaScript frontend.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Error handling
- ✅ Beautiful UI with gradients and animations

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with gradients and animations
- **Data Storage**: In-memory storage (for demo purposes)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## Usage

1. **Add a todo**: Type in the input field and press Enter or click "Add Todo"
2. **Mark complete**: Click the checkbox next to a todo
3. **Delete a todo**: Click the "Delete" button
4. **Keyboard shortcuts**: Press Escape to clear the input field

## Project Structure

```
todo-app/
├── package.json          # Dependencies and scripts
├── server.js             # Express server and API routes
├── public/
│   ├── index.html        # Frontend HTML
│   └── script.js         # Frontend JavaScript
└── README.md             # This file
```

## Future Enhancements

- [ ] Add database persistence (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Todo categories
- [ ] Due dates and reminders
- [ ] Drag and drop reordering
- [ ] Search and filter functionality
- [ ] Mobile app version

## License

ISC

# 🎬 School Entertainment System

A full-stack web application for school entertainment with user authentication, video streaming, and data management.

## Features

- 🔐 **User Authentication** - Register and login with username/email/password
- 🎥 **Video Streaming** - Embedded YouTube videos for movies and music
- 🎵 **Music & Movies** - Browse trending entertainment content
- 🎮 **Games** - Interactive gaming options
- 📅 **Events** - Upcoming school events
- 💾 **Persistent Storage** - Backend database with JSON storage
- 🌐 **RESTful API** - Full API for CRUD operations

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: JSON file (db.json)
- **Other**: CORS for cross-origin requests

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:3000`

Output should show:
```
🚀 Server running at http://localhost:3000
📝 API Documentation:
   POST   /api/register - Register new user
   POST   /api/login - Login user
   GET    /api/entertainment - Get all entertainment data
   ...
```

### 3. Open Frontend

Open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server
```

Then visit: `http://localhost:8000`

## Test Credentials

```
Username: demo
Password: demo
```

Or create a new account!

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Data Endpoints
- `GET /api/entertainment` - Get all entertainment data
- `GET /api/movies` - Get all movies
- `GET /api/music` - Get all music
- `GET /api/games` - Get all games
- `GET /api/events` - Get all events

### CRUD Operations (Examples)
- `GET /api/movies/:id` - Get specific movie
- `POST /api/movies` - Add new movie
- `POST /api/music` - Add new music
- `POST /api/events` - Add new event
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Usage Guide

1. **Start Backend**
   ```bash
   npm start
   ```

2. **Open Frontend** in browser

3. **Login or Register**
   - Use test credentials or create new account
   - Backend will validate credentials

4. **Browse Entertainment**
   - Click on movies/music to watch embedded YouTube videos
   - View games and upcoming events
   - All data is fetched from the backend API

## Features in Detail

### Video Playback
- Movies and music cards are clickable
- Opens a modal with embedded YouTube video
- Close with X button or clicking outside modal

### User Management
- Register: Creates new account stored in backend
- Login: Authenticates user credentials
- Logout: Clears session and returns to login

### Data Management
- All entertainment data stored in `db.json`
- Can be extended with database like MongoDB or PostgreSQL
- RESTful API for easy integration

## File Structure

```
/workspaces/MASTER/
├── index.html          # Frontend application
├── server.js           # Node.js backend
├── db.json             # Database with all data
├── package.json        # npm dependencies
└── README.md           # This file
```

## Future Enhancements

- [ ] Database upgrade to MongoDB/PostgreSQL
- [ ] User profiles and watchlist
- [ ] Comments and ratings
- [ ] Admin panel
- [ ] Search functionality
- [ ] Recommendations algorithm
- [ ] Mobile app version
- [ ] Payment integration

## Troubleshooting

**"Connection error. Make sure backend is running on localhost:3000"**
- Ensure `npm start` is running in a terminal
- Check that port 3000 is not in use
- Check browser console for more details

**Videos not loading**
- Ensure YouTube video IDs are valid in `db.json`
- Check internet connection
- YouTube may block embedded videos in some regions

**Port already in use**
- Change port in `server.js`: `const PORT = process.env.PORT || 3001;`
- Then run: `PORT=3001 npm start`

## License

ISC

## Author

School Entertainment Development Team

---

Made with ❤️ for school entertainment

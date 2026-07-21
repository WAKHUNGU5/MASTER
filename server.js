const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:5000',
    'https://master-seven-wine.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Database file path
const dbPath = path.join(__dirname, 'db.json');

// Helper function to read database
function readDatabase() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return {};
  }
}

// Helper function to write database
function writeDatabase(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// ==================== LOGIN & REGISTRATION ====================

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const db = readDatabase();

  // Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user exists
  if (db.users.some(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  // Create new user
  const newUser = {
    id: db.users.length + 1,
    username,
    email,
    password // In production, hash this!
  };

  db.users.push(newUser);
  writeDatabase(db);

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: newUser.id, username, email }
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDatabase();

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    message: 'Login successful',
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// ==================== DATA ENDPOINTS ====================

// Get all entertainment data
app.get('/api/entertainment', (req, res) => {
  const db = readDatabase();
  res.json({
    movies: db.movies,
    music: db.music,
    games: db.games,
    events: db.events
  });
});

// Get movies
app.get('/api/movies', (req, res) => {
  const db = readDatabase();
  res.json(db.movies);
});

// Get music
app.get('/api/music', (req, res) => {
  const db = readDatabase();
  res.json(db.music);
});

// Get games
app.get('/api/games', (req, res) => {
  const db = readDatabase();
  res.json(db.games);
});

// Get events
app.get('/api/events', (req, res) => {
  const db = readDatabase();
  res.json(db.events);
});

// Get single movie
app.get('/api/movies/:id', (req, res) => {
  const db = readDatabase();
  const movie = db.movies.find(m => m.id == req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

// Add movie (example)
app.post('/api/movies', (req, res) => {
  const { title, desc, videoId, genre } = req.body;
  const db = readDatabase();

  const newMovie = {
    id: db.movies.length + 1,
    title,
    desc,
    videoId,
    genre
  };

  db.movies.push(newMovie);
  writeDatabase(db);

  res.status(201).json(newMovie);
});

// Add music
app.post('/api/music', (req, res) => {
  const { title, artist, desc, videoId, duration } = req.body;
  const db = readDatabase();

  const newMusic = {
    id: db.music.length + 1,
    title,
    artist,
    desc,
    videoId,
    duration
  };

  db.music.push(newMusic);
  writeDatabase(db);

  res.status(201).json(newMusic);
});

// Add event
app.post('/api/events', (req, res) => {
  const { title, date, time, desc, location } = req.body;
  const db = readDatabase();

  const newEvent = {
    id: db.events.length + 1,
    title,
    date,
    time,
    desc,
    location
  };

  db.events.push(newEvent);
  writeDatabase(db);

  res.status(201).json(newEvent);
});

// Update movie
app.put('/api/movies/:id', (req, res) => {
  const db = readDatabase();
  const movie = db.movies.find(m => m.id == req.params.id);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  Object.assign(movie, req.body);
  writeDatabase(db);
  res.json(movie);
});

// Delete movie
app.delete('/api/movies/:id', (req, res) => {
  const db = readDatabase();
  const index = db.movies.findIndex(m => m.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  db.movies.splice(index, 1);
  writeDatabase(db);
  res.json({ message: 'Movie deleted' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST   /api/register - Register new user`);
  console.log(`   POST   /api/login - Login user`);
  console.log(`   GET    /api/entertainment - Get all entertainment data`);
  console.log(`   GET    /api/movies - Get all movies`);
  console.log(`   GET    /api/music - Get all music`);
  console.log(`   GET    /api/games - Get all games`);
  console.log(`   GET    /api/events - Get all events`);
  console.log(`   POST   /api/movies - Add movie`);
  console.log(`   POST   /api/music - Add music`);
  console.log(`   POST   /api/events - Add event`);
});

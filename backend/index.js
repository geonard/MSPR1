const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route pour obtenir des données JSON
app.get('/data', (req, res) => {
  const data = {
    message: "Hello from the backend!",
    timestamp: new Date().toISOString()
  };
  res.json(data);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

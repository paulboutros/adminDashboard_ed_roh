// server.js
const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());

const port = 3000;

 

app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
  });
  app.get('/api/welcome', (req, res) => {
    res.send('welcome!');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

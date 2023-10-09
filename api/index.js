const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); // Import the cors middleware
//app.use(express.static('public'))
// Use path.join() to create the correct path to the "public" folder
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
const {MongoClient} = require('mongodb');


async function main() {
    
  
}
main().catch(console.error);
// added from an other tutorial
 



app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));
// end of adding
 

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '..', 'public') });
})

console.log(`Server is running on port: ${process.env.PORT}`);

app.listen(process.env.PORT || 3000);

module.exports = app;

 
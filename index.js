const e = require('express');
const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : 'Ar-ray04',
  database : 'biodata',
  port : 3309
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connection successfully');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}); 

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


 app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json({ error: 'Semua wajib diisi' });  
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
        [nama, nim, kelas, prodi],
        (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database Error' });
                return;
            }
            res.status(201).json({ message: 'Mahasiswa created successfully' });
        }
    );
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nama, nim, kelas, prodi } = req.body;   
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
        [nama, nim, kelas, prodi, id],
        (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database Error' });
            }
            res.json({ message: 'Mahasiswa updated successfully' });
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params;id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database Error' });
        }
        res.json({ message: 'Mahasiswa deleted successfully' });
    });
});
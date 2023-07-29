const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port=process.env.PORT;
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.connect((err) => {
    if(err) throw err;
    console.log('Connected to database');
});
app.use(cors());
app.use(express.json());
app.post('/register', (req, res) => {
    const student = req.body;
    const sql = 'INSERT INTO student SET ?';
    
    db.query(sql, student, (err, result) => {
      if (err) {
        console.error('Error saving student: ', err);
        res.status(500).send('Error saving student.');
      } else {
        console.log('Student saved successfully.');
        res.status(200).send('Student saved successfully.');
      }
    });
  });
app.get('/register', (req,res) => {
    const sql = 'SELECT * FROM student';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error getting students: ', err);
      res.status(500).send('Error getting students.');
    } else {
      res.status(200).json(result);
    }
  });
})
app.listen(port, () => {
    console.log(`Server running on port:${port} `);
})

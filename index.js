const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dbUrl = 'mysql://root:TwOIBzsmVjMtBdXDLdIHdCmZIznAByHh@monorail.proxy.rlwy.net:56504/railway';
const dbConfig = url.parse(dbUrl);
const [user, password] = dbConfig.auth.split(':');

const db = mysql.createConnection({
  host: dbConfig.hostname,
  user: user,
  password: password,
  database: dbConfig.pathname.slice(1) // remove leading '/'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/api/query', (req, res) => {
  const query = req.body.query;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const morgan = require('morgan');
const { URL } = require('url'); // Usar la clase URL en lugar de url.parse
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Configurar morgan para el registro de solicitudes

const dbUrl = new URL('mysql://root:TwOIBzsmVjMtBdXDLdIHdCmZIznAByHh@monorail.proxy.rlwy.net:56504/railway');

const db = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  port: dbUrl.port,
  database: dbUrl.pathname.slice(1) // remove leading '/'
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

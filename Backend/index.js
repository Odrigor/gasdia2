const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors())


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plataformagas'
  });


  app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM Productos';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });

  app.post('/api/productos', (req, res) => {
    const { id_producto, precio_original, precio_promocional, dias_margen } = req.body;
    const query = 'UPDATE Productos SET precio_original = ?, precio_promocional = ?, dias_margen = ? WHERE id_producto = ?';
    db.query(query, [precio_original, precio_promocional, dias_margen, id_producto], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('Producto actualizado');
      }
    });
  });


app.listen(port, () => {
  console.log(`server app listening on port ${port}`)
})
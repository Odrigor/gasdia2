const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plataformagas'
  });


  app.get("/api/pedidos", (req, res) => {
    console.log('se mandaron los pedidos')
    const queryString = "SELECT * FROM Pedidos WHERE entregado = 0";
  
    db.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for Pedidos: " + err);
        res.sendStatus(500);
        return;
      }
  
      res.json(rows);
    });
  });

  app.post('/ingresa', function (req, res) {
    const rut = parseInt(req.body.rut.replace('-', ''));
    const telefono = req.body.telefono;
    const id_producto = req.body.id_producto;
    const fecha = new Date();
  
    db.query('SELECT * FROM Clientes WHERE rut = ?', [rut], function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0) {
        // Cliente no existe, insertar en tabla Clientes y Pedidos
        db.query('INSERT INTO Clientes (rut, nombre, correo, telefono) VALUES (?, ?, ?, ?)', [rut, req.body.nombre, req.body.correo, telefono], function (error, results, fields) {
          if (error) throw error;
          db.query('INSERT INTO Pedidos (id_cliente, repartidor, fechahora, direccion_entrega, infoextra, id_producto, latitud_pedido, longitud_pedido, cantidad, entregado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rut, req.body.repartidor, fecha, req.body.direccion_entrega, req.body.infoextra, id_producto, req.body.latitud_pedido, req.body.longitud_pedido, req.body.cantidad, req.body.entregado], function (error, results, fields) {
            if (error) throw error;
            res.send(true);
          });
        });
      } else {
        // Cliente existe, verificar telefono y actualizar si es necesario
        if (results[0].telefono !== telefono) {
          db.query('UPDATE Clientes SET telefono = ? WHERE rut = ?', [telefono, rut], function (error, results, fields) {
            if (error) throw error;
          });
        }
        // Verificar dias de margen
        db.query('SELECT DATEDIFF(?, fechahora) as dias FROM Pedidos WHERE id_cliente = ? ORDER BY fechahora DESC LIMIT 1', [fecha, rut], function (error, results, fields) {
          if (error) throw error;
          if (results.length === 0 || results[0].dias >= req.body.dias_margen) {
            // Insertar en tabla Pedidos
            db.query('INSERT INTO Pedidos (id_cliente, repartidor, fechahora, direccion_entrega, infoextra, id_producto, latitud_pedido, longitud_pedido, cantidad, entregado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [rut, req.body.repartidor, fecha, req.body.direccion_entrega, req.body.infoextra, req.body.id_producto, req.body.latitud_pedido, req.body.longitud_pedido, req.body.cantidad, req.body.entregado], function (error, results, fields) {
              if (error) throw error;
              res.send(true);
            });
          } else {
            res.send(false);
          }
        });
      }
    });
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
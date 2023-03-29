const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'plataformagas'
  });

  app.get('/api/users', (req, res) => {
    // Obtener los datos de los usuarios con rol 1 desde la base de datos
    const query = `SELECT * FROM Usuarios WHERE rol = 1;`;
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(result);
      }
    });
  });


  app.post('/api/updateUser', (req, res) => {
    // Recoger los datos del usuario del cuerpo de la solicitud
    const { oldusername, username, password } = req.body;
    // Encriptar la nueva contraseña del usuario
    const encryptedPassword = bcrypt.hashSync(password, 2);
    // Actualizar los datos del usuario en la base de datos utilizando una consulta parametrizada
    const query = 'UPDATE Usuarios SET user = ?, password = ? WHERE user = ?';
    const values = [username, encryptedPassword, oldusername];
    db.query(query, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    });
  });

  app.post('/api/entrega', (req, res) => {
    const { id_pedido, latitud_entrega, longitud_entrega } = req.body;
    if (!id_pedido || !latitud_entrega || !longitud_entrega) {
      return res.status(400).json({ error: 'Faltan parámetros en el cuerpo de la solicitud' });
    }
  
    const queryEntrega = `INSERT INTO Entregas (id_pedido, latitud_entrega, longitud_entrega, fechahora)
      VALUES (?, ?, ?, NOW())`;
    db.query(queryEntrega, [id_pedido, latitud_entrega, longitud_entrega], error => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      const queryPedido = `UPDATE Pedidos SET entregado = 1 WHERE id_pedido = ?`;
      db.query(queryPedido, [id_pedido], error => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.json({ success: true });
      });
    });
  }); 



  app.post('/api/infoentrega', (req, res) => {
    const id_pedido = req.body.id_pedido;
    if (!id_pedido) {
      return res.status(400).json({ error: 'Falta el id_pedido en el cuerpo de la solicitud' });
    }
  
    const query = `SELECT p.direccion_entrega, p.infoextra, c.nombre, c.telefono, pr.nombre AS producto
      FROM Pedidos p
      JOIN Clientes c ON p.id_cliente = c.rut
      JOIN Productos pr ON p.id_producto = pr.id_producto
      WHERE p.id_pedido = ? AND p.entregado = 0`;
  
    db.query(query, [id_pedido], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length === 0) {
        return res.json(false);
      }
      res.json(results[0]);
    });
  });


  app.post('/api/register', (req, res) => {
    // Recoger los datos del usuario del cuerpo de la solicitud
      const { username, password, rol } = req.body;
      // Encriptar la contraseña del usuario
      const encryptedPassword = bcrypt.hashSync(password, 2);
    // Insertar los datos del usuario en la base de datos
    const query = `INSERT INTO Usuarios (user, password, rol) VALUES ('${username}','${encryptedPassword}', ${rol});`;
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'User registered successfully' });
      }
    });
  });

  // Iniciar sesión
app.post('/api/login', (req, res) => {
	// Recoger los datos del usuario del cuerpo de la solicitud
	const { username, password } = req.body;
    
	// Obtener los datos del usuario de la base de datos
	const query = `SELECT user, rol, password FROM Usuarios WHERE user = '${username}';`;
	db.query(query, (err, result) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			if (result.length > 0) {
				// Comparar las contraseñas
				const isMatch = bcrypt.compareSync(password, result[0].password);

				if (isMatch) {
					res.status(200).json({
						message: 'User login successful',
						user: {
							user: result[0].user,
							rol: result[0].rol
						}
					});
				} else {
					res.status(401).json({
						message: 'Invalid username or password'
					});
				}
			} else {
				res.status(401).json({
					message: 'Invalid username or password'
				});
			}
		}
	});
});

  app.post('/api/asociar', (req, res) => {
    let id_pedido = req.body.id_pedido;
    let repartidor = req.body.repartidor;
    let query = `UPDATE Pedidos SET repartidor = '${repartidor}' WHERE id_pedido = ${id_pedido}`;
    db.query(query, (err, result) => {
      if (err) throw err;
      res.send(true);
    });
  });


  app.get('/api/positions/:dias', (req, res) => {
    const dias = req.params.dias;
    const query = `SELECT id_pedido, latitud_pedido, longitud_pedido FROM Pedidos WHERE fechahora >= DATE(NOW()) - INTERVAL ? DAY`;
    db.query(query, [dias], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });

  
  app.get('/api/pedidos/registros', (req, res) => {
    const fecha = req.query.fecha;
  
    if (!fecha) {
      res.status(400).json({ error: 'La fecha es requerida' });
      return;
    }
  
    const query = `SELECT * FROM Pedidos WHERE DATE(fechahora) = ?`;
    db.query(query, [fecha], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
  
      res.json(results);
    });
  });

  app.get("/api/pedidos", (req, res) => {
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

  app.put('/api/productos', (req, res) => {
    const productosModificados = req.body;
    let query = 'UPDATE Productos SET precio_original = ?, nombre = ?, precio_promocional = ?, dias_margen = ? WHERE id_producto = ?';
  
    productosModificados.forEach(producto => {
      const { precio_original, nombre, precio_promocional, dias_margen, id_producto } = producto;
      db.query(query, [precio_original, nombre, precio_promocional, dias_margen, id_producto], (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
      });
    });
  
    res.send('Cambios guardados con éxito');
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
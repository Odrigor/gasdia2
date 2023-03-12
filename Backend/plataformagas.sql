CREATE DATABASE IF NOT EXISTS plataformagas COLLATE utf8_bin;
USE plataformagas;
CREATE TABLE IF NOT EXISTS Pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  repartidor VARCHAR(50),
  fechahora TIMESTAMP NOT NULL,
  direccion_entrega VARCHAR(120) NOT NULL,
  infoextra VARCHAR(200) NOT NULL,
  id_produtcto INT NOT NULL,
  latitud_pedido DECIMAL(10,8) NOT NULL,
  longitud_pedido DECIMAL(10,8) NOT NULL,
  cantidad INT,
  entregado BIT NOT NULL
);
CREATE TABLE IF NOT EXISTS Clientes (
  rut INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  telefono VARCHAR(13) NOT NULL
);
CREATE TABLE IF NOT EXISTS Productos (
id_producto INT NOT NULL,
precio_original NUMERIC(6,0) NOT NULL,
nombre VARCHAR(100) NOT NULL,
precio_promocional NUMERIC(6,0),
dias_margen INT
);
CREATE TABLE IF NOT EXISTS Entregas (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  latitud_entrega DECIMAL(10,8) NOT NULL,
  longitud_entrega DECIMAL(10,8) NOT NULL,
  fechahora TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS Usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(10),
  password VARCHAR(255) NOT NULL
);

INSERT INTO Productos (id_producto,precio_original, nombre, precio_promocional, dias_margen)
VALUES (1, 8000, 'gas de 5', 8000, 5);

INSERT INTO Productos (id_producto, precio_original, nombre, precio_promocional, dias_margen)
VALUES (2, 16000 , 'gas de 11', 16000, 8);

INSERT INTO Productos (id_producto, precio_original, nombre, precio_promocional, dias_margen)
VALUES (3, 21000 , 'gas de 16', 21000, 13);
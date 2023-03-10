CREATE DATABASE IF NOT EXISTS plataformagas COLLATE utf8_bin;
USE plataformagas;
CREATE TABLE IF NOT EXISTS Pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  repartidor VARCHAR(100),
  fechahora TIMESTAMP NOT NULL,
  direccion_entrega VARCHAR(150) NOT NULL,
  id_produtcto INT NOT NULL,
  latitud_pedido DECIMAL(10,8) NOT NULL,
  longitud_pedido DECIMAL(10,8) NOT NULL,
  cantidad INT,
  entregado BIT NOT NULL
);
CREATE TABLE IF NOT EXISTS Clientes (
  rut INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  telefono VARCHAR(13) NOT NULL
);
CREATE TABLE IF NOT EXISTS Productos (
id_produtcto INT NOT NULL,
precio_original NUMERIC(6,0) NOT NULL,
nombre VARCHAR(100) NOT NULL,
precio_promocional NUMERIC(6,0),
dias_margen INT
);
CREATE TABLE IF NOT EXISTS Entregas (
  id_pedido INT NOT NULL,
  latitud_entrega DECIMAL(10,8) NOT NULL,
  longitud_entrega DECIMAL(10,8) NOT NULL,
  fechahora TIMESTAMP NOT NULL
);
CREATE TABLE IF NOT EXISTS Usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(10),
  password VARCHAR(255) NOT NULL
);
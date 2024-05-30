-- Crear la base de datos
CREATE DATABASE prueba;

-- Usar la base de datos
USE prueba;

-- Crear la tabla "usuarios"
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50),
    fecha_registro DATE
);

-- Crear la tabla "productos"
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    precio DECIMAL(10, 2),
    descripcion TEXT
);

-- Crear la tabla "pedidos"
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha_pedido DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Crear la tabla "detalles_pedido"
CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Insertar datos en la tabla "usuarios"
INSERT INTO usuarios (nombre, email, fecha_registro)
VALUES
    ('John Doe', 'john.doe@example.com', '2022-01-01'),
    ('Jane Smith', 'jane.smith@example.com', '2022-02-01'),
    ('Michael Johnson', 'michael.johnson@example.com', '2022-03-01'),
    ('Emily Davis', 'emily.davis@example.com', '2022-04-01'),
    ('David Wilson', 'david.wilson@example.com', '2022-05-01'),
    ('Sarah Anderson', 'sarah.anderson@example.com', '2022-06-01'),
    ('Robert Thomas', 'robert.thomas@example.com', '2022-07-01'),
    ('Jessica Martinez', 'jessica.martinez@example.com', '2022-08-01'),
    ('Christopher Davis', 'christopher.davis@example.com', '2022-09-01'),
    ('Amanda Johnson', 'amanda.johnson@example.com', '2022-10-01');

-- Insertar datos en la tabla "productos"
INSERT INTO productos (nombre, precio, descripcion)
VALUES
    ('Producto 1', 10.99, 'Descripción del producto 1'),
    ('Producto 2', 19.99, 'Descripción del producto 2'),
    ('Producto 3', 5.99, 'Descripción del producto 3'),
    ('Producto 4', 8.49, 'Descripción del producto 4'),
    ('Producto 5', 14.99, 'Descripción del producto 5'),
    ('Producto 6', 11.79, 'Descripción del producto 6'),
    ('Producto 7', 6.29, 'Descripción del producto 7'),
    ('Producto 8', 9.99, 'Descripción del producto 8'),
    ('Producto 9', 7.49, 'Descripción del producto 9'),
    ('Producto 10', 12.99, 'Descripción del producto 10');

-- Insertar datos en la tabla "pedidos"
INSERT INTO pedidos (usuario_id, fecha_pedido)
VALUES
    (1, '2022-04-01'),
    (2, '2022-04-02'),
    (3, '2022-04-03'),
    (4, '2022-04-04'),
    (5, '2022-04-05'),
    (6, '2022-04-06'),
    (7, '2022-04-07'),
    (8, '2022-04-08'),
    (9, '2022-04-09'),
    (10, '2022-04-10');

-- Insertar datos en la tabla "detalles_pedido"
INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad)
VALUES
    (1, 1, 2),
    (1, 2, 1),
    (2, 3, 3),
    (2, 4, 2),
    (3, 5, 1),
    (3, 6, 2),
    (4, 7, 2),
    (4, 8, 3),
    (5, 9, 1),
    (5, 10, 1),
    (6, 1, 3),
    (6, 3, 2),
    (7, 2, 1),
    (7, 4, 1),
    (8, 5, 2),
    (8, 7, 2),
    (9, 9, 3),
    (9, 10, 1),
    (10, 2, 1),
    (10, 6, 2);

SELECT * FROM usuarios;

SELECT * FROM productos WHERE precio > 10;

SELECT d.*, u.nombre AS nombre_usuario, u.email AS email_usuario
FROM detalles_pedido AS d
JOIN pedidos AS p ON d.pedido_id = p.id
JOIN usuarios AS u ON p.usuario_id = u.id;

SELECT pedido_id, COUNT(*) AS total_productos
FROM detalles_pedido
GROUP BY pedido_id;

SELECT *
FROM usuarios
WHERE id IN (SELECT DISTINCT usuario_id FROM pedidos);

SELECT *
FROM productos
ORDER BY precio DESC
LIMIT 3;
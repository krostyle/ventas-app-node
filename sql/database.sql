CREATE DATABASE wherexMVC

CREATE TABLE cliente(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL
);

CREATE TABLE producto(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	precio FLOAT NOT NULL CHECK (precio>0),
	cantidad INT NOT NULL CHECK(cantidad>=0)
);



CREATE TABLE venta(
	id SERIAL PRIMARY KEY,
	fecha DATE NOT NULL,
	iva FLOAT NOT NULL,
	descuento FLOAT NOT NULL,
	total FLOAT NOT NULL
);

ALTER TABLE venta
ADD COLUMN cliente_id INT NOT NULL;

ALTER TABLE venta
ADD CONSTRAINT fk_venta_cliente
FOREIGN KEY (cliente_id)
REFERENCES cliente(id);

ALTER TABLE venta ALTER COLUMN iva DROP NOT NULL;
ALTER TABLE venta ALTER COLUMN descuento DROP NOT NULL;
ALTER TABLE venta ALTER COLUMN total DROP NOT NULL;

CREATE TABLE detalle(
	id SERIAL PRIMARY KEY,
	cantidad INT NOT NULL,
	subtotal FLOAT NOT NULL,
	venta_id INT NOT NULL,
	CONSTRAINT fk_detalle_venta
	FOREIGN KEY (venta_id) REFERENCES venta(id),
	producto_id INT NOT NULL,
	CONSTRAINT fk_detalle_producto
	FOREIGN KEY (producto_id) REFERENCES producto(id)
);
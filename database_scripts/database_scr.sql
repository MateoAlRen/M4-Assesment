CREATE DATABASE expertsoft;
DROP DATABASE expertsoft;
use expertsoft;

CREATE TABLE clients (
	client_id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(200) NOT NULL,
    identification INT NOT NULL,
    email VARCHAR(250) UNIQUE,
    telephone_number VARCHAR(250) NOT NULL,
    address TEXT NOT NULL
);

SELECT * FROM clients;

CREATE TABLE transaccion_type (
	transaccion_type_ID INT AUTO_INCREMENT PRIMARY KEY,
    transaccion_name VARCHAR(250) NOT NULL
);

CREATE TABLE status_transaccion (
	status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL
);

CREATE TABLE platform (
	platform_id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(50)
);

CREATE TABLE bill (
	bill_id VARCHAR(50) PRIMARY KEY,
    client_id INT,
    billing_time DATE
);

SELECT * FROM bill;

CREATE TABLE bill_transaccion (
	transaccion_id VARCHAR(50) PRIMARY KEY,
    bill_id VARCHAR(50),
    client_id INT,
    transaccion_type_ID INT,
    status_id INT,
    platform_id INT,
    date_time DATETIME NOT NULL,
    amount_transaccion INT NOT NULL,
    amount_invoiced INT NOT NULL,
    amount_payed INT NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES bill(bill_id),
    FOREIGN KEY (transaccion_type_ID) REFERENCES transaccion_type(transaccion_type_ID),
    FOREIGN KEY (status_id) REFERENCES status_transaccion(status_id),
    FOREIGN KEY (platform_id) REFERENCES platform(platform_id)
);

SELECT * FROM bill_transaccion;

ALTER TABLE bill_transaccion ADD bill_id VARCHAR(50);
ALTER TABLE bill ADD clients_id INT;
ALTER TABLE bill_transaccion ADD COLUMN client_id INT;

CREATE VIEW clients_amount AS
SELECT clients.client_name AS client,
	amount_payed,
    bill_id
    FROM bill_transaccion
    JOIN clients ON clients.client_id = bill_transaccion.client_id;

CREATE VIEW clients_debtors AS
SELECT status_id = 1 AS to_pay,
	clients.client_name AS client_payed,
	transaccion_id AS transaccion
 FROM bill_transaccion
 JOIN clients ON clients.client_id = bill_transaccion.client_id;
 
CREATE VIEW client_platforms AS
SELECT clients.client_name AS client_platform,
	platform_id = 1 AS Nequi,
    platform_id = 2 AS Daviplata,
	bill_id AS bill_payed
FROM bill_transaccion
 JOIN clients ON clients.client_id = bill_transaccion.client_id;
 
SELECT * FROM clients_amount;
SELECT * FROM clients_debtors;
SELECT * FROM client_platforms;
 
 
 
 




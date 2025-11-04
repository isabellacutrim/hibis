CREATE DATABASE bdHibis

USE bdHibis


CREATE TABLE tbCliente(
	codCliente INT PRIMARY KEY IDENTITY(1,1),
	nomeCliente VARCHAR (50) NOT NULL,	
	cpfCliente VARCHAR (11) NOT NULL,
	dataNasc DATE NOT NULL,
	telefone VARCHAR (15) NOT NULL,
	emailCliente VARCHAR (100) NOT NULL,
	senhaCliente VARCHAR (20) NOT NULL
);

CREATE TABLE tbProduto(
	codProduto INT PRIMARY KEY IDENTITY(1,1), 
	nomeProduto VARCHAR (50) NOT NULL,
	classificProduto VARCHAR (50) NOT NULL,
	valorProduto MONEY NOT NULL
);

CREATE TABLE tbFuncionario(
	codFuncionario INT PRIMARY KEY IDENTITY(1,1),
	nomeFuncionario VARCHAR (50) NOT NULL,	
	cpfFuncionario VARCHAR (11) NOT NULL,
	dataNascFunc DATE NOT NULL,
	telefoneFunc VARCHAR (15) NOT NULL,
	emailFunc VARCHAR NOT NULL
);

CREATE TABLE tbCarrinho(
    codCarrinho INT PRIMARY KEY IDENTITY(1,1),  
	codCliente INT FOREIGN KEY REFERENCES tbCliente(codCliente),
	codProduto INT FOREIGN KEY REFERENCES tbProduto(codProduto),
	quantidade INT NOT NULL,
    dataAdicao DATETIME DEFAULT GETDATE(),
    statusCarrinho VARCHAR(20) DEFAULT 'Em andamento'
);

INSERT INTO tbProduto VALUES
(1, 'Hidratante Facial HidraHíbis', 'Preparação', 35.90),
(2, 'Primer HB Prime', 'Preparação', 40.49),
(3, 'Sérum Facial HB Íris', 'Preparação', 39.99),
(4, 'Híbis Blindagem', 'Preparação', 35.99),
(5, 'Lenço Demaquilante Híbis', 'Preparação', 40.50),
(6, 'Bruma Fixadora HB Fix', 'Preparação', 49.90),
(7, 'Base Híbis Skin', 'Pele', 50.00),
(8, 'Corretivo Híbis Soft Dew', 'Pele', 40.49),
(9, 'Pó compacto Híbis Touch', 'Pele', 39.99),
(10, 'Contorno em Pó Híbis Touch', 'Pele', 35.59),
(11, 'Blush em pó HB Dust Bloom', 'Pele', 35.99),
(12, 'Blush Líquido Híbis Bloom', 'Pele', 40,00),
(13, 'Iluminador Híbis Shinee 30,90', 'Pele', 35.90),
(14, 'Contorno em Stick Híbis Velvet', 'Pele', 40.50),
(15, 'Delineador Híbis LINE', 'Olhos', 39.99),
(16, 'Rímel Híbis Lash', 'Olhos', 49.90),
(17, 'Paleta de sombras Hb Garden', 'Olhos', 59.90),
(18, 'Paleta de  sombras Hb Basic Eye 69,90', 'Olhos', 69.90),
(19, 'Gloss Híbis Glow', 'Boca', 29.90),
(20, 'Batom Híbis Kisses', 'Boca', 35.00),
(21, 'Lápis de boca HB LipFrame', 'Boca', 25.00)
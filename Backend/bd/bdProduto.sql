CREATE DATABASE Produto;
USE Produto;

CREATE TABLE tbProduto(
    codProduto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(50) NOT NULL,
    classificProduto VARCHAR(50) NOT NULL,
    valorProduto DECIMAL(10,2) NOT NULL
);

INSERT INTO tbProduto (codProduto, nomeProduto, classificProduto, valorProduto) VALUES
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
(12, 'Blush Líquido Híbis Bloom', 'Pele', 40.00),
(13, 'Iluminador Híbis Shinee', 'Pele', 30.90),
(14, 'Contorno em Stick Híbis Velvet', 'Pele', 40.50),
(15, 'Delineador Híbis LINE', 'Olhos', 39.99),
(16, 'Rímel Híbis Lash', 'Olhos', 49.90),
(17, 'Paleta de sombras HB Garden', 'Olhos', 59.90),
(18, 'Paleta de sombras HB Basic Eye', 'Olhos', 69.90),
(19, 'Gloss Híbis Glow', 'Boca', 29.90),
(20, 'Batom Híbis Kisses', 'Boca', 35.00),
(21, 'Lápis de boca HB LipFrame', 'Boca', 25.00);

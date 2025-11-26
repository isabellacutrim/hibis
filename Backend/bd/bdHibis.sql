CREATE DATABASE Hibis
DROP DATABASE Hibis;
USE Hibis;

CREATE TABLE tbUsuario (
    id  INT  AUTO_INCREMENT PRIMARY KEY,
    cpf         Varchar(11) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    data_nascimento   DATE     NOT NULL,
    telefone     VARCHAR(15)   NOT NULL,
    email  VARCHAR(150) UNIQUE NOT NULL,
    senha      VARCHAR(50)      NOT NULL
);

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


CREATE TABLE tbFuncionario(
	codFuncionario  INT AUTO_INCREMENT PRIMARY KEY,
	nomeFuncionario VARCHAR (50) NOT NULL,	
	cpfFuncionario VARCHAR (11) NOT NULL,
	dataNascFunc DATE NOT NULL,
	telefoneFunc VARCHAR(15) NOT NULL,
	emailFunc VARCHAR(150) NOT NULL,
    senha VARCHAR(10) NOT NULL
);
    
INSERT INTO tbFuncionario (nomeFuncionario, cpfFuncionario, dataNascFunc, telefoneFunc, emailFunc, senha ) VALUES
('Isabella Cutrim', '74466553587', '2008-11-19', '11985757666', 'isabellaCutrim@gmail.com', 'hibis2025'),
('Geovanna Lino', '94466553587','2009-01-20', '11974630976', 'GeovannaLino@gmail.com', 'hibis2025' ),
('Esther Siqueira', '74466553587', '2008-07-03', '11935793575', 'EstherSiqueira@gmail.com', 'hibis2025' ),
('Sophia Barcelos', '74466553087', '2008-11-07', '11996532456', 'SophiaBarcelosm@gmail.com' , 'hibis2025');

CREATE TABLE tbCarrinho (
	id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente  INT  NOT NULL,
  id_produto  INT  NOT NULL,
  quantidade INT NOT NULL DEFAULT 1,
	FOREIGN KEY (id_cliente) REFERENCES tbUsuario(id),
	FOREIGN KEY (id_produto) REFERENCES tbProduto(id)
);

-- view para ver o carrinho completo
CREATE VIEW vw_carrinho_completo AS
SELECT 
    u.id as usuario_id,
    u.nome_completo as usuario_nome,
    p.codProduto as produto_id,
    p.nomeProduto,
    p.valorProduto,
    c.quantidade,
    (p.valorProduto * c.quantidade) as subtotal
FROM tbcarrinho c
INNER JOIN tbUsuario u ON c.id_cliente = u.usuario_id
INNER JOIN tbProduto p ON c.id_produto = p.produto_id;

-- FUNCTION para calcular total do carrinho
CREATE FUNCTION fc_calcular_total_carrinho(p_usuario_id INT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2);
BEGIN
    SELECT (SUM(p.valorProduto * c.quantidade), 0)
    INTO total
    FROM tbcarrinho c
    INNER JOIN tbProduto p ON c.id_produto = p.id
    WHERE c.id_usuario = p_usuario_id;
    
    RETURN total;
END;


-- 3.  para atualizar quantidade
CREATE PROCEDURE sp_atualizar_quantidade_carrinho(
    p_usuario_id INT,
    p_produto_id INT,
    p_nova_quantidade INT
)
AS $$
BEGIN
    IF p_nova_quantidade <= 0 THEN
        DELETE FROM tbcarrinho 
        WHERE id_usuario = p_usuario_id AND id_produto = p_produto_id;
    ELSE
        UPDATE tbcarrinho 
        SET quantidade = p_nova_quantidade
        WHERE id_usuario = p_usuario_id AND id_produto = p_produto_id;
    END IF;
END;

select * from tbProduto;
select * from tbusuario;
select * from tbFuncionario;
select * from vw_carrinho_completo;
select * from vw_carrinho_completo where usuario_id = 1;
SELECT fn_calcular_total_carrinho(1) as total_carrinho;
CALL sp_atualizar_quantidade_carrinho(1, 5, 3);
drop table tbusuario;
drop table tbFuncionario;


CREATE DATABASE Hibis
USE Hibis;
DROP DATABASE Hibis;


-- tbUsuario
CREATE TABLE tbUsuario (
    id  INT  AUTO_INCREMENT PRIMARY KEY,
    cpf         Varchar(11) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    data_nascimento   DATE     NOT NULL,
    telefone     VARCHAR(15)   NOT NULL,
    email  VARCHAR(150) UNIQUE NOT NULL,
    senha      VARCHAR(50)      NOT NULL
);
select * from tbusuario;
drop table tbusuario;

-- tbProduto
CREATE TABLE tbProduto(
    codProduto INT AUTO_INCREMENT PRIMARY KEY,
    nomeProduto VARCHAR(50) NOT NULL,
    classificProduto VARCHAR(50) NOT NULL,
    valorProduto DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255)
);
INSERT INTO tbProduto (codProduto, nomeProduto, classificProduto, valorProduto, imagem) VALUES
(1, 'Hidratante Facial HidraHíbis', 1, 35.90, '/img/Hidratante facial HidraHíbis.png'),
(2, 'Primer HB Prime', 1, 40.49, '/img/PrimerHbPrime.png'),
(3, 'Sérum Facial HB Íris', 1, 39.99, '/img/serumfacial.png'),
(4, 'Híbis Blindagem', 1, 35.99, '/img/blindagem.png'),
(5, 'Lenço Demaquilante Híbis', 1, 40.50, '/img/lencodemaquilante.png'),
(6, 'Bruma Fixadora HB Fix', 1, 49.90, '/img/brumafixadora.png'),
(7, 'Base Híbis Skin', 2, 50.00, '/img/base.png'),
(8, 'Corretivo Híbis Soft Dew', 2, 40.49, '/img/corretivo.png'),
(9, 'Pó compacto Híbis Touch', 2, 39.99, '/img/pocompacto.png'),
(10, 'Contorno em Pó Híbis Touch', 2, 35.59, '/img/contornoempo.png'),
(11, 'Blush em pó HB Dust Bloom', 2, 35.99, '/img/blush.png'),
(12, 'Blush Líquido Híbis Bloom', 2, 40.00, '/img/blushliquido.png'),
(13, 'Iluminador Híbis Shinee', 2, 30.90, '/img/iluminador.png'),
(14, 'Contorno em Stick Híbis Velvet', 2, 40.50, '/img/contornoemstick.png'),
(15, 'Delineador Híbis LINE', 3, 39.99, '/img/delineador.png'),
(16, 'Rímel Híbis Lash', 3, 49.90, '/img/rimel.png'),
(17, 'Paleta de sombras HB Garden', 3, 59.90, '/img/paletagarden.png'),
(18, 'Paleta de sombras HB Basic Eye', 3, 69.90, '/img/paletabasic.png'),
(19, 'Gloss Híbis Glow', 4, 29.90, '/img/gloss.png'),
(20, 'Batom Híbis Kisses', 4, 35.00, '/img/batom.png'),
(21, 'Lápis de boca HB LipFrame', 4, 25.00, '/img/lapisdeboca.png');

select * from tbProduto;
drop table tbProduto;

-- tbCategorias

CREATE TABLE tbCategorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL
);
drop table tbCategorias;
INSERT INTO tbCategorias (nome, descricao) VALUES
	('Preparação', 'Cuidados com a pele antes da maquiagem, com maior duração na make'),
	('Pele', 'Produtos para a pele da maquiagem'),
	('Olho', 'Produtos para o olho'),
	('Boca', 'Produtos para a boca');



-- tbFuncionario
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
select * from tbFuncionario;
drop table tbFuncionario;


-- tbCarrinho
CREATE TABLE tbCarrinho (
	id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
	id_cliente  INT  NOT NULL,
    codProduto  INT  NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
	FOREIGN KEY (id_cliente) REFERENCES tbUsuario(id),
	FOREIGN KEY (codProduto) REFERENCES tbProduto(codProduto)
);
drop table tbCarrinho;
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
INNER JOIN tbUsuario u ON c.id_cliente = u.id
INNER JOIN tbProduto p ON c.codProduto = p.codProduto;
select * from vw_carrinho_completo;
select * from vw_carrinho_completo where usuario_id = 1;

-- FUNCTION para calcular total do carrinho
-- delimitando ;
DELIMITER $$
CREATE FUNCTION fc_calcular_total_carrinho(p_usuario_id INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10,2);

    -- Calcula o total do carrinho
    SELECT SUM(p.valorProduto * c.quantidade)
    INTO total
    FROM tbCarrinho c
    INNER JOIN tbProduto p ON c.codProduto = p.codProduto
    WHERE c.id_cliente = p_usuario_id;

    -- Se o carrinho estiver vazio, SUM retorna NULL — então definimos 0
    IF total IS NULL THEN
        SET total = 0;
    END IF;

    RETURN total;
END$$
DELIMITER ;
drop function fc_calcular_total_carrinho;
SELECT fc_calcular_total_carrinho(2) as total_carrinho;

-- 3.  para atualizar quantidade
DELIMITER $$
CREATE PROCEDURE sp_atualizar_quantidade_carrinho(
    p_usuario_id INT,
    p_produto_id INT,
    p_nova_quantidade INT
)
BEGIN
    IF p_nova_quantidade <= 0 THEN
        DELETE FROM tbcarrinho 
        WHERE id_cliente = p_usuario_id AND codProduto = p_produto_id;
    ELSE
        UPDATE tbcarrinho 
        SET quantidade = p_nova_quantidade
        WHERE id_cliente = p_usuario_id AND codProduto = p_produto_id;
    END IF;
END$$
DELIMITER ;
DROP PROCEDURE sp_atualizar_quantidade_carrinho;
CALL sp_atualizar_quantidade_carrinho(2, 5, 3);



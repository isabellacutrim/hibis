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

-- ver itens do carrinho
CREATE VIEW vw_carrinho_completo AS
SELECT 
    u.nome_completo as tbUsuario,
    p.nomeProduto as tbProduto,
    p.valorProduto,
    (p.preco * c.quantidade) as subtotal,
    c.data_adicao
FROM tbcarrinho c
INNER JOIN tbusuario u ON c.id_usuario = u.id
INNER JOIN tbproduto p ON c.id_produto = p.id;


-- atualizar quantidade no carrinho
-- calcular total do carrinho


select * from tbProduto;
select * from tbusuario;
select * from tbFuncionario where ;
drop table tbusuario;
drop table tbFuncionario;


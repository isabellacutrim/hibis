CREATE DATABASE CadastroCliente

USE CadastroCliente;

CREATE TABLE tbUsuario (
    id  INT  AUTO_INCREMENT PRIMARY KEY,
    cpf            Varchar(11) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    data_nascimento   DATE     NOT NULL,
    telefone     VARCHAR(15)   NOT NULL,
    email  VARCHAR(150) UNIQUE NOT NULL,
    senha      VARCHAR(50)      NOT NULL
);
select*from tbusuario


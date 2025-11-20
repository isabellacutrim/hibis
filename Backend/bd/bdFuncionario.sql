CREATE DATABASE bdFuncionario;

USE bdFuncionario;

CREATE TABLE tbFuncionario(
	codFuncionario INT PRIMARY KEY IDENTITY(1,1),
	nomeFuncionario VARCHAR (50) NOT NULL,	
	cpfFuncionario VARCHAR (11) NOT NULL,
	dataNascFunc DATE NOT NULL,
	telefoneFunc VARCHAR (15) NOT NULL,
	emailFunc VARCHAR NOT NULL
);
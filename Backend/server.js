const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rota para a requisao 
const clienteRota = require('./requisicao/Cliente.js'); 
app.use('/cliente', clienteRota)

const ProdutoRota = require('./requisicao/Produto.js'); 
app.use('/Produto', ProdutoRota)

const FuncionarioRota = require('./requisicao/funcionario.js'); 
app.use('/Funcionario', FuncionarioRota)


//arquivos estaticos
app.use(express.static(path.join(__dirname, '../Frontend')));
app.use('/telas', express.static(path.join(__dirname, '../Frontend/telas')));
app.use('/img', express.static(path.join(__dirname, '../Frontend/img')));


// Rota principal (abre o index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
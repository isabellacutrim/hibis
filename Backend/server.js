const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors({
    origin: '*'
}));
app.use(session({
    secret: '', 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true, // 
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));


// Middlewares 
// Configurações para servir arquivos estáticos e fazer o parse de JSON e URL-encoded
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rota para a requisao 
const clienteRota = require('./requisicao/Cliente.js'); 
app.use('/cliente', clienteRota)

const ProdutoRota = require('./requisicao/Produto.js'); 
app.use('/Produto', ProdutoRota)

const FuncionarioRota = require('./requisicao/funcionario.js'); 
app.use('/Funcionario', FuncionarioRota)

const CarrinhoRota = require('./requisicao/Carrinho.js');
app.use('/carrinho', CarrinhoRota);

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

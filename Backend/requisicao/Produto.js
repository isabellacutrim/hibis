const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')

//post (cadastra produto)
//http://localhost:3000/Produto/cadastroProduto
router.post('/cadastroProduto', (req, res) => {
    console.log(req.body);

    const { codProduto, confCod, nomeProduto, classificProduto, valorProduto } = req.body;

    if (!codProduto || !confCod || !nomeProduto || !classificProduto || !valorProduto) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (codProduto !== confCod) return res.status(400).send("Código não conferem!");
    
    const query = 'INSERT INTO tbUsuario (codProduto, nomeProduto, classificProduto, valorProduto) VALUES (?, ?, ?, ?)';
    const valores = [codProduto, nomeProduto, classificProduto, valorProduto];

    conexao.query(query, valores, (err) => {
        if (err) {
            console.log('Erro ao cadastrar produto:', err);
            return res.status(500).send("Erro ao cadastrar produto.");
        }
        res.send("Cadastro realizado com sucesso.");
    });
});

module.exports = router;
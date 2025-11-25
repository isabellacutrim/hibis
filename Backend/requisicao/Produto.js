const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')

//post (cadastra produto)
//http://localhost:3000/Produto/cadastroProduto
router.post('/cadastroProduto', (req, res) => {
    console.log(req.body);

    const { nomeProduto, codProduto, confCod, classificProduto, quantidade, valorProduto } = req.body;



    if (!nomeProduto || !codProduto || !confCod || !classificProduto || !quantidade || !valorProduto) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (codProduto !== confCod) return res.status(400).send("Código não conferem!");
    if (classificProduto !== 'Boca' && classificProduto !== 'Olhos' && classificProduto !== 'Pele' && classificProduto !== 'Preparação') {
        return res.status(400).send("Classificação inválida! Deve ser uma das seguintes opções: Boca, Olhos, Pele, Preparação. ");
    }
    
    const query = 'INSERT INTO tbProduto (nomeProduto, classificProduto, valorProduto) VALUES (?, ?, ?)';
    const valores = [nomeProduto, classificProduto, parseFloat(valorProduto.replace(',', '.'))];

    conexao.query(query, valores, (err) => {
        if (err) {
            console.log('Erro ao cadastrar produto:', err);
            return res.status(500).send("Erro ao cadastrar produto.");
        }
        res.send("Cadastro realizado com sucesso.");
    });
});

module.exports = router;
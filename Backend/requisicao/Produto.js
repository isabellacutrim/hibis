const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')

//buscar todos os produtos
//http://localhost:3000/Produto/listarProdutos
router.get('/listarProdutos', (req, res) => {
    const query = 'SELECT * FROM tbProduto';
    conexao.query(query, (err, results) => {
        if (err) {      
            console.log('Erro ao buscar produtos:', err);
            return res.status(500).send("Erro ao buscar produtos.");
        }           
        res.json(results);
    });
});

//busca por categoria
//http://localhost:3000/Produto/listarProdutos/2
router.get('/listarProdutos/:classificProduto', (req, res) => {    
    const classificProduto = req.params.classificProduto;
    const query = 'SELECT * FROM tbProduto WHERE classificProduto = ?'; 
    conexao.query(query, [classificProduto], (err, results) => {
        if (err) {      
            console.log('Erro ao buscar produtos por categoria:', err);
            return res.status(500).send("Erro ao buscar produtos por categoria.");
        }
        res.json(results);
    });
});

//buscar produto especifico 
//http://localhost:3000/Produto/produtoEspecifico/20
router.get('/produtoEspecifico/:codProduto', (req, res) => {    
    const codProduto = req.params.codProduto;
    const query = 'SELECT * FROM tbProduto WHERE codProduto = ?';        
    conexao.query(query, [codProduto], (err, results) => {
        if (err) {      
            console.log('Erro ao buscar produto específico:', err);
            return res.status(500).send("Erro ao buscar produto específico.");
        }       
        res.json(results);
    });
});

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
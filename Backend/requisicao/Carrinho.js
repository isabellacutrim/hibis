const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')


//get (geral)
//http://localhost:3000/carrinho/todos
router.get('/todos', (req, res) => {
    conexao.query('SELECT * FROM tbCarrinho', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//get (por codigo)
//http://localhost:3000/carrinho/id/1
router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    conexao.query('SELECT * FROM tbCarrinho WHERE id_carrinho = ?', [id_carrinho], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//get (por cliente)
//http://localhost:3000/carrinho/idCliente/1
router.get('/idCliente/:id_cliente', (req, res) => {
    const id_cliente = req.params.id_cliente;
    conexao.query('SELECT * FROM tbCarrinho WHERE id_cliente = ?', [id_cliente], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

  
//get (por produto)
//http://localhost:3000/carrinho/idProduto/1
router.get('/idProduto/:id_produto', (req, res) => {
    const id_produto = req.params.id_produto;
    conexao.query('SELECT * FROM tbCarrinho WHERE id_produto = ?', [id_produto], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//post (cadastra carrinho)
//http://localhost:3000/carrinho/cadastroCarrinho
router.post('/cadastroCarrinho', (req, res) => {
    console.log(req.body);

    const { id_cliente, id_produto, quantidade  } = req.body;

    if (!id_cliente || !id_produto || !data_nascimento || !quantidade ) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    
    const query = 'INSERT INTO tbCarrinho (id_cliente, id_produto, quantidade) VALUES (?, ?, ?)';
    const valores = [id_cliente, id_produto, quantidade];

    conexao.query(query, valores, (err) => {
        if (err) {
            console.log('Erro ao cadastrar Carrinho:', err);
            return res.status(500).send("Erro ao cadastrar Carrinho.");
        }
        res.send("Cadastro realizado com sucesso.");
    });
});


//head (verificar se carrinho existe)
//http://localhost:3000/carrinho/existe/2
router.head('/existe/:id_carrinho', (req, res) => {
    const id_carrinho = req.params.id_carrinho;     
    conexao.query('SELECT 1 FROM tbCarrinho WHERE id_carrinho = ?', [id_carrinho], (err, results) => {
        if (err){
            return res.status(500).json({ error: err.message })
        }
        if (results.length > 0) {
            return res.status(200).end(); // carrinho existe
        }
        return res.status(404).end(); // carrinho não existe
    });
}); 

//Patch (atualizar quantidade)
//http://localhost:3000/carrinho/atualizar/quantidade/2
router.patch('/atualizar/quantidade/:id_carrinho', (req, res) => {
    const id_carrinho = req.params.id_carrinho;
    const quantidade = req.body.quantidade;
    conexao.query('UPDATE tbCliente SET quantidade = ? WHERE id_carrinho = ?', [id_carrinho, quantidade], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Quantidade atualizado com sucesso.' });
    });
});

module.exports = router;
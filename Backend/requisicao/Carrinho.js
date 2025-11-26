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


//head (verificar se cliente existe)
//http://localhost:3000/cliente/existe/12345678900
router.head('/existe/:cpf', (req, res) => {
    const cpf = req.params.cpf;     
    conexao.query('SELECT 1 FROM tbusuario WHERE cpf = ?', [cpf], (err, results) => {
        if (err){
            return res.status(500).json({ error: err.message })
        }
        if (results.length > 0) {
            return res.status(200).end(); // Cliente existe
        }
        return res.status(404).end(); // Cliente não existe
    });
}); 

//Patch (atualizar email)
//http://localhost:3000/cliente/atualizar/email/1
router.patch('/atualizar/email/:id', (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    conexao.query('UPDATE tbusuario SET email = ? WHERE id = ?', [email, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Email atualizado com sucesso.' });
    });
});
//patch (atualizar telefone)
//http://localhost:3000/cliente/atualizar/telefone/1
router.patch('/atualizar/telefone/:id', (req, res) => {
    const id = req.params.id;
    const telefone = req.body.telefone;
    conexao.query('UPDATE tbusuario SET telefone = ? WHERE id = ?', [telefone, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Telefone atualizado com sucesso.' });
    });
});

//patch (atualizar senha)
//http://localhost:3000/cliente/atualizar/senha/1
router.patch('/atualizar/senha/:id', (req, res) => {
    const id = req.params.id;
    const senha = req.body.senha;
    conexao.query('UPDATE tbusuario SET senha = ? WHERE id = ?', [senha, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Senha atualizada com sucesso.' });
    });
});

//put (atualizar todos os dados do cliente)
//http://localhost:3000/cliente/atualizar/todos/1
//YYYY/MM/DD
router.put('/atualizar/todos/:id', (req, res) => {
    const id = req.params.id;
    const { cpf, nome_completo, data_nascimento, telefone, email, senha } = req.body;   
    const query = 'UPDATE tbusuario SET cpf = ?, nome_completo = ?, data_nascimento = ?, telefone = ?, email = ?, senha = ? WHERE id = ?';
    const valores = [cpf, nome_completo, data_nascimento, telefone, email, senha, id];
    conexao.query(query, valores, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Dados do cliente atualizados com sucesso.' });
    });
});

// post (login)
//http://localhost:3000/cliente/login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({error: 'Email e senha são obrigatórios!'});
    }
    try {
        conexao.query('SELECT * FROM tbusuario WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

});

module.exports = router;
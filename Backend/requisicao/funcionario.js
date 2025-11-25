const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')


//get (geral)
//http://localhost:3000/Funcionario/funcionarios
router.get('/funcionarios', (req, res) => {
    conexao.query('SELECT * FROM tbFuncionario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//get (login)
//http://localhost:3000/Funcionario/funcionario
router.get('/funcionario', (req, res) => {
    const { email, senha, confirmar_senha} = req.query;
    if (!email || !senha || !confirmar_senha) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (senha !== confirmar_senha) {
        return res.status(400).send("Senhas não conferem!");
    }
    conexao.query('SELECT * FROM tbFuncionario WHERE emailFunc = ?'), [email], (err, results) => {
        // if (senha !== results.senhaFunc) {
        //     return res.status(400).send("Senha incorreta!");
        // }
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    }
});

module.exports = router;


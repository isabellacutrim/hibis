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

//post (login)
//http://localhost:3000/Funcionario/login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    try{
        conexao.query(
            'SELECT * FROM tbFuncionario WHERE email = ? AND senha = ?', [email, senha], 
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });   
    });
    }catch(err){
        return res.s
        tatus(500).json({ error: err.message });
    }

});
module.exports = router;


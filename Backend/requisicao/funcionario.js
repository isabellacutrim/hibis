const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')


//get (geral)
//http://localhost:3000/funcionario/funcionarios
router.get('/funcionarios', (req, res) => {
    conexao.query('SELECT * FROM tbFuncionario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//post (login)
//http://localhost:3000/funcionario/login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    
    conexao.query(
        'SELECT * FROM tbFuncionario WHERE emailfunc = ? AND senha = ?', 
        [email, senha], 
        (err, results) => {
            
            //erro no banco
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (results.length === 0) {
                return res.status(401).json({ error: 'Email ou senha incorretos.' });
            }
            
            const funcionario = results[0];
            return console.log("Login bem-sucedido para o funcionário:", funcionario.nomefunc);
        }
    );
});
module.exports = router;


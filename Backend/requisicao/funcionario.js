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
    const { emailFunc, senha } = req.body;

    if (!emailFunc || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

    conexao.query(
        'SELECT * FROM tbFuncionario WHERE emailFunc = ? AND senha = ?',
        [emailFunc, senha],
        (err, results) => {
             // commits:
            // Erro no banco
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Nenhum usuário encontrado
            if (results.length === 0) {
                return res.status(401).json({ error: 'Email ou senha incorretos.' });
            }

            // Usuário encontrado
            const usuario = results[0];

            return res.status(200).json({
                message: 'Login realizado com sucesso!',
                usuario: {
                    id: usuario.id,
                    nome_completo: usuario.nome_completo,
                    emailFunc: usuario.emailFunc
                }
            });
        }
    );
});
module.exports = router;




const express = require('express')
const router = express.Router();
const conexao = require('../database/conexao.js')


//get (geral)
//http://localhost:3000/cliente/clientes
router.get('/clientes', (req, res) => {
    conexao.query('SELECT * FROM tbusuario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//get (por codigo)
//http://localhost:3000/cliente/id/1
router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    conexao.query('SELECT * FROM tbusuario WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//get (por cpf)
//http://localhost:3000/cliente/cpf/12345678900
router.get('/cpf/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    conexao.query('SELECT * FROM tbusuario WHERE cpf = ?', [cpf], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results);
    });
});

//post (cadastra cliente)
//http://localhost:3000/cliente/cadastroCliente
router.post('/cadastroCliente', (req, res) => {
    console.log(req.body);

    const { cpf, nome_completo, data_nascimento, telefone, email, emailConfirmar, senha, senhaConfirmar } = req.body;

    if (!cpf || !nome_completo || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (email !== emailConfirmar) return res.status(400).send("Emails não conferem!");
    if (senha !== senhaConfirmar) return res.status(400).send("Senhas não conferem!");
    if (cpf.length !== 11) return res.status(400).send("CPF inválido! Deve conter 11 dígitos.");
    if (telefone.length < 10 || telefone.length > 11) return res.status(400).send("Telefone inválido! Deve conter 10 ou 11 dígitos.");

    const query = 'INSERT INTO tbUsuario (cpf, nome_completo, data_nascimento, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [cpf, nome_completo, data_nascimento, telefone, email, senha];

    conexao.query(query, valores, (err) => {
        if (err) {
            console.log('Erro ao cadastrar usuário:', err);
            return res.status(500).send("Erro ao cadastrar usuário.");
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

// router.post('/login', (req, res) => {
//     const { email, senha } = req.body;
//     if (!email || !senha) {
//         return res.status(400).json({error: 'Email e senha são obrigatórios!'});
//     }
//     try {
//         conexao.query('SELECT * FROM tbusuario WHERE email = ?', [email], (err, results) => {
//             // if (senha != 'SELECT senha FROM tbusuario WHERE email = ?) {
//             //     return res.status(401).json({ error: 'Credenciais inválidas!' });
//             // }
//             res.json({message: 'Login bem sucedido!'})
//             if (err) return res.status(500).json({ error: err.message });
//         });
//     } catch (err) {
//         return res.status(500).json({ error: err.message });
//     }

// });

// post (login)
// http://localhost:3000/cliente/login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios!' });
    }

    conexao.query(
        'SELECT * FROM tbusuario WHERE email = ? AND senha = ?',
        [email, senha],
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
                    codUsuario: usuario.codUsuario,
                    nomeUsuario: usuario.nomeUsuario,
                    email: usuario.email
                }
            });
        }
    );
});

module.exports = router;
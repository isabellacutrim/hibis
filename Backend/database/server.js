const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../Frontend')));
app.use('/telas', express.static(path.join(__dirname, '../../Frontend/telas')));
app.use('/img', express.static(path.join(__dirname, '../../Frontend/img')));

//conexão com MySQL
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'CadastroCliente'
});

conexao.connect(err => {
    if(err) return console.log('Erro ao conectar ao MySQL:', err);
    console.log('Conectado ao MySQL com sucesso.');
});


app.post('/cadastro', (req, res) => {
    console.log(req.body);

    const { cpf, nome_completo, data_nascimento, telefone, email, emailConfirmar, senha, senhaConfirmar } = req.body;

    if(email !== emailConfirmar) return res.status(400).send("Emails não conferem!");
    if(senha !== senhaConfirmar) return res.status(400).send("Senhas não conferem!");

    const query = 'INSERT INTO tbUsuario (cpf, nome_completo, data_nascimento, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [cpf, nome_completo, data_nascimento, telefone, email, senha];

    conexao.query(query, valores, (err) => {
        if(err) {
            console.log('Erro ao cadastrar usuário:', err);
            return res.status(500).send("Erro ao cadastrar usuário.");
        }
        res.send("Cadastro realizado com sucesso.");
    });
});

// Rota para abrir o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/index.html'));
});

app.get('/cadastrocliente', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Frontend/telas/html/cadastro_cliente.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

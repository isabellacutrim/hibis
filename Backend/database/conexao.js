const mysql = require('mysql2');

// Conexão com o MySQL
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20252769gg.',
    database: 'Hibis'
});


conexao.connect(err => {
    if (err) return console.log('Erro ao conectar ao MySQL:', err);
    console.log('Conectado ao MySQL com sucesso.');
});

module.exports = conexao;
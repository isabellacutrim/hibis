import express from `express`

const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


//get (geral)
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM tbusuario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
    });
});

//get (por codigo)

//get (por cpf)

//post (cadastra cliente)
app.post('/usuarios', (req, res) => {
    const {cpf, nome_completo, data_nascimento, telefone, email, senha} = req.body;
    if(!cpf || !nome_completo || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos! '});
    }
    db.query('INSERT INTO tbusuario (cpf, nome_completo, data_nascimento, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?)', [cpf, nome_completo, data_nascimento, telefone, email, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertid, cpf, nome_completo, data_nascimento, telefone, email, senha }); 
    });
});

//head (verificar se cliente existe)

//Patch (atualizar email)

//patch (atualizar telefone)

//patch (atualizar senha)

//put (atualizar todos os dados do cliente)

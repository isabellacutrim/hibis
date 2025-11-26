const API = "http://localhost:3000/cliente";

//pegando o formulario
const form = document.getElementById("formCadastro");

// quando o usuario apertar o botão cadastrar
form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede recarregar a página

    //pegando o formulario
    const dados = {
        cpf: form.cpf.value,
        nome_completo: form.nome_completo.value,
        data_nascimento: form.data_nascimento.value,
        telefone: form.telefone.value,
        email: form.email.value,
        emailConfirmar: form.emailConfirmar.value,
        senha: form.senha.value,
        senhaConfirmar: form.senhaConfirmar.value
    };

    //ENVIAR VIA FETCH PARA O BACKEND
    fetch(`${API}/cadastroCliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);        // mensagem do backend
        form.reset();      // limpa o formulário
    })
    .catch(err => {
        alert("Erro ao cadastrar: " + err);
    });
});


//lListar clientes
function listarClientes() {
    fetch(`${API}/clientes`)
        .then(res => res.json())
        .then(data => console.log("Clientes:", data))
        .catch(err => console.error("Erro:", err));
}

//buscar por ID
function buscarPorId(id) {
    fetch(`${API}/id/${id}`)
        .then(res => res.json())
        .then(data => console.log("Cliente por ID:", data))
        .catch(err => console.error("Erro:", err));
}



//buscar cpf
function buscarPorCpf(cpf) {
    fetch(`${API}/cpf/${cpf}`)
        .then(res => res.json())
        .then(data => console.log("Cliente por CPF:", data))
        .catch(err => console.error("Erro:", err));
}

//cadastrar cliente
function cadastrarCliente(dados) {
    fetch(`${API}/cadastroCliente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.text())
    .then(msg => console.log("Cadastro:", msg))
    .catch(err => console.error("Erro:", err));
}

//verificar se cliente existe
function clienteExiste(cpf) {
    fetch(`${API}/existe/${cpf}`, { method: "HEAD" })
        .then(res => {
            if (res.status === 200) console.log("Cliente existe!");
            else console.log("Cliente NÃO existe.");
        })
        .catch(err => console.error("Erro:", err));
}

//atualizar email
function atualizarEmail(id, email) {
    fetch(`${API}/atualizar/email/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
    .then(msg => console.log("Atualização Email:", msg))
    .catch(err => console.error("Erro:", err));
}


//atualizar telefone
function atualizarTelefone(id, telefone) {
    fetch(`${API}/atualizar/telefone/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefone })
    })
    .then(res => res.json())
    .then(msg => console.log("Atualização Telefone:", msg))
    .catch(err => console.error("Erro:", err));
}

//atualizar senha
function atualizarSenha(id, senha) {
    fetch(`${API}/atualizar/senha/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha })
    })
    .then(res => res.json())
    .then(msg => console.log("Atualização Senha:", msg))
    .catch(err => console.error("Erro:", err));
}

//atualizar todos os dados
function atualizarTodos(id, dados) {
    fetch(`${API}/atualizar/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(res => res.json())
    .then(msg => console.log("Atualização Geral:", msg))
    .catch(err => console.error("Erro:", err));
}


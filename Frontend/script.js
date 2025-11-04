document.querySelector('form').addEventListener('submit', async function(event) {
    
    event.preventDefault();

    const cpf = document.querySelector('input[name="cpf"]').value;
    const nome_completo = document.querySelector('input[name="nome_completo"]').value;
    const data_nascimento = document.querySelector('input[name="data_nascimento"]').value;
    const Telefone = document.querySelector('input[name="telefone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const emailConf = document.querySelector('input[name="emailConfirmar"]').value;
    const senha = document.querySelector('input[name="senha"]').value;
    const senhaConf = document.querySelector('input[name="senhaConfirmar"]').value;
})


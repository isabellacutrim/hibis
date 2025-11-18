//cadastro cliente
document.querySelector('#formCliente').addEventListener('submit', async function(event) {
    
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

//cadastro produto
document.querySelector('#formProduto').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.querySelector('input[name="nome"]').value;
    const cod = document.querySelectorAll('input[name="codigo"]').value;
    const confCod = document.querySelector('input[name="confi_cod"]').value;
    const categoria = document.querySelector('input[name="categoria"]').value;
    const qtd = document.querySelector('input[name="quantidade"]').value;
    const emailFunc = document.querySelector('input[name="emailFunc"]').value;

    
    
})



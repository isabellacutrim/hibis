document.addEventListener('DOMContentLoaded', () => {
    const id_cliente = localStorage.getItem('id_cliente'); 

    if (!id_cliente) {
        alert("Cliente não encontrado. Faça login primeiro.");
        return;
    }

    carregarCarrinho(id_cliente);
});

function carregarCarrinho(id_cliente) {

    fetch(`http://localhost:3000/carrinho/listar/${id_cliente}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const lista = document.getElementById("listaProdutos");
            const totalElement = document.getElementById("valorTotal");

            lista.innerHTML = "";
            let totalCarrinho = 0;

            data.forEach(item => {
                totalCarrinho += item.preco * item.quantidade;

                lista.innerHTML += `
                    <div class="item-carrinho">
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div class="info">
                            <h3>${item.nome}</h3>
                            <p>Quantidade: ${item.quantidade}</p>
                            <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                        </div>

                        <button onclick="removerItem(${item.id_carrinho})" class="btn-remover">Remover</button>
                    </div>
                `;
            });

            totalElement.innerText = `R$ ${totalCarrinho.toFixed(2)}`;
        })
        .catch(error => {
            console.error("Erro ao carregar carrinho:", error);
        });
}

function removerItem(id_carrinho) {

    fetch(`http://localhost:3000/carrinho/remover/${id_carrinho}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            const id_cliente = localStorage.getItem('id_cliente');
            carregarCarrinho(id_cliente);
        })
        .catch(error => console.error("Erro ao remover:", error));
}

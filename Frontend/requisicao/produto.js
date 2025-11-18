fetch('http://localhost:3000/Produto')
    .then(response => {
        if(!response.ok) {
            throw new Error('Erro na requisição: ');
        }
        return response.json();
    })

    .then(data => {
        console.log('Produtos: ', produtos);
    })

    .catch(error => {
        console.error('Falha:', error);
    })

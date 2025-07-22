// Mini teste no retorno das férias.
let setCartaoCol = (cartao) =>{
    let cartoesDiv = document.getElementById('cartoes');
    cartoesDiv.insertAdjacentHTML('beforeend', cartao);
};

let createCartoes = () =>{
    for (let item of itens) {
        // html completo referente a cada card com o conteudo
        let cartao = getCartao(item);

        // Inserir cartao dentro do código html na div com id cartoes.
        setCartaoCol(cartao);
}
};
createCartoes();
    

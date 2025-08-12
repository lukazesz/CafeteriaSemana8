// Recupera a lista de itens do cardápio do localStorage (se existir)
// Caso não exista, cria um array vazio para armazenar os itens
let itensCardapio = JSON.parse(localStorage.getItem('itensCardapio')) || [];

/**
 * Atualiza visualmente a tabela HTML com os dados de itensCardapio
 * Percorre o array de itens e cria dinamicamente cada linha (tr) com suas colunas (td)
 */
function atualizarTabela() {
    // Seleciona o corpo da tabela (tbody)
    let tbody = document.querySelector("#tabelaItens");
    tbody.innerHTML = ""; // Limpa a tabela antes de recriar as linhas

    // Percorre todos os itens do array e insere na tabela
    itensCardapio.forEach((item, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>                 <!-- Número sequencial do item -->
            <td>${item.item}</td>                 <!-- Nome do produto -->
            <td>${item.preco}</td>                <!-- Preço do produto -->
            <td>${item.descricao}</td>            <!-- Descrição do produto -->
        `;
        tbody.appendChild(tr); // Adiciona a linha ao corpo da tabela
    });
}

/**
 * Função executada ao enviar o formulário de cadastro de item
 * - Impede o recarregamento da página
 * - Captura os dados do formulário
 * - Armazena no array e no localStorage
 * - Atualiza a tabela na tela
 * - Mostra mensagem de sucesso
 * - Fecha o modal usando API do Bootstrap 5
 */
const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue

    let cardapioForm = document.getElementById('itemCadastrarForm');
    let cardapioFormData = new FormData(cardapioForm);
    let itemCardapio = Object.fromEntries(cardapioFormData);

    // Adiciona o novo item ao array
    itensCardapio.push(itemCardapio);

    // Salva o array atualizado no localStorage
    localStorage.setItem('itensCardapio', JSON.stringify(itensCardapio));

    // Atualiza a tabela exibida na página
    atualizarTabela();

    // Limpa os campos do formulário
    cardapioForm.reset();

    // Exibe mensagem de confirmação para o usuário
    Toastify({
        text: "Dados enviados com sucesso",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    // Fecha o modal via Bootstrap 5 API
    const modalEl = document.getElementById('itensCardapioModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
};

// Captura o formulário pelo ID
const itemCadastradorForm = document.getElementById('itemCadastrarForm');
// Associa a função handleSubmit ao evento de envio do formulário
itemCadastradorForm.addEventListener('submit', handleSubmit);

// Inicializa o modal para garantir que podemos manipulá-lo depois
const modalEl = document.getElementById('itensCardapioModal');
const modalBootstrap = new bootstrap.Modal(modalEl);

// Atualiza a tabela ao carregar a página com os dados já salvos no localStorage
atualizarTabela();


const cadastrar = document.getElementById('novoItem');
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Função que resgata os elementos existentes no localStorage através do forEach

itens.forEach(e => {
    criarElemento(e)
});

// Função atribuída ao evento submit do formulário

cadastrar.addEventListener ("submit", (evento) => {
    evento.preventDefault();

    const item = cadastrar.elements['nome'];
    const quantidade = cadastrar.elements['quantidade'];

    const itemAtual = {
        "nome": item.value,
        "quantidade": quantidade.value
    }

    // Condição que define se o nome do item já existe na lista

    const existe = itens.find( e => e.nome === item.value)

    if (existe) {

        itemAtual.id = existe.id
        atualizaElemento(itemAtual);
        itens[existe.id] = itemAtual;

    } else {

        itemAtual.id = itens.length
        criarElemento (itemAtual)
        itens.push(itemAtual);

    }

    item.value = "";
    quantidade.value = ""; 

    localStorage.setItem("itens", JSON.stringify(itens));

}) 

// Função para criar elementos na lista HTML

function criarElemento(item) {

    const novoItem = document.createElement('li'); //cria novo item de lista da ul dentro da variável novoItem
    novoItem.classList.add("item"); // atribui a classo 'item' à tag li da lista

    const qtdItem = document.createElement('strong');  // cria a tag strong dentro da variável qtdItem
    qtdItem.dataset.id = item.id;
    qtdItem.innerHTML = item.quantidade;

    const info_item = document.createElement('div');
    info_item.classList.add("info")
    info_item.appendChild(qtdItem); 
    info_item.innerHTML += item.nome;
    
    novoItem.appendChild(info_item);
    novoItem.appendChild(botaoDeleta());

    lista.appendChild(novoItem); //inserindo o elemento li na lista (tag ul)
}

// Função que substitui o valor da quantidade do item da lista 

function atualizaElemento (item) {
    document.querySelector("[data-id='" +item.id+ "']").innerHTML = item.quantidade;
}

//Função para criar um botão de deletar item

function botaoDeleta() {
    const botao = document.createElement('button');
    botao.classList.add("botao_deleta");
    botao.innerHTML = "X";
   
    botao.addEventListener("click", function() {
        deletaElemento(this);
    })

    return botao;
}
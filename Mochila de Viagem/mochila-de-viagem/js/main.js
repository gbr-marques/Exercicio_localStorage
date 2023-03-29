const cadastrar = document.getElementById('novoItem');
const lista = document.getElementById("lista");
let itens = JSON.parse(localStorage.getItem("itens")) || [];
let i = 0;

// Função que resgata os elementos existentes no localStorage através do forEach

itens.forEach(e => {
    criarElemento(e)
});

// Função atribuída ao evento submit do formulário

cadastrar.addEventListener ("submit", (evento) => {
    evento.preventDefault();

    const item = cadastrar.elements['nome'].value;
    const quantidade = cadastrar.elements['quantidade'].value;
    const nome_item = cadastrar.elements['nome'].value.trim(); // Função que elimina espaços localizados no início e fim da string

    // if (item == "" || quantidade == "") {
    //     alert("Os campos 'Nome do item' e 'Quantidade' devem ser preenchidos")
    // } else {
    
        const itemAtual = {
            "nome": nome_item,
            "quantidade": quantidade,
            "id": i
        }
    
        // Condição que define se o nome do item já existe na lista
    
        //const identificador = itens.find( e => e.nome === nome_item)
        //|| (e.nome).toLowerCase() === (nome_item).toLowerCase() || ( e => e.nome === nome_item && (e.nome).toLowerCase() === (nome_item).toLowerCase())
        //const repete1 = itens.find(e => e.nome === nome_item)
        const repete2 = itens.find(e => (e.nome).toLowerCase() === (nome_item).toLowerCase())
        console.log(repete2);
        console.log(quantidade);
        
        //existe.nome.localeCompare()
        //console.log("O id do item repetido é " + identificador.id + " e a sua quantidade atual é " +identificador.quantidade + ", quando deveria");
    
        if (repete2) {
                console.log(repete2.id);
                itemAtual.id = repete2.id
                atualizaElemento(itemAtual);
                itens[repete2.id].quantidade = quantidade;
        } else {
            criarElemento (itemAtual)
            itens.push(itemAtual);
        }
    
        item.value = "";
        quantidade.value = ""; 
    
        localStorage.setItem("itens", JSON.stringify(itens));
            
    // }

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
    novoItem.appendChild(botaoDeleta(item.id));
    i++

    lista.appendChild(novoItem); //inserindo o elemento li na lista (tag ul)
}

// Função que substitui o valor da quantidade do item da lista 

function atualizaElemento (item) {
    document.querySelector("[data-id='" +item.id+ "']").innerHTML = item.quantidade;
}

//Função para criar um botão de deletar item

function botaoDeleta(id) {
    const botao = document.createElement('button');
    botao.classList.add("botao_deleta");
    botao.innerHTML = "X";
   
    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return botao;
}

//Função que deleta o elemento selecionado

function deletaElemento(tag, id) {
    tag.remove();
    const id_remocao = itens.findIndex(elemento => elemento.id === id);
    itens.splice (id_remocao, 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}

// Função que limpa os itens da lista

const botao_limpa = document.getElementById("limpa");
botao_limpa.addEventListener("click", () => {
    const todos_os_itens = document.querySelectorAll("[class='item'");

    console.log("Botão pressionado")
    for (let i = 0; i < (itens.length); i++) {
        todos_os_itens[i].remove();
    }

    console.log(itens);
    itens = []
    console.log(itens);
    localStorage.clear();
})
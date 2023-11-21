const listaVeiculos = document.querySelector(".carros__container");

// Função para enviar um POST com os dados do novo carro
async function adicionarCarro() {
    const nomeInput = document.getElementById("nomeInput");
    const marcaInput = document.getElementById("marcaInput");
    const modeloInput = document.getElementById("modeloInput");
    const placaInput = document.getElementById("placaInput");
    const anoInput = document.getElementById("anoInput");
    const opcaoInput = document.getElementById("opcaoInput")

    const nome = nomeInput.value;
    const marca = marcaInput.value;
    const modelo = modeloInput.value;
    const placa = placaInput.value;
    const ano = anoInput.value;
    const opcao = opcaoInput.value;

    try {
        const response = await fetch("http://localhost:8080/car", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nome,
                brand: marca,
                model: modelo,
                plate: placa,
                year: ano,
                plan: opcao,
            }),
        });

        if (response.ok) {
            // Se a solicitação POST for bem-sucedida, atualizar a lista de carros
            buscarEMostrarCarros();
            // Limpar os campos do formulário
            nomeInput.value = "";
            marcaInput.value = "";
            modeloInput.value = "";
            anoInput.value = "";
            placaInput.value = "";
            opcaoInput.value = "";
        } else {
            console.error("Falha ao adicionar o carro.");
        }
    } catch (error) {
        console.error("Houve um erro ao adicionar o carro: " + error);
    }
}

// Adicionando um evento de clique ao botão "Cadastrar" para chamar a função adicionarCarro
const cadastrarButton = document.getElementById("cadastrarButton");
cadastrarButton.addEventListener("click", adicionarCarro);

// Função para enviar uma solicitação DELETE para remover um carro
async function removerCarro(id) {
    try {
        const response = await fetch(`http://localhost:8080/car/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // Se a solicitação DELETE for bem-sucedida, atualizar a lista de carros
            buscarEMostrarCarros();
        } else {
            console.error("Falha ao remover o carro.");
        }
    } catch (error) {
        console.error("Houve um erro ao remover o carro: " + error);
    }
}

// Função para criar uma linha de carro com botões de ação
function criarLinhaCarro(carro) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${carro.id}</td>
        <td>${carro.name}</td>
        <td>${carro.brand}</td>
        <td>${carro.model}</td>
        <td>${carro.year}</td>
        <td>${carro.plate}</td>
        <td>${carro.plan}</td>
        <td>
            <button class="removerButton" data-id="${carro.id}">Remover</button>
        </td>
    `;

    const removerButton = tr.querySelector(".removerButton");
    removerButton.addEventListener("click", () => {
        const id = removerButton.getAttribute("data-id");
        removerCarro(id);
    });

    return tr;
}

// Função buscarEMostrarCarros que chama a função criarLinhaCarro
async function buscarEMostrarCarros() {
    try {
        const busca = await fetch("http://localhost:8080/car");
        const carros = await busca.json();

        const carrosContainer = document.querySelector(".carros__container");
        carrosContainer.innerHTML = "";

        carros.forEach((carro) => {
            carrosContainer.appendChild(criarLinhaCarro(carro));
        });
    } catch (error) {
        const listaVeiculos = document.querySelector(".carros__container");
        listaVeiculos.innerHTML = `<tr><td colspan="5">Houve um erro ao carregar os carros: ${error}</td></tr>`;
    }
}

buscarEMostrarCarros();
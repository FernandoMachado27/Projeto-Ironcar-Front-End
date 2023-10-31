const listaVeiculos = document.querySelector(".carros__container");

async function buscarEMostrarCarros() {
    try {
        const busca = await fetch("http://localhost:8080/car");
        const carros = await busca.json();

        carros.forEach((carro) => {
            listaVeiculos.innerHTML += `
                <tr>
                    <td>${carro.name}</td>
                    <td>${carro.brand}</td>
                    <td>${carro.model}</td>
                    <td>${carro.year}</td>
                </tr>
            `;
        });
    } catch (error) {
        listaVeiculos.innerHTML = `<tr><td colspan="4">Houve um erro ao carregar os carros: ${error}</td></tr>`;
    }
}

buscarEMostrarCarros();
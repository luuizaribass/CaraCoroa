const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');
const botao = document.getElementById('botao');
const caraPlacarElemento = document.getElementById('caraPlacar');
const coroaPlacarElemento = document.getElementById('coroaPlacar');
const canvasContainer = document.getElementById('canvas-container');
const canvasGirar = document.querySelector('.canvas-girar');
const caraImagem = document.getElementById('cara');
const coroaImagem = document.getElementById('coroa');

const resultadoCanvas = document.getElementById('resultado-canvas');
const contextoResultado = resultadoCanvas.getContext('2d');

// Array com nomes das imagens de moedas
const moedas = ['cara.png', 'coroa.png'];

let caraContagem = 0;
let coroaContagem = 0;

// Variável para controlar se a moeda está girando
let girando = false;

function exibirResultado(texto) {
    contextoResultado.clearRect(0, 0, resultadoCanvas.width, resultadoCanvas.height);
    contextoResultado.font = '18px Poppins';
    contextoResultado.fillStyle = '#7e7e7e';

    // Calcula a largura e a altura do texto
    const larguraTexto = contextoResultado.measureText(texto).width;
    const alturaTexto = 16; // Tamanho da fonte, ajuste conforme necessário

    // Calcula a posição X e Y para centralizar o texto
    const x = (resultadoCanvas.width - larguraTexto) / 2;
    const y = (resultadoCanvas.height + alturaTexto) / 2;

    // Posiciona o texto centralizado verticalmente e horizontalmente
    contextoResultado.fillText(texto, x, y);
}

// Chame a função para exibir o resultado inicial
exibirResultado('Aguardando...');

// Função para exibir a imagem da moeda
function desenharMoeda(face) {
    if (face === 0) {
        caraImagem.style.display = 'block'; // Mostra a imagem de "Cara"
        coroaImagem.style.display = 'none'; // Esconde a imagem de "Coroa"
    } else {
        caraImagem.style.display = 'none'; // Esconde a imagem de "Cara"
        coroaImagem.style.display = 'block'; // Mostra a imagem de "Coroa"
    }
}

// Função para atualizar o placar
function atualizarPlacar() {
    caraPlacarElemento.textContent = caraContagem;
    coroaPlacarElemento.textContent = coroaContagem;
}

botao.addEventListener('click', () => {
    // Impede cliques múltiplos enquanto a moeda está girando
    if (girando) return;
    girando = true;

    // Chame a função de alternância de imagens repetidamente usando um intervalo
    const intervalo = setInterval(alternarImagensMoeda, 100); // Alterna a cada 100 milissegundos

    // Aplica a animação de rotação à moeda
    canvasGirar.style.animation = 'spin 0.9s linear';

    // Define um timeout para simular o resultado após a animação
    setTimeout(() => {
        girando = false; // Após o timeout, a moeda não está mais girando
        clearInterval(intervalo);
        canvasGirar.style.animation = 'none';                 // Remove a animação da moeda

        const resultado = Math.floor(Math.random() * 2); // Gera um resultado aleatório (0 para cara, 1 para coroa)

        // Atualiza a contagem e exibe a moeda correspondente
        if (resultado === 0) {
            caraContagem++;
            exibirResultado('Cara ganhou!');
        } else {
            coroaContagem++;
            exibirResultado('Coroa ganhou!');
        }

        desenharMoeda(resultado); // Exibe a moeda correspondente no canvas
        atualizarPlacar();
    }, 900); //Este é o tempo em milissegundos (0.9 segundos) que o timeout aguardará antes de executar o código interno
});

// Variável para controlar a alternância entre as imagens
let alternarImagem = true;

// Função para alternar entre as imagens da moeda durante a animação
function alternarImagensMoeda() {
    if (alternarImagem) {
        caraImagem.style.display = 'block'; // Mostra a imagem de "Cara"
        coroaImagem.style.display = 'none'; // Esconde a imagem de "Coroa"
    } else {
        caraImagem.style.display = 'none'; // Esconde a imagem de "Cara"
        coroaImagem.style.display = 'block'; // Mostra a imagem de "Coroa"
    }
    alternarImagem = !alternarImagem; // Inverte o valor para a próxima alternância
}



alert("Bem-vindo ao Painel do Herói!");

const heroi = {
    nome: "Giovani Coelho",
    classe: "Aspirante a Dev",
    nivel: 1,
    xp: 0, 
}

const listaProjetos = [
    {
        titulo: "Meu Primeiro Site",
        descricao: "Página criada no treinamento de HTML",
        link: "index.html"
    },
    {
        titulo: "Desafio JavaScript",
        descricao: "Lógica de programação aplicada a RPG",
        link: "#"
    },
    {
        titulo: "Oráculo Dev",
        descricao: "Consumo de API assíncrona com Fetch",
        link: "#"
    }
];


const mensagemFicha = `--- FICHA DO HERÓI ---
Nome: ${heroi.nome}
Classe: ${heroi.classe}
Nível: ${heroi.nivel}
XP: ${heroi.xp}
---------------------`;

console.log(mensagemFicha);
alert(mensagemFicha);

const heroNome = document.querySelector('#hero-nome');
const heroClasse = document.querySelector('#hero-classe');
const heroNivel = document.querySelector('#hero-nivel');
const heroXp = document.querySelector('#hero-xp');
const btnXP = document.querySelector('#btn-xp');
const btnOraculo = document.querySelector('#btn-oraculo');
const containerProjetos = document.querySelector('#container-projetos');

const formContato = document.querySelector('#contato form');
const inputNome = document.querySelector('#nome');
const inputEmail = document.querySelector('#email');
const statusContato = document.querySelector('#contato-status');

function calcularNivel(xpAtual){
    return Math.floor(xpAtual / 50) + 1;
}

function obterTitulo(nivel) {
    if (nivel >= 5) return 'Lenda do Código';
    if (nivel === 4) return 'Mestre';
    if (nivel === 3) return 'Cavaleiro';
    if (nivel === 2) return 'Aventureiro';
    return 'Novato';
}

function formatarFicha(personagem){
    return `--- FICHA DO HERÓI ---
Nome: ${personagem.nome}
Classe: ${personagem.classe}
Nível: ${personagem.nivel}
XP: ${personagem.xp}
---------------------`;
}


function atualizarInterface(){

    heroNome.textContent = heroi.nome;
    heroClasse.textContent = obterTitulo(heroi.nivel);
    heroNivel.textContent = heroi.nivel;
    heroXp.textContent = heroi.xp;
}

function renderizarProjetos() {
    containerProjetos.innerHTML = "";
    listaProjetos.forEach(projeto => {
        const card = document.createElement('article');
        card.className = 'card-projeto';
        card.innerHTML = `
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <a href="${projeto.link}" class="botao-primario">Ver Projeto</a>
        `;
        containerProjetos.appendChild(card);
    });
}



async function consultarOraculo() {
    const URL_ADVICE = "https://api.adviceslip.com/advice";
    
    try {
        
        const resposta = await fetch(URL_ADVICE);
        const dados = await resposta.json();
        const conselhoIngles = dados.slip.advice;
        
        const URL_TRADUCAO = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(conselhoIngles) + '&langpair=en|pt-BR';

        const respostaTraducao = await fetch(URL_TRADUCAO);
        const dadosTraducao = await respostaTraducao.json();
        const conselho = dadosTraducao.responseData.translatedText;
        
        alert(` O Oráculo diz: \n\n"${conselho}"`);
        
    } catch (erro) {
        console.error("Erro ao consultar o Oráculo:", erro);
        alert("O Oráculo está em silêncio profundo... (Erro na conexão)");
    }
}


btnOraculo.addEventListener('click', consultarOraculo);

btnXP.addEventListener('click', () => {
    heroi.xp += 10;
    console.log(`Você ganhou 10 de XP! Total de XP: ${heroi.xp}`);

    const novoNivel = calcularNivel(heroi.xp);

    if (novoNivel > heroi.nivel){
        heroi.nivel = novoNivel;
        const titulo = obterTitulo(heroi.nivel);
        alert(`Parabéns! Você Subiu para o nível ${heroi.nivel} - ${titulo}!`);

    }

    atualizarInterface();

});

formContato.addEventListener('submit', (event) => {
    event.preventDefault(); 

    if (inputNome.value.trim() === "" || inputEmail.value.trim() === "") {
        statusContato.textContent = " Erro: Preencha nome e e-mail!";
        statusContato.style.color = "red";
    } else {
        statusContato.textContent = " Mensagem enviada com sucesso, herói!";
        statusContato.style.color = "var(--cor-primaria)";
        formContato.reset();
    }
});

console.log("Portfólio do Herói: magia JavaScript iniciada!");
console.table(listaProjetos);

atualizarInterface();
renderizarProjetos();
const botoes = document.querySelectorAll(".botao");
const abasConteudo = document.querySelectorAll(".aba-conteudo");

const objetivos = [
    {
        nome: "UFPR 1ª Fase",
        dataFinal: new Date("2025-10-05T00:00:00")
    },
    {
        nome: "ENEM",
        dataFinal: new Date("2025-11-09T00:00:00")
    },
    {
        nome: "UTFPR",
        dataFinal: new Date("2025-11-23T00:00:00")
    },
    {
        nome: "Revisão Geral",
        dataFinal: new Date("2025-12-31T23:59:59")
    }
];

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            abasConteudo[j].classList.remove("ativo");
        }
        botoes[i].classList.add("ativo");
        abasConteudo[i].classList.add("ativo");
        atualizaCronometro();
    }
}

function calculaTempo(dataObjetivo) {
    let tempoAtual = new Date();
    let tempoFinal = dataObjetivo - tempoAtual;

    let segundos = Math.floor(tempoFinal / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    if (tempoFinal > 0) {
        return [dias, horas, minutos, segundos];
    } else {
        return [0, 0, 0, 0];
    }
}

function atualizaCronometro() {
    for (let i = 0; i < objetivos.length; i++) {
        const diasElement = document.getElementById(`dias${i}`);
        const horasElement = document.getElementById(`horas${i}`);
        const minElement = document.getElementById(`min${i}`);
        const segElement = document.getElementById(`seg${i}`);

        const tempoRestante = calculaTempo(objetivos[i].dataFinal);

        if (diasElement) diasElement.textContent = String(tempoRestante[0]).padStart(2, '0');
        if (horasElement) horasElement.textContent = String(tempoRestante[1]).padStart(2, '0');
        if (minElement) minElement.textContent = String(tempoRestante[2]).padStart(2, '0');
        if (segElement) segElement.textContent = String(tempoRestante[3]).padStart(2, '0');
    }
}

function comecaCronometro() {
    atualizaCronometro();
    setInterval(atualizaCronometro, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    botoes[0].click();
    comecaCronometro();
});
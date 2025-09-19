document.addEventListener('DOMContentLoaded', () => {
    // Pega o nome do arquivo atual, ex: "15comand.html"
    const paginaAtual = window.location.pathname.split('/').pop();

    // Extrai o número da página.
    // O regex [\d]+ busca um ou mais dígitos.
    const match = paginaAtual.match(/[\d]+/);

    if (match) {
        const numeroPagina = match[0];

        // Cria um novo elemento <div> para o número
        const numeroElemento = document.createElement('div');
        numeroElemento.innerText = numeroPagina;
        
        // Aplica os estilos para o número de fundo
        numeroElemento.style.position = 'fixed';
        numeroElemento.style.top = '50%';
        numeroElemento.style.left = '35%';
        numeroElemento.style.transform = 'translate(-50%, -50%)';
        numeroElemento.style.fontSize = '85vw'; // Deixa o número grande em relação à tela
        numeroElemento.style.fontWeight = 'bold';
        numeroElemento.style.color = '#0c0c0cff';
        numeroElemento.style.opacity = '100%'; // Opacidade de 30%
        numeroElemento.style.zIndex = '-1'; // Envia para o fundo
        numeroElemento.style.pointerEvents = 'none'; // Impede que o número bloqueie cliques

        // Adiciona o elemento ao corpo da página
        document.body.appendChild(numeroElemento);
    }
});
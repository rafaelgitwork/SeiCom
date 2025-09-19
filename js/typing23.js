document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "wget https://www.exemplo.com/arquivo.zip";
    
    // Saída que simula o progresso do download
    const outputLines = [
        "--2023-04-12 10:30:00--  https://www.exemplo.com/arquivo.zip",
        "Resolvendo www.exemplo.com (www.exemplo.com)... 93.184.216.34",
        "Conectando a www.exemplo.com (www.exemplo.com)|93.184.216.34|:443... conectado.",
        "A requisição HTTP foi enviada, esperando resposta... 200 OK",
        "Tamanho: 1048576 (1.0M) [application/zip]",
        "Salvando em: ‘arquivo.zip’"
    ];

    const progressOutput = [
        "arquivo.zip         [ <=>                   ]   10%  96.0K  1.2M/s   eta 0m1s",
        "arquivo.zip         [==>                   ]   25% 256.0K  1.5M/s   eta 0m1s",
        "arquivo.zip         [======>               ]   50% 512.0K  1.8M/s   eta 0m0s",
        "arquivo.zip         [=============>        ]   75% 768.0K  2.0M/s   eta 0m0s",
        "arquivo.zip         [====================> ]  100% 1.0M   2.2M/s   em 0.4s"
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const lineBreakDelay = 500;
    const progressDelay = 500;

    let commandCharIndex = 0;
    let outputLineIndex = 0;
    let progressIndex = 0;

    outputElement.innerHTML = '';

    const initialPromptLine = document.createElement('p');
    initialPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="typing-command"></span><span id="blinking-bar" class="blinking-cursor">|</span>';
    outputElement.appendChild(initialPromptLine);

    const commandElement = initialPromptLine.querySelector('#typing-command');

    function typeCommand() {
        if (commandCharIndex < commandText.length) {
            commandElement.textContent += commandText.charAt(commandCharIndex);
            commandCharIndex++;
            setTimeout(typeCommand, typingSpeed);
        } else {
            blinkingBar.style.display = 'inline';
            blinkingBar.classList.add('blinking-cursor');
            setTimeout(typeOutput, responseDelay);
        }
    }

    function typeOutput() {
        if (outputLineIndex < outputLines.length) {
            blinkingBar.style.display = 'none';
            const outputLine = document.createElement('p');
            outputLine.textContent = outputLines[outputLineIndex];
            outputElement.appendChild(outputLine);
            outputLineIndex++;
            setTimeout(typeOutput, lineBreakDelay);
        } else {
            typeProgress();
        }
    }

    function typeProgress() {
        if (progressIndex < progressOutput.length) {
            if (progressIndex === 0) {
                // Primeira linha do progresso
                const progressLine = document.createElement('p');
                progressLine.id = 'progress-line';
                outputElement.appendChild(progressLine);
            }
            const progressLine = document.getElementById('progress-line');
            progressLine.textContent = progressOutput[progressIndex];
            progressIndex++;
            setTimeout(typeProgress, progressDelay);
        } else {
            const finalPromptLine = document.createElement('p');
            finalPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
            outputElement.appendChild(finalPromptLine);
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
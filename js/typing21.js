document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    // Primeira etapa: Comando para listar processos
    const commandText1 = "ps ux";
    const outputLines1 = [
        "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
        "root         1  0.0  0.1 168444 11840 ?       Ss   09:30   0:01 /sbin/init",
        "user    1234  0.5  2.3 852108 190456 ?      Sl   09:35   0:15 /usr/bin/firefox",
        "user    5678  0.1  0.5 45678  12345 ?       S    10:10   0:02 /usr/bin/gedit"
    ];

    // Segunda etapa: Comando para finalizar o processo
    const commandText2 = "kill 9 1234";
    const outputLines2 = [
        "Processo 1234 (Firefox) finalizado com sucesso."
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const lineBreakDelay = 500;

    let commandCharIndex = 0;
    let outputLineIndex = 0;
    let outputCharIndex = 0;

    // Remove os elementos de parágrafo existentes para começar a simulação do zero
    outputElement.innerHTML = '';

    // Adiciona o parágrafo inicial e o cursor piscando
    const initialPromptLine = document.createElement('p');
    initialPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="typing-command"></span><span id="blinking-bar" class="blinking-cursor">|</span>';
    outputElement.appendChild(initialPromptLine);

    const commandElement = initialPromptLine.querySelector('#typing-command');

    // Função para simular a digitação de um comando
    function typeCommand(commandText, callback) {
        if (commandCharIndex < commandText.length) {
            commandElement.textContent += commandText.charAt(commandCharIndex);
            commandCharIndex++;
            setTimeout(() => typeCommand(commandText, callback), typingSpeed);
        } else {
            blinkingBar.style.display = 'inline';
            blinkingBar.classList.add('blinking-cursor');
            setTimeout(callback, responseDelay);
        }
    }

    // Função para simular a digitação da saída do comando
    function typeOutput(outputLines, callback) {
        if (outputLineIndex < outputLines.length) {
            blinkingBar.style.display = 'none';

            const outputLine = document.createElement('span');
            outputElement.appendChild(outputLine);

            const typeOutputLine = () => {
                if (outputCharIndex < outputLines[outputLineIndex].length) {
                    outputLine.textContent += outputLines[outputLineIndex].charAt(outputCharIndex);
                    outputCharIndex++;
                    setTimeout(typeOutputLine, typingSpeed);
                } else {
                    outputElement.innerHTML += '<br>';
                    outputCharIndex = 0;
                    outputLineIndex++;
                    setTimeout(() => typeOutput(outputLines, callback), lineBreakDelay);
                }
            };
            typeOutputLine();
        } else {
            if (callback) {
                callback();
            } else {
                finalCursor.style.display = 'inline';
                finalCursor.classList.add('blinking-cursor');
            }
        }
    }

    // Função para iniciar a sequência de simulação
    function startSequence() {
        // Digita o primeiro comando
        typeCommand(commandText1, () => {
            commandCharIndex = 0;
            outputLineIndex = 0;
            outputCharIndex = 0;
            // Digita a saída do primeiro comando
            typeOutput(outputLines1, () => {
                // Prepara para o segundo comando em uma nova linha
                const secondPromptLine = document.createElement('p');
                secondPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="typing-command2"></span>';
                outputElement.appendChild(secondPromptLine);

                const commandElement2 = secondPromptLine.querySelector('#typing-command2');
                
                // Inicia a digitação do segundo comando
                let commandCharIndex2 = 0;
                function typeCommand2() {
                    if (commandCharIndex2 < commandText2.length) {
                        commandElement2.textContent += commandText2.charAt(commandCharIndex2);
                        commandCharIndex2++;
                        setTimeout(typeCommand2, typingSpeed);
                    } else {
                        // Exibe a saída do segundo comando
                        const outputLine2 = document.createElement('p');
                        outputLine2.innerHTML = outputLines2[0];
                        outputElement.appendChild(outputLine2);
                        
                        finalCursor.style.display = 'inline';
                        finalCursor.classList.add('blinking-cursor');
                    }
                }
                typeCommand2();
            });
        });
    }

    // Esconde o cursor final no início
    finalCursor.style.display = 'none';

    // Inicia a sequência de simulação
    startSequence();
});
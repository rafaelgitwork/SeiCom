document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    // Primeira etapa: comando para exibir o conteúdo do arquivo (cat)
    const commandText1 = "cat nomes.txt";
    const outputLines1 = [
        "Maria",
        "Carlos",
        "Ana",
        "Zeca",
        "Bruno"
    ];

    // Segunda etapa: comando para ordenar o conteúdo do arquivo (sort)
    const commandText2 = "sort nomes.txt";
    const outputLines2 = [
        "Ana",
        "Bruno",
        "Carlos",
        "Maria",
        "Zeca"
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const lineBreakDelay = 100;

    let commandCharIndex = 0;
    let outputLineIndex = 0;
    let outputCharIndex = 0;

    outputElement.innerHTML = '';

    const initialPromptLine = document.createElement('p');
    initialPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="typing-command"></span><span id="blinking-bar" class="blinking-cursor">|</span>';
    outputElement.appendChild(initialPromptLine);

    const commandElement = initialPromptLine.querySelector('#typing-command');

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
                const finalPromptLine = document.createElement('p');
                finalPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
                outputElement.appendChild(finalPromptLine);
            }
        }
    }

    function startSequence() {
        // Digita o primeiro comando (cat)
        typeCommand(commandText1, () => {
            commandCharIndex = 0;
            outputLineIndex = 0;
            outputCharIndex = 0;
            typeOutput(outputLines1, () => {
                // Adiciona um novo prompt para o segundo comando (sort)
                const secondPromptLine = document.createElement('p');
                secondPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="typing-command2"></span>';
                outputElement.appendChild(secondPromptLine);

                const commandElement2 = secondPromptLine.querySelector('#typing-command2');
                
                let commandCharIndex2 = 0;
                function typeCommand2() {
                    if (commandCharIndex2 < commandText2.length) {
                        commandElement2.textContent += commandText2.charAt(commandCharIndex2);
                        commandCharIndex2++;
                        setTimeout(typeCommand2, typingSpeed);
                    } else {
                        // Exibe a saída do segundo comando (sort)
                        const outputLine2 = document.createElement('div');
                        outputLine2.innerHTML = '<br>' + outputLines2.join('<br>');
                        outputElement.appendChild(outputLine2);
                        
                        const finalPromptLine = document.createElement('p');
                        finalPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
                        outputElement.appendChild(finalPromptLine);
                    }
                }
                typeCommand2();
            });
        });
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    startSequence();
});
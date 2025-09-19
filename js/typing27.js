document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "htop";
    
    // Saída que simula a tela do htop com cores (usando tags span)
    const outputLines = [
        "<span class='htop-info'>  Mem[</span><span class='htop-bar-green'>||||||||||</span><span class='htop-bar-yellow'>|||||</span><span class='htop-bar-red'>|||</span><span class='htop-info'>] 2.15G/7.80G</span>",
        "<span class='htop-info'>  Swp[</span><span class='htop-bar-blue'>|</span><span class='htop-bar-gray'>|||||||||||||||</span><span class='htop-info'>] 100M/2.00G</span>",
        "<span class='htop-info'>  CPU[</span><span class='htop-bar-green'>|</span><span class='htop-bar-yellow'>|</span><span class='htop-bar-red'>|</span><span class='htop-bar-gray'>||||||||||||||</span><span class='htop-info'>] 3.5%</span>",
        "<span class='htop-info'>  CPU[</span><span class='htop-bar-green'>||</span><span class='htop-bar-yellow'>|</span><span class='htop-bar-red'>|</span><span class='htop-bar-gray'>||||||||||||||</span><span class='htop-info'>] 4.2%</span>",
        "",
        "    PID USER       PRI  NI  VIRT   RES   SHR S CPU% MEM%  TIME+  Command",
        "   1234 user        20   0  1.2G  108M 45.0M S  5.5  1.3 0:15.20 /usr/lib/firefox/firefox",
        "   5678 root        20   0  1.0G   50M 20.0M S  2.1  0.6 0:05.10 /usr/sbin/httpd -DFOREGROUND",
        "   9101 user        20   0  250M   15M  8.0M S  0.7  0.2 0:02.45 gedit /home/user/documentos/notas.txt",
        "      1 root        20   0  164M   10M  5.0M S  0.0  0.1 0:01.32 /sbin/init",
        "   2525 user        20   0  350M   25M 12.0M S  0.0  0.3 0:00.89 /bin/bash",
        "",
        "<span class='htop-footer'>F1 Help  F2 Setup  F3 Search  F4 Filter  F5 Tree  F6 SortBy  F7 Nice-  F8 Nice+  F9 Kill  F10 Quit</span>"
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
            const outputLine = document.createElement('span');
            outputElement.appendChild(outputLine);
            
            const typeOutputLine = () => {
                const lineContent = outputLines[outputLineIndex];
                if (outputCharIndex < lineContent.length) {
                    if (lineContent.charAt(outputCharIndex) === '<') {
                        // Se for uma tag, pula para o final da tag para simular a renderização
                        const tagEnd = lineContent.indexOf('>', outputCharIndex) + 1;
                        outputLine.innerHTML += lineContent.substring(outputCharIndex, tagEnd);
                        outputCharIndex = tagEnd;
                        setTimeout(typeOutputLine, typingSpeed);
                    } else {
                        outputLine.innerHTML += lineContent.charAt(outputCharIndex);
                        outputCharIndex++;
                        setTimeout(typeOutputLine, typingSpeed);
                    }
                } else {
                    outputElement.innerHTML += '<br>';
                    outputCharIndex = 0;
                    outputLineIndex++;
                    setTimeout(typeOutput, lineBreakDelay);
                }
            };
            typeOutputLine();
        } else {
            // A simulação para aqui para manter a tela do htop.
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
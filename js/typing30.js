document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText1 = "zip archive.zip note.txt";
    const outputLines1 = [
        "  adding: note.txt (deflated 65%)"
    ];

    const commandText2 = "unzip archive.zip";
    const outputLines2 = [
        "Archive:  archive.zip",
        "  inflating: note.txt"
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

    function startZipSequence() {
        typeCommand(commandText1, () => {
            commandCharIndex = 0;
            outputLineIndex = 0;
            outputCharIndex = 0;
            typeOutput(outputLines1, startUnzipSequence);
        });
    }

    function startUnzipSequence() {
        const newPromptLine = document.createElement('p');
        newPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="typing-command2"></span><span id="blinking-bar2" class="blinking-cursor">|</span>';
        outputElement.appendChild(newPromptLine);
        const commandElement2 = newPromptLine.querySelector('#typing-command2');
        const blinkingBar2 = newPromptLine.querySelector('#blinking-bar2');
        blinkingBar2.style.display = 'none';
        
        let commandCharIndex2 = 0;
        let outputLineIndex2 = 0;
        let outputCharIndex2 = 0;

        function typeCommand2() {
            if (commandCharIndex2 < commandText2.length) {
                commandElement2.textContent += commandText2.charAt(commandCharIndex2);
                commandCharIndex2++;
                setTimeout(typeCommand2, typingSpeed);
            } else {
                blinkingBar2.style.display = 'inline';
                blinkingBar2.classList.add('blinking-cursor');
                setTimeout(typeOutput2, responseDelay);
            }
        }
        
        function typeOutput2() {
            if (outputLineIndex2 < outputLines2.length) {
                blinkingBar2.style.display = 'none';
                const outputLine = document.createElement('span');
                outputElement.appendChild(outputLine);
                
                const typeOutputLine = () => {
                    if (outputCharIndex2 < outputLines2[outputLineIndex2].length) {
                        outputLine.textContent += outputLines2[outputLineIndex2].charAt(outputCharIndex2);
                        outputCharIndex2++;
                        setTimeout(typeOutputLine, typingSpeed);
                    } else {
                        outputElement.innerHTML += '<br>';
                        outputCharIndex2 = 0;
                        outputLineIndex2++;
                        setTimeout(typeOutput2, lineBreakDelay);
                    }
                };
                typeOutputLine();
            } else {
                const finalPromptLine = document.createElement('p');
                finalPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
                outputElement.appendChild(finalPromptLine);
            }
        }
        typeCommand2();
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    startZipSequence();
});
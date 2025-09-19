document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "history";
    
    // Saída que simula o histórico de comandos
    const outputLines = [
        "  501  ls -l",
        "  502  cd Documents",
        "  503  mkdir new_project",
        "  504  cd new_project",
        "  505  touch index.html",
        "  506  git init",
        "  507  git add .",
        "  508  git commit -m \"Initial commit\"",
        "  509  ping google.com",
        "  510  history"
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
                if (outputCharIndex < outputLines[outputLineIndex].length) {
                    outputLine.textContent += outputLines[outputLineIndex].charAt(outputCharIndex);
                    outputCharIndex++;
                    setTimeout(typeOutputLine, typingSpeed);
                } else {
                    outputElement.innerHTML += '<br>';
                    outputCharIndex = 0;
                    outputLineIndex++;
                    setTimeout(typeOutput, lineBreakDelay);
                }
            };
            typeOutputLine();
        } else {
            const finalPromptLine = document.createElement('p');
            finalPromptLine.innerHTML = '<br><span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
            outputElement.appendChild(finalPromptLine);
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
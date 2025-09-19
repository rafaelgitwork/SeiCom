document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "man ls";
    
    // Saída que simula a página do manual do comando ls
    const outputLines = [
        "LS(1)                                     User Commands                                     LS(1)",
        "",
        "NAME",
        "       ls - list directory contents",
        "",
        "SYNOPSIS",
        "       ls [OPTION]... [FILE]...",
        "",
        "DESCRIPTION",
        "       List  information  about the FILEs (the current directory by default).",
        "       Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.",
        "",
        "       -a, --all",
        "              do not ignore entries starting with .",
        "",
        "       -l     use a long listing format",
        "",
        "       -t     sort by modification time, newest first",
        "",
        "       -h     with -l, print sizes in human readable format (e.g., 1K 234M 2G)",
        "",
        "Manual page ls(1) section 1"
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
            finalPromptLine.innerHTML = '<span id="final-cursor" class="blinking-cursor">_</span>';
            outputElement.appendChild(finalPromptLine);
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
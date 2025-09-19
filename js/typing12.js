document.addEventListener('DOMContentLoaded', () => {
    const commandElement = document.getElementById('typing-command');
    const outputElement = document.getElementById('typing-output');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    // Define o comando que será digitado
    const commandText = "find /home/ -name notes.txt";
    
    // Define o conteúdo que será exibido como saída do comando
    const outputLines = [
        "/home/username/Documents/notes.txt"
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const lineBreakDelay = 500;

    let commandCharIndex = 0;
    let outputLineIndex = 0;
    let outputCharIndex = 0;

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
            if (outputCharIndex < outputLines[outputLineIndex].length) {
                blinkingBar.style.display = 'none';
                outputElement.innerHTML += outputLines[outputLineIndex].charAt(outputCharIndex);
                outputCharIndex++;
                setTimeout(typeOutput, typingSpeed);
            } else {
                outputElement.innerHTML += '<br>';
                outputCharIndex = 0;
                outputLineIndex++;
                setTimeout(typeOutput, lineBreakDelay);
            }
        } else {
            finalCursor.style.display = 'inline';
            finalCursor.classList.add('blinking-cursor');
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
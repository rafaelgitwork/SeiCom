document.addEventListener('DOMContentLoaded', () => {
    const commandElement = document.getElementById('typing-command');
    const outputElement = document.getElementById('typing-output');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "ls -l";
    const outputLines = [
        "total 64",
        "drwxr-xr-x 2 user user 4096 Mar 22 10:30 Desktop/",
        "drwxr-xr-x 3 user user 4096 Mar 22 10:30 Documents/",
        "drwxr-xr-x 2 user user 4096 Mar 22 10:30 Downloads/",
        "-rw-r--r-- 1 user user  548 Mar 22 10:30 README.md",
        "-rw-r--r-- 1 user user 1523 Mar 22 10:30 notas.txt",
        "drwxr-xr-x 2 user user 4096 Mar 22 10:30 Pictures/",
        "-rwx------ 1 user user  120 Mar 22 10:30 run.sh"
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
            // Comando completo, mostra a barra piscando e espera
            blinkingBar.style.display = 'inline';
            blinkingBar.classList.add('blinking-cursor');
            setTimeout(typeOutput, responseDelay);
        }
    }

    function typeOutput() {
        if (outputLineIndex < outputLines.length) {
            if (outputCharIndex < outputLines[outputLineIndex].length) {
                // Esconde a barra piscando e começa a digitar a saída
                blinkingBar.style.display = 'none';
                outputElement.innerHTML += outputLines[outputLineIndex].charAt(outputCharIndex);
                outputCharIndex++;
                setTimeout(typeOutput, typingSpeed);
            } else {
                // Fim da linha, adiciona quebra de linha
                outputElement.innerHTML += '<br>';
                outputCharIndex = 0;
                outputLineIndex++;
                setTimeout(typeOutput, lineBreakDelay);
            }
        } else {
            // Fim de tudo, mostra o cursor final piscando
            finalCursor.style.display = 'inline';
            finalCursor.classList.add('blinking-cursor');
        }
    }

    // Esconde os cursores no início
    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
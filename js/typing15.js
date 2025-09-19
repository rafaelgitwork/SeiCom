document.addEventListener('DOMContentLoaded', () => {
    const commandElement = document.getElementById('typing-command');
    const outputElement = document.getElementById('typing-output');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    // Define o comando que será digitado
    const commandText = "df -h";
    
    // Define o conteúdo que será exibido como saída do comando
    const outputLines = [
        "Sist. Arq.          Tam. Usado Disp. Uso% Montado em",
        "tmpfs            781M  1.4M 779M   1% /run",
        "/dev/sda2        234G  25G  209G  11% /",
        "tmpfs            3.9G     0 3.9G   0% /dev/shm",
        "tmpfs            5.0M  4.0K 5.0M   1% /run/lock",
        "tmpfs            781M  100K 781M   1% /run/user/1000"
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
document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    const commandText = "top";
    
    // Saída que simula a tela do top
    const outputLines = [
        "top - 10:30:00 up 2 days,  5:15,  1 user,  load average: 0.20, 0.25, 0.30",
        "Tasks: 150 total,   1 running, 149 sleeping,   0 stopped,   0 zombie",
        "%Cpu(s):  5.5 us,  2.1 sy,  0.0 ni, 90.4 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st",
        "MiB Mem :   7992.5 total,   6124.0 free,   1250.5 used,    618.0 buff/cache",
        "MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   6500.0 avail Mem",
        "",
        "    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND",
        "   1234 user      20   0  1.2g   108m   45m S   5.5   1.3   0:15.20 firefox",
        "   5678 root      20   0  1.0g    50m   20m S   2.1   0.6   0:05.10 httpd",
        "   9101 user      20   0   250m    15m    8m S   0.7   0.2   0:02.45 gedit",
        "      1 root      20   0  164m     10m    5m S   0.0   0.1   0:01.32 systemd",
        "   2525 user      20   0   350m    25m   12m S   0.0   0.3   0:00.89 bash"
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const lineBreakDelay = 500;

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
            // Como o comando 'top' não retorna para o prompt, a simulação simplesmente para aqui.
            // O cursor final (finalCursor) não é mostrado para simular o comportamento de um terminal ocupado.
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.querySelector('.terminal-conteudo');
    const blinkingBar = document.getElementById('blinking-bar');
    const finalCursor = document.getElementById('final-cursor');

    // Comando a ser digitado
    const commandText = "ping google.com";
    
    // Saída que simula o ping, linha por linha
    const outputLines = [
        "PING google.com (142.251.129.138) 56(84) bytes of data.",
        "64 bytes from lhr48s24-in-f14.1e100.net (142.251.129.138): icmp_seq=1 ttl=115 time=12.3 ms",
        "64 bytes from lhr48s24-in-f14.1e100.net (142.251.129.138): icmp_seq=2 ttl=115 time=12.2 ms",
        "64 bytes from lhr48s24-in-f14.1e100.net (142.251.129.138): icmp_seq=3 ttl=115 time=12.5 ms",
        "64 bytes from lhr48s24-in-f14.1e100.net (142.251.129.138): icmp_seq=4 ttl=115 time=12.1 ms",
        "",
        "--- google.com ping statistics ---",
        "4 packets transmitted, 4 received, 0% packet loss, time 3004ms",
        "rtt min/avg/max/mdev = 12.123/12.275/12.500/0.150 ms"
    ];

    const typingSpeed = 5;
    const responseDelay = 1500;
    const pingDelay = 1000;
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
                    const nextDelay = outputLineIndex < 5 ? pingDelay : lineBreakDelay;
                    setTimeout(typeOutput, nextDelay);
                }
            };
            typeOutputLine();
        } else {
            const finalPromptLine = document.createElement('p');
            finalPromptLine.innerHTML = '<span class="terminal-prompt">user@linux:~$</span> <span id="final-cursor" class="blinking-cursor">_</span>';
            outputElement.appendChild(finalPromptLine);
        }
    }

    blinkingBar.style.display = 'none';
    finalCursor.style.display = 'none';

    typeCommand();
});
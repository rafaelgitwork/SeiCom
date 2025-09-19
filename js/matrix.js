const matrixBg = document.querySelector('.matrix-background');
const columns = 700; // Aumentado de 200 para 500 para maior densidade

function createMatrixRain() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?[]\\;\',./`~';

  for (let i = 0; i < columns; i++) {
    const span = document.createElement('span');
    
    span.innerText = characters.charAt(Math.floor(Math.random() * characters.length));
    
    // Posiciona o caractere aleatoriamente
    span.style.left = `${Math.random() * 100}vw`;
    span.style.animationDuration = `${Math.random() * 2 + 1}s`;
    span.style.animationDelay = `-${Math.random() * 5}s`;
    
    matrixBg.appendChild(span);
  }
}

createMatrixRain();
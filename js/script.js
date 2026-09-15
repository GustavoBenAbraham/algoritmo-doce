// Efeito de digitação estilo terminal
const text = "Brigadeiros gourmet artesanais.";
const speed = 75; // Velocidade em milissegundos por letra
let index = 0;

function typeWriter() {
    const element = document.getElementById("typing-text");
    if (element && index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Inicia a digitação quando a página carrega
window.onload = typeWriter;
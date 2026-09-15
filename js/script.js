// Efeito de digitação estilo terminal
const text = "Brigadeiros gourmet artesanais.";
const speed = 75;
let index = 0;

function typeWriter() {
    const element = document.getElementById("typing-text");
    if (element && index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Sistema de Toast de Notificação
function showToast(message) {
    const toast = document.getElementById("system-toast");
    if (toast) {
        toast.innerText = message;
        toast.classList.remove("hidden");
        setTimeout(() => {
            toast.classList.add("hidden");
        }, 3500);
    }
}

// Lógica do CLI Interativo
function initCLI() {
    const input = document.getElementById("cli-input");
    const output = document.getElementById("cli-output");

    if (!input || !output) return;

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const command = input.value.trim().toLowerCase();
            input.value = "";

            switch (command) {
                case "ajuda":
                case "help":
                    output.innerText = "Comandos: 'pedir', 'cupom', 'limpar', 'status'";
                    break;
                case "pedir":
                    output.innerText = "[SYSTEM]: Redirecionando para o WhatsApp...";
                    showToast("[SUCCESS]: Abrindo protocolo de atendimento via WhatsApp!");
                    setTimeout(() => {
                        window.open("https://wa.me/5511979865999?text=Olá!%20Vim%20pelo%20terminal!", "_blank");
                    }, 1000);
                    break;
                case "cupom":
                    output.innerText = "[CUPOM ENCONTRADO]: Use 'DEV10' para 10% de desconto na primeira caixinha!";
                    showToast("[PROMO]: Cupom DEV10 ativado!");
                    break;
                case "status":
                    output.innerText = "[STATUS]: Produção ativa | Modo Gourmet ON | Glicose 100%";
                    break;
                case "limpar":
                case "clear":
                    output.innerText = "Terminal pronto. Digite 'ajuda' para ver comandos.";
                    break;
                default:
                    output.innerText = `Comando desconhecido: '${command}'. Digite 'ajuda'.`;
            }
        }
    });
}

// Evento ao Clicar no Botão do WhatsApp
function initButtons() {
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener("click", () => {
            showToast("[SUCCESS]: Conectando ao WhatsApp do Dev Confeiteiro...");
        });
    }
}

// Inicializa todos os módulos ao carregar a página
window.onload = function () {
    typeWriter();
    initCLI();
    initButtons();
};
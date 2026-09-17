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

// Controle do Status "Ao Vivo" (Verifica horário de atendimento)
function checkStoreStatus() {
    const badge = document.getElementById("status-badge");
    const statusText = document.getElementById("status-text");

    if (!badge || !statusText) return;

    const now = new Date();
    const hour = now.getHours();

    // Atendimento configurado entre 09:00 e 21:00
    const isOpen = hour >= 9 && hour < 21;

    if (isOpen) {
        badge.className = "status-badge online";
        statusText.innerText = "ONLINE | Cozinha Rodando";
    } else {
        badge.className = "status-badge offline";
        statusText.innerText = "OFFLINE | Faça seu Agendamento";
    }
}

// Objeto de produtos do carrinho
const cart = {
    'brigadeiro': { name: 'Brigadeiro Gourmet', qty: 0, price: 5.00 },
    'pacoca': { name: 'Paçoca Gourmet', qty: 0, price: 5.00 },
    'beijinho': { name: 'Beijinho Gourmet', qty: 0, price: 5.00 },
    'bichoDePe': { name: 'Bicho de Pé Gourmet', qty: 0, price: 5.00 }
};

function changeQty(itemKey, delta) {
    if (cart[itemKey]) {
        cart[itemKey].qty = Math.max(0, cart[itemKey].qty + delta);
        
        const qtyDisplay = document.getElementById(`qty-${itemKey}`);
        if (qtyDisplay) {
            qtyDisplay.innerText = cart[itemKey].qty;
        }

        // Destaque sutil no card do produto selecionado
        const cardElement = document.getElementById(`card-${itemKey}`);
        if (cardElement) {
            if (cart[itemKey].qty > 0) {
                cardElement.classList.add("has-items");
            } else {
                cardElement.classList.remove("has-items");
            }
        }

        updateCartTotal();
    }
}

function updateCartTotal() {
    let total = 0;
    for (const key in cart) {
        total += cart[key].qty * cart[key].price;
    }
    const totalDisplay = document.getElementById("cart-total");
    if (totalDisplay) {
        totalDisplay.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function sendOrder() {
    let orderSummary = "";
    let total = 0;

    for (const key in cart) {
        if (cart[key].qty > 0) {
            const itemTotal = cart[key].qty * cart[key].price;
            total += itemTotal;
            orderSummary += `• ${cart[key].qty}x ${cart[key].name} (R$ ${itemTotal.toFixed(2).replace('.', ',')})\n`;
        }
    }

    const paymentSelect = document.getElementById("payment-method");
    const paymentMethod = paymentSelect ? paymentSelect.value : "Pix";
    let message = "";

    if (total > 0) {
        message = `*--- NOVO PEDIDO: ALGORITMO DOCE ---*\n\n` +
                  `*ITENS DO PEDIDO:*\n${orderSummary}\n` +
                  `*VALOR TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n` +
                  `*FORMA DE PAGAMENTO:* ${paymentMethod}\n\n` +
                  `_Aguardando confirmação para preparo!_`;
    } else {
        message = `Olá! Gostaria de fazer um pedido na Algoritmo Doce! 🍫`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511979865999?text=${encodedMessage}`;

    window.location.href = whatsappUrl;
}

// Toast System
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

// Console CLI Interativo
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
                    sendOrder();
                    break;
                case "cupom":
                    output.innerText = "[CUPOM ENCONTRADO]: Use 'DEV10' no WhatsApp para 10% de desconto!";
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

window.onload = function () {
    typeWriter();
    checkStoreStatus();
    initCLI();
};
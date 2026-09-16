// ==========================================
// ALGORITMO DOCE - SCRIPT PRINCIPAL (v1.8.0)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    checkStoreStatus();
    initCLI();
});

// 1. VERIFICAÇÃO AUTOMÁTICA DE HORÁRIO (09:00 - 21:00)
function checkStoreStatus() {
    const statusTag = document.getElementById("store-status");
    if (!statusTag) return;

    const now = new Date();
    const hour = now.getHours();

    // Aberto entre 09:00 e 20:59
    const isOpen = hour >= 9 && hour < 21;

    if (isOpen) {
        statusTag.className = "status-badge online";
        statusTag.innerHTML = `<span class="status-dot"></span> 🟢 ONLINE | Cozinha Rodando`;
    } else {
        statusTag.className = "status-badge offline";
        statusTag.innerHTML = `<span class="status-dot"></span> 🟡 OFFLINE | Faça seu Agendamento`;
    }
}

// 2. CONTROLE DE QUANTIDADE DOS DOCES
function updateQuantity(id, change) {
    const qtySpan = document.getElementById(`qty-${id}`);
    if (!qtySpan) return;

    let currentQty = parseInt(qtySpan.innerText) || 0;
    currentQty += change;

    if (currentQty < 0) currentQty = 0;
    qtySpan.innerText = currentQty;

    // Destaca o card visualmente se tiver itens selecionados
    const card = qtySpan.closest('.product-card');
    if (card) {
        if (currentQty > 0) {
            card.classList.add('has-items');
        } else {
            card.classList.remove('has-items');
        }
    }

    calculateTotal();
}

// 3. CÁLCULO DO TOTAL DO PEDIDO
function calculateTotal() {
    const products = document.querySelectorAll('.product-card');
    let total = 0;

    products.forEach(card => {
        const priceText = card.querySelector('.price')?.innerText || "R$ 0";
        const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
        const qty = parseInt(card.querySelector('.qty-val')?.innerText) || 0;

        total += price * qty;
    });

    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.innerText = total.toFixed(2).replace('.', ',');
    }
}

// 4. ENVIO DO PEDIDO PARA O WHATSAPP
function sendOrder() {
    const products = document.querySelectorAll('.product-card');
    let itemsList = [];
    let total = 0;

    products.forEach(card => {
        const name = card.querySelector('h3')?.innerText || "Doce";
        const qty = parseInt(card.querySelector('.qty-val')?.innerText) || 0;
        const priceText = card.querySelector('.price')?.innerText || "R$ 0";
        const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());

        if (qty > 0) {
            itemsList.push(`• ${qty}x ${name} (R$ ${(price * qty).toFixed(2)})`);
            total += price * qty;
        }
    });

    if (itemsList.length === 0) {
        alert("Seu carrinho está vazio! Selecione pelo menos um doce antes de fazer o checkout.");
        return;
    }

    const phone = "5511999999999"; // Substitua pelo seu número real com DDD
    let message = `*--- [ NOVO PEDIDO: ALGORITMO DOCE ] ---*\n\n`;
    message += `*ITENS SOLICITADOS:*\n${itemsList.join('\n')}\n\n`;
    message += `*TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += `Aguardando confirmação de disponibilidade e taxa de entrega!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
}

// 5. TERMINAL INTERATIVO (CLI)
function initCLI() {
    const input = document.getElementById("cli-input");
    const output = document.getElementById("cli-output");

    if (!input || !output) return;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = input.value.trim().toLowerCase();
            input.value = "";

            switch (command) {
                case "help":
                case "ajuda":
                    output.innerText = "[HELP]: Comandos disponíveis: cardapio, ingredientes, faq, total, limpar, contato";
                    break;
                case "cardapio":
                    output.innerText = "[CARDÁPIO]: Brigadeiro, Paçoca, Beijinho e Bicho de Pé disponíveis no catálogo acima!";
                    break;
                case "ingredientes":
                    output.innerText = "[INGREDIENTES]: Usamos ingredientes nobres, cacau 50%, leite condensado e paçoca artesanal!";
                    break;
                case "faq":
                    output.innerText = "[FAQ]: Validade de 5 dias | Entregas via delivery/retirada | Aceitamos encomendas!";
                    break;
                case "total":
                    const totalVal = document.getElementById("total-price")?.innerText || "0,00";
                    output.innerText = `[TOTAL ATUAL]: R$ ${totalVal}`;
                    break;
                case "limpar":
                case "clear":
                    output.innerText = "Aguardando comando... (digite 'help')";
                    break;
                case "contato":
                    output.innerText = "[CONTATO]: Chama no WhatsApp pelo botão de checkout ou via Instagram @algoritmodoce.java";
                    break;
                case "sudo pedir tudo":
                    document.querySelectorAll('.qty-val').forEach(el => el.innerText = "1");
                    calculateTotal();
                    output.innerText = "[EASTER EGG]: 1 de cada doce adicionado ao carrinho com sucesso!";
                    break;
                default:
                    output.innerText = `[ERR 404]: Comando '${command}' não reconhecido. Digite 'help' para ver as opções.`;
            }
        }
    });
}
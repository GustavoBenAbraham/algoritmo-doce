// Efeito de digitação estilo terminal
function typeWriter() {
    const text = "Brigadeiros gourmet artesanais.";
    const speed = 75;
    let index = 0;
    const element = document.getElementById("typing-text");

    function type() {
        if (element && index < text.length) {
            element.textContent += text.charAt(index++);
            setTimeout(type, speed);
        }
    }

    type();
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

// Console CLI Interativo (Corrigido)
function initCLI() {
    const input = document.getElementById("cli-input");
    const output = document.getElementById("cli-output");

    if (!input || !output) return;

    input.addEventListener("keydown", function (e) {
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
                    showToast("Cupom DEV10 aplicado! (Simulação)");
                    output.innerText = "Cupom DEV10 ativo!";
                    break;
                case "limpar":
                    output.innerText = "Terminal pronto. Digite 'ajuda' para ver comandos.";
                    break;
                case "status":
                    const now = new Date();
                    output.innerText = `Horário atual: ${now.toLocaleTimeString('pt-BR')}`;
                    break;
                default:
                    output.innerText = `Comando '${command}' não encontrado. Digite 'ajuda'.`;
            }
        }
    });
}

function initCandyRain() {
    const canvas = document.getElementById("candy-rain");
    const context = canvas ? canvas.getContext("2d") : null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canvas || !context) return;

    const candies = ["🍬", "🍫", "🍭", "🧁", "🍩", "🍪"];
    const particles = [];
    const animationFactor = reduceMotion ? 0.6 : 1.2;
    let animationFrame;
    let isAnimating = false;
    let lastTime = 0;

    function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        particles.length = 0;
        const minimumParticles = reduceMotion ? 8 : 12;
        const particleCount = Math.min(32, Math.max(minimumParticles, Math.round(window.innerWidth / 32)));

        for (let index = 0; index < particleCount; index++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speed: 24 + Math.random() * 34,
                drift: (Math.random() - 0.5) * 12,
                size: 14 + Math.random() * 8,
                emoji: candies[Math.floor(Math.random() * candies.length)]
            });
        }
    }

    function renderParticles() {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const particle of particles) {
            context.font = `${particle.size}px serif`;
            context.fillText(particle.emoji, particle.x, particle.y);
        }
    }

    function animate(time) {
        const delta = Math.min((time - lastTime) / 1000 || 0, 0.05);
        lastTime = time;

        for (const particle of particles) {
            particle.y += particle.speed * delta * animationFactor;
            particle.x += particle.drift * delta * animationFactor;

            if (particle.y > window.innerHeight + particle.size) {
                particle.y = -particle.size;
                particle.x = Math.random() * window.innerWidth;
            }

            if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size;
            if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size;
        }

        renderParticles();

        animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        lastTime = 0;
        animationFrame = window.requestAnimationFrame(animate);
    }

    function stopAnimation() {
        if (!isAnimating) return;
        isAnimating = false;
        window.cancelAnimationFrame(animationFrame);
        lastTime = 0;
    }

    resizeCanvas();
    window.addEventListener("resize", () => {
        resizeCanvas();
        if (reduceMotion) renderParticles();
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAnimation();
        } else {
            startAnimation();
        }
    });

    startAnimation();
}

// Inicialização das funções ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
    checkStoreStatus();
    setInterval(checkStoreStatus, 60000);
    initCLI();
    initCandyRain();
});
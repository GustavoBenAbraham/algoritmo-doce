# 🍫 ALGORITMO DOCE | Terminal & Confeitaria Gourmet

> *"Compilando açúcar, paixão e código em brigadeiros artesanais."*

![Versão](https://img.shields.io/badge/version-v1.7.0-d2a8d9?style=for-the-badge)
![Status](https://img.shields.io/badge/status-ativo-3fb950?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-58a6ff?style=for-the-badge)

O **Algoritmo Doce** é uma plataforma/link-tree funcional desenvolvida com estética **Terminal/IDE**. O projeto atua como o menu oficial da marca e como portfólio de desenvolvimento Web Front-End.

💻 **Acesse o projeto online:** [gustavobenabraham.github.io/algoritmo-doce](https://gustavobenabraham.github.io/algoritmo-doce/)

---

## 🚀 Funcionalidades & Destaques

- **Estética Hacker/Dev:** Visual inspirados em IDEs de programação (dark mode, monospace typography, terminal header).
- **Interactive CLI (Terminal Simulado):** Console interativo no rodapé que aceita comandos em tempo real (`ajuda`, `pedir`, `cupom`, `status`).
- **Log System (Toast Notifications):** Alertas pop-up estilizados simulando logs de execução do sistema (`[SUCCESS]`, `[PROMO]`).
- **Efeito Typewriter:** Animação via JavaScript que simula digitação automática na linha de comando.
- **Catálogo 2x2 Responsivo:** Exibição dos produtos via CSS Grid com tratamento *fallback* de imagens.
- **Seção "Sobre Nós":** Trajetória do fundador unindo o estudo de programação ao empreendedorismo gourmet.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e acessível.
- **CSS3:** Flexbox, CSS Grid, variáveis nativas (`:root`), animações (`@keyframes`) e responsividade mobile-first.
- **JavaScript (Vanilla):** Manipulação de DOM, escutadores de eventos (`keyup`/`click`), loops de digitação e CLI customizado.
- **Git & GitHub Pages:** Versionamento de código e deploy automatizado via CI/CD nativo.

---

## 💻 Comandos Disponíveis no Terminal CLI

Você pode interagir diretamente com o console da página digitando os seguintes comandos:

| Comando | Ação |
| :--- | :--- |
| `ajuda` | Lista todos os comandos disponíveis no sistema. |
| `pedir` | Notifica o sistema e abre o WhatsApp comercial. |
| `cupom` | Revela o cupom de desconto exclusivo para devs. |
| `status` | Exibe o status da produção e métricas atuais. |
| `limpar` | Reseta a tela do terminal. |

---

## 📂 Estrutura do Repositório

```text
algoritmo-doce/
├── index.html          # Estrutura principal
├── css/
│   └── style.css       # Estilização completa e temas
├── js/
│   └── script.js       # Lógica do Typewriter, Toast e CLI
└── assets/             # Imagens dos produtos e avatar

# Portfolio - Bernardo Franceschina

Bem-vindo ao repositório do meu portfólio pessoal. Este projeto não é apenas uma vitrine dos meus trabalhos, mas também uma demonstração prática das tecnologias que domino e da minha filosofia de desenvolvimento: unir a robustez da engenharia de software com a elegância do design.

🔗 **Veja online:** [franceschina.dev](https://franceschina.dev/)

## 👨‍💻 Sobre o Projeto

Desenvolvi este site com o objetivo de criar uma experiência imersiva para apresentar meus casos de estudo mais complexos. Ao contrário de um currículo estático, queria algo que demonstrasse movimento, interatividade e atenção aos detalhes.

A aplicação é uma **SPA (Single Page Application)** construída com uma arquitetura moderna, focada em performance e UX. Implementei suporte nativo a internacionalização (i18n), permitindo que todo o conteúdo seja consumido em Português ou Inglês sem recarregamentos de página.

## 🛠️ Minha Stack Tecnológica

Para este projeto, escolhi ferramentas que me permitem entregar alta performance e uma excelente experiência de desenvolvimento (DX):

* **Core:**
    * **[Nuxt 4](https://nuxt.com/)**: Utilizei a versão mais recente para aproveitar o *rendering* híbrido e a organização estruturada.
    * **[Vue 3](https://vuejs.org/)**: Com Composition API e TypeScript para um código modular e tipado.
* **Interface & Design:**
    * **[Tailwind CSS](https://tailwindcss.com/)**: Para estilização rápida e consistente, mantendo o design system coeso.
    * **Tipografia:** Escolhi as fontes *Fraunces* (serif) e *Inter* (sans) para criar um contraste elegante entre o editorial e o técnico.
    * **Animações:** Implementei transições suaves de página e micro-interações usando CSS transitions e o sistema de transição do Vue.
* **Funcionalidades:**
    * **i18n:** Configurei o `@nuxtjs/i18n` com detecção de idioma e rotas prefixadas (`/` e `/en`).
    * **Imagens:** Otimização automática com `@nuxt/image`.
    * **Ícones:** Uso do `@nuxt/icon` com Iconify para carregar apenas os ícones necessários.

## 📂 O Que Você Vai Encontrar Aqui

Organizei o código seguindo as melhores práticas do Nuxt:

* **`app/components`**: Meus componentes reutilizáveis. Destaque para o `ProjectStack.vue` (a lista interativa dos projetos) e o `ProjectModal.vue` (que carrega os detalhes e diagramas de arquitetura).
* **`app/pages`**: A estrutura de roteamento da aplicação.
* **`a/i18n/locales`**: Onde mantenho os arquivos de tradução (`pt.json` e `en.json`), garantindo que a cópia seja fácil de manter e escalar.
* **`public`**: Ativos estáticos, incluindo os diagramas de arquitetura que desenhei para cada projeto.

## 🚀 Como Executar Localmente

Se você quiser clonar e rodar este projeto na sua máquina:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/bernardofranceschina/portfolio.git](https://github.com/bernardofranceschina/portfolio.git)
    cd portfolio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará disponível em `http://localhost:3000`.

## 📬 Contato

Estou sempre aberto a conversar sobre tecnologia, arquitetura de software ou novas oportunidades.

* **Email:** [bernardofranceschina@gmail.com](mailto:bernardofranceschina@gmail.com)
* **LinkedIn:** [linkedin.com/in/bernardo-franceschina](https://linkedin.com/in/bernardo-franceschina/)
* **GitHub:** [github.com/bernardofranceschina](https://github.com/bernardofranceschina)

---
*© 2026 Bernardo Franceschina. Feito com Nuxt e Tailwind.*
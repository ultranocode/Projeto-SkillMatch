# SkillMatch JS

## 📌 Sobre o projeto

O **SkillMatch JS** é um simulador de compatibilidade entre candidatos e vagas de front-end júnior desenvolvido em JavaScript puro. O sistema compara as habilidades de cada candidato com os requisitos das vagas disponíveis e gera uma análise completa com ranking, classificação e recomendações de estudo.

---

## 🎯 Objetivo

Praticar os principais conceitos do Módulo 01 do curso de Programação Front-End React, desenvolvendo um projeto funcional usando apenas JavaScript — sem HTML, CSS ou frameworks.

---

## ⚙️ Funcionalidades

- Comparação de habilidades dos candidatos com os requisitos de cada vaga
- Cálculo do percentual de compatibilidade
- Classificação em **Alta**, **Média** ou **Baixa** compatibilidade
- Listagem de habilidades compatíveis e faltantes por candidato
- Identificação da melhor vaga para cada candidato
- Recomendação de estudo com base nas habilidades faltantes
- Simulação de carregamento de vagas via Promise (como se viessem de um servidor)
- Contador de análises realizadas na sessão

---

## 🧠 Conceitos utilizados

| Conceito | Como foi aplicado |
|---|---|
| Lógica de programação | Cálculo de percentual de compatibilidade |
| Tipos de dados | Strings, números, arrays, objetos e booleanos |
| Objetos | Candidatos e vagas representados como objetos |
| Arrays | Lista de candidatos e de vagas |
| `const` e `let` | `const` para valores fixos, `let` dentro de closures |
| `if / else` | Classificação do percentual (Alta, Média, Baixa) |
| Operadores lógicos e matemáticos | Cálculo de percentual e comparações |
| `for...of` | Coleta de habilidades faltantes em todas as vagas |
| Funções | Separação das regras em funções específicas |
| Arrow functions | Usadas nos métodos de array |
| `.map()` | Gerar ranking e normalizar textos |
| `.filter()` | Encontrar habilidades compatíveis e faltantes |
| `.find()` | Buscar vaga pelo ID escolhido |
| `.reduce()` | Encontrar a vaga com maior compatibilidade |
| Classes | `class Vaga` com construtor e método |
| Herança | `class VagaFrontEnd extends Vaga` |
| `this` | Usado nos métodos `exibirResumo()` e `exibirNivel()` |
| Callback | `finalizarAnalise()` recebe `exibirMensagemFinal` como parâmetro |
| Closure | `criarContadorDeAnalises()` lembra o valor de `total` entre chamadas |
| Promise | `buscarVagasSimuladas()` simula resposta de um servidor |
| Async/Await | `iniciarSistema()` aguarda o carregamento das vagas |

---

## 🌐 Como a internet funciona

A internet é uma rede global de computadores que se comunicam por meio de protocolos. Quando você acessa um site, seu navegador (cliente) envia uma requisição a um servidor, que processa e devolve uma resposta — geralmente em HTML, CSS e JavaScript.

---

## 🖥️ Arquitetura cliente-servidor

No modelo cliente-servidor, o **cliente** (navegador) solicita dados e o **servidor** os processa e responde. No SkillMatch JS, essa arquitetura é simulada pela função `buscarVagasSimuladas()`, que usa uma **Promise** com `setTimeout` para imitar o tempo de resposta de uma API real — como se as vagas fossem buscadas de um banco de dados remoto.

---

## 🚀 Como executar

Este projeto não precisa de Node.js nem de instalação. Você pode executar de duas formas:

**Opção 1 — Live Server (VS Code):**
1. Abra a pasta do projeto no VS Code
2. Clique com o botão direito no arquivo `index.html`
3. Selecione **"Open with Live Server"**
4. No navegador, pressione **F12** para abrir o DevTools
5. Acesse a aba **Console**
6. Digite o ID da vaga quando solicitado e pressione Enter

**Opção 2 — Navegador direto:**
1. Dê duplo clique no arquivo `index.html`
2. Pressione **F12** para abrir o DevTools
3. Acesse a aba **Console**
4. Digite o ID da vaga quando solicitado e pressione Enter

---

## 🗂️ Estrutura do projeto

```
skillmatch-js/
│
├── skillmatch.js
├── index.html
└── README.md
```

---

## 📋 Organização do projeto (Kanban)

O projeto foi organizado com um quadro Kanban no **Trello**, com as colunas: Backlog, A Fazer, Em Andamento e Concluído.

🔗 [Acessar quadro no Trello](https://trello.com/b/jze1XAxr/projeto-skillmatch)

---

## 🧩 Extensões utilizadas

| Extensão | Finalidade |
|---|---|
| Live Server | Servidor local para rodar o projeto no navegador automaticamente |

---

## 📦 Variáveis: var, let e const

- **`const`** — usado para valores que não mudam, como os arrays de candidatos e vagas e as funções
- **`let`** — usado dentro de closures onde o valor precisa ser atualizado entre chamadas
- **`var`** — não foi utilizado no projeto. É uma forma mais antiga de declarar variáveis em JavaScript, com escopo de função (não de bloco), o que pode causar comportamentos inesperados. Por isso, as boas práticas atuais recomendam sempre usar `const` ou `let`

---

## 👨‍💻 Autor

Diego da Costa
Desenvolvido como Mini-Projeto Avaliativo do Módulo 01 — Semana 06  
Curso de Programação Front-End React — Turma T2

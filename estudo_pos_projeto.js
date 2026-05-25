// ======================================================
// SKILLMATCH JS - Simulador de Compatibilidade com Vaga
// ======================================================
//
// O QUE É JAVASCRIPT?
// JavaScript é uma linguagem de programação que roda no navegador.
// Ela permite criar comportamentos dinâmicos nas páginas web —
// como calcular valores, manipular dados e responder a ações do usuário.
//
// COMO ESSE ARQUIVO FUNCIONA?
// Todo o código aqui é executado de cima para baixo, linha por linha.
// Primeiro definimos as "ferramentas" (classes e funções),
// depois os "dados" (candidatos e vagas),
// e por último chamamos a função que inicia tudo: iniciarSistema().
// ======================================================




// ======================================================
// RF09 – CLASSES (Programação Orientada a Objetos)
// ======================================================
//
// O QUE É UMA CLASSE?
// Uma classe é um "molde" para criar objetos.
// Assim como uma planta de uma casa define como cada casa será construída,
// uma classe define como cada objeto será criado.
//
// ANALOGIA:
// Classe = receita de bolo
// Objeto = o bolo pronto feito a partir da receita
//
// SINTAXE:
// class NomeDaClasse {
//   constructor(parametro1, parametro2) {  ← chamado automaticamente ao criar o objeto
//     this.propriedade = parametro1;       ← "this" = o próprio objeto sendo criado
//   }
// }
// ======================================================

class Vaga {

  // O "constructor" é um método especial que roda automaticamente
  // toda vez que criamos uma nova vaga com "new Vaga(...)".
  // Os parâmetros recebidos aqui são os dados que definem cada vaga.

  constructor(id, empresa, cargo, requisitos, salario, modalidade) {

    // RF11 – USO DO "this"
    // "this" representa o objeto que está sendo criado naquele momento.
    // Quando escrevemos "this.id = id", estamos dizendo:
    // "guarda o valor do parâmetro 'id' dentro deste objeto, com o nome 'id'".
    // Sem o "this", a variável existiria apenas dentro do constructor e seria perdida.

    this.id         = id;
    this.empresa    = empresa;
    this.cargo      = cargo;
    this.requisitos = requisitos;   // array de strings com as habilidades exigidas
    this.salario    = salario;
    this.modalidade = modalidade;
  }


  // MÉTODOS DE CLASSE
  // Métodos são funções que pertencem à classe.
  // Eles têm acesso ao "this", ou seja, podem ler os dados do próprio objeto.
  // Para chamar: minhaVaga.exibirResumo()

  exibirResumo() {
    // Template literal (acento grave `) permite misturar texto com variáveis
    // usando ${} para inserir o valor de cada propriedade do objeto.
    // "this.cargo" acessa o cargo DO OBJETO que chamou este método.
    return `${this.cargo} na empresa ${this.empresa} | R$ ${this.salario} | ${this.modalidade}`;
  }
}




// ======================================================
// RF10 – HERANÇA
// ======================================================
//
// O QUE É HERANÇA?
// Herança permite criar uma classe nova baseada em uma existente.
// A classe filha herda todas as propriedades e métodos da classe pai,
// e pode adicionar ou sobrescrever o que precisar.
//
// ANALOGIA:
// Classe pai  = Veículo  (tem rodas, motor, direção)
// Classe filha = Carro  (herda tudo de Veículo e adiciona porta-malas, air bag)
//
// SINTAXE:
// class ClasseFilha extends ClassePai { ... }
// ======================================================

class VagaFrontEnd extends Vaga {

  // O constructor da classe filha recebe TODOS os parâmetros:
  // os que vai passar para o pai + os seus próprios (nivel).

  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {

    // "super()" chama o constructor da classe pai (Vaga).
    // É obrigatório chamar super() antes de usar "this" em uma classe filha.
    // Passamos todos os parâmetros que a classe pai precisa.

    super(id, empresa, cargo, requisitos, salario, modalidade);

    // Depois do super(), adicionamos a propriedade exclusiva de VagaFrontEnd.
    this.nivel = nivel;   // ex: "Júnior", "Estágio"
  }

  // Método exclusivo de VagaFrontEnd — a classe pai (Vaga) não tem esse método.
  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
}




// ======================================================
// RF01 – CANDIDATOS
// ======================================================
//
// O QUE É UM ARRAY?
// Um array é uma lista ordenada de itens, criada com colchetes [].
// Cada item ocupa uma posição (índice), começando em 0.
// Ex: candidatos[0] acessa o primeiro candidato (Juliana).
//
// O QUE É UM OBJETO?
// Um objeto agrupa informações relacionadas em pares de chave: valor.
// Ex: { nome: "Juliana", area: "UX/UI Design" }
// Aqui temos um array de objetos — cada item da lista É um objeto.
//
// POR QUE CONST?
// Usamos "const" porque o array candidatos em si não será substituído.
// Podemos alterar seu conteúdo, mas a variável sempre apontará para este array.
// ======================================================

const candidatos = [
  {
    id: 1,
    nome: "Juliana",
    area: "UX/UI Design",
    habilidades: ["Figma", "Prototipação", "Design Responsivo", "Canva"],  // array dentro do objeto
    experienciaMeses: 5
  },
  {
    id: 2,
    nome: "Marcos",
    area: "Full Stack",
    habilidades: ["JavaScript", "React", "Node.js", "MongoDB"],
    experienciaMeses: 12
  },
  {
    id: 3,
    nome: "Bruno",
    area: "Front-End",
    habilidades: ["HTML", "CSS", "JavaScript", "React"],
    experienciaMeses: 4
  },
  {
    id: 4,
    nome: "Camila",
    area: "Front-End",
    habilidades: ["Vue.js", "Git", "Responsividade", "Bootstrap"],
    experienciaMeses: 7
  },
  {
    id: 5,
    nome: "Rafael",
    area: "Front-End",
    habilidades: ["JavaScript", "TypeScript", "React", "Figma"],
    experienciaMeses: 10
  },
  {
    id: 6,
    nome: "Larissa",
    area: "Front-End",
    habilidades: ["HTML", "CSS", "Sass", "Kanban"],
    experienciaMeses: 5
  },
  {
    id: 7,
    nome: "Eduardo",
    area: "Front-End",
    habilidades: ["Next.js", "Tailwind CSS", "GitHub", "API REST"],
    experienciaMeses: 9
  }
];




// ======================================================
// RF02 – VAGAS (usando as classes VagaFrontEnd)
// ======================================================
//
// COMO CRIAR UM OBJETO A PARTIR DE UMA CLASSE?
// Usamos a palavra-chave "new" seguida do nome da classe e os parâmetros.
// O "new" cria um novo objeto usando o molde da classe,
// chama o constructor automaticamente, e retorna o objeto pronto.
//
// ANTES (objeto simples):
// { id: 1, empresa: "PixelTech", ... }
//
// AGORA (objeto criado pela classe):
// new VagaFrontEnd(1, "PixelTech", ...)
//
// A diferença: agora cada vaga também possui os MÉTODOS da classe,
// como exibirResumo() e exibirNivel().
// ======================================================

const vagas = [
  new VagaFrontEnd(1, "PixelTech",   "Desenvolvedor Front-End Júnior", ["HTML", "CSS", "JavaScript", "Git"],                  2800, "Remoto",     "Júnior"),
  new VagaFrontEnd(2, "NovaWeb",     "Front-End Developer Júnior",     ["React", "JavaScript", "Responsividade", "GitHub"],   3200, "Híbrido",    "Júnior"),
  new VagaFrontEnd(3, "DevHouse",    "Programador Front-End",          ["HTML", "CSS", "Bootstrap", "Lógica de Programação"], 2500, "Presencial", "Júnior"),
  new VagaFrontEnd(4, "SoftVision",  "Desenvolvedor React Júnior",     ["React", "API REST", "JavaScript", "Git"],            3500, "Remoto",     "Júnior"),
  new VagaFrontEnd(5, "CodeFactory", "Estágio Front-End",              ["HTML", "CSS", "JavaScript", "Kanban"],               1800, "Híbrido",    "Estágio")
];




// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================
//
// O QUE É UMA FUNÇÃO?
// Uma função é um bloco de código com nome próprio que executa uma tarefa.
// Você a define uma vez e pode chamá-la quantas vezes quiser.
// Isso evita repetição de código (princípio DRY: Don't Repeat Yourself).
//
// SINTAXE BÁSICA:
// function nomeDaFuncao(parametro) {
//   // código que executa a tarefa
//   return resultado;   ← devolve um valor para quem chamou a função
// }
// ======================================================


// ------------------------------------------------------
// FUNÇÃO: normalizarTexto
// ------------------------------------------------------
// Por que normalizar?
// "JavaScript" e "javascript" são strings diferentes para o computador.
// Para comparar habilidades com requisitos sem errar por causa de maiúsculas,
// convertemos tudo para minúsculas e removemos espaços acidentais nas bordas.
//
// toLowerCase() → converte para minúsculas: "React" vira "react"
// trim()        → remove espaços extras: "  react  " vira "react"
// ------------------------------------------------------

function normalizarTexto(texto) {
  return texto.toLowerCase().trim();
}




// ------------------------------------------------------
// RF04 – FUNÇÃO: classificarPercentual
// ------------------------------------------------------
// Recebe um número (percentual) e retorna uma string com a classificação.
//
// ESTRUTURA IF / ELSE IF / ELSE:
// O JavaScript testa as condições de cima para baixo.
// Assim que encontra uma verdadeira, executa aquele bloco e para.
// O "else" no final é o caso padrão — executado quando nenhuma condição anterior for verdadeira.
//
// FAIXAS DEFINIDAS:
// >= 80%  → Alta compatibilidade  🟢
// >= 50%  → Média compatibilidade 🟡
// < 50%   → Baixa compatibilidade 🔴
// ------------------------------------------------------

function classificarPercentual(percentual) {
  if (percentual >= 80) {
    return "🟢 Alta compatibilidade";
  } else if (percentual >= 50) {
    return "🟡 Média compatibilidade";
  } else {
    return "🔴 Baixa compatibilidade";
  }
}




// ------------------------------------------------------
// RF03 – FUNÇÃO: calcularCompatibilidade
// ------------------------------------------------------
// Compara as habilidades de UM candidato com os requisitos de UMA vaga
// e retorna um objeto com o percentual e as listas de habilidades.
//
// PARÂMETROS:
// candidato → objeto com as habilidades do candidato
// vaga      → objeto com os requisitos da vaga
//
// RETORNO:
// Um objeto com três propriedades:
// { percentual, habilidadesEncontradas, habilidadesFaltantes }
// ------------------------------------------------------

function calcularCompatibilidade(candidato, vaga) {

  // RF08 – MÉTODO .map()
  // .map() percorre cada item de um array e transforma usando uma função.
  // Retorna um NOVO array com os itens transformados (o original não muda).
  //
  // ANALOGIA: Imagine uma linha de produção que pega laranjas (array original)
  // e espreme cada uma, devolvendo uma linha de copos de suco (novo array).
  //
  // Aqui usamos .map() para normalizar cada habilidade/requisito:
  // ["React", "JavaScript"] → ["react", "javascript"]

  const habilidadesNorm = candidato.habilidades.map(h => normalizarTexto(h));
  const requisitosNorm  = vaga.requisitos.map(r => normalizarTexto(r));


  // RF08 – MÉTODO .filter()
  // .filter() percorre cada item de um array e mantém apenas os que passam no teste.
  // Retorna um NOVO array com os itens que retornaram "true" na função de teste.
  //
  // ANALOGIA: Um peneira que deixa passar apenas o que satisfaz uma condição.
  //
  // Aqui filtramos os requisitos da vaga que o candidato POSSUI:
  // Para cada requisito (req), verificamos se ele está no array de habilidades do candidato
  // usando .includes() — que retorna true se o item existir no array.

  const habilidadesEncontradas = requisitosNorm.filter(req =>
    habilidadesNorm.includes(req)
  );


  // RF05 – Habilidades faltantes
  // Mesmo raciocínio do filter acima, mas com negação (!):
  // Mantém apenas os requisitos que NÃO estão nas habilidades do candidato.
  // O "!" inverte o resultado: se .includes() retornar false, o "!" vira true
  // e o item é mantido no array filtrado.

  const habilidadesFaltantes = requisitosNorm.filter(req =>
    !habilidadesNorm.includes(req)
  );


  // CÁLCULO DO PERCENTUAL
  // Operador ternário: condição ? valor_se_verdadeiro : valor_se_falso
  // É um if/else compacto em uma linha.
  //
  // Verificamos primeiro se existem requisitos (length > 0)
  // para evitar divisão por zero (erro matemático).
  //
  // Fórmula: (habilidades que o candidato tem ÷ total de requisitos) × 100
  // Ex: 3 de 4 requisitos = (3/4) × 100 = 75%

  const percentual = requisitosNorm.length > 0
    ? (habilidadesEncontradas.length / requisitosNorm.length) * 100
    : 0;


  // RETORNO DA FUNÇÃO
  // Retornamos um objeto com os três resultados calculados.
  // Sintaxe abreviada: quando chave e variável têm o mesmo nome,
  // podemos escrever só uma vez: { percentual } em vez de { percentual: percentual }

  return { percentual, habilidadesEncontradas, habilidadesFaltantes };
}




// ------------------------------------------------------
// FUNÇÃO: classificarCandidatos
// ------------------------------------------------------
// Recebe todos os candidatos e uma vaga,
// calcula a compatibilidade de cada um e retorna o ranking ordenado.
// ------------------------------------------------------

function classificarCandidatos(candidatos, vaga) {

  // RF08 – .map() para gerar o ranking
  // Para cada candidato, calculamos a compatibilidade e criamos um objeto novo
  // que combina os dados originais do candidato com os resultados calculados.

  const ranking = candidatos.map(candidato => {
    const compatibilidade = calcularCompatibilidade(candidato, vaga);

    return {
      // SPREAD OPERATOR (...candidato)
      // O operador "..." copia todas as propriedades do objeto candidato
      // para dentro do novo objeto.
      // É como dizer: "copie tudo que já está em candidato e adicione mais isso:"
      ...candidato,

      percentual:             compatibilidade.percentual,
      percentualFormatado:    `${compatibilidade.percentual.toFixed(0)}%`,
      // .toFixed(0) arredonda o número para 0 casas decimais: 75.5 → "76"

      classificacao:          classificarPercentual(compatibilidade.percentual),
      habilidadesEncontradas: compatibilidade.habilidadesEncontradas,
      habilidadesFaltantes:   compatibilidade.habilidadesFaltantes
    };
  });


  // ORDENAÇÃO COM .sort()
  // .sort() reorganiza os itens de um array com base em uma função de comparação.
  // A função recebe dois itens (a e b) e deve retornar:
  //   número negativo → a vem antes de b
  //   número positivo → b vem antes de a
  //   zero            → ordem indiferente
  //
  // b.percentual - a.percentual → ordena do MAIOR para o MENOR (decrescente)
  // a.percentual - b.percentual → ordenaria do menor para o maior (crescente)

  ranking.sort((a, b) => {

    // Primeiro critério: percentual de compatibilidade
    if (b.percentual !== a.percentual) {
      return b.percentual - a.percentual;
    }

    // Segundo critério (desempate): quem tem mais meses de experiência
    return b.experienciaMeses - a.experienciaMeses;
  });

  return ranking;
}




// ------------------------------------------------------
// RF06 – FUNÇÃO: encontrarMelhorVaga
// ------------------------------------------------------
// Para UM candidato, percorre TODAS as vagas e retorna
// aquela que tem o maior percentual de compatibilidade.
//
// RF08 – MÉTODO .reduce()
// .reduce() percorre o array e vai "acumulando" um resultado.
// A cada iteração, compara o item atual com o acumulado
// e decide qual manter.
//
// ANALOGIA: Imagine que você está procurando o maior número
// em uma lista. Você olha o primeiro, guarda na memória.
// Compara com o segundo — se for maior, troca. Repete até o fim.
// O .reduce() faz exatamente isso, mas de forma automatizada.
//
// PARÂMETROS DO REDUCE:
// (acumulador, itemAtual) => resultado
// Na primeira iteração, o acumulador é o primeiro item do array.
// ------------------------------------------------------

function encontrarMelhorVaga(candidato, vagas) {
  return vagas.reduce((melhor, vagaAtual) => {

    // Calcula a compatibilidade do candidato com a vaga atual
    const compAtual  = calcularCompatibilidade(candidato, vagaAtual);

    // Calcula a compatibilidade do candidato com a melhor vaga até agora
    const compMelhor = calcularCompatibilidade(candidato, melhor);

    // Operador ternário: se a vaga atual for melhor, ela passa a ser a "melhor"
    // caso contrário, a "melhor" anterior é mantida
    return compAtual.percentual > compMelhor.percentual ? vagaAtual : melhor;
  });
}




// ------------------------------------------------------
// RF07 – FUNÇÃO: gerarRecomendacao
// ------------------------------------------------------
// Coleta todas as habilidades que faltam para o candidato
// em TODAS as vagas, remove duplicatas e sugere o que estudar.
// ------------------------------------------------------

function gerarRecomendacao(candidato, vagas) {

  // Criamos um array vazio para acumular as habilidades faltantes
  const todasFaltantes = [];

  // for...of: percorre cada item de um array de forma simples e legível
  // É ideal quando você quer apenas ler cada item, sem transformar.
  for (const vaga of vagas) {
    const comp = calcularCompatibilidade(candidato, vaga);

    // Para cada habilidade faltante nesta vaga, adiciona no array geral
    for (const habilidade of comp.habilidadesFaltantes) {
      todasFaltantes.push(habilidade);   // .push() adiciona um item no final do array
    }
  }

  // Se o array estiver vazio, o candidato já atende tudo — retorna mensagem positiva
  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos das vagas analisadas. 🎯";
  }

  // Set é uma estrutura de dados que não permite valores duplicados.
  // Ao criar "new Set(todasFaltantes)", os itens repetidos são automaticamente removidos.
  // O spread (...) converte o Set de volta para um array normal.
  //
  // Ex: ["html", "css", "html", "git"] → Set → ["html", "css", "git"]
  const semDuplicatas = [...new Set(todasFaltantes)];

  return `Priorize estudar: ${semDuplicatas.join(", ")}.`;
  // .join(", ") transforma o array em uma string separada por vírgula:
  // ["html", "css"] → "html, css"
}




// ======================================================
// RF12 – CALLBACK
// ======================================================
//
// O QUE É UM CALLBACK?
// É uma função passada como argumento para outra função.
// A função que recebe o callback decide QUANDO chamá-la.
//
// ANALOGIA:
// Você pede uma pizza e dá seu telefone (callback).
// A pizzaria liga para você quando estiver pronta.
// Você não sabe exatamente quando vai tocar — só que vai.
//
// VANTAGEM:
// Permite separar QUANDO algo acontece de O QUE deve acontecer.
// "finalizarAnalise" sabe QUANDO chamar (após exibir "Análise finalizada").
// "exibirMensagemFinal" sabe O QUE fazer (exibir a mensagem).
// ======================================================

// Função que recebe outra função como parâmetro (callback)
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\n✅ Análise finalizada.");
  callback(nomeCandidato);   // aqui o callback é chamado — executa exibirMensagemFinal
}

// Esta é a função que será passada como callback
function exibirMensagemFinal(nome) {
  console.log(`📌 ${nome} foi o candidato mais compatível. Revise as habilidades faltantes e atualize o plano de estudos!`);
}




// ======================================================
// RF13 – CLOSURE
// ======================================================
//
// O QUE É UMA CLOSURE?
// É uma função que "lembra" das variáveis do escopo onde foi criada,
// mesmo depois que a função externa terminou de executar.
//
// ANALOGIA:
// Imagine uma caixinha com um contador dentro.
// Cada vez que você abre a caixinha, o número aumenta.
// Mas o número não some entre as aberturas — ele é lembrado.
//
// COMO FUNCIONA AQUI:
// criarContadorDeAnalises() é chamada UMA VEZ e cria a variável "total".
// Ela retorna uma função interna que tem acesso a "total".
// Cada vez que chamamos contarAnalise(), "total" aumenta e é retornado.
// "total" não é acessível de fora — fica "fechado" dentro da closure.
//
// DIFERENÇA DE LET E CONST AQUI:
// "total" usa "let" porque precisa ser reatribuído (total++).
// Se usássemos "const", daria erro ao tentar incrementar.
// ======================================================

function criarContadorDeAnalises() {
  let total = 0;              // variável "presa" dentro da closure

  return function () {        // retorna uma função (não executa, só retorna)
    total++;                  // incrementa: total = total + 1
    return total;
  };
}

// Chamamos a função criadora UMA vez e guardamos a função retornada em "contarAnalise"
// A partir de agora, cada chamada a contarAnalise() incrementa o contador interno
const contarAnalise = criarContadorDeAnalises();




// ======================================================
// RF14 – PROMISE + ASYNC/AWAIT
// ======================================================
//
// O PROBLEMA DO CÓDIGO ASSÍNCRONO:
// Algumas operações demoram: buscar dados de um servidor, ler um arquivo...
// Se o JavaScript esperasse cada uma travar, a página ficaria congelada.
// A solução: executar essas operações em segundo plano e avisar quando terminarem.
//
// O QUE É UMA PROMISE?
// É um objeto que representa uma operação que ainda não terminou,
// mas que vai terminar no futuro com sucesso (resolve) ou falha (reject).
//
// ESTADOS DE UMA PROMISE:
// pending  (pendente)  → ainda processando
// fulfilled (resolvida) → terminou com sucesso → chama resolve(valor)
// rejected (rejeitada) → terminou com erro    → chama reject(erro)
//
// O QUE É ASYNC/AWAIT?
// É uma forma mais legível de trabalhar com Promises.
// "async" antes de uma função diz: "esta função pode ter operações assíncronas".
// "await" antes de uma Promise diz: "espere esta Promise terminar antes de continuar".
// O código parece síncrono (linha a linha), mas por baixo é assíncrono.
// ======================================================

// Simula uma busca de vagas em um servidor remoto
// Na vida real, aqui seria um fetch() para uma API
function buscarVagasSimuladas() {

  // Criamos e retornamos uma Promise
  // O constructor da Promise recebe uma função com dois parâmetros:
  // resolve → chame quando a operação der certo (passa o resultado)
  // reject  → chame quando der erro (passaria a mensagem de erro)

  return new Promise((resolve) => {

    // setTimeout simula um atraso de rede de 1 segundo (1000 milissegundos)
    // Após o tempo, a Promise é "resolvida" com o array de vagas

    setTimeout(() => {
      resolve(vagas);   // entrega as vagas para quem estiver esperando
    }, 1000);
  });
}


// "async" transforma a função em assíncrona
// Dentro dela podemos usar "await" para esperar Promises
async function iniciarSistema() {

  console.log("⏳ Carregando vagas...");

  // "await" pausa a execução DESTA FUNÇÃO até a Promise ser resolvida.
  // Quando resolver, o valor passado para resolve() é atribuído a vagasCarregadas.
  // O restante do código só roda depois que as vagas chegarem.
  const vagasCarregadas = await buscarVagasSimuladas();

  console.log("✅ Vagas carregadas!\n");


  // ENTRADA DO USUÁRIO
  // prompt() abre uma caixa de diálogo no navegador pedindo um texto.
  // Retorna a string digitada, ou null se o usuário cancelar.
  const entrada = prompt("Digite o ID da vaga que deseja pesquisar:");

  // Number() converte uma string para número.
  // Se a string não for numérica, retorna NaN (Not a Number).
  const idVaga  = Number(entrada);


  // VALIDAÇÃO DA ENTRADA
  // Verificamos três casos problemáticos com o operador || (OU lógico):
  // 1. entrada === null  → usuário cancelou o prompt
  // 2. entrada.trim() === ""  → usuário não digitou nada
  // 3. isNaN(idVaga)  → digitou texto em vez de número
  // Se QUALQUER uma dessas condições for verdadeira, exibe o erro e para.

  if (entrada === null || entrada.trim() === "" || isNaN(idVaga)) {
    console.log("❌ ID inválido. Por favor, digite um número.");
    return;   // "return" sem valor encerra a função imediatamente
  }


  // RF08 – MÉTODO .find()
  // .find() percorre o array e retorna o PRIMEIRO item que satisfaz a condição.
  // Se nenhum item satisfizer, retorna "undefined".
  //
  // Aqui procuramos a vaga cujo "id" seja igual ao número digitado pelo usuário.
  // === verifica igualdade de valor E tipo (mais seguro que ==)

  const vagaEscolhida = vagasCarregadas.find(vaga => vaga.id === idVaga);


  // VERIFICAÇÃO SE A VAGA EXISTE
  // Se vagaEscolhida for undefined (vaga não encontrada), o if é falso.
  // Um objeto existente é sempre "truthy" em JavaScript.

  if (vagaEscolhida) {

    // Gera o ranking de candidatos para a vaga escolhida
    const ranking = classificarCandidatos(candidatos, vagaEscolhida);


    // --------------------------------------------------
    // EXIBIÇÃO DAS INFORMAÇÕES DA VAGA
    // console.log() imprime no console do navegador (F12 → Console)
    // --------------------------------------------------

    console.log("\n=================================");
    console.log("VAGA SELECIONADA");
    console.log("=================================");
    console.log(` Empresa:     ${vagaEscolhida.empresa}`);
    console.log(` Cargo:       ${vagaEscolhida.cargo}`);
    console.log(` Salário:     R$ ${vagaEscolhida.salario}`);
    console.log(` Modalidade:  ${vagaEscolhida.modalidade}`);
    console.log(` Requisitos:  ${vagaEscolhida.requisitos.join(", ")}`);
    console.log("");


    // --------------------------------------------------
    // CLASSIFICAÇÃO DOS CANDIDATOS
    // --------------------------------------------------

    console.log("=================================");
    console.log("CLASSIFICAÇÃO DOS CANDIDATOS");
    console.log("=================================");

    // Montamos um array de objetos apenas com os campos que queremos exibir.
    // console.table() exibe esse array como uma tabela formatada no console.
    // Cada objeto vira uma linha, e cada propriedade vira uma coluna.

    const rankingVisual = ranking.map(candidato => ({

      // Parênteses em torno das chaves ({}) são necessários aqui
      // para que o JavaScript entenda que estamos retornando um OBJETO,
      // e não abrindo um bloco de código.

      Nome:            candidato.nome,
      Área:            candidato.area,
      Experiência:     `${candidato.experienciaMeses} meses`,
      Compatibilidade: candidato.percentualFormatado,
      Classificação:   candidato.classificacao,

      // Operador ternário para exibir mensagem amigável quando o array estiver vazio
      "Habilidades Compatíveis":
        candidato.habilidadesEncontradas.length > 0
          ? candidato.habilidadesEncontradas.join(", ")
          : "Nenhuma habilidade compatível",

      "Habilidades Faltantes":
        candidato.habilidadesFaltantes.length > 0
          ? candidato.habilidadesFaltantes.join(", ")
          : "Nenhuma habilidade faltante"
    }));

    console.table(rankingVisual);


    // --------------------------------------------------
    // DEMONSTRAÇÃO DOS MÉTODOS DA CLASSE (RF09, RF10, RF11)
    // Chamamos os métodos diretamente no objeto vagaEscolhida.
    // Por baixo, o "this" dentro dos métodos aponta para vagaEscolhida.
    // --------------------------------------------------

    console.log("=================================");
    console.log("📋 RESUMO DA VAGA (via classe)");
    console.log("=================================");
    console.log(vagaEscolhida.exibirResumo());   // método herdado de Vaga
    console.log(vagaEscolhida.exibirNivel());    // método exclusivo de VagaFrontEnd


    // --------------------------------------------------
    // RF06 – MELHOR VAGA POR CANDIDATO
    // .forEach() percorre o array e executa uma função para cada item.
    // Diferente do .map(), não retorna um novo array — apenas executa a ação.
    // --------------------------------------------------

    console.log("=================================");
    console.log("⭐ MELHOR VAGA POR CANDIDATO");
    console.log("=================================");

    candidatos.forEach(candidato => {
      const melhorVaga = encontrarMelhorVaga(candidato, vagasCarregadas);
      const comp = calcularCompatibilidade(candidato, melhorVaga);
      console.log(`👤 ${candidato.nome} → ${melhorVaga.empresa} | ${melhorVaga.cargo} | ${comp.percentual.toFixed(0)}%`);
    });


    // --------------------------------------------------
    // RF07 – RECOMENDAÇÕES DE ESTUDO
    // --------------------------------------------------

    console.log("=================================");
    console.log("📚 RECOMENDAÇÕES DE ESTUDO");
    console.log("=================================");

    candidatos.forEach(candidato => {
      const recomendacao = gerarRecomendacao(candidato, vagasCarregadas);
      console.log(`👤 ${candidato.nome}: ${recomendacao}`);
    });


    // --------------------------------------------------
    // RF13 – CLOSURE EM AÇÃO
    // Cada chamada a contarAnalise() lembra e incrementa o total interno.
    // --------------------------------------------------

    const numeroAnalise = contarAnalise();
    console.log(`\n🔢 Esta foi a análise nº ${numeroAnalise} realizada pelo sistema.`);


    // --------------------------------------------------
    // RF12 – CALLBACK EM AÇÃO
    // Passamos "exibirMensagemFinal" como segundo argumento.
    // Ela não é chamada aqui — quem decide quando chamá-la é "finalizarAnalise".
    // ranking[0] é o primeiro candidato do array (índice 0 = mais compatível).
    // --------------------------------------------------

    finalizarAnalise(ranking[0].nome, exibirMensagemFinal);


  } else {

    // Caso o usuário digite um ID que não existe em nenhuma vaga
    console.log(`Vaga com ID ${idVaga} não encontrada.`);
  }
}


// ======================================================
// PONTO DE ENTRADA DO PROGRAMA
// ======================================================
// Esta é a única linha que "dispara" tudo.
// Como iniciarSistema é async, ela começa a executar e
// o JavaScript segue em frente — mas os awaits internos
// garantem que cada etapa espera a anterior terminar.
// ======================================================

iniciarSistema();
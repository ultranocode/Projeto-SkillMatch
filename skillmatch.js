// Relação de Candidatos, cada um com suas habilidades e experiência.
// O escopo do projeto solicitava que os candidatos fossem organizados em objetos.
// No entanto, optei por organizá-los em um array para facilitar a manipulação
// dos dados e a aplicação de funções de ordenação, filtragem e busca.


// Classe Vaga (POO)

class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Método que usa "this" para acessar os dados do próprio objeto
  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} | R$ ${this.salario} | ${this.modalidade}`;
  }
}


// Herança: VagaFrontEnd herda tudo de Vaga e adiciona o nível

class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
}



const candidatos = [
  {
    id: 1,
    nome: "Juliana",
    area: "UX/UI Design",
    habilidades: ["Figma", "Prototipação", "Design Responsivo", "Canva"],
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

// Relação de Vagas

const vagas = [
  new VagaFrontEnd(1, "PixelTech",   "Desenvolvedor Front-End Júnior", ["HTML", "CSS", "JavaScript", "Git"],                  2800, "Remoto",     "Júnior"),
  new VagaFrontEnd(2, "NovaWeb",     "Front-End Developer Júnior",     ["React", "JavaScript", "Responsividade", "GitHub"],   3200, "Híbrido",    "Júnior"),
  new VagaFrontEnd(3, "DevHouse",    "Programador Front-End",          ["HTML", "CSS", "Bootstrap", "Lógica de Programação"], 2500, "Presencial", "Júnior"),
  new VagaFrontEnd(4, "SoftVision",  "Desenvolvedor React Júnior",     ["React", "API REST", "JavaScript", "Git"],            3500, "Remoto",     "Júnior"),
  new VagaFrontEnd(5, "CodeFactory", "Estágio Front-End",              ["HTML", "CSS", "JavaScript", "Kanban"],               1800, "Híbrido",    "Estágio")
];


// Função para normalizar texto, melhorando buscas e comparações.
// Converte para minúsculas e remove espaços extras.

function normalizarTexto(texto) {
  return texto.toLowerCase().trim();
}


// Função para classificar o percentual em Alta, Média ou Baixa compatibilidade

function classificarPercentual(percentual) {
  if (percentual >= 80) {
    return "🟢 Alta compatibilidade";
  } else if (percentual >= 50) {
    return "🟡 Média compatibilidade";
  } else {
    return "🔴 Baixa compatibilidade";
  }
}

// Encontra a vaga com maior compatibilidade para um candidato
// Usa o método de array .reduce()

function encontrarMelhorVaga(candidato, vagas) {
  return vagas.reduce((melhor, vagaAtual) => {
    const compAtual  = calcularCompatibilidade(candidato, vagaAtual);
    const compMelhor = calcularCompatibilidade(candidato, melhor);
    return compAtual.percentual > compMelhor.percentual ? vagaAtual : melhor;
  });
}

// Gerar uma recomendação de estudo baseada nas habilidades faltantes

function gerarRecomendacao(candidato, vagas) {

  // Coleta todas as habilidades faltantes do candidato em todas as vagas
  const todasFaltantes = [];

  for (const vaga of vagas) {
    const comp = calcularCompatibilidade(candidato, vaga);
    for (const habilidade of comp.habilidadesFaltantes) {
      todasFaltantes.push(habilidade);
    }
  }

  // Se não faltar nada, retorna uma mensagem positiva
  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos das vagas analisadas. 🎯";
  }

  // Remove habilidades duplicadas usando Set
  const semDuplicatas = [...new Set(todasFaltantes)];

  return `Priorize estudar: ${semDuplicatas.join(", ")}.`;
}


// Função para calcular compatibilidade entre candidato e vaga

function calcularCompatibilidade(candidato, vaga) {
  // Normaliza as habilidades do candidato
  const habilidadesNorm = candidato.habilidades.map(h => normalizarTexto(h));

  // Normaliza os requisitos da vaga
  const requisitosNorm = vaga.requisitos.map(r => normalizarTexto(r));

  // Filtra os requisitos da vaga que o candidato possui
  const habilidadesEncontradas = requisitosNorm.filter(req =>
    habilidadesNorm.includes(req)
  );

  // Verifica os requisitos que faltam para o candidato
  const habilidadesFaltantes = requisitosNorm.filter(req =>
    !habilidadesNorm.includes(req)
  );

  // Calcula o percentual de compatibilidade.
  // Se existir pelo menos 1 requisito, faz o cálculo da porcentagem.
  // Caso não exista nenhum requisito, retorna 0 para evitar erro matemático.
  const percentual = requisitosNorm.length > 0
    ? (habilidadesEncontradas.length / requisitosNorm.length) * 100
    : 0;

  return {
    percentual: percentual,
    habilidadesEncontradas: habilidadesEncontradas,
    habilidadesFaltantes: habilidadesFaltantes
  };
}


// Função para classificar candidatos de acordo com a vaga

function classificarCandidatos(candidatos, vaga) {
  const ranking = candidatos.map(candidato => {
    const compatibilidade = calcularCompatibilidade(candidato, vaga);

    return {
      ...candidato,
      percentual: compatibilidade.percentual,
      percentualFormatado: `${compatibilidade.percentual.toFixed(0)}%`,
      classificacao: classificarPercentual(compatibilidade.percentual),
      habilidadesEncontradas: compatibilidade.habilidadesEncontradas,
      habilidadesFaltantes: compatibilidade.habilidadesFaltantes
    };
  });

  // Ordena o ranking de candidatos com base no percentual de compatibilidade
  ranking.sort((a, b) => {
    // Primeiro ordena pelo percentual (do maior para o menor)
    if (b.percentual !== a.percentual) {
      return b.percentual - a.percentual;
    }
    // Se empatar, ordena pela experiência
    return b.experienciaMeses - a.experienciaMeses;
  });

  return ranking;
}


// Pesquisa de candidatos de acordo com a vaga escolhida

const entrada = prompt("Digite o ID da vaga que deseja pesquisar:");
const idVaga = Number(entrada);

// Validação: usuário cancelou o prompt ou digitou algo que não é número
if (entrada === null || entrada.trim() === "" || isNaN(idVaga)) {
  console.log("❌ ID inválido. Por favor, digite um número.");
} else {
  const vagaEscolhida = vagas.find(vaga => vaga.id === idVaga);

  if (vagaEscolhida) {
    // Gera classificação dos candidatos
    const ranking = classificarCandidatos(candidatos, vagaEscolhida);

    // Exibe informações da vaga

    console.log("\n=================================");
    console.log("VAGA SELECIONADA");
    console.log("=================================");
    console.log(` Empresa:     ${vagaEscolhida.empresa}`);
    console.log(` Cargo:       ${vagaEscolhida.cargo}`);
    console.log(` Salário:     R$ ${vagaEscolhida.salario}`);
    console.log(` Modalidade:  ${vagaEscolhida.modalidade}`);
    console.log(` Requisitos:  ${vagaEscolhida.requisitos.join(", ")}`);
    console.log("");

    // Classificação dos candidatos

    console.log("=================================");
    console.log("CLASSIFICAÇÃO DOS CANDIDATOS");
    console.log("=================================");

    // Monta uma visualização mais limpa para o console.table

    const rankingVisual = ranking.map(candidato => ({
      Nome: candidato.nome,
      Área: candidato.area,
      Experiência: `${candidato.experienciaMeses} meses`,
      Compatibilidade: candidato.percentualFormatado,
      Classificação: candidato.classificacao,

      // Se não houver habilidades compatíveis, mostra um traço
      "Habilidades Compatíveis":
        candidato.habilidadesEncontradas.length > 0
          ? candidato.habilidadesEncontradas.join(", ")
          : "Nenhuma habilidade compatível",

      // Se não houver faltantes, mostra mensagem positiva
      "Habilidades Faltantes":
        candidato.habilidadesFaltantes.length > 0
          ? candidato.habilidadesFaltantes.join(", ")
          : "Nenhuma habilidade faltante"
    }));

    console.table(rankingVisual);


    // Demonstração do método exibirResumo() usando this
    
console.log("=================================");
console.log("📋 RESUMO DA VAGA (via classe)");
console.log("=================================");
console.log(vagaEscolhida.exibirResumo());
console.log(vagaEscolhida.exibirNivel());

    

    // Exibe a melhor vaga para cada candidato

console.log("=================================");
console.log("MELHOR VAGA POR CANDIDATO");
console.log("=================================");

candidatos.forEach(candidato => {
  const melhorVaga = encontrarMelhorVaga(candidato, vagas);
  const comp = calcularCompatibilidade(candidato, melhorVaga);
  console.log(`👤 ${candidato.nome} → ${melhorVaga.empresa} | ${melhorVaga.cargo} | ${comp.percentual.toFixed(0)}%`);
});

// Exibe recomendação de estudo para cada candidato

console.log("=================================");
console.log(" RECOMENDAÇÕES DE ESTUDO");
console.log("=================================");

candidatos.forEach(candidato => {
  const recomendacao = gerarRecomendacao(candidato, vagas);
  console.log(` ${candidato.nome}: ${recomendacao}`);
});


  } else {
    // Caso a vaga não exista
    console.log(`Vaga com ID ${idVaga} não encontrada.`);
  }
}
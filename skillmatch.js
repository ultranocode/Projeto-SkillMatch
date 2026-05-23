// Relação de Candidatos, cada um com suas habilidades e experiência.
// O escopo do projeto solicitava que os candidatos fossem organizados em objetos.
// No entanto, optei por organizá-los em um array para facilitar a manipulação
// dos dados e a aplicação de funções de ordenação, filtragem e busca.

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
  {
    id: 1,
    empresa: "PixelTech",
    cargo: "Desenvolvedor Front-End Júnior",
    requisitos: ["HTML", "CSS", "JavaScript", "Git"],
    salario: 2800,
    modalidade: "Remoto"
  },
  {
    id: 2,
    empresa: "NovaWeb",
    cargo: "Front-End Developer Júnior",
    requisitos: ["React", "JavaScript", "Responsividade", "GitHub"],
    salario: 3200,
    modalidade: "Híbrido"
  },
  {
    id: 3,
    empresa: "DevHouse",
    cargo: "Programador Front-End",
    requisitos: ["HTML", "CSS", "Bootstrap", "Lógica de Programação"],
    salario: 2500,
    modalidade: "Presencial"
  },
  {
    id: 4,
    empresa: "SoftVision",
    cargo: "Desenvolvedor React Júnior",
    requisitos: ["React", "API REST", "JavaScript", "Git"],
    salario: 3500,
    modalidade: "Remoto"
  },
  {
    id: 5,
    empresa: "CodeFactory",
    cargo: "Estágio Front-End",
    requisitos: ["HTML", "CSS", "JavaScript", "Kanban"],
    salario: 1800,
    modalidade: "Híbrido"
  }
];


// Função para normalizar texto, melhorando buscas e comparações.
// Converte para minúsculas e remove espaços extras.

function normalizarTexto(texto) {
  return texto.toLowerCase().trim();
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


// PEsquisa de candidadtos de acordo com a vaga escolhida

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
    console.log(` Empresa:      ${vagaEscolhida.empresa}`);
    console.log(` Cargo:        ${vagaEscolhida.cargo}`);
    console.log(` Salário:      R$ ${vagaEscolhida.salario}`);
    console.log(` Modalidade:   ${vagaEscolhida.modalidade}`);
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

      // Se não houver habilidades compatíveis, mostra um traço
      "Habilidades Compatíveis":
        candidato.habilidadesEncontradas.length > 0
          ? candidato.habilidadesEncontradas.join(", ")
          : "—",

      // Se não houver faltantes, mostra mensagem positiva
      "Habilidades Faltantes":
        candidato.habilidadesFaltantes.length > 0
          ? candidato.habilidadesFaltantes.join(", ")
          : "Nenhuma habilidade faltante"
    }));

    console.table(rankingVisual);

  } else {
    // Caso a vaga não exista
    console.log(`Vaga com ID ${idVaga} não encontrada.`);
  }
}


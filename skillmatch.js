// ======================================================
// SKILLMATCH JS - Simulador de Compatibilidade com Vaga
// ======================================================


// ======================================================
// RF09 – CLASSE VAGA
// ======================================================

class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // RF11 – Método que usa "this" para acessar os dados do próprio objeto
  exibirResumo() {
    return `${this.cargo} na empresa ${this.empresa} | R$ ${this.salario} | ${this.modalidade}`;
  }
}


// ======================================================
// RF10 – HERANÇA: VagaFrontEnd herda tudo de Vaga
// ======================================================

class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  exibirNivel() {
    return `Nível: ${this.nivel}`;
  }
}


// ======================================================
// RF01 – CANDIDATOS
// ======================================================

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


// ======================================================
// RF02 – VAGAS (criadas com a classe VagaFrontEnd)
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

// Normaliza texto para comparações mais seguras
function normalizarTexto(texto) {
  return texto.toLowerCase().trim();
}


// RF04 – Classifica o percentual em Alta, Média ou Baixa compatibilidade
function classificarPercentual(percentual) {
  if (percentual >= 80) {
    return "🟢 Alta compatibilidade";
  } else if (percentual >= 50) {
    return "🟡 Média compatibilidade";
  } else {
    return "🔴 Baixa compatibilidade";
  }
}


// RF03 – Calcula compatibilidade entre candidato e vaga
function calcularCompatibilidade(candidato, vaga) {
  // RF08 – map: normaliza as habilidades do candidato
  const habilidadesNorm = candidato.habilidades.map(h => normalizarTexto(h));

  // RF08 – map: normaliza os requisitos da vaga
  const requisitosNorm = vaga.requisitos.map(r => normalizarTexto(r));

  // RF08 – filter: encontra habilidades que o candidato possui
  const habilidadesEncontradas = requisitosNorm.filter(req =>
    habilidadesNorm.includes(req)
  );

  // RF05 – filter: encontra habilidades que o candidato não possui
  const habilidadesFaltantes = requisitosNorm.filter(req =>
    !habilidadesNorm.includes(req)
  );

  const percentual = requisitosNorm.length > 0
    ? (habilidadesEncontradas.length / requisitosNorm.length) * 100
    : 0;

  return { percentual, habilidadesEncontradas, habilidadesFaltantes };
}


// Classifica e ordena todos os candidatos para uma vaga
function classificarCandidatos(candidatos, vaga) {
  // RF08 – map: gera o ranking com os dados de compatibilidade
  const ranking = candidatos.map(candidato => {
    const compatibilidade = calcularCompatibilidade(candidato, vaga);
    return {
      ...candidato,
      percentual:             compatibilidade.percentual,
      percentualFormatado:    `${compatibilidade.percentual.toFixed(0)}%`,
      classificacao:          classificarPercentual(compatibilidade.percentual),
      habilidadesEncontradas: compatibilidade.habilidadesEncontradas,
      habilidadesFaltantes:   compatibilidade.habilidadesFaltantes
    };
  });

  ranking.sort((a, b) => {
    if (b.percentual !== a.percentual) return b.percentual - a.percentual;
    return b.experienciaMeses - a.experienciaMeses;
  });

  return ranking;
}


// RF06 – Encontra a vaga com maior compatibilidade para um candidato
// RF08 – reduce: percorre todas as vagas e guarda a de maior percentual
function encontrarMelhorVaga(candidato, vagas) {
  return vagas.reduce((melhor, vagaAtual) => {
    const compAtual  = calcularCompatibilidade(candidato, vagaAtual);
    const compMelhor = calcularCompatibilidade(candidato, melhor);
    return compAtual.percentual > compMelhor.percentual ? vagaAtual : melhor;
  });
}


// RF07 – Gera recomendação de estudo baseada nas habilidades faltantes
function gerarRecomendacao(candidato, vagas) {
  const todasFaltantes = [];

  for (const vaga of vagas) {
    const comp = calcularCompatibilidade(candidato, vaga);
    for (const habilidade of comp.habilidadesFaltantes) {
      todasFaltantes.push(habilidade);
    }
  }

  if (todasFaltantes.length === 0) {
    return "Parabéns! Você atende todos os requisitos das vagas analisadas. 🎯";
  }

  const semDuplicatas = [...new Set(todasFaltantes)];
  return `Priorize estudar: ${semDuplicatas.join(", ")}.`;
}


// RF12 – Callback: função que recebe outra função como parâmetro
function finalizarAnalise(nomeCandidato, callback) {
  console.log("\n✅ Análise finalizada.");
  callback(nomeCandidato);
}

function exibirMensagemFinal(nome) {
  console.log(`📌 ${nome} foi o candidato mais compatível. Revise as habilidades faltantes e atualize o plano de estudos!`);
}


// RF13 – Closure: função que lembra o valor de "total" entre as chamadas
function criarContadorDeAnalises() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}

const contarAnalise = criarContadorDeAnalises();


// ======================================================
// RF14 – PROMISE + ASYNC/AWAIT
// ======================================================

// Simula o carregamento das vagas como se viessem de um servidor
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vagas);
    }, 1000);
  });
}

// Função principal que inicia o sistema
async function iniciarSistema() {
  console.log("⏳ Carregando vagas...");
  const vagasCarregadas = await buscarVagasSimuladas();
  console.log("✅ Vagas carregadas!\n");

  const entrada = prompt("Digite o ID da vaga que deseja pesquisar:");
  const idVaga  = Number(entrada);

  if (entrada === null || entrada.trim() === "" || isNaN(idVaga)) {
    console.log("❌ ID inválido. Por favor, digite um número.");
    return;
  }

  // RF08 – find: busca a vaga pelo ID
  const vagaEscolhida = vagasCarregadas.find(vaga => vaga.id === idVaga);

  if (vagaEscolhida) {
    const ranking = classificarCandidatos(candidatos, vagaEscolhida);

    console.log("\n=================================");
    console.log("VAGA SELECIONADA");
    console.log("=================================");
    console.log(` Empresa:     ${vagaEscolhida.empresa}`);
    console.log(` Cargo:       ${vagaEscolhida.cargo}`);
    console.log(` Salário:     R$ ${vagaEscolhida.salario}`);
    console.log(` Modalidade:  ${vagaEscolhida.modalidade}`);
    console.log(` Requisitos:  ${vagaEscolhida.requisitos.join(", ")}`);
    console.log("");

    console.log("=================================");
    console.log("CLASSIFICAÇÃO DOS CANDIDATOS");
    console.log("=================================");

    const rankingVisual = ranking.map(candidato => ({
      Nome:          candidato.nome,
      Área:          candidato.area,
      Experiência:   `${candidato.experienciaMeses} meses`,
      Compatibilidade: candidato.percentualFormatado,
      Classificação: candidato.classificacao,
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

    console.log("=================================");
    console.log("📋 RESUMO DA VAGA (via classe)");
    console.log("=================================");
    console.log(vagaEscolhida.exibirResumo());
    console.log(vagaEscolhida.exibirNivel());

    console.log("=================================");
    console.log("⭐ MELHOR VAGA POR CANDIDATO");
    console.log("=================================");
    candidatos.forEach(candidato => {
      const melhorVaga = encontrarMelhorVaga(candidato, vagasCarregadas);
      const comp = calcularCompatibilidade(candidato, melhorVaga);
      console.log(`👤 ${candidato.nome} → ${melhorVaga.empresa} | ${melhorVaga.cargo} | ${comp.percentual.toFixed(0)}%`);
    });

    console.log("=================================");
    console.log("📚 RECOMENDAÇÕES DE ESTUDO");
    console.log("=================================");
    candidatos.forEach(candidato => {
      const recomendacao = gerarRecomendacao(candidato, vagasCarregadas);
      console.log(`👤 ${candidato.nome}: ${recomendacao}`);
    });

    const numeroAnalise = contarAnalise();
    console.log(`\n🔢 Esta foi a análise nº ${numeroAnalise} realizada pelo sistema.`);

    finalizarAnalise(ranking[0].nome, exibirMensagemFinal);

  } else {
    console.log(`Vaga com ID ${idVaga} não encontrada.`);
  }
}


// Inicia o sistema
iniciarSistema();
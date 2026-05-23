//Relação de Canditatos , cada um com suas habilidades e experiência
// O escopo do projeto solicitava que os canditos  fossem organizados em objetos. 
// No entanto, optado por organizar os candidatos em um array é melhor para facilitar a manipulação dos dados e a aplicação de funções de ordenação, filtragem e busca.


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


//Função para normalizar o texto, melhornado a busca e comparações: trasforma em  minúsculas e retirar espaços em branco.
function normalizarTexto(texto) {
  return texto.toLowerCase().trim();
}

// Função para calcular compatibilidade entre candidatos e vagas

function calcularCompatibilidade(candidato, vaga) {
    const habilidadesNorm = candidato.habilidades.map(h => normalizar(h)); // Normaliza as habilidades do candidato
    const requisitosNorm = vaga.requisitos.map(r => normalizar(r));       // Normaliza os requisitos da vaga
    const habilidadesEncontradas = requisitosNorm.filter(req =>          //Filtra habilidades do candidato que correspondem aos requisitos da vaga
        habilidadesNorm.includes(req)
    );

  }     








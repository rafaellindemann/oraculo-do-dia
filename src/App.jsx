import { useEffect, useState } from 'react';
import './App.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const cartasBase = [
  {
    nome: "Runa do Sol ☀️",
    frase: "Que a luz que vem de dentro seja mais forte do que qualquer sombra que tente te calar.",
    texto: "Hoje, a energia solar brilha sobre os seus passos. É um dia de clareza, bênçãos e conquistas — mas o Sol só aquece quem caminha em sua direção. As boas notícias podem surgir nos campos material, emocional e espiritual. A energia vital estará alta e alguém, mesmo à distância, pode ter enviado intenções muito positivas para você.",
    favoravel: "Conquistas, vitalidade, movimento, clareza de ideias e ações que trazem retorno.",
    cautela: "Não ignore quem sempre esteve ao seu lado — ferir essas alianças pode gerar consequências difíceis.",
    imagem: "cartas/sol.png"
  },
  {
    nome: "Runa dos Pássaros 🕊️",
    frase: "Há asas escondidas em cada medo que você supera — voe, mesmo que o céu pareça distante.",
    texto: "Hoje é dia de libertação. As amarras do passado começam a se soltar, dando espaço para novas ideias, encontros e possibilidades. Mudanças chegam pelo ar: pode ser uma viagem, uma notícia, ou até uma inspiração que transforma sua rota. É tempo de recomeçar leve. No plano espiritual, há um chamado para rever certezas e, se for preciso, mudar de direção com coragem.",
    favoravel: "Comunicação, conexões, viagens, projetos novos, encontros inesperados.",
    cautela: "Crenças engessadas — repensar é necessário. Não resista às mudanças que pedem passagem.",
    imagem: "cartas/passaros.png"
  },
  {
    nome: "Runa dos Anéis 🔗",
    frase: "Tudo o que é verdadeiro permanece. O que se quebra, revela o que nunca foi inteiro.",
    texto: "Hoje, as alianças ganham destaque. Laços se firmam, parcerias se fortalecem e o que tem valor mútuo tende a prosperar. É um bom momento para assuntos de justiça, acordos e reconciliações. No amor, a energia favorece compromisso e confiança. No plano espiritual, é essencial buscar apoio em pessoas confiáveis — uma provação pode testar a solidez de suas bases.",
    favoravel: "Relacionamentos, contratos, decisões conjuntas, questões legais e acordos duradouros.",
    cautela: "Vínculos frágeis ou ilusórios — evite depositar confiança em quem já demonstrou instabilidade.",
    imagem: "cartas/aneis.png"
  },
  {
    nome: "Runa da Mulher 🌸",
    frase: "Dentro de cada fim repousa uma centelha de começo — e é nela que a mulher tece o futuro.",
    texto: "Hoje, um novo sopro de possibilidades chega até você. Esta runa anuncia fertilidade de ideias, caminhos que se abrem e banimentos do que já não serve. É um dia fértil para iniciar projetos, procurar oportunidades ou simplesmente deixar para trás o que impedia seu florescer. No plano espiritual, banhos, feitiços de proteção e rituais de abertura estão favorecidos.",
    favoravel: "Inícios, decisões ousadas, mudanças positivas, conexões com o futuro.",
    cautela: "Ficar presa ao que já terminou — há um novo tempo pedindo passagem.",
    imagem: "cartas/mulher.png"
  },
  {
    nome: "Runa do Casamento 💍",
    frase: "Toda flor que se abre carrega a memória da semente que não desistiu de florescer.",
    texto: "Hoje, colheitas ganham forma: pendências se resolvem, relacionamentos amadurecem e projetos encontram sua conclusão natural. É um tempo fértil — inclusive no sentido literal — e propício para compromissos duradouros. No plano espiritual, o perdão pode ser o portal para a leveza. Rituais de proteção e estabilidade ganham força.",
    favoravel: "Finalizações produtivas, reconciliações, fertilidade, firmeza nas decisões e na fé.",
    cautela: "Agitação interior — mantenha-se centrada para não romper laços por impulso.",
    imagem: "cartas/casamento.png"
  },
  {
    nome: "Runa das Ondas 🌊",
    frase: "Nem tudo o que se move na escuridão é ameaça — às vezes, é apenas a alma se reorganizando em silêncio.",
    texto: "Hoje, o mistério toma a frente. Situações nebulosas podem surgir, e tentar decifrá-las às pressas só trará frustração. É um dia para se recolher um pouco, observar e cuidar da saúde física e emocional. A magia e os processos espirituais ganham profundidade, mas exigem responsabilidade. No plano espiritual, cuidado com intenções impulsivas — pensamentos sombrios têm força.",
    favoravel: "Introspecção, práticas mágicas conscientes, autocuidado e processos de cura.",
    cautela: "Ações movidas pela raiva, mágoa ou carência — guarde-se de decisões precipitadas.",
    imagem: "cartas/ondas.png"
  },
  {
    nome: "Runa do Homem 🛡️",
    frase: "Há uma hora em que o espírito precisa calçar as botas e marchar — coragem é a alma em movimento.",
    texto: "Hoje é dia de agir. O momento pede iniciativa, força e disposição para enfrentar pendências. Você pode se sentir mais determinado, pronto para resolver o que estava parado. Mas cuidado: essa energia, se mal canalizada, vira impulsividade. No plano espiritual, é hora de se proteger e cortar laços com o que te enfraquece — inclusive energeticamente.",
    favoravel: "Ações concretas, tomada de decisões, foco, coragem e afirmação pessoal.",
    cautela: "Agressividade, decisões impulsivas, energia mal direcionada ou sem propósito.",
    imagem: "cartas/homem.png"
  },
  {
    nome: "Runa da Colheita 🌾",
    frase: "O que floresce agora é fruto do que foi cultivado — com intenção, com entrega, ou com descuido.",
    texto: "Hoje, os resultados batem à porta. É tempo de ver o retorno dos esforços passados — seja em forma de conquistas, revelações ou aprendizados. Se você semeou com verdade, prepare-se para celebrar. Se negligenciou algo, poderá aprender com os frutos amargos. No plano espiritual, o chamado é à consciência: evite exageros e observe melhor a quem oferece sua confiança.",
    favoravel: "Reconhecimentos, soluções práticas, decisões claras, colheita justa.",
    cautela: "Ingenuidade, excesso de expectativas ou repetir padrões que não deram certo.",
    imagem: "cartas/colheita.png"
  },
  {
    nome: "Runa da Estrela ✨",
    frase: "Quando o céu se abre e responde, é porque sua esperança gritou mais alto que o medo.",
    texto: "Hoje, desejos antigos podem começar a se realizar. É um tempo de bênçãos sutis, sinais divinos e oportunidades que parecem ter sido feitas sob medida. Receba o que chega com gratidão, mas saiba: toda conquista carrega uma renúncia. No plano espiritual, você está bem protegido — siga em frente com fé, mas sem descuidar da clareza.",
    favoravel: "Projetos, conquistas, abertura de caminhos e contatos significativos.",
    cautela: "Apego ao passado ou medo de soltar o que já cumpriu seu ciclo.",
    imagem: "cartas/estrela.png"
  },
  {
    nome: "Runa da Foice ⚔️",
    frase: "O que se corta não é um fracasso, mas a preparação para que o novo possa crescer em seu lugar.",
    texto: "Hoje, é um dia de finalizações necessárias. Situações que já não têm mais lugar em sua vida devem ser deixadas para trás — seja em relacionamentos, hábitos ou projetos. Não tenha medo de cortar o que não serve, pois a lâmina da foice abre espaço para o novo. No plano espiritual, a proteção está ao seu redor — as forças que te cercam podem te ajudar a encontrar o que é essencial.",
    favoravel: "Fechamento de ciclos, separações, cortes necessários e a busca por purificação.",
    cautela: "Despedidas abruptas ou feitos impulsivos — tenha clareza antes de agir.",
    imagem: "cartas/foice.png"
  },
  {
    nome: "Runa da Encruzilhada 🛤️",
    frase: "Nos momentos de bifurcação, a verdadeira jornada começa: é no cruzamento que encontramos nossa força.",
    texto: "Hoje, você se encontra diante de desafios e escolhas que parecem bloqueadas. É um momento de testes e de revelação das suas verdadeiras forças. Tenha cautela, evite falar demais ou expor sua vida pessoal. No plano espiritual, a estagnação é um risco — busque renovação e não se deixe consumir pela frustração.",
    favoravel: "Superação, autodescoberta, enfrentamento de desafios e crescimento pessoal.",
    cautela: "Excesso de exposição, desânimo e escolhas movidas pelo medo ou pela pressão externa.",
    imagem: "cartas/encruzilhada.png"
  },
  {
    nome: "Runa da Lua 🌙",
    frase: "Às vezes, a resposta que procuramos está mais nas sombras do que na luz do dia.",
    texto: "Hoje, o foco está na intuição. O momento pede conexão com os mistérios, com as profundezas do seu ser. Cuidado para não se perder em fantasias ou ilusões, pois a Lua pode distorcer a percepção da realidade. No plano espiritual, você está sob bênçãos lunares — uma energia potente de cura e transformação. Mantenha os pés no chão.",
    favoravel: "Intuição aguçada, práticas mágicas e revelações espirituais.",
    cautela: "Ilusões, enganos ou tomar decisões baseadas apenas no emocional sem uma visão clara.",
    imagem: "cartas/lua.png"
  },
  {
    nome: "Runa do Olho 👁️",
    frase: "A clareza vem quando deixamos de temer o que vemos e encaramos o que precisa ser visto.",
    texto: "Hoje, o foco é a observação. O momento pede que você pare de se perder nas fantasias e encare a realidade com atenção. O que parecia invisível agora se revela. No plano espiritual, é hora de olhar para dentro, de refletir sobre suas próprias ações e escolhas. Seja honesto consigo mesmo e busque a verdadeira essência.",
    favoravel: "Autoconhecimento, clareza, ver além das aparências e tomar decisões fundamentadas.",
    cautela: "Ignorar sinais importantes, se distrair com distrações ou escapar da verdade.",
    imagem: "cartas/olho.png"
  }
];


// Função de embaralhamento
function embaralharCartas(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function App() {
  const hoje = new Date().toDateString();
  const [cartaDoDia, setCartaDoDia] = useState(null);
  const [cartasEmbaralhadas, setCartasEmbaralhadas] = useState([]);

  useEffect(() => {
    const salva = JSON.parse(localStorage.getItem("cartaDoDia"));
    const ordemSalva = JSON.parse(localStorage.getItem("ordemCartas"));

    if (salva && salva.data === hoje) {
      setCartaDoDia(salva);
    }

    if (ordemSalva && ordemSalva.data === hoje) {
      setCartasEmbaralhadas(ordemSalva.cartas);
    } else {
      const novaOrdem = embaralharCartas(cartasBase);
      setCartasEmbaralhadas(novaOrdem);
      localStorage.setItem(
        "ordemCartas",
        JSON.stringify({ data: hoje, cartas: novaOrdem })
      );
    }
  }, []);

  const sortearCarta = (index) => {
    if (cartaDoDia) return;
    const sorteada = { ...cartasEmbaralhadas[index], data: hoje };
    localStorage.setItem("cartaDoDia", JSON.stringify(sorteada));
    setCartaDoDia(sorteada);
  };

  return (
    <div className="App">
      <div className="fairy-drizzle">
        {Array.from({ length: 15 }).map((_, i) => {
          const icons = [
            "butterfly.png",
            "butterfly2.png",
            "moon.png",
            "shine.png",
            "stars.png"
          ];
          const icon = icons[Math.floor(Math.random() * icons.length)];
          const left = Math.random() * 100;
          const duration = 6 + Math.random() * 6;
          const delay = Math.random() * 10;

          return (
            <img
              key={i}
              src={`./img/fairycore/${icon}`}
              className="fairy-icon"
              style={{
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`
              }}
              alt=""
            />
          );
        })}
      </div>

      <header>

        <h1 className='playfair-display-h400'>A Cartomante - Carta do dia</h1>
      </header>
      <h2>✨ Como tirar sua Carta do Dia ✨</h2>
      <p>
        Encontre um momento tranquilo. Respire fundo, feche os olhos por alguns instantes e silencie o barulho lá fora.

        Conecte-se com a sua intuição. Pense numa pergunta ou simplesmente peça por uma orientação para o seu dia.

        <p>⚘ <span htmlFor="" className="negrito">Importante</span>: você pode escolher <span htmlFor="" className="negrito">uma carta</span>. Confie no que sentir.</p>

        Quando estiver pronto(a), olhe para as cartas e escolha aquela que mais chamar sua atenção — aquela que faz seu olhar pousar, como quem reconhece algo que já é seu.

        <p>A carta trará uma mensagem, um direcionamento ou um sinal para o seu momento.</p>
        </p>
        <p>✨ <span htmlFor="" className="negrito">Confie no seu caminho !</span></p>
      <div className="cartas">
        {cartasEmbaralhadas.map((_, index) => (
          <div
            key={index}
            className="carta"
            onClick={() => sortearCarta(index)}
            style={{
              backgroundImage: `url(./cartas/verso.png)`,
              animationDelay: `${index * 100}ms`,
            }}
  ></div>
))}
      </div>

      {cartaDoDia && (
        <div className="modal">

          <div className="modal-content">
            
            <img
              src={cartaDoDia.imagem}
              alt={cartaDoDia.nome}
              className="carta-destaque"
            />
            <div className="mensagem">
              <h2 className='playfair-display-h400'><strong>{cartaDoDia.nome}</strong></h2>
              <p className='texto'><em>“{cartaDoDia.frase}”</em></p>
              <p className='texto'>{cartaDoDia.texto}</p>
              <p className='texto'><strong>🌿 Favorável:</strong> {cartaDoDia.favoravel}</p>
              <p className='texto'><strong>⚠️ Cautela:</strong> {cartaDoDia.cautela}</p>
              <p className='texto'>✨ Esta é sua carta hoje! Use o aprendizado com sabedoria e volte amanhã para uma nova mensagem do oráculo..</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
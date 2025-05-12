const cartas = [
  { nome: "Sol", imagem: "cartas/sol.png", texto: "Hoje, a energia solar brilha sobre os seus passos. [...]" },
  { nome: "Pássaros", imagem: "cartas/passaros.png", texto: "Hoje é dia de libertação. As amarras do passado [...]" },
  { nome: "Anéis", imagem: "cartas/aneis.png", texto: "Hoje, as alianças ganham destaque. Laços se firmam [...]" },
  { nome: "Mulher", imagem: "cartas/mulher.png", texto: "Hoje, um novo sopro de possibilidades chega até você. [...]" },
  { nome: "Casamento", imagem: "cartas/casamento.png", texto: "Hoje, colheitas ganham forma: pendências se resolvem [...]" },
  { nome: "Ondas", imagem: "cartas/ondas.png", texto: "Hoje, o mistério toma a frente. Situações nebulosas [...]" },
  { nome: "Homem", imagem: "cartas/homem.png", texto: "Hoje é dia de agir. O momento pede iniciativa, força [...]" },
  { nome: "Colheita", imagem: "cartas/colheita.png", texto: "Hoje, os resultados batem à porta. É tempo de ver o retorno [...]" },
  { nome: "Estrela", imagem: "cartas/estrela.png", texto: "Hoje, desejos antigos podem começar a se realizar. [...]" },
  { nome: "Foice", imagem: "cartas/foice.png", texto: "Hoje, é um dia de finalizações necessárias. Situações que já não [...]" },
  { nome: "Encruzilhada", imagem: "cartas/encruzilhada.png", texto: "Hoje, você se encontra diante de desafios e escolhas [...]" },
  { nome: "Lua", imagem: "cartas/lua.png", texto: "Hoje, o foco está na intuição. O momento pede conexão com os mistérios [...]" },
  { nome: "Olho", imagem: "cartas/olho.png", texto: "Hoje, o foco é a observação. O momento pede que você pare [...]" }
];

const container = document.getElementById("cartas-container");
const mensagem = document.getElementById("mensagem");
const hoje = new Date().toDateString();
const sorteada = JSON.parse(localStorage.getItem("cartaDoDia"));

if (sorteada && sorteada.data === hoje) {
  mostrarCarta(sorteada);
  mensagem.innerHTML = "<p>✨ Você já tirou sua carta hoje. Volte amanhã para uma nova mensagem do oráculo.</p>";
} else {
  cartas.forEach((carta, index) => {
    const div = document.createElement("div");
    div.className = "carta";
    div.innerHTML = `
      <div class="inner">
        <div class="back" style="background-image: url('/cartas/verso.png')"></div>
        <div class="front" style="background-image: url('${carta.imagem}')"></div>
      </div>`;
    div.addEventListener("click", () => sortearCarta(index));
    container.appendChild(div);
  });
}

function sortearCarta(index) {
  const selecionada = { ...cartas[index], data: hoje };
  localStorage.setItem("cartaDoDia", JSON.stringify(selecionada));
  location.reload();
}

function mostrarCarta(carta) {
  const div = document.createElement("div");
  div.className = "carta virada";
  div.innerHTML = `
    <div class="inner">
      <div class="back" style="background-image: url('/cartas/verso.png')"></div>
      <div class="front" style="background-image: url('${carta.imagem}')"></div>
    </div>`;
  container.appendChild(div);
  mensagem.innerHTML = `<p><strong>${carta.nome}</strong>: ${carta.texto}</p>`;
}

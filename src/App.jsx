import { useEffect, useState } from 'react';
import './App.css';

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

function App() {
  const [cartaDoDia, setCartaDoDia] = useState(null);
  const hoje = new Date().toDateString();

  useEffect(() => {
    const salva = JSON.parse(localStorage.getItem("cartaDoDia"));
    if (salva && salva.data === hoje) {
      setCartaDoDia(salva);
    }
  }, []);

  const sortearCarta = (index) => {
    const sorteada = { ...cartas[index], data: hoje };
    localStorage.setItem("cartaDoDia", JSON.stringify(sorteada));
    setCartaDoDia(sorteada);
  };

  return (
    <div className="App">
      <h1>🃏 Escolha sua carta do dia</h1>
      <div className="cartas">
        {cartaDoDia ? (
          <div className="carta virada">
            <div className="inner">
              <div className="back" style={{ backgroundImage: `url(./cartas/verso.png)` }}></div>
              <div className="front" style={{ backgroundImage: `url(${cartaDoDia.imagem})` }}></div>
            </div>
          </div>
        ) : (
          cartas.map((carta, index) => (
            <div key={index} className="carta" onClick={() => sortearCarta(index)}>
              <div className="inner">
                <div className="back" style={{ backgroundImage: `url(./cartas/verso.png)` }}></div>
                <div className="front" style={{ backgroundImage: `url(${carta.imagem})` }}></div>
              </div>
            </div>
          ))
        )}
      </div>
      {cartaDoDia && (
        <div id="mensagem">
          <p><strong>{cartaDoDia.nome}</strong>: {cartaDoDia.texto}</p>
          <p>✨ Você já tirou sua carta hoje. Volte amanhã para uma nova mensagem do oráculo.</p>
        </div>
      )}
    </div>
  );
}

export default App;

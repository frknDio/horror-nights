/* ==========================================================================
   OCTOBER HORROR NIGHTS — script.js
   Controle: roleta, sorteio, animação, calendário, histórico,
   avaliações, localStorage, modo noturno, personalização, easter eggs.
   ========================================================================== */

/* ============================================================
   1. LISTA DE FILMES
   ------------------------------------------------------------
   ✏️ EDITE AQUI para trocar a lista de filmes do mês.
   Adicione ou remova strings conforme quiser.
   A roleta se ajusta automaticamente.
   ============================================================ */
const filmes = [
  "O Homem de Palha",
  "Him",
  "Host",
  "Psycho",
  "Rosemary",
  "Eyes Without a Face",
  "A Quiet Place",
  "O Gabinete do Dr. Caligari",
  "Night of the Living Dead",
  "Carrie",
  "O Exorcista",
  "Us",
  "Raw",
  "1922",
  "Todo Mundo em Pânico",
  "Histeria",
  "Fantasma da Ópera",
  "A Bruxa",
  "Creepy",
  "O Farol",
  "House",
  "Frankenhooker",
  "His House",
  "Planeta Terror",
  "O Grito (Ju-On: The Grudge, 2003)",
  "O Fantasma de Yotsuya",
  "Kwaidan: As Quatro Faces do Medo",
  "Ringu",
  "Dark Water",
  "Tetsuo",
  "Suspiria (1977)"
];

/* ============================================================
   2. METADADOS OPCIONAIS DOS FILMES
   ------------------------------------------------------------
   ✏️ EDITE AQUI se quiser preencher ano, diretor, duração, gênero
   e classificação. Se um filme não estiver aqui, o card mostra "—".
   As chaves DEVEM ser iguais ao texto dentro de "filmes".
   ============================================================ */
const metadados = {
  "O Homem de Palha":          { ano: "1973", diretor: "Robin Hardy",       duracao: "1h 28min", genero: "Terror / Suspense", classificacao: "18" },
  "Him":                        { ano: "2025", diretor: "Justin Tipping",     duracao: "1h 45min", genero: "Terror",             classificacao: "16" },
  "Host":                       { ano: "2020", diretor: "Rob Savage",         duracao: "57min",    genero: "Terror / Found Footage", classificacao: "16" },
  "Psycho":                     { ano: "1960", diretor: "Alfred Hitchcock",   duracao: "1h 49min", genero: "Terror / Suspense",    classificacao: "16" },
  "Rosemary":                   { ano: "1968", diretor: "Roman Polanski",     duracao: "2h 16min", genero: "Terror / Drama",       classificacao: "16" },
  "Eyes Without a Face":        { ano: "1960", diretor: "Georges Franju",     duracao: "1h 30min", genero: "Terror",               classificacao: "16" },
  "A Quiet Place":              { ano: "2018", diretor: "John Krasinski",     duracao: "1h 30min", genero: "Terror / Sci-Fi",      classificacao: "14" },
  "O Gabinete do Dr. Caligari": { ano: "1920", diretor: "Robert Wiene",       duracao: "1h 16min", genero: "Terror Expressionista", classificacao: "12" },
  "Night of the Living Dead":   { ano: "1968", diretor: "George A. Romero",   duracao: "1h 36min", genero: "Terror / Zumbi",       classificacao: "16" },
  "Carrie":                     { ano: "1976", diretor: "Brian De Palma",     duracao: "1h 38min", genero: "Terror",               classificacao: "16" },
  "O Exorcista":                { ano: "1973", diretor: "William Friedkin",   duracao: "2h 02min", genero: "Terror / Possessão",   classificacao: "18" },
  "Us":                         { ano: "2019", diretor: "Jordan Peele",       duracao: "1h 56min", genero: "Terror / Suspense",    classificacao: "16" },
  "Raw":                        { ano: "2016", diretor: "Julia Ducournau",    duracao: "1h 39min", genero: "Terror / Drama",       classificacao: "18" },
  "1922":                       { ano: "2017", diretor: "Zak Hilditch",       duracao: "1h 42min", genero: "Terror / Drama",       classificacao: "16" },
  "Todo Mundo em Pânico":       { ano: "2000", diretor: "Keenen Ivory Wayans", duracao: "1h 28min", genero: "Comédia / Terror",    classificacao: "14" },
  "Histeria":                   { ano: "2011", diretor: "John Landis",        duracao: "1h 30min", genero: "Comédia / Terror",     classificacao: "14" },
  "Fantasma da Ópera":          { ano: "1925", diretor: "Rupert Julian",      duracao: "1h 33min", genero: "Terror / Clássico",    classificacao: "12" },
  "A Bruxa":                    { ano: "2015", diretor: "Robert Eggers",      duracao: "1h 32min", genero: "Terror / Folclore",    classificacao: "16" },
  "Creepy":                     { ano: "2016", diretor: "Kiyoshi Kurosawa",   duracao: "2h 10min", genero: "Terror / Suspense",    classificacao: "16" },
  "O Farol":                    { ano: "2019", diretor: "Robert Eggers",      duracao: "1h 49min", genero: "Terror / Drama",       classificacao: "16" },
  "House":                      { ano: "1977", diretor: "Nobuhiko Obayashi",  duracao: "1h 28min", genero: "Terror / Surreal",     classificacao: "14" },
  "Frankenhooker":              { ano: "1990", diretor: "Frank Henenlotter",  duracao: "1h 25min", genero: "Comédia / Terror",     classificacao: "18" },
  "His House":                  { ano: "2020", diretor: "Remi Weekes",        duracao: "1h 33min", genero: "Terror / Drama",       classificacao: "16" },
  "Planeta Terror":             { ano: "2007", diretor: "Robert Rodriguez",   duracao: "1h 45min", genero: "Terror / Exploitation", classificacao: "18" },
  "O Grito (Ju-On: The Grudge, 2003)": { ano: "2003", diretor: "Takashi Shimizu", duracao: "1h 32min", genero: "Terror / J-Horror", classificacao: "16" },
  "O Fantasma de Yotsuya":      { ano: "1959", diretor: "Nobuo Nakagawa",     duracao: "1h 16min", genero: "Terror / Clássico",    classificacao: "14" },
  "Kwaidan: As Quatro Faces do Medo": { ano: "1964", diretor: "Masaki Kobayashi", duracao: "3h 03min", genero: "Terror / Antologia", classificacao: "14" },
  "Ringu":                      { ano: "1998", diretor: "Hideo Nakata",       duracao: "1h 36min", genero: "Terror / J-Horror",    classificacao: "16" },
  "Dark Water":                 { ano: "2002", diretor: "Hideo Nakata",       duracao: "1h 41min", genero: "Terror / J-Horror",    classificacao: "14" },
  "Tetsuo":                     { ano: "1989", diretor: "Shinya Tsukamoto",   duracao: "1h 07min", genero: "Terror / Cyberpunk",   classificacao: "18" },
  "Suspiria (1977)":            { ano: "1977", diretor: "Dario Argento",      duracao: "1h 38min", genero: "Terror / Giallo",      classificacao: "16" }
};

/* ============================================================
   3. FRASES ALEATÓRIAS (aparecem abaixo da roleta)
   ============================================================ */
const frasesAleatorias = [
  "Don't watch alone.",
  "The night has chosen.",
  "Something is waiting.",
  "Lights off.",
  "You shouldn't have pressed that.",
  "One movie. One night.",
  "Sweet dreams."
];

/* ============================================================
   4. CHAVES DO LOCALSTORAGE
   ============================================================ */
const CHAVE_ESTADO = "octoberHorror_estado_v1";
const CHAVE_PREF   = "octoberHorror_prefs_v1";

/* ============================================================
   5. ESTADO DA APLICAÇÃO
   ------------------------------------------------------------
   - sorteados: { "01": { filme, dia, assistido, favorito, nota, anotacao, data }, ... }
   - usados: nomes de filmes já sorteados (anti-repetição)
   ============================================================ */
let estado = {
  sorteados: {},   // chave = dia "01".."31"
  usados: [],       // filmes que já saíram
  conquistas: {}
};

let prefs = {
  nome1: "",
  nome2: "",
  frase: "31 filmes para assistir juntos.",
  nightMode: false
};

/* ============================================================
   6. REFERÊNCIAS DO DOM
   ============================================================ */
const canvas        = document.getElementById("rouletteCanvas");
const ctx           = canvas.getContext("2d");
const pointer       = document.getElementById("pointer");
const spinBtn       = document.getElementById("spinBtn");
const spinMessage   = document.getElementById("spinMessage");
const randomQuote   = document.getElementById("randomQuote");

const posterSection = document.getElementById("posterSection");
const posterTitle   = document.getElementById("posterTitle");
const posterDay     = document.getElementById("posterDay");
const posterYear    = document.getElementById("posterYear");
const posterDirector= document.getElementById("posterDirector");
const posterDuration= document.getElementById("posterDuration");
const posterGenre   = document.getElementById("posterGenre");
const posterRating  = document.getElementById("posterRating");
const markWatchedBtn= document.getElementById("markWatchedBtn");
const markFavoriteBtn=document.getElementById("markFavoriteBtn");

const calendarGrid  = document.getElementById("calendarGrid");
const archiveList   = document.getElementById("archiveList");

const nightsCounter = document.getElementById("nightsCounter");
const percentCounter= document.getElementById("percentCounter");
const progressBar   = document.getElementById("progressBar");
const progressFill  = document.getElementById("progressFill");

const nightModeBtn  = document.getElementById("nightModeBtn");
const resetBtn      = document.getElementById("resetBtn");

const name1Input    = document.getElementById("name1");
const name2Input    = document.getElementById("name2");
const phraseInput   = document.getElementById("phraseInput");
const coupleTitle   = document.getElementById("coupleTitle");
const couplePhrase  = document.getElementById("couplePhrase");

const revealOverlay = document.getElementById("revealOverlay");
const revealLine1   = document.getElementById("revealLine1");
const revealGlitch  = document.getElementById("revealGlitch");
const revealTitle   = document.getElementById("revealTitle");

const dayModalOverlay = document.getElementById("dayModalOverlay");
const dayModalTitle   = document.getElementById("dayModalTitle");
const dayModalSub     = document.getElementById("dayModalSub");
const dayModalClose   = document.getElementById("dayModalClose");
const starRating      = document.getElementById("starRating");
const noteInput       = document.getElementById("noteInput");
const modalWatchedBtn = document.getElementById("modalWatchedBtn");
const modalFavoriteBtn= document.getElementById("modalFavoriteBtn");

const scareOverlay  = document.getElementById("scareOverlay");
const scareText     = document.getElementById("scareText");
const moonEl        = document.getElementById("moon");
const mainTitle     = document.getElementById("mainTitle");

/* ============================================================
   7. PERSISTÊNCIA (localStorage)
   ============================================================ */
function carregarEstado() {
  try {
    const salvo = localStorage.getItem(CHAVE_ESTADO);
    if (salvo) estado = JSON.parse(salvo);
    garantirEstadoConquistas();
    const p = localStorage.getItem(CHAVE_PREF);
    if (p) prefs = Object.assign(prefs, JSON.parse(p));
  } catch (e) {
    console.warn("Não foi possível carregar dados salvos.", e);
  }
}

function salvarEstado() {
  try {
    localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado));
  } catch (e) {
    console.warn("Não foi possível salvar o estado.", e);
  }
}

function salvarPrefs() {
  try {
    localStorage.setItem(CHAVE_PREF, JSON.stringify(prefs));
  } catch (e) {
    console.warn("Não foi possível salvar as preferências.", e);
  }
}

/* ============================================================
   CONQUISTAS — COMPATIBILIDADE
   ============================================================ */

function garantirEstadoConquistas() {
  if (!estado.conquistas) {
    estado.conquistas = {};
  }
}

/* ============================================================
   8. CONQUISTAS DO CASAL
   ============================================================ */

function atualizarConquistas() {
  const filmes = Object.values(estado.sorteados);

  const assistidos = filmes.filter((filme) => filme.assistido);
  const totalAssistidos = assistidos.length;

  // PRIMEIRA NOITE
  const primeiraNoite = totalAssistidos >= 1;

  // SANGUE FRIO
  const sangueFrio = totalAssistidos >= 5;

  // INSÔNIA
  const insomnia = filmes.some((filme) => {
    if (!filme.assistidoEm) return false;

    const hora = new Date(filme.assistidoEm).getHours();
    return hora >= 0 && hora < 6;
  });

  // VETERANOS
  const veteranos = totalAssistidos === 31;

  // CORAJOSOS
  const noites = Object.keys(estado.sorteados)
    .sort((a, b) => Number(a) - Number(b));

  let sequencia = 0;
  let corajosos = false;

  for (const noite of noites) {
    const info = estado.sorteados[noite];

    if (info && info.nota === 5) {
      sequencia++;

      if (sequencia >= 3) {
        corajosos = true;
        break;
      }
    } else {
      sequencia = 0;
    }
  }

  // Atualiza visualmente os cards
  const conquistas = {
    "achievement-first-night": primeiraNoite,
    "achievement-cold-blood": sangueFrio,
    "achievement-insomnia": insomnia,
    "achievement-veterans": veteranos,
    "achievement-brave": corajosos
  };

  Object.entries(conquistas).forEach(([id, desbloqueada]) => {
    const card = document.getElementById(id);

    if (!card) return;

    const status = card.querySelector(".achievement-status");

    if (desbloqueada) {
      card.classList.add("unlocked");

      if (status) {
        status.textContent = "✓";
      }
    } else {
      card.classList.remove("unlocked");

      if (status) {
        status.textContent = "🔒";
      }
    }
  });
}


/* ============================================================
   RENDERIZAÇÃO DAS CONQUISTAS
   ============================================================ */

function renderizarConquistas() {
  garantirEstadoConquistas();

  const mapa = {
    primeiraNoite: "achievement-first-night",
    sangueFrio: "achievement-cold-blood",
    insomnia: "achievement-insomnia",
    veteranos: "achievement-veterans",
    corajosos: "achievement-brave"
  };

  Object.entries(mapa).forEach(([chave, id]) => {
    const card = document.getElementById(id);

    if (!card) return;

    const status = card.querySelector(".achievement-status");

    if (estado.conquistas[chave]) {
      card.classList.add("unlocked");

      if (status) {
        status.textContent = "✓";
      }
    } else {
      card.classList.remove("unlocked");

      if (status) {
        status.textContent = "🔒";
      }
    }
  });
}

/* ============================================================
   8. FILMES DISPONÍVEIS (anti-repetição)
   ============================================================ */
function filmesDisponiveis() {
  return filmes.filter((f) => !estado.usados.includes(f));
}

/* ============================================================
   9. DESENHO DA ROLETA
   ------------------------------------------------------------
   Desenha fatias em um canvas circular.
   ============================================================ */
let rotacaoAtual = 0; // em radianos

function desenharRoleta() {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const raio = Math.min(W, H) / 2 - 10;

  ctx.clearRect(0, 0, W, H);

  // Lista que será exibida na roleta: disponíveis + usados (marca)
  const listaRoleta = filmes.slice(); // mantém todas as fatias para caber visualmente
  const n = listaRoleta.length;
  const anguloFatia = (Math.PI * 2) / n;

  // Fundo do círculo
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, raio, 0, Math.PI * 2);
  ctx.fillStyle = "#0a0708";
  ctx.fill();
  ctx.restore();

  // Fatias
  for (let i = 0; i < n; i++) {
    const inicio = i * anguloFatia + rotacaoAtual;
    const fim = inicio + anguloFatia;

    // Alterna tons para leitura
    const tom = i % 2 === 0 ? "#1a0f0f" : "#120a0a";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, raio, inicio, fim);
    ctx.closePath();
    ctx.fillStyle = tom;
    ctx.fill();

    // Borda sutil
    ctx.strokeStyle = "rgba(200,170,140,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Se o filme já foi usado, escurece a fatia
    if (estado.usados.includes(listaRoleta[i])) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, raio, inicio, fim);
      ctx.closePath();
      ctx.fillStyle = "rgba(0,0,0,0.65)";
      ctx.fill();
    }

    // Texto do filme
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(inicio + anguloFatia / 2);

    const texto = listaRoleta[i];
    ctx.fillStyle = estado.usados.includes(texto) ? "#5a4a44" : "#e8ded1";
    ctx.font = "bold 12px 'Times New Roman', serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    // Trunca nomes grandes
    const textoExib = texto.length > 22 ? texto.slice(0, 20) + "…" : texto;
    ctx.fillText(textoExib, raio - 14, 0);

    ctx.restore();
  }

  // Aro externo
  ctx.beginPath();
  ctx.arc(cx, cy, raio, 0, Math.PI * 2);
  ctx.strokeStyle = "#3a1e1e";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, raio - 4, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(139,10,10,0.55)";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ============================================================
   10. ANIMAÇÃO DE GIRO
   ------------------------------------------------------------
   Acelera, gira e desacelera até parar.
   ============================================================ */
let girando = false;

function girarRoleta() {
  if (girando) return;

  const disponiveis = filmesDisponiveis();
  if (disponiveis.length === 0) {
    spinMessage.textContent = "Todas as noites já foram escolhidas.";
    return;
  }

  girando = true;
  spinBtn.disabled = true;
  spinMessage.textContent = "Escolhendo sua próxima vítima...";

  // Duração total (ms) e ângulo total
  const duracao = 5200;
  const anguloTotal = Math.PI * 2 * (5 + Math.random() * 3); // 5 a 8 voltas
  const inicio = performance.now();
  const rotacaoInicial = rotacaoAtual;

  function passoAnimacao(agora) {
    const t = Math.min((agora - inicio) / duracao, 1);

    // easing "easeOutCubic" -> começa rápido, desacelera no final
    const eased = 1 - Math.pow(1 - t, 3);

    rotacaoAtual = rotacaoInicial + anguloTotal * eased;

    // Rotaciona o canvas visualmente
    canvas.style.transform = `rotate(${rotacaoAtual}rad)`;

    // Faz o ponteiro "tremer" conforme a velocidade
    const velocidade = (1 - t);
    const tremor = Math.sin(agora / 30) * velocidade * 8;
    pointer.style.transform = `translateX(-50%) rotate(${tremor}deg)`;

    if (t < 1) {
      requestAnimationFrame(passoAnimacao);
    } else {
      finalizarGiro();
    }
  }

  requestAnimationFrame(passoAnimacao);
}

/* ============================================================
   11. FINALIZAR GIRO — escolhe o filme sorteado
   ============================================================ */
function finalizarGiro() {
  girando = false;
  spinBtn.disabled = false;
  spinMessage.textContent = "";

  const disponiveis = filmesDisponiveis();
  if (disponiveis.length === 0) return;

  // Sorteia um filme aleatório entre os disponíveis
  const filmeEscolhido = disponiveis[Math.floor(Math.random() * disponiveis.length)];

  // Descobre qual dia será usado (primeiro dia livre de 1 a 31)
  const dia = proximoDiaLivre();
  if (!dia) {
    spinMessage.textContent = "O mês já está completo. 🎃";
    return;
  }

  // Salva no estado
  estado.sorteados[dia] = {
    filme: filmeEscolhido,
    dia: dia,
    assistido: false,
    favorito: false,
    nota: 0,
    anotacao: "",
    data: new Date().toISOString()
  };
  estado.usados.push(filmeEscolhido);
  salvarEstado();

  // Atualiza tela
  desenharRoleta();
  atualizarCalendario();
  atualizarContador();
  renderizarHistorico();

  // Sequência cinematográfica de revelação
  mostrarRevelacao(filmeEscolhido, dia);

  // Easter egg: depois de finalizar, reseta tremor do ponteiro
  pointer.style.transform = "translateX(-50%)";
}

/* ============================================================
   12. PRÓXIMO DIA LIVRE
   ============================================================ */
function proximoDiaLivre() {
  for (let d = 1; d <= 31; d++) {
    const chave = String(d).padStart(2, "0");
    if (!estado.sorteados[chave]) return chave;
  }
  return null;
}

/* ============================================================
   13. REVELAÇÃO CINEMATOGRÁFICA
   ------------------------------------------------------------
   Escurece -> mensagem -> glitch -> nome do filme.
   ============================================================ */
function mostrarRevelacao(filme, dia) {
  revealOverlay.hidden = false;
  revealLine1.style.opacity = "0";
  revealGlitch.style.opacity = "0";
  revealTitle.style.opacity = "0";
  revealTitle.textContent = "—";
  revealGlitch.classList.remove("glitching");

  // 1) Fade-in da linha 1
  setTimeout(() => { revealLine1.style.opacity = "1"; }, 100);

  // 2) Glitch
  setTimeout(() => {
    revealGlitch.style.opacity = "1";
    revealGlitch.classList.add("glitching");
  }, 1700);

  // 3) Título do filme
  setTimeout(() => {
    revealTitle.textContent = filme;
    revealTitle.style.opacity = "1";
  }, 2300);

  // 4) Fecha o overlay e mostra o pôster
  setTimeout(() => {
    revealOverlay.hidden = true;
    mostrarPoster(filme, dia);
  }, 4600);
}

/* ============================================================
   14. PÔSTER DO FILME
   ============================================================ */
function mostrarPoster(filme, dia) {
  const meta = metadados[filme] || {};
  posterTitle.textContent   = filme;
  posterDay.textContent     = `DIA ${dia} • OUTUBRO`;
  posterYear.textContent    = meta.ano || "—";
  posterDirector.textContent= meta.diretor || "—";
  posterDuration.textContent= meta.duracao || "—";
  posterGenre.textContent   = meta.genero || "—";
  posterRating.textContent  = meta.classificacao ? `+${meta.classificacao}` : "—";

  posterSection.hidden = false;
  posterSection.scrollIntoView({ behavior: "smooth", block: "center" });

  // Estado dos botões
  const info = estado.sorteados[dia];
  if (info) {
    markWatchedBtn.classList.toggle("active", !!info.assistido);
    markFavoriteBtn.classList.toggle("active", !!info.favorito);
    markWatchedBtn.textContent = info.assistido ? "✓ ASSISTIDO" : "✓ MARCAR COMO ASSISTIDO";
    markFavoriteBtn.textContent = info.favorito ? "★ FAVORITO" : "★ FAVORITO";
  }

  // Botões do pôster apontam para o dia atual
  markWatchedBtn.onclick = () => {
    if (!info) return;
    info.assistido = !info.assistido;
    
    if (info.assistido) {
  info.assistidoEm = new Date().toISOString();
} else {
  delete info.assistidoEm;
}

    salvarEstado();
    atualizarConquistas();
    atualizarCalendario();
    atualizarContador();
    renderizarHistorico();
    markWatchedBtn.classList.toggle("active", info.assistido);
    markWatchedBtn.textContent = info.assistido ? "✓ ASSISTIDO" : "✓ MARCAR COMO ASSISTIDO";
  };

  markFavoriteBtn.onclick = () => {
    if (!info) return;
    info.favorito = !info.favorito;
    salvarEstado();
    atualizarCalendario();
    markFavoriteBtn.classList.toggle("active", info.favorito);
  };
    gerarIngresso(dia);
}

/* ============================================================
   15. CONTADOR E BARRA DE PROGRESSO
   ============================================================ */
function atualizarContador() {
  const total = Object.keys(estado.sorteados).length;
  const assistidos = Object.values(estado.sorteados).filter((i) => i.assistido).length;
  const pct = Math.round((assistidos / 31) * 100);

  nightsCounter.textContent = `${String(total).padStart(2, "0")} / 31 NOITES`;
  percentCounter.textContent = `${pct}%`;
  progressFill.style.width = `${pct}%`;
  progressBar.setAttribute("aria-valuenow", String(assistidos));

  atualizarConquistas();
}

/* ============================================================
   16. CALENDÁRIO
   ============================================================ */
function atualizarCalendario() {
  calendarGrid.innerHTML = "";

  for (let d = 1; d <= 31; d++) {
    const chave = String(d).padStart(2, "0");
    const info = estado.sorteados[chave];

    const cell = document.createElement("button");
    cell.className = "day-cell";
    cell.setAttribute("aria-label", `Dia ${d} de outubro`);
    cell.dataset.dia = chave;

    const numEl = document.createElement("span");
    numEl.className = "day-num";
    numEl.textContent = chave;

    const iconEl = document.createElement("span");
    iconEl.className = "day-icon";

    if (!info) {
      cell.classList.add("locked");
      iconEl.textContent = "🔒";
    } else {
      cell.classList.add("has-movie");
      iconEl.textContent = info.assistido ? "✓" : "🎬";
      if (info.assistido) cell.classList.add("watched");
      if (info.favorito) cell.classList.add("favorite");
    }

    cell.appendChild(numEl);
    cell.appendChild(iconEl);

    if (info) {
      cell.addEventListener("click", () => abrirModalDia(chave));
    } else {
      cell.addEventListener("click", () => {
        // Dia ainda vazio: só dá um feedback
        cell.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-4px)" }, { transform: "translateY(0)" }],
          { duration: 220, easing: "ease" }
        );
      });
    }

    calendarGrid.appendChild(cell);
  }
}

/* ============================================================
   17. HISTÓRICO (THE ARCHIVE)
   ============================================================ */
function renderizarHistorico() {
  archiveList.innerHTML = "";

  const chaves = Object.keys(estado.sorteados).sort(); // "01".."31"
  if (chaves.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "archive-empty";
    vazio.textContent = "Nenhuma noite registrada ainda. Gire a roleta para começar.";
    archiveList.appendChild(vazio);
    return;
  }

  chaves.forEach((chave) => {
    const info = estado.sorteados[chave];

    const item = document.createElement("div");
    item.className = "archive-item";

    const night = document.createElement("div");
    night.className = "archive-night";
    night.textContent = `NIGHT ${chave}`;

    const mid = document.createElement("div");
    const titulo = document.createElement("div");
    titulo.className = "archive-title";
    titulo.textContent = info.filme;
    mid.appendChild(titulo);
    if (info.anotacao) {
      const nota = document.createElement("div");
      nota.className = "archive-note";
      nota.textContent = `"${info.anotacao}"`;
      mid.appendChild(nota);
    }

    const right = document.createElement("div");
    right.className = "archive-right";

    if (info.nota > 0) {
      const stars = document.createElement("div");
      stars.className = "archive-stars";
      stars.textContent = "★".repeat(info.nota) + "☆".repeat(5 - info.nota);
      right.appendChild(stars);
    }

    const status = document.createElement("div");
    status.textContent = info.assistido ? "✓ ASSISTIDO" : "🎬 PENDENTE";
    right.appendChild(status);

    if (info.favorito) {
      const fav = document.createElement("div");
      fav.textContent = "★ FAVORITO";
      fav.style.color = "var(--gold)";
      right.appendChild(fav);
    }

    item.appendChild(night);
    item.appendChild(mid);
    item.appendChild(right);
    item.addEventListener("click", () => abrirModalDia(chave));
    item.style.cursor = "pointer";

    archiveList.appendChild(item);
  });
}

/* ============================================================
   18. MODAL DE DIA
   ============================================================ */
let diaAberto = null;

function abrirModalDia(chave) {
  const info = estado.sorteados[chave];
  if (!info) return;

  diaAberto = chave;
  dayModalTitle.textContent = info.filme;
  dayModalSub.textContent   = `NIGHT ${chave} • OUTUBRO`;
  noteInput.value = info.anotacao || "";

  // Estrelas
  atualizarEstrelas(info.nota || 0);

  // Botões
  modalWatchedBtn.classList.toggle("active", !!info.assistido);
  modalWatchedBtn.textContent = info.assistido ? "✓ ASSISTIDO" : "✓ MARCAR COMO ASSISTIDO";
  modalFavoriteBtn.classList.toggle("active", !!info.favorito);

  dayModalOverlay.hidden = false;
}

function fecharModalDia() {
  dayModalOverlay.hidden = true;
  diaAberto = null;
}

function atualizarEstrelas(valor) {
  const spans = starRating.querySelectorAll("span");
  spans.forEach((s, i) => {
    s.classList.toggle("active", i < valor);
    s.setAttribute("aria-checked", i + 1 === valor ? "true" : "false");
  });
}

/* ============================================================
   19. INICIALIZAÇÃO DOS EVENTOS
   ============================================================ */
function configurarEventos() {
  // Girar roleta
  spinBtn.addEventListener("click", girarRoleta);

  // Fechar modal de dia
  dayModalClose.addEventListener("click", fecharModalDia);
  dayModalOverlay.addEventListener("click", (e) => {
    if (e.target === dayModalOverlay) fecharModalDia();
  });

  // Estrelas do modal
  starRating.querySelectorAll("span").forEach((span) => {
    span.addEventListener("mouseenter", () => {
      const v = parseInt(span.dataset.value, 10);
      starRating.querySelectorAll("span").forEach((s, i) => {
        s.classList.toggle("hover", i < v);
      });
    });
    span.addEventListener("mouseleave", () => {
      starRating.querySelectorAll("span").forEach((s) => s.classList.remove("hover"));
    });
    span.addEventListener("click", () => {
      const v = parseInt(span.dataset.value, 10);
      if (diaAberto) {
        estado.sorteados[diaAberto].nota = v;
        salvarEstado();
        atualizarConquistas();
        atualizarEstrelas(v);
        renderizarHistorico();
      }
    });
  });

  // Anotação
  noteInput.addEventListener("input", () => {
    if (diaAberto) {
      estado.sorteados[diaAberto].anotacao = noteInput.value.trim();
      salvarEstado();
      renderizarHistorico();
    }
  });

  // Botões do modal
  modalWatchedBtn.addEventListener("click", () => {
    if (!diaAberto) return;
    const info = estado.sorteados[diaAberto];
    info.assistido = !info.assistido;

    if (info.assistido) {
  info.assistidoEm = new Date().toISOString();
} else {
  delete info.assistidoEm;
}

    salvarEstado();
    atualizarConquistas();
    modalWatchedBtn.classList.toggle("active", info.assistido);
    modalWatchedBtn.textContent = info.assistido ? "✓ ASSISTIDO" : "✓ MARCAR COMO ASSISTIDO";
    atualizarCalendario();
    atualizarContador();
    renderizarHistorico();
  });

  modalFavoriteBtn.addEventListener("click", () => {
    if (!diaAberto) return;
    const info = estado.sorteados[diaAberto];
    info.favorito = !info.favorito;
    salvarEstado();
    modalFavoriteBtn.classList.toggle("active", info.favorito);
    atualizarCalendario();
    renderizarHistorico();
  });

  // Modo noturno
  nightModeBtn.addEventListener("click", alternarModoNoturno);

  // Reset
  resetBtn.addEventListener("click", resetarOutubro);

  // Personalização
  name1Input.addEventListener("input", () => { prefs.nome1 = name1Input.value.trim(); salvarPrefs(); atualizarTituloCasal(); });
  name2Input.addEventListener("input", () => { prefs.nome2 = name2Input.value.trim(); salvarPrefs(); atualizarTituloCasal(); });
  phraseInput.addEventListener("input", () => { prefs.frase = phraseInput.value.trim(); salvarPrefs(); atualizarTituloCasal(); });

  // Easter eggs (serão detalhados na Parte 2)
  configurarEasterEggs();

  // Frase aleatória
  randomQuote.textContent = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];
}

/* ============================================================
   20. MODO NOTURNO
   ============================================================ */
function alternarModoNoturno() {
  prefs.nightMode = !prefs.nightMode;
  document.body.classList.toggle("night-mode", prefs.nightMode);
  nightModeBtn.textContent = prefs.nightMode ? "☀ LEAVE NIGHT MODE" : "☾ ENTER NIGHT MODE";
  salvarPrefs();
}

/* ============================================================
   21. RESET
   ============================================================ */
function resetarOutubro() {
  const ok = confirm("Isso vai apagar TODOS os sorteios, avaliações e anotações. Continuar?");
  if (!ok) return;
 estado = {
  sorteados: {},
  usados: [],
  conquistas: {}
};
  salvarEstado();
  desenharRoleta();
  atualizarCalendario();
  atualizarContador();
  renderizarHistorico();
  posterSection.hidden = true;
  spinMessage.textContent = "Outubro resetado. Pronto para recomeçar.";
}

/* ============================================================
   22. TÍTULO DO CASAL
   ============================================================ */
function atualizarTituloCasal() {
  const n1 = prefs.nome1 || "___";
  const n2 = prefs.nome2 || "___";
  coupleTitle.textContent = `"${n1} & ${n2}'s October Horror Nights"`;
  couplePhrase.textContent = `"${prefs.frase || "31 filmes para assistir juntos."}"`;
}

/* ============================================================
   23. EASTER EGGS
   ------------------------------------------------------------
   - clicar várias vezes na lua
   - clicar no título
   - apertar uma tecla secreta (H)
   - ficar parado por muito tempo
   ============================================================ */
let cliquesLua = 0;
let cliquesTitulo = 0;
let tempoInativo = null;

function configurarEasterEggs() {
  // Lua: após 5 cliques mostra uma mensagem secreta
  moonEl.addEventListener("click", () => {
    cliquesLua++;
    if (cliquesLua === 5) {
      mostrarSusto("A LUA ESTÁ OLHANDO PARA VOCÊ", 2600);
      cliquesLua = 0;
    }
  });

  // Título: 7 cliques revela uma mensagem
  mainTitle.addEventListener("click", () => {
    cliquesTitulo++;
    if (cliquesTitulo === 7) {
      mostrarSusto("THE NIGHT HAS CHOSEN YOU", 2600);
      cliquesTitulo = 0;
    }
  });

  // Tecla secreta "H"
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "h" && !e.target.matches("input, textarea")) {
      mostrarSusto("HORROR NIGHTS FOREVER", 2000);
    }
  });

  // Inatividade: 60 segundos sem interação
  function resetarInatividade() {
    clearTimeout(tempoInativo);
    tempoInativo = setTimeout(() => {
      mostrarSusto("SOMETHING IS WAITING...", 2800);
    }, 60000);
  }
  ["mousemove", "click", "keydown", "touchstart", "scroll"].forEach((ev) =>
    document.addEventListener(ev, resetarInatividade, { passive: true })
  );
  resetarInatividade();
}

/* ============================================================
   24. MOSTRAR SUSTO (EASTER EGG OVERLAY)
   ============================================================ */
function mostrarSusto(texto, duracao) {
  scareText.textContent = texto;
  scareOverlay.hidden = false;

  // Toca um "som" opcional (funciona se o navegador permitir)
  tocarSom("scare");

  setTimeout(() => {
    scareOverlay.hidden = true;
  }, duracao);
}

/* ============================================================
   25. SOM OPCIONAL
   ------------------------------------------------------------
   Usamos Web Audio API para gerar bipes simples.
   Se o navegador bloquear, o site continua funcionando.
   ============================================================ */
let audioCtx = null;

function tocarSom(tipo) {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const agora = audioCtx.currentTime;

    if (tipo === "scare") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(80, agora);
      osc.frequency.exponentialRampToValueAtTime(40, agora + 0.6);
      gain.gain.setValueAtTime(0.18, agora);
      gain.gain.exponentialRampToValueAtTime(0.0001, agora + 0.7);
      osc.start(agora);
      osc.stop(agora + 0.75);
    } else if (tipo === "spin") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, agora);
      osc.frequency.exponentialRampToValueAtTime(120, agora + 0.25);
      gain.gain.setValueAtTime(0.06, agora);
      gain.gain.exponentialRampToValueAtTime(0.0001, agora + 0.3);
      osc.start(agora);
      osc.stop(agora + 0.35);
    } else if (tipo === "reveal") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(60, agora);
      osc.frequency.exponentialRampToValueAtTime(180, agora + 0.8);
      gain.gain.setValueAtTime(0.12, agora);
      gain.gain.exponentialRampToValueAtTime(0.0001, agora + 1.0);
      osc.start(agora);
      osc.stop(agora + 1.1);
    }
  } catch (e) {
    // silencioso — som é opcional
  }
}

/* ============================================================
   26. INICIALIZAÇÃO GERAL
   ============================================================ */
function iniciar() {
  carregarEstado();

  // Aplica preferências salvas
  name1Input.value = prefs.nome1 || "";
  name2Input.value = prefs.nome2 || "";
  phraseInput.value = prefs.frase || "31 filmes para assistir juntos.";
  atualizarTituloCasal();

  if (prefs.nightMode) {
    document.body.classList.add("night-mode");
    nightModeBtn.textContent = "☀ LEAVE NIGHT MODE";
  }

  // Desenha estado atual
  desenharRoleta();
  atualizarCalendario();
  atualizarContador();
  renderizarHistorico();

  // Mostra o pôster do último filme sorteado (se houver)
  const chaves = Object.keys(estado.sorteados).sort();
  if (chaves.length > 0) {
    const ultima = chaves[chaves.length - 1];
    mostrarPoster(estado.sorteados[ultima].filme, ultima);
  }

  // Frase aleatória
  randomQuote.textContent = frasesAleatorias[Math.floor(Math.random() * frasesAleatorias.length)];

  // Eventos
  configurarEventos();
}

/* ============================================================
   27. REDIMENSIONAMENTO DO CANVAS (retina/nitidez)
   ------------------------------------------------------------
   Mantém a roleta nítida em telas grandes.
   ============================================================ */
function ajustarCanvas() {
  const tamanhoCSS = canvas.clientWidth;
  const dpr = window.devicePixelRatio || 1;
  if (tamanhoCSS > 0) {
    canvas.width = Math.round(tamanhoCSS * dpr);
    canvas.height = Math.round(tamanhoCSS * dpr);
    desenharRoleta();
  }
}
window.addEventListener("resize", ajustarCanvas);

/* ============================================================
   28. START
   ============================================================ */

/* ============================================================
   29. INGRESSO VIRTUAL
   ------------------------------------------------------------
   Gera um ingresso único para o filme sorteado da noite.
   Permite baixar como imagem PNG.
   ============================================================ */
const ticketWrap      = document.getElementById("ticketWrap");
const ticketNumber    = document.getElementById("ticketNumber");
const ticketMovie     = document.getElementById("ticketMovie");
const ticketSession   = document.getElementById("ticketSession");
const ticketCouple    = document.getElementById("ticketCouple");
const ticketDownloadBtn = document.getElementById("ticketDownloadBtn");
const ticketEl        = document.getElementById("ticket");

let ultimoDiaIngresso = null;

function gerarIngresso(dia) {
  const info = estado.sorteados[dia];
  if (!info) { ticketWrap.hidden = true; return; }

  // Número do ingresso: baseado no dia (Nº 0007, etc.)
  ticketNumber.textContent = `Nº ${String(dia).padStart(4, "0")}`;
  ticketMovie.textContent  = info.filme;
  ticketSession.textContent= `SESSÃO ${dia} • OUTUBRO`;
  ticketCouple.textContent = `${prefs.nome1 || "___"} & ${prefs.nome2 || "___"}`;

  ticketWrap.hidden = false;
  ultimoDiaIngresso = dia;
}

// Baixar como imagem (renderiza em canvas)
ticketDownloadBtn.addEventListener("click", () => {
  if (!ticketWrap || ticketWrap.hidden) return;

  const largura = 700;
  const altura  = 320;
  const c = document.createElement("canvas");
  c.width = largura;
  c.height = altura;
  const g = c.getContext("2d");

  // Fundo papel envelhecido
  const grad = g.createLinearGradient(0, 0, 0, altura);
  grad.addColorStop(0, "#d8c39a");
  grad.addColorStop(1, "#b89a6a");
  g.fillStyle = grad;
  g.fillRect(0, 0, largura, altura);

  // Stub esquerdo
  g.fillStyle = "#8b0a0a";
  g.fillRect(0, 0, 90, altura);
  g.fillRect(largura - 90, 0, 90, altura);

  // Texto ADMIT ONE (vertical)
  g.save();
  g.translate(45, altura / 2);
  g.rotate(-Math.PI / 2);
  g.fillStyle = "#f0e6d0";
  g.font = "bold 14px monospace";
  g.textAlign = "center";
  g.fillText("ADMIT ONE", 0, 6);
  g.restore();

  g.save();
  g.translate(largura - 45, altura / 2);
  g.rotate(Math.PI / 2);
  g.fillStyle = "#f0e6d0";
  g.font = "bold 14px monospace";
  g.textAlign = "center";
  g.fillText("ADMIT ONE", 0, 6);
  g.restore();

  // Corpo
  g.fillStyle = "#5a1010";
  g.font = "12px monospace";
  g.textAlign = "center";
  g.fillText("CURSED CINEMA • HALLOWEEN SEASON", largura / 2, 60);

  g.fillStyle = "#0a0708";
  g.font = "bold 30px 'Times New Roman', serif";
  const filme = estado.sorteados[ultimoDiaIngresso].filme;
  g.fillText(filme, largura / 2, 140);

  g.strokeStyle = "rgba(0,0,0,0.4)";
  g.setLineDash([6, 6]);
  g.beginPath();
  g.moveTo(140, 165);
  g.lineTo(largura - 140, 165);
  g.stroke();

  g.fillStyle = "#3a1e08";
  g.font = "14px monospace";
  g.fillText(`SESSÃO ${ultimoDiaIngresso} • OUTUBRO`, largura / 2, 200);

  g.fillStyle = "#5a1010";
  g.font = "italic 20px 'Times New Roman', serif";
  g.fillText(`${prefs.nome1 || "___"} & ${prefs.nome2 || "___"}`, largura / 2, 250);

  g.fillStyle = "#6a4a2a";
  g.font = "italic 11px monospace";
  g.fillText("Não se sente na primeira fila. Não olhe pra trás.", largura / 2, 290);

  // Download
  const link = document.createElement("a");
  link.download = `ingresso-noite-${ultimoDiaIngresso}.png`;
  link.href = c.toDataURL("image/png");
  link.click();
});

document.addEventListener("DOMContentLoaded", () => {
  iniciar();
  ajustarCanvas();
   renderizarConquistas();
});
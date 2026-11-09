import "flag-icons/css/flag-icons.min.css"
import "./style.css"

const countries = [
  { code: "es", name: "España" },
  { code: "fr", name: "Francia" },
  { code: "it", name: "Italia" },
  { code: "de", name: "Alemania" },
  { code: "pt", name: "Portugal" },
  { code: "gb", name: "Reino Unido" },
  { code: "us", name: "Estados Unidos" },
  { code: "ca", name: "Canadá" },
  { code: "mx", name: "México" },
  { code: "br", name: "Brasil" },
  { code: "ar", name: "Argentina" },
  { code: "jp", name: "Japón" },
  { code: "cn", name: "China" },
  { code: "in", name: "India" },
  { code: "kr", name: "Corea del Sur" },
  { code: "au", name: "Australia" },
  { code: "nz", name: "Nueva Zelanda" },
  { code: "za", name: "Sudáfrica" },
  { code: "eg", name: "Egipto" },
  { code: "ma", name: "Marruecos" },
  { code: "ng", name: "Nigeria" },
  { code: "ke", name: "Kenia" },
  { code: "gr", name: "Grecia" },
  { code: "se", name: "Suecia" },
  { code: "no", name: "Noruega" },
  { code: "fi", name: "Finlandia" },
  { code: "is", name: "Islandia" },
  { code: "ie", name: "Irlanda" },
  { code: "nl", name: "Países Bajos" },
  { code: "be", name: "Bélgica" },
  { code: "ch", name: "Suiza" },
  { code: "pl", name: "Polonia" },
  { code: "ua", name: "Ucrania" },
  { code: "tr", name: "Turquía" },
  { code: "th", name: "Tailandia" },
  { code: "vn", name: "Vietnam" },
  { code: "id", name: "Indonesia" },
  { code: "ph", name: "Filipinas" },
  { code: "cl", name: "Chile" },
  { code: "co", name: "Colombia" },
  { code: "pe", name: "Perú" },
  { code: "cu", name: "Cuba" },
  { code: "jm", name: "Jamaica" },
  { code: "cr", name: "Costa Rica" },
]

const ROUND_SIZE = 10
const app = document.querySelector("#app")

let phase = "intro"
let questions = []
let currentIndex = 0
let currentChoices = []
let score = 0
let streak = 0
let bestStreak = 0
let answered = false
let selectedCode = null

function shuffle(items) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

function startGame() {
  questions = shuffle(countries).slice(0, ROUND_SIZE)
  currentIndex = 0
  score = 0
  streak = 0
  bestStreak = 0
  answered = false
  selectedCode = null
  phase = "playing"
  prepareChoices()
  render()
}

function prepareChoices() {
  const correctAnswer = questions[currentIndex]
  const distractors = shuffle(
    countries.filter((country) => country.code !== correctAnswer.code),
  ).slice(0, 3)

  currentChoices = shuffle([correctAnswer, ...distractors])
}

function renderHeader() {
  return `
    <header class="topbar">
      <a class="brand" href="#" data-action="home" aria-label="Bandera a la vista, inicio">
        <span class="brand-mark" aria-hidden="true">◎</span>
        <span>bandera<span class="brand-accent">.</span></span>
      </a>
      <span class="topbar-note"><span class="live-dot"></span> Un viaje por el mundo</span>
      <span class="topbar-tag">QUIZ DE GEOGRAFÍA</span>
    </header>
  `
}

function renderIntro() {
  return `
    <main class="page-content intro-page">
      <section class="intro-copy" aria-labelledby="intro-title">
        <p class="eyebrow"><span class="eyebrow-line"></span> EL MUNDO, A UN CLIC</p>
        <h1 id="intro-title">¿Cuánto sabes<br />de <span>banderas?</span></h1>
        <p class="intro-description">
          Unas son inconfundibles. Otras te harán dudar. Mira la bandera,
          elige el país y demuestra que tienes buen ojo.
        </p>
        <div class="intro-details">
          <div class="detail-item">
            <span class="detail-icon">10</span>
            <span><strong>10 preguntas</strong><small>Una partida rápida</small></span>
          </div>
          <span class="detail-divider"></span>
          <div class="detail-item">
            <span class="detail-icon detail-icon-star">✳</span>
            <span><strong>44 países</strong><small>De todos los rincones</small></span>
          </div>
        </div>
        <button class="primary-button start-button" data-action="start">
          ¡Vamos allá! <span aria-hidden="true">↗</span>
        </button>
        <p class="small-note">Sin presión. Solo curiosidad viajera.</p>
      </section>

      <aside class="preview-card" aria-label="Vista previa del juego">
        <div class="preview-card-top">
          <span class="mini-label">BANDERA DEL DÍA</span>
          <span class="preview-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
        <div class="preview-flag-wrap">
          <span class="fi fi-jp preview-flag" role="img" aria-label="Bandera de Japón"></span>
          <span class="orbit orbit-one"></span>
          <span class="orbit orbit-two"></span>
          <span class="sparkle sparkle-one">✳</span>
          <span class="sparkle sparkle-two">✦</span>
        </div>
        <div class="preview-question">
          <span class="question-number">01 <span>/ 10</span></span>
          <span class="preview-question-text">¿De dónde es esta bandera?</span>
        </div>
        <div class="preview-answer">
          <span class="answer-letter">A</span>
          <span>Japón</span>
          <span class="answer-check" aria-hidden="true">✓</span>
        </div>
        <div class="preview-answer preview-answer-muted">
          <span class="answer-letter">B</span>
          <span>Bangladés</span>
        </div>
        <div class="preview-footer"><span>ASÍ DE FÁCIL</span><span>Y ASÍ DE ADICTIVO <span aria-hidden="true">↗</span></span></div>
      </aside>

      <div class="decorative-number" aria-hidden="true">01</div>
    </main>
  `
}

function renderProgress() {
  const progress = ((currentIndex + 1) / ROUND_SIZE) * 100

  return `
    <div class="game-progress">
      <div class="progress-labels">
        <span>RONDA <strong>${String(currentIndex + 1).padStart(2, "0")}</strong> <span class="progress-total">/ ${ROUND_SIZE}</span></span>
        <span>${Math.round(progress)}% COMPLETADO</span>
      </div>
      <div class="progress-track" role="progressbar" aria-label="Progreso de la partida"
        aria-valuenow="${currentIndex + 1}" aria-valuemin="1" aria-valuemax="${ROUND_SIZE}">
        <span style="width: ${progress}%"></span>
      </div>
    </div>
  `
}

function renderChoices() {
  const correctAnswer = questions[currentIndex]

  return currentChoices
    .map((country, index) => {
      let stateClass = ""
      let icon = ""

      if (answered && country.code === correctAnswer.code) {
        stateClass = " choice-correct"
        icon = '<span class="choice-state" aria-hidden="true">✓</span>'
      } else if (answered && country.code === selectedCode) {
        stateClass = " choice-wrong"
        icon = '<span class="choice-state" aria-hidden="true">×</span>'
      }

      return `
        <button class="answer-choice${stateClass}" data-action="answer" data-code="${country.code}"
          ${answered ? "disabled" : ""}>
          <span class="choice-letter">${String.fromCharCode(65 + index)}</span>
          <span class="choice-name">${country.name}</span>
          ${icon}
        </button>
      `
    })
    .join("")
}

function renderFeedback() {
  if (!answered) {
    return ""
  }

  const correctAnswer = questions[currentIndex]
  const isCorrect = selectedCode === correctAnswer.code
  const message = isCorrect
    ? "¡Exacto! Tienes ojo de viajero."
    : `Casi. La respuesta era ${correctAnswer.name}.`

  return `
    <div class="feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}" role="status">
      <span class="feedback-icon" aria-hidden="true">${isCorrect ? "✓" : "↗"}</span>
      <span>${message}</span>
    </div>
  `
}

function renderGame() {
  const country = questions[currentIndex]
  const nextLabel = currentIndex === ROUND_SIZE - 1 ? "Ver resultado" : "Siguiente bandera"

  return `
    <main class="page-content game-page">
      <div class="game-heading">
        <div>
          <p class="eyebrow"><span class="eyebrow-line"></span> PON A PRUEBA TU INSTINTO</p>
          <h1>¿Dónde está <span>tu destino?</span></h1>
        </div>
        <div class="score-card">
          <span class="score-label">TU PUNTUACIÓN</span>
          <span class="score-value">${String(score).padStart(2, "0")}<span>/${ROUND_SIZE}</span></span>
        </div>
      </div>
      ${renderProgress()}
      <section class="quiz-card" aria-labelledby="question-title">
        <div class="flag-stage">
          <span class="flag-caption">¿RECONOCES ESTA BANDERA?</span>
          <span class="question-index">${String(currentIndex + 1).padStart(2, "0")}<span> / ${ROUND_SIZE}</span></span>
          <span class="fi fi-${country.code} quiz-flag" role="img" aria-label="Bandera de un país por adivinar"></span>
          <span class="stage-decoration stage-decoration-left" aria-hidden="true">✳</span>
          <span class="stage-decoration stage-decoration-right" aria-hidden="true">✦</span>
        </div>
        <div class="quiz-content">
          <div class="question-copy">
            <span class="question-kicker">PREGUNTA ${String(currentIndex + 1).padStart(2, "0")}</span>
            <h2 id="question-title">¿A qué país pertenece?</h2>
          </div>
          <div class="answer-grid">${renderChoices()}</div>
          <div class="answer-footer">
            <span class="streak-label"><span aria-hidden="true">✳</span> Racha <strong>${streak}</strong></span>
            <span class="keyboard-hint">ELIGE UNA OPCIÓN</span>
          </div>
          ${renderFeedback()}
          ${
            answered
              ? `<button class="primary-button next-button" data-action="next">${nextLabel} <span aria-hidden="true">↗</span></button>`
              : ""
          }
        </div>
      </section>
      <button class="text-button exit-button" data-action="home">← Volver al inicio</button>
    </main>
  `
}

function renderResult() {
  const percentage = Math.round((score / ROUND_SIZE) * 100)
  const resultMessage =
    score === ROUND_SIZE
      ? "¡Una vuelta al mundo perfecta!"
      : score >= 7
        ? "¡Tienes alma de explorador!"
        : score >= 4
          ? "¡Vas por buen camino!"
          : "El mundo aún guarda sorpresas."

  return `
    <main class="page-content result-page">
      <section class="result-card">
        <div class="result-sparkle" aria-hidden="true">✳</div>
        <p class="eyebrow"><span class="eyebrow-line"></span> FIN DE LA PARTIDA</p>
        <div class="result-score">${String(score).padStart(2, "0")}<span>/${ROUND_SIZE}</span></div>
        <h1>${resultMessage}</h1>
        <p class="result-description">Has acertado el <strong>${percentage}%</strong> de las banderas. ¿Te animas a otra vuelta?</p>
        <div class="result-summary">
          <span>PAÍSES DESCUBIERTOS</span>
          <strong>${ROUND_SIZE}</strong>
          <span class="summary-divider"></span>
          <span>MEJOR RACHA</span>
          <strong>${bestStreak}</strong>
        </div>
        <button class="primary-button replay-button" data-action="start">Jugar otra vez <span aria-hidden="true">↗</span></button>
        <button class="text-button result-home" data-action="home">Volver al inicio</button>
      </section>
      <div class="result-decoration" aria-hidden="true">✳</div>
    </main>
  `
}

function render() {
  const content =
    phase === "playing" ? renderGame() : phase === "result" ? renderResult() : renderIntro()

  app.innerHTML = `${renderHeader()}${content}<footer class="site-footer"><span>HECHO PARA CURIOSOS</span><span>EL MUNDO ES MÁS PEQUEÑO DE LO QUE PARECE <span aria-hidden="true">✳</span></span></footer>`
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action], a[data-action]")

  if (!button) {
    return
  }

  if (button instanceof HTMLAnchorElement) {
    event.preventDefault()
  }

  const { action } = button.dataset

  if (action === "start") {
    startGame()
  } else if (action === "answer" && phase === "playing" && !answered) {
    selectedCode = button.dataset.code
    answered = true

    if (selectedCode === questions[currentIndex].code) {
      score += 1
      streak += 1
      bestStreak = Math.max(bestStreak, streak)
    } else {
      streak = 0
    }

    render()
    app.querySelector(".next-button").focus()
  } else if (action === "next" && answered) {
    if (currentIndex === ROUND_SIZE - 1) {
      phase = "result"
      render()
      app.querySelector(".replay-button").focus()
      return
    }

    currentIndex += 1
    answered = false
    selectedCode = null
    prepareChoices()
    render()
    app.querySelector(".answer-choice").focus()
  } else if (action === "home") {
    phase = "intro"
    render()
    app.querySelector(".start-button").focus()
  }
})

render()

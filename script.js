const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
    "لا",
    "هل أنت متأكد؟ 🤔",
    "رجاءً… 🥹",
    "إذا ضغطت لا سأحزن…",
    "سأكون حزينة جدًا 😢",
    "من فضلك؟ 💔",
    "لا تفعل هذا بي…",
    "آخر فرصة 😭",
    "لن تهرب مني 🌚"
]

const yesTeasePokes = [
    "جرّب تضغط لا أولًا 😏",
    "هيا اضغط لا 👀",
    "أنت تريد التجربة 😈",
    "اضغط لا… أتحداك 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

/* 🎵 تشغيل الصوت بشكل صحيح */
music.volume = 0.3

music.play().then(() => {
    music.muted = false
}).catch(() => {
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

/* 💛 زر نعم */
function handleYesClick() {

    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }

    document.querySelector("h1").innerText = "احلى رشرش في العالم 🥹💕 "

    yesBtn.style.display = "none"
    noBtn.style.display = "none"

    catGif.src = "https://media1.tenor.com/m/4FQ2yZ6mQxQAAAAC/cute-cat.gif"

    showTeaseMessage("🫂💗و احلى بابوني")
}

/* ❌ زر لا */
function handleNoClick() {

    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.3}px`

    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

/* 🐱 تغيير الصور */
function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

/* 😂 هروب زر لا */
function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight

    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const x = Math.random() * maxX
    const y = Math.random() * maxY

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${x}px`
    noBtn.style.top = `${y}px`
    noBtn.style.zIndex = '999'
}

/* 💬 رسائل صغيرة */
function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

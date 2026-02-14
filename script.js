// ==========================================
//  ডাটাবেস (A-E পর্যন্ত আছে, আপনি Z পর্যন্ত বাড়াবেন)
// ==========================================
const alphabetData = {
    bn: [ {l:"অ", i:"🐍", w:"অজগর"}, {l:"আ", i:"🥭", w:"আম"}, {l:"ই", i:"🐭", w:"ইঁদুর"}, {l:"ঈ", i:"🦅", w:"ঈগল"}, {l:"উ", i:"🐪", w:"উট"}, {l:"ক", i:"🍌", w:"কলা"}, {l:"খ", i:"🐰", w:"খরগোশ"} ],
    en: [ {l:"A", i:"🍎", w:"Apple"}, {l:"B", i:"⚽", w:"Ball"}, {l:"C", i:"🐱", w:"Cat"}, {l:"D", i:"🐶", w:"Dog"}, {l:"E", i:"🐘", w:"Elephant"}, {l:"F", i:"🐟", w:"Fish"}, {l:"G", i:"🍇", w:"Grapes"} ],
    hi: [ {l:"अ", i:"🥣", w:"अनार"}, {l:"आ", i:"🥭", w:"आम"}, {l:"इ", i:"🍭", w:"इमली"}, {l:"ई", i:"🎋", w:"ईख"}, {l:"उ", i:"🦉", w:"उल्लू"}, {l:"क", i:"🐢", w:"कछुआ"}, {l:"ख", i:"🐰", w:"खरगोश"} ],
    ar: [ {l:"أ", i:"🐰", w:"আরনাব"}, {l:"ب", i:"🦆", w:"বাত্তাহ"}, {l:"ت", i:"🍎", w:"তুফফাহাহ"}, {l:"ث", i:"🦊", w:"ছা'লাব"}, {l:"ج", i:"🐪", w:"জামাল"}, {l:"ح", i:"🐴", w:"হিসান"}, {l:"خ", i:"🥒", w:"খিয়ার"} ]
};

const numberData = {
    bn: [ {d:"১", i:"🌞", c:1, t:"এক"}, {d:"২", i:"👀", c:2, t:"দুই"}, {d:"৩", i:"🚦", c:3, t:"তিন"}, {d:"৪", i:"🚗", c:4, t:"চার"}, {d:"৫", i:"🖐️", c:5, t:"পাঁচ"} ],
    en: [ {d:"1", i:"🌞", c:1, t:"One"}, {d:"2", i:"👀", c:2, t:"Two"}, {d:"3", i:"🚦", c:3, t:"Three"}, {d:"4", i:"🚗", c:4, t:"Four"}, {d:"5", i:"🖐️", c:5, t:"Five"} ],
    hi: [ {d:"१", i:"🌞", c:1, t:"एक"}, {d:"२", i:"👀", c:2, t:"दो"}, {d:"३", i:"🚦", c:3, t:"तीन"}, {d:"४", i:"🚗", c:4, t:"चार"}, {d:"५", i:"🖐️", c:5, t:"पाँच"} ],
    ar: [ {d:"١", i:"🌞", c:1, t:"ওয়াহিদ"}, {d:"٢", i:"👀", c:2, t:"ইছনান"}, {d:"٣", i:"🚦", c:3, t:"ছালাছাহ"}, {d:"٤", i:"🚗", c:4, t:"আরবাআ"}, {d:"٥", i:"🖐️", c:5, t:"খামসা"} ]
};

// ==========================================
//  অ্যাপ কন্ট্রোল
// ==========================================
let currentCategory = 'alphabet';
let currentLang = 'bn';
let currentIndex = 0;
let activeList = [];

function startApp() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('home-screen').classList.add('active');
    const music = document.getElementById('bg-music');
    if(music) { music.volume = 0.2; music.play().catch(e => console.log("Music auto-play blocked")); }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    window.speechSynthesis.cancel();
    stopRhyme();
}

// ==========================================
//  ইউনিভার্সাল ক্যাটাগরি এবং ভাষা
// ==========================================
function selectCategory(cat) {
    currentCategory = cat;
    showScreen('lang-screen');
}

function processLanguageSelection(lang) {
    currentLang = lang;
    if (currentCategory === 'quiz') startQuiz();
    else if (currentCategory === 'draw') startDrawing();
    else startLearning();
}

// ==========================================
//  পড়া (Learning)
// ==========================================
function startLearning() {
    currentIndex = 0;
    activeList = (currentCategory === 'alphabet') ? alphabetData[currentLang] : numberData[currentLang];
    showScreen('learn-screen');
    loadContent();
    setTimeout(speakCurrent, 500);
}

function loadContent() {
    const item = activeList[currentIndex];
    const imgArea = document.getElementById('image-area');
    
    if(currentCategory === 'alphabet') {
        document.getElementById('display-top').innerText = item.l;
        imgArea.innerHTML = `<span class="main-img">${item.i}</span>`;
        imgArea.className = "image-container";
        document.getElementById('display-text').innerText = item.w;
        document.getElementById('display-pronun').innerText = "🔊 শুনতে ক্লিক করো";
    } else {
        document.getElementById('display-top').innerText = item.d;
        let html = '<div class="counting-grid">';
        for(let i=0; i<item.c; i++) html += `<span class="count-img">${item.i}</span>`;
        html += '</div>';
        imgArea.innerHTML = html;
        imgArea.className = "image-container";
        document.getElementById('display-text').innerText = item.t;
        document.getElementById('display-pronun').innerText = "গণনা করো";
    }
}

function changeItem(dir) {
    currentIndex += dir;
    if(currentIndex >= activeList.length) currentIndex = 0;
    if(currentIndex < 0) currentIndex = activeList.length - 1;
    window.speechSynthesis.cancel();
    loadContent();
    speakCurrent();
}

function speakCurrent() {
    window.speechSynthesis.cancel();
    const item = activeList[currentIndex];
    let text = (currentCategory === 'alphabet') ? item.w : item.t;
    let langCode = 'en-US';
    if(currentLang === 'bn') langCode = 'bn-BD';
    else if(currentLang === 'hi') langCode = 'hi-IN';
    else if(currentLang === 'ar') langCode = 'ar-SA';
    let u = new SpeechSynthesisUtterance(text);
    u.lang = langCode; window.speechSynthesis.speak(u);
}

// ==========================================
//  🧠 কুইজ (Quiz) + কনফেটি ইফেক্ট 🎉
// ==========================================
function startQuiz() {
    showScreen('quiz-screen');
    nextQuestion();
}

function nextQuestion() {
    document.getElementById('quiz-result').innerText = "";
    const list = alphabetData[currentLang]; 
    const correctIndex = Math.floor(Math.random() * list.length);
    const correctItem = list[correctIndex];
    
    let qText = "";
    if(currentLang === 'bn') qText = `${correctItem.w} কোনটি?`;
    else if(currentLang === 'hi') qText = `${correctItem.w} कौन सा है?`;
    else if(currentLang === 'ar') qText = `أين هو ${correctItem.w}؟`;
    else qText = `Which one is ${correctItem.w}?`;

    document.getElementById('quiz-question').innerText = qText;
    
    let options = [correctItem];
    while(options.length < 4) {
        let randomItem = list[Math.floor(Math.random() * list.length)];
        if(!options.includes(randomItem)) options.push(randomItem);
    }
    options.sort(() => Math.random() - 0.5);
    
    const container = document.getElementById('quiz-options');
    container.innerHTML = "";
    options.forEach(opt => {
        let div = document.createElement('div');
        div.className = 'quiz-option';
        div.innerText = opt.i;
        div.onclick = function() { checkAnswer(opt, correctItem, div); };
        container.appendChild(div);
    });
}

function checkAnswer(selected, correct, element) {
    const resBox = document.getElementById('quiz-result');
    if(selected.w === correct.w) {
        element.classList.add('correct');
        resBox.innerText = "✅ সঠিক! (Correct)";
        resBox.style.color = "green";
        
        // 🎉 কনফেটি ইফেক্ট (Confetti) 🎉
        try {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF6F61', '#4CAF50', '#FFEB3B', '#2196F3']
            });
        } catch(e) { console.log("Confetti not loaded"); }

        let u = new SpeechSynthesisUtterance("Great Job!");
        window.speechSynthesis.speak(u);
    } else {
        element.classList.add('wrong');
        resBox.innerText = "❌ ভুল!";
        resBox.style.color = "red";
    }
}

// ==========================================
//  🎵 ছড়া (Rhymes)
// ==========================================
function playRhyme(name) {
    window.speechSynthesis.cancel();
    let text = ""; let lang = "en-US";
    if(name === 'ata') { text = "আতা গাছে তোতা পাখি, ডালিম গাছে মৌ। এত ডাকি তবু কথা, কও না কেন বউ।"; lang = "bn-BD"; }
    else if(name === 'chad') { text = "চাঁদ মামা চাঁদ মামা টিপ দিয়ে যা।"; lang = "bn-BD"; }
    else if(name === 'twinkle') text = "Twinkle, twinkle, little star.";
    else if(name === 'jony') text = "Johny Johny. Yes Papa?";
    else if(name === 'rain') text = "Rain rain go away.";
    let u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = 0.9; u.pitch = 1.1;
    window.speechSynthesis.speak(u);
}
function stopRhyme() { window.speechSynthesis.cancel(); }

// ==========================================
//  🎨 আঁকাআঁকি (Drawing)
// ==========================================
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
let painting = false;
let traceIndex = 0;
let traceMode = 'letter';
let currentShape = '';
let currentShapeName = '';

function startDrawing() {
    showScreen('draw-screen');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = 'black';
    traceMode = 'letter'; traceIndex = 0; drawGuide();
}

function setTraceShape(icon, name) {
    traceMode = 'shape'; currentShape = icon; currentShapeName = name; drawGuide();
}

function changeTrace(dir) {
    traceMode = 'letter';
    let max = alphabetData[currentLang].length;
    traceIndex += dir;
    if (traceIndex >= max) traceIndex = 0;
    if (traceIndex < 0) traceIndex = max - 1;
    drawGuide();
}

function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let content = (traceMode === 'letter') ? alphabetData[currentLang][traceIndex].l : currentShape;
    let label = (traceMode === 'letter') ? "লিখ: " + content : "রং করো: " + currentShapeName;
    document.getElementById('trace-status').innerText = label;
    ctx.save();
    ctx.font = "bold 250px Arial"; ctx.fillStyle = "#e0e0e0"; 
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(content, canvas.width/2, canvas.height/2);
    ctx.restore();
}

function startPosition(e) { painting = true; draw(e); }
function endPosition() { painting = false; ctx.beginPath(); }
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    let x = (e.clientX||e.touches[0].clientX) - rect.left;
    let y = (e.clientY||e.touches[0].clientY) - rect.top;
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e)=>{e.preventDefault();startPosition(e)});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', (e)=>{e.preventDefault();draw(e)});

function setColor(c, b) { ctx.strokeStyle = c; ctx.lineWidth = 6; document.querySelectorAll('.color-btn').forEach(btn=>btn.classList.remove('active-color')); b.classList.add('active-color'); }
function setEraser() { ctx.strokeStyle = 'white'; ctx.lineWidth = 30; }
function clearCanvas() { drawGuide(); }

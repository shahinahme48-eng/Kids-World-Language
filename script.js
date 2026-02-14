// ==========================================
//  ডাটাবেস (শব্দ ভান্ডার)
// ==========================================
const alphabetData = {
    bn: [ {l:"অ", i:"🐍", w:"অজগর"}, {l:"আ", i:"🥭", w:"আম"}, {l:"ই", i:"🐭", w:"ইঁদুর"}, {l:"ঈ", i:"🦅", w:"ঈগল"}, {l:"উ", i:"🐪", w:"উট"} ],
    en: [ {l:"A", i:"🍎", w:"Apple"}, {l:"B", i:"⚽", w:"Ball"}, {l:"C", i:"🐱", w:"Cat"}, {l:"D", i:"🐶", w:"Dog"}, {l:"E", i:"🐘", w:"Elephant"} ],
    hi: [ {l:"अ", i:"🥣", w:"अनार"}, {l:"आ", i:"🥭", w:"आम"}, {l:"इ", i:"🍭", w:"इमली"}, {l:"ई", i:"🎋", w:"ईख"}, {l:"उ", i:"🦉", w:"उल्लू"} ],
    ar: [ {l:"أ", i:"🐰", w:"আরনাব"}, {l:"ب", i:"🦆", w:"বাত্তাহ"}, {l:"ت", i:"🍎", w:"তুফফাহাহ"}, {l:"ث", i:"🦊", w:"ছা'লাব"}, {l:"ج", i:"🐪", w:"জামাল"} ]
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
    const music = document.getElementById('bg-music');
    music.volume = 0.2; // ভলিউম কম রাখা হয়েছে
    // ইন্টারনেট থাকলে মিউজিক বাজবে
    music.play().catch(e => console.log("Music play failed - requires interaction"));
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    window.speechSynthesis.cancel();
}

// ==========================================
//  পড়া (Learning)
// ==========================================
function selectCategory(cat) {
    currentCategory = cat;
    showScreen('lang-screen');
}

function startLearning(lang) {
    currentLang = lang;
    currentIndex = 0;
    activeList = (currentCategory === 'alphabet') ? alphabetData[lang] : numberData[lang];
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
    // আগের সাউন্ড বন্ধ করা
    window.speechSynthesis.cancel();

    const item = activeList[currentIndex];
    let text = (currentCategory === 'alphabet') ? item.w : item.t;
    let langCode = 'en-US';

    if(currentLang === 'bn') langCode = 'bn-BD';
    else if(currentLang === 'hi') langCode = 'hi-IN';
    else if(currentLang === 'ar') langCode = 'ar-SA';

    let u = new SpeechSynthesisUtterance(text);
    u.lang = langCode;
    window.speechSynthesis.speak(u);
}

// ==========================================
//  🧠 কুইজ (Quiz)
// ==========================================
function startQuiz() {
    showScreen('quiz-screen');
    nextQuestion();
}

function nextQuestion() {
    document.getElementById('quiz-result').innerText = "";
    // ডিফল্ট হিসেবে ইংলিশ ডাটা ব্যবহার হবে
    const list = alphabetData['en']; 
    const correctIndex = Math.floor(Math.random() * list.length);
    const correctItem = list[correctIndex];
    
    document.getElementById('quiz-question').innerText = `Which is ${correctItem.w}?`;
    
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
        resBox.innerText = "✅ সঠিক উত্তর!";
        resBox.style.color = "green";
        // কারেক্ট হলে সাউন্ড
        let u = new SpeechSynthesisUtterance("Correct!");
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
    let text = "";
    let lang = "en-US";
    
    if(name === 'ata') {
        text = "আতা গাছে তোতা পাখি, ডালিম গাছে মৌ। এত ডাকি তবু কথা, কও না কেন বউ।";
        lang = "bn-BD";
    }
    else if(name === 'twinkle') text = "Twinkle, twinkle, little star. How I wonder what you are.";
    else if(name === 'jony') text = "Johny Johny. Yes Papa? Eating sugar? No, papa.";
    
    let u = new SpeechSynthesisUtterance(text);
    u.lang = lang; 
    u.rate = 0.9; 
    window.speechSynthesis.speak(u);
}

function stopRhyme() {
    window.speechSynthesis.cancel();
}

// ==========================================
//  🎨 আঁকাআঁকি (Drawing)
// ==========================================
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
let painting = false;
let traceIndex = -1;

function startDrawing() {
    showScreen('draw-screen');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.strokeStyle = 'black';
    traceIndex = 0; currentLang = 'en'; 
    drawGuideLetter();
}

function drawGuideLetter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (traceIndex < 0) {
        document.getElementById('trace-status').innerText = "সাদা পেজ";
        return;
    }
    let char = alphabetData[currentLang][traceIndex].l;
    document.getElementById('trace-status').innerText = "লিখ: " + char;
    ctx.save();
    ctx.font = "bold 250px Arial"; ctx.fillStyle = "#e0e0e0"; 
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(char, canvas.width/2, canvas.height/2);
    ctx.restore();
}

function changeTrace(dir) {
    let max = alphabetData[currentLang].length;
    traceIndex += dir;
    if (traceIndex >= max) traceIndex = -1;
    if (traceIndex < -1) traceIndex = max - 1;
    drawGuideLetter();
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
function clearCanvas() { drawGuideLetter(); }

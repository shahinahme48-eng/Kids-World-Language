// ডাটাবেস
const alphabets = [
    { letter: "A a", img: "🍎", data: { bn: {t:"A for Apple", p:"এ-তে আপেল"}, en: {t:"A for Apple", p:"Apple"}, hi: {t:"A se Apple", p:"ए-से सेब"}, ar: {t:"A - التفاحة", p:"আলিফ-তুফফাহাহ"} } },
    { letter: "B b", img: "⚽", data: { bn: {t:"B for Ball", p:"বি-তে বল"}, en: {t:"B for Ball", p:"Ball"}, hi: {t:"B se Ball", p:"बी-से गेंद"}, ar: {t:"B - كرة", p:"বা-কুরাহ"} } },
    { letter: "C c", img: "🐱", data: { bn: {t:"C for Cat", p:"সি-তে বিড়াল"}, en: {t:"C for Cat", p:"Cat"}, hi: {t:"C se Cat", p:"सी-से बिल्ली"}, ar: {t:"C - قطة", p:"কা-ক্বিত্তাহ"} } },
    { letter: "D d", img: "🐶", data: { bn: {t:"D for Dog", p:"ডি-তে কুকুর"}, en: {t:"D for Dog", p:"Dog"}, hi: {t:"D se Dog", p:"डी-से कुत्ता"}, ar: {t:"D - كلب", p:"দাল-কালব"} } },
    { letter: "E e", img: "🐘", data: { bn: {t:"E for Elephant", p:"ই-তে হাতি"}, en: {t:"E for Elephant", p:"Elephant"}, hi: {t:"E se Elephant", p:"ई-से हाथी"}, ar: {t:"E - فيل", p:"ই-ফিল"} } }
];

const numbers = [
    { digit: "1", img: "🎈", count: 1, bn: "এক (১)", en: "One (1)", hi: "एक (१)", ar: "واحد (١)" },
    { digit: "2", img: "🦆", count: 2, bn: "দুই (২)", en: "Two (2)", hi: "दो (२)", ar: "اثنان (٢)" },
    { digit: "3", img: "🦋", count: 3, bn: "তিন (৩)", en: "Three (3)", hi: "तीन (३)", ar: "ثلاثة (٣)" },
    { digit: "4", img: "🚗", count: 4, bn: "চার (৪)", en: "Four (4)", hi: "चार (४)", ar: "أربعة (٤)" },
    { digit: "5", img: "🖐️", count: 5, bn: "পাঁচ (৫)", en: "Five (5)", hi: "पाँच (५)", ar: "خمسة (٥)" }
];

// লজিক শুরু
let currentCategory = 'alphabet';
let currentLang = 'bn';
let currentIndex = 0;
let activeList = alphabets;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
    window.speechSynthesis.cancel();
}

function selectCategory(cat) {
    currentCategory = cat;
    showScreen('lang-screen');
}

function startLearning(lang) {
    currentLang = lang;
    currentIndex = 0;
    activeList = (currentCategory === 'alphabet') ? alphabets : numbers;
    showScreen('learn-screen');
    loadContent();
    setTimeout(speakCurrent, 500);
}

function loadContent() {
    const item = activeList[currentIndex];
    const imgArea = document.getElementById('image-area');
    
    if(currentCategory === 'alphabet') {
        document.getElementById('display-top').innerText = item.letter;
        imgArea.innerHTML = `<span class="main-img">${item.img}</span>`;
        imgArea.className = "image-container";
        const d = item.data[currentLang];
        document.getElementById('display-text').innerText = d.t;
        document.getElementById('display-pronun').innerText = d.p;
    } else {
        document.getElementById('display-top').innerText = item.digit;
        let html = '<div class="counting-grid">';
        for(let i=0; i<item.count; i++) html += `<span class="count-img">${item.img}</span>`;
        html += '</div>';
        imgArea.innerHTML = html;
        let txt = "";
        if(currentLang === 'bn') txt = item.bn;
        else if(currentLang === 'en') txt = item.en;
        else if(currentLang === 'hi') txt = item.hi;
        else if(currentLang === 'ar') txt = item.ar;
        document.getElementById('display-text').innerText = txt;
        document.getElementById('display-pronun').innerText = "Count objects";
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
    let text = "";
    let lang = 'en-US';
    const item = activeList[currentIndex];

    if(currentLang === 'bn') lang = 'bn-BD';
    else if(currentLang === 'hi') lang = 'hi-IN';
    else if(currentLang === 'ar') lang = 'ar-SA';

    if(currentCategory === 'alphabet') text = item.data[currentLang].p;
    else {
        if(currentLang === 'bn') text = item.bn;
        else if(currentLang === 'en') text = item.en;
        else if(currentLang === 'hi') text = item.hi;
        else if(currentLang === 'ar') text = item.ar;
    }

    let u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    window.speechSynthesis.speak(u);
}

// Drawing Logic
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
let painting = false;

function startDrawing() {
    showScreen('draw-screen');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
}

function startPosition(e) {
    painting = true;
    draw(e);
}
function endPosition() {
    painting = false;
    ctx.beginPath();
}
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Mouse Events
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch Events
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

function setColor(color, btn) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active-color'));
    btn.classList.add('active-color');
}
function setEraser() { ctx.strokeStyle = 'white'; ctx.lineWidth = 25; }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

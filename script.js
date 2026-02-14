// ==========================================
//  ডাটাবেস (ভাষা অনুযায়ী আলাদা বর্ণমালা ও সংখ্যা)
// ==========================================

const alphabetData = {
    // 🇧🇩 বাংলা বর্ণমালা
    bn: [
        { letter: "অ", img: "🐍", word: "অ - তে অজগর", audio: "অ - তে অজগরটি আসছে তেড়ে" },
        { letter: "আ", img: "🥭", word: "আ - তে আম", audio: "আ - তে আমটি আমি খাবো পেড়ে" },
        { letter: "ই", img: "🐭", word: "ই - তে ইঁদুর", audio: "ই - তে ইঁদুর ছানা ভয়ে মরে" },
        { letter: "ঈ", img: "🦅", word: "ঈ - তে ঈগল", audio: "ঈ - তে ঈগল পাখি পাছে ধরে" },
        { letter: "উ", img: "🐪", word: "উ - তে উট", audio: "উ - তে উট চলেছে মুখটি তুলে" }
    ],
    // 🇺🇸 English Alphabets
    en: [
        { letter: "A a", img: "🍎", word: "A for Apple", audio: "A for Apple" },
        { letter: "B b", img: "⚽", word: "B for Ball", audio: "B for Ball" },
        { letter: "C c", img: "🐱", word: "C for Cat", audio: "C for Cat" },
        { letter: "D d", img: "🐶", word: "D for Dog", audio: "D for Dog" },
        { letter: "E e", img: "🐘", word: "E for Elephant", audio: "E for Elephant" }
    ],
    // 🇮🇳 हिन्दी वर्णमाला
    hi: [
        { letter: "अ", img: "🥣", word: "अ से अनार", audio: "अ से अनार (Pomegranate)" },
        { letter: "आ", img: "🥭", word: "आ से आम", audio: "आ से आम (Mango)" },
        { letter: "इ", img: "🍭", word: "इ से इमली", audio: "इ से इमली (Tamarind)" },
        { letter: "ई", img: "🎋", word: "ई से ईख", audio: "ई से ईख (Sugarcane)" },
        { letter: "उ", img: "🦉", word: "उ से उल्लू", audio: "उ से उल्लू (Owl)" }
    ],
    // 🇸🇦 الحروف العربية
    ar: [
        { letter: "أ", img: "🐰", word: "أ - أرنب", audio: "আলিফ - আরনাব (খরগোশ)" },
        { letter: "ب", img: "🦆", word: "ب - بطة", audio: "বা - বাত্তাহ (হাঁস)" },
        { letter: "ت", img: "🍎", word: "ت - تفاحة", audio: "তা - তুফফাহাহ (আপেল)" },
        { letter: "ث", img: "🦊", word: "ث - ثعلب", audio: "ছা - ছা'লাব (শিয়াল)" },
        { letter: "ج", img: "🐪", word: "ج - جمل", audio: "জিম - জামাল (উট)" }
    ]
};

const numberData = {
    // 🇧🇩 বাংলা সংখ্যা
    bn: [
        { digit: "১", img: "🌞", count: 1, text: "এক (১) - সূর্য" },
        { digit: "২", img: "👀", count: 2, text: "দুই (২) - চোখ" },
        { digit: "৩", img: "🚦", count: 3, text: "তিন (৩) - বাতি" },
        { digit: "৪", img: "🚗", count: 4, text: "চার (৪) - চাকা" },
        { digit: "৫", img: "🖐️", count: 5, text: "পাঁচ (৫) - আঙুল" }
    ],
    // 🇺🇸 English Numbers
    en: [
        { digit: "1", img: "🌞", count: 1, text: "One (1) - Sun" },
        { digit: "2", img: "👀", count: 2, text: "Two (2) - Eyes" },
        { digit: "3", img: "🚦", count: 3, text: "Three (3) - Lights" },
        { digit: "4", img: "🚗", count: 4, text: "Four (4) - Wheels" },
        { digit: "5", img: "🖐️", count: 5, text: "Five (5) - Fingers" }
    ],
    // 🇮🇳 हिन्दी गिनती
    hi: [
        { digit: "१", img: "🌞", count: 1, text: "एक (१) - सूरज" },
        { digit: "२", img: "👀", count: 2, text: "दो (२) - आँखें" },
        { digit: "३", img: "🚦", count: 3, text: "तीन (३) - बत्तियां" },
        { digit: "४", img: "🚗", count: 4, text: "चार (४) - पहिए" },
        { digit: "५", img: "🖐️", count: 5, text: "पाँच (५) - उंगलियां" }
    ],
    // 🇸🇦 أرقام عربية
    ar: [
        { digit: "١", img: "🌞", count: 1, text: "ওয়াহিদ (١)" },
        { digit: "٢", img: "👀", count: 2, text: "ইছনান (٢)" },
        { digit: "٣", img: "🚦", count: 3, text: "ছালাছাহ (٣)" },
        { digit: "٤", img: "🚗", count: 4, text: "আরবাআ (٤)" },
        { digit: "٥", img: "🖐️", count: 5, text: "খামসা (٥)" }
    ]
};

// ==========================================
//  লজিক (Logic)
// ==========================================

let currentCategory = 'alphabet'; // 'alphabet' or 'number'
let currentLang = 'bn';
let currentIndex = 0;
let activeList = []; // এখন খালি থাকবে, ভাষা সিলেক্ট করলে ডাটা আসবে

// স্ক্রিন পরিবর্তনের ফাংশন
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

// শেখা শুরু (Main Logic Change Here)
function startLearning(lang) {
    currentLang = lang;
    currentIndex = 0;
    
    // ক্যাটাগরি এবং ভাষা অনুযায়ী লিস্ট সিলেক্ট করা
    if(currentCategory === 'alphabet') {
        activeList = alphabetData[lang]; // যেমন: alphabetData['bn']
    } else {
        activeList = numberData[lang];   // যেমন: numberData['ar']
    }

    showScreen('learn-screen');
    loadContent();
    setTimeout(speakCurrent, 500);
}

// কন্টেন্ট লোড করা
function loadContent() {
    const item = activeList[currentIndex];
    const imgArea = document.getElementById('image-area');
    
    if(currentCategory === 'alphabet') {
        // বর্ণমালা মোড
        document.getElementById('display-top').innerText = item.letter;
        imgArea.innerHTML = `<span class="main-img">${item.img}</span>`;
        imgArea.className = "image-container";
        
        document.getElementById('display-text').innerText = item.word;
        document.getElementById('display-pronun').innerText = "🔊 শুনতে ক্লিক করো";
    } else {
        // গণনা মোড
        document.getElementById('display-top').innerText = item.digit;
        
        // সংখ্যার সমান ছবি তৈরি করা
        let html = '<div class="counting-grid">';
        for(let i=0; i<item.count; i++) {
            html += `<span class="count-img">${item.img}</span>`;
        }
        html += '</div>';
        imgArea.innerHTML = html;
        imgArea.className = "image-container";

        document.getElementById('display-text').innerText = item.text;
        document.getElementById('display-pronun').innerText = "গণনা করো";
    }
}

// পেজ পরিবর্তন
function changeItem(dir) {
    currentIndex += dir;
    if(currentIndex >= activeList.length) currentIndex = 0;
    if(currentIndex < 0) currentIndex = activeList.length - 1;
    
    window.speechSynthesis.cancel();
    loadContent();
    speakCurrent();
}

// সাউন্ড (Text to Speech)
function speakCurrent() {
    const item = activeList[currentIndex];
    let text = "";
    let langCode = 'en-US';

    // ১. ভাষা কোড সেট করা
    if(currentLang === 'bn') langCode = 'bn-BD';
    else if(currentLang === 'hi') langCode = 'hi-IN';
    else if(currentLang === 'ar') langCode = 'ar-SA'; // আরবি উচ্চারণ
    else langCode = 'en-US';

    // ২. টেক্সট ঠিক করা
    if(currentCategory === 'alphabet') {
        text = item.audio; // বর্ণমালার অডিও টেক্সট
    } else {
        text = item.text;  // নাম্বারের টেক্সট
    }

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.9; // স্বাভাবিক গতি
    window.speechSynthesis.speak(utterance);
}

// ==========================================
//  🎨 আঁকাআঁকি (Drawing) লজিক
// ==========================================
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
    
    // মোবাইল টাচ ও মাউস দুটোর জন্যই পজিশন বের করা
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if(e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// ইভেন্ট লিসেনার
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

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

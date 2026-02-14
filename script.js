// ==========================================
//  ডাটাবেস
// ==========================================
const alphabetData = {
    bn: [ {l:"অ"}, {l:"আ"}, {l:"ই"}, {l:"ঈ"}, {l:"উ"}, {l:"ঊ"}, {l:"ঋ"}, {l:"এ"}, {l:"ঐ"}, {l:"ও"}, {l:"ঔ"}, {l:"ক"}, {l:"খ"} ],
    en: [ {l:"A"}, {l:"B"}, {l:"C"}, {l:"D"}, {l:"E"}, {l:"F"}, {l:"G"}, {l:"H"}, {l:"I"}, {l:"J"}, {l:"K"}, {l:"L"}, {l:"M"} ],
    hi: [ {l:"अ"}, {l:"आ"}, {l:"इ"}, {l:"ई"}, {l:"उ"}, {l:"क"}, {l:"ख"}, {l:"ग"}, {l:"घ"} ],
    ar: [ {l:"أ"}, {l:"ب"}, {l:"ت"}, {l:"ث"}, {l:"ج"}, {l:"ح"}, {l:"خ"}, {l:"د"} ]
};

// শেখার জন্য ডাটা (Learning Data)
const learnData = {
    bn: [ {t:"অ - অজগর", i:"🐍", a:"অ - তে অজগর"}, {t:"আ - আম", i:"🥭", a:"আ - তে আম"} ], // এখানে আগের মতো সব ডাটা রাখবেন
    en: [ {t:"A - Apple", i:"🍎", a:"A for Apple"}, {t:"B - Ball", i:"⚽", a:"B for Ball"} ],
    ar: [ {t:"أ - আরনাব", i:"🐰", a:"আলিফ"}, {t:"ب - বাত্তাহ", i:"🦆", a:"বা"} ]
};
// (নোট: কোড ছোট রাখার জন্য আমি লার্নিং ডাটা কম দিয়েছি, আপনি আগেরগুলো কপি করে নেবেন)


// ==========================================
//  লজিক (Logic)
// ==========================================

let currentCategory = 'alphabet'; // 'alphabet', 'number', 'draw'
let currentLang = 'bn';
let currentIndex = 0;
let traceIndex = -1; // -1 মানে সাদা পেজ, 0 থেকে অক্ষর শুরু

// স্ক্রিন কন্ট্রোল
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
    // সব ক্ষেত্রেই ভাষা সিলেক্ট করতে হবে
    showScreen('lang-screen');
}

// মেইন স্টার্ট ফাংশন
function startLearning(lang) {
    currentLang = lang;
    currentIndex = 0;

    if (currentCategory === 'draw') {
        // ড্রয়িং মোড হলে
        startDrawing();
    } else {
        // লার্নিং মোড হলে
        showScreen('learn-screen');
        // এখানে লার্নিং লোড করার কোড থাকবে (আগের মতো)
        // loadLearningContent(); 
    }
}

// ==========================================
//  🎨 ড্রয়িং এবং ট্রেসিং লজিক
// ==========================================
const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
let painting = false;

function startDrawing() {
    showScreen('draw-screen');
    // ক্যানভাস সাইজ
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // ডিফল্ট সেটিংস
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    // শুরুতে সাদা পেজ থাকবে নাকি প্রথম অক্ষর আসবে?
    traceIndex = 0; // প্রথম অক্ষর দিয়েই শুরু করি
    drawGuideLetter();
}

// আবছা অক্ষর (Watermark) আঁকার ফাংশন
function drawGuideLetter() {
    // ১. ক্যানভাস পরিষ্কার করা
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // ২. যদি লিস্টের বাইরে যায় বা -1 হয়, তবে সাদা পেজ
    if (traceIndex < 0) {
        document.getElementById('trace-status').innerText = "সাদা পেজ (Free)";
        return;
    }
    
    // ৩. বর্তমান ভাষার অক্ষর আনা
    let letters = alphabetData[currentLang];
    
    // যদি ডাটা না থাকে
    if(!letters || !letters[traceIndex]) {
        traceIndex = 0; // রিসেট
    }
    
    let char = letters[traceIndex].l;
    document.getElementById('trace-status').innerText = "অনুশীলন: " + char;

    // ৪. আবছা করে অক্ষর লেখা
    ctx.save(); // সেটিংস সেভ
    ctx.font = "bold 250px Arial, Kalpurush"; // বড় ফন্ট
    ctx.fillStyle = "#e0e0e0"; // একদম হালকা ছাই রঙ (Watermark)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // ক্যানভাসের মাঝখানে লেখা
    ctx.fillText(char, canvas.width/2, canvas.height/2);
    ctx.restore(); // সেটিংস রিস্টোর (যাতে কালো কলম ঠিক থাকে)
}

// অক্ষর পরিবর্তন করা (Next/Prev)
function changeTrace(dir) {
    let max = alphabetData[currentLang].length;
    traceIndex += dir;
    
    // লজিক: -1 (সাদা) -> ০ (A) -> ১ (B) ...
    if (traceIndex >= max) traceIndex = -1; // শেষে গেলে আবার সাদা
    if (traceIndex < -1) traceIndex = max - 1; // শুরুতে গেলে শেষে
    
    drawGuideLetter();
}

// ড্রয়িং ফাংশন (আগের মতোই)
function startPosition(e) { painting = true; draw(e); }
function endPosition() { painting = false; ctx.beginPath(); }

function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    
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

// টুলস
function setColor(color, btn) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    // কালার সিলেকশন ইফেক্ট
    if(btn) {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active-color'));
        btn.classList.add('active-color');
    }
}
function setEraser() { ctx.strokeStyle = 'white'; ctx.lineWidth = 30; }

// সাফ করার সময় আবছা অক্ষরটি যেন মুছে না যায়
function clearCanvas() {
    drawGuideLetter(); // আবার গাইড লেটারটি এঁকে দেবে, কিন্তু কালো দাগ মুছে যাবে
    }

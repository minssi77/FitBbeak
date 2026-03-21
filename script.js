const i18n = {
    en: {
        brand: 'FitBbeak',
        labelReady: 'Ready Time',
        labelInterval: 'Interval',
        labelBeeps: 'Beeps/Rep',
        labelGoal: 'Goal Reps',
        start: 'START WORKOUT',
        pause: 'PAUSE',
        resume: 'RESUME',
        stop: 'STOP',
        statusReady: 'Ready?',
        statusPreparing: 'Prepare!',
        statusWorkout: 'GO!',
        statusFinished: 'Done!',
        statusStopped: 'Stopped',
        guideTitle: 'Why Workout Tempo Matters?',
        guideContent: '<p>Maintaining a consistent tempo during exercises like squats and push-ups is crucial for maximizing muscle growth and minimizing the risk of injury. <strong>FitBbeak</strong> helps you focus purely on your movement by providing precise auditory signals.</p><p>The science of "Time Under Tension" (TUT) shows that controlled repetitions lead to better neuromuscular adaptation. By setting your ideal interval with <strong>FitBbeak</strong>, you can ensure every rep counts.</p>',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        support: 'Support (Toss Me)',
        unitSec: 'sec',
        unitCount: 'count',
        unitReps: 'reps'
    },
    ko: {
        brand: '핏삑',
        labelReady: '준비 시간',
        labelInterval: '신호 간격',
        labelBeeps: '카운트당 삑',
        labelGoal: '목표 횟수',
        start: '운동 시작',
        pause: '일시정지',
        resume: '재개',
        stop: '중료',
        statusReady: '준비됐나요?',
        statusPreparing: '준비하세요!',
        statusWorkout: '시작!',
        statusFinished: '달성!',
        statusStopped: '중단됨',
        guideTitle: '운동 템포가 왜 중요한가요?',
        guideContent: '<p>스쿼트와 푸시업 같은 운동에서 일정한 템포를 유지하는 것은 근성장을 극대화하고 부상 위험을 최소화하는 데 매우 중요합니다. <strong>핏삑</strong>은 정확한 청각 신호를 제공하여 오직 동작에만 집중할 수 있도록 돕습니다.</p><p>긴장 상태 유지 시간(TUT) 이론에 따르면 통제된 반복 동작은 더 나은 신경근 적응을 이끌어냅니다. <strong>핏삑</strong>으로 이상적인 간격을 설정하여 매 순간의 효율을 높여보세요.</p>',
        privacy: '개인정보 처리방침',
        terms: '이용약관',
        support: '후원하기 (Toss Me)',
        unitSec: '초',
        unitCount: '회',
        unitReps: '개'
    },
    de: {
        brand: 'FitBbeak',
        labelReady: 'Vorbereitung',
        labelInterval: 'Intervall',
        labelBeeps: 'Pieptöne/Wdh.',
        labelGoal: 'Ziel Wdh.',
        start: 'STARTEN',
        pause: 'PAUSE',
        resume: 'WEITER',
        stop: 'STOPP',
        statusReady: 'Bereit?',
        statusPreparing: 'Fertig machen!',
        statusWorkout: 'LOS!',
        statusFinished: 'Fertig!',
        statusStopped: 'Gestoppt',
        guideTitle: 'Warum das Workout-Tempo wichtig ist',
        guideContent: '<p>Ein konstantes Tempo bei Übungen like squats and push-ups is crucial. <strong>FitBbeak</strong> helps you focus through precise acoustic signals.</p>',
        privacy: 'Datenschutz',
        terms: 'AGB',
        support: 'Support (Toss Me)',
        unitSec: 'Sek',
        unitCount: 'Zähl',
        unitReps: 'Wdh'
    },
    es: {
        brand: 'FitBbeak',
        labelReady: 'Preparación',
        labelInterval: 'Intervalo',
        labelBeeps: 'Pitidos/Rep',
        labelGoal: 'Meta Reps',
        start: 'EMPEZAR',
        pause: 'PAUSA',
        resume: 'REANUDAR',
        stop: 'PARAR',
        statusReady: '¿Listo?',
        statusPreparing: '¡Prepárate!',
        statusWorkout: '¡VAMOS!',
        statusFinished: '¡Meta!',
        statusStopped: 'Detenido',
        guideTitle: '¿Por qué importa el ritmo?',
        guideContent: '<p>Mantener un ritmo constante ayuda a maximizar el crecimiento muscular. <strong>FitBbeak</strong> te ayuda con señales auditivas precisas.</p>',
        privacy: 'Privacidad',
        terms: 'Términos',
        support: 'Apoyar (Toss Me)',
        unitSec: 'seg',
        unitCount: 'cont',
        unitReps: 'reps'
    }
};

/**
 * Hybrid Wheel Picker Class
 * Handles 3D rotation, snapping, and direct input mode.
 */
class WheelPicker {
    constructor(id, min, max, step, initialValue, onUpdate, isLoop = true) {
        this.id = id;
        this.container = document.querySelector(`.number-control[data-target="${id}"] .wheel-picker`);
        this.scroller = this.container.querySelector('.wheel-scroller');
        this.input = this.container.querySelector('.wheel-input');
        this.viewport = this.container.querySelector('.wheel-viewport');
        this.min = min;
        this.max = max;
        this.step = step;
        this.value = initialValue;
        this.onUpdate = onUpdate;
        this.isLoop = isLoop;
        this.cloneCount = 5;
        
        this.itemHeight = 30;
        this.items = [];
        this.startY = 0;
        this.translateY = 0;
        this.startTranslateY = 0;
        this.wheelTimeout = null;

        this.init();
    }

    init() {
        this.generateItems();
        this.addEventListeners();
        // Delay initial render to ensure container height is available
        setTimeout(() => this.scrollToValue(this.value, false), 0);
    }

    generateItems() {
        this.scroller.innerHTML = '';
        this.items = [];
        let values = (this.id === 'interval') ? this.getIntervalValues() : [];

        if (this.id !== 'interval') {
            for (let v = this.min; v <= this.max; v = parseFloat((v + this.step).toFixed(2))) {
                values.push(v);
            }
        }

        const renderValues = this.isLoop ? 
            [...values.slice(-this.cloneCount), ...values, ...values.slice(0, this.cloneCount)] : 
            values;

        renderValues.forEach(v => {
            const item = document.createElement('div');
            item.className = 'wheel-item';
            item.innerText = v;
            item.dataset.value = v;
            this.scroller.appendChild(item);
            this.items.push(item);
        });
    }

    render() {
        const centerOffset = (this.container.offsetHeight / 2) - (this.itemHeight / 2);
        this.translateY = centerOffset - (this.getScrollIndexByValue(this.value) * this.itemHeight);
        this.scroller.style.transform = `translateY(${this.translateY}px)`;
        this.updateItemStyles();
    }

    getScrollIndexByValue(val) {
        if (this.id === 'interval') {
            const values = this.getIntervalValues();
            const baseIndex = values.indexOf(val);
            return this.isLoop ? baseIndex + this.cloneCount : baseIndex;
        }
        const baseIndex = Math.round((val - this.min) / this.step);
        return this.isLoop ? baseIndex + this.cloneCount : baseIndex;
    }

    getIntervalValues() {
        let values = [];
        for (let v = 0.1; v <= 0.8; v = parseFloat((v + 0.1).toFixed(2))) values.push(v);
        for (let v = 0.81; v <= 1.49; v = parseFloat((v + 0.01).toFixed(2))) values.push(v);
        for (let v = 1.5; v <= 1.9; v = parseFloat((v + 0.1).toFixed(2))) values.push(v);
        return values;
    }

    updateItemStyles() {
        const centerOffset = (this.container.offsetHeight / 2) - (this.itemHeight / 2);
        const relativeScroll = -(this.translateY - centerOffset);
        
        this.items.forEach((item, index) => {
            const itemPos = index * this.itemHeight;
            const diff = Math.abs(relativeScroll - itemPos);
            
            item.classList.remove('active', 'nearby', 'far');
            
            if (diff < this.itemHeight * 0.4) {
                item.classList.add('active');
            } else if (diff < this.itemHeight * 1.2) {
                item.classList.add('nearby');
            } else {
                item.classList.add('far');
            }
            
            // Dramatic 3D effect
            const rotation = (itemPos - relativeScroll) / 35 * 65;
            const scale = 1 - (diff / 120);
            const z = (diff < 12) ? 15 : 0;
            item.style.transform = `rotateX(${rotation}deg) scale(${scale}) translateZ(${z}px)`;
            item.style.opacity = Math.max(0.1, 1 - (diff / 60));
        });
    }

    setTranslateY(y) {
        this.translateY = y;
        
        if (this.isLoop) {
            const originalCount = this.items.length - (2 * this.cloneCount);
            const totalHeight = originalCount * this.itemHeight;
            const centerOffset = (this.container.offsetHeight / 2) - (this.itemHeight / 2);
            
            const minBound = centerOffset - (this.items.length - this.cloneCount) * this.itemHeight;
            const maxBound = centerOffset - (this.cloneCount - 1) * this.itemHeight;
            
            if (this.translateY < minBound) this.translateY += totalHeight;
            if (this.translateY > maxBound) this.translateY -= totalHeight;
        }

        this.scroller.style.transform = `translateY(${this.translateY}px)`;
        this.updateItemStyles();
    }

    scrollToValue(val, animate = true) {
        this.value = val;
        this.input.value = val;
        this.scroller.style.transition = animate ? 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
        this.render();
    }

    addEventListeners() {
        let isDragging = false;
        
        const onStart = (y) => {
            isDragging = true;
            this.startY = y;
            this.startTranslateY = this.translateY;
            this.scroller.style.transition = 'none';
            this.viewport.style.cursor = 'grabbing';
        };

        const onMove = (y) => {
            if (!isDragging) return;
            const dy = y - this.startY;
            this.setTranslateY(this.startTranslateY + dy);
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            this.viewport.style.cursor = 'ns-resize';
            this.snap();
        };

        // Desktop
        this.viewport.addEventListener('mousedown', e => onStart(e.pageY));
        window.addEventListener('mousemove', e => onMove(e.pageY));
        window.addEventListener('mouseup', onEnd);

        // Touch
        this.viewport.addEventListener('touchstart', e => onStart(e.touches[0].pageY));
        this.viewport.addEventListener('touchmove', e => {
            e.preventDefault();
            onMove(e.touches[0].pageY);
        }, { passive: false });
        this.viewport.addEventListener('touchend', onEnd);

        // Wheel
        this.container.addEventListener('wheel', e => {
            e.preventDefault();
            this.scroller.style.transition = 'none';
            this.setTranslateY(this.translateY - e.deltaY * 0.5);
            
            clearTimeout(this.wheelTimeout);
            this.wheelTimeout = setTimeout(() => this.snap(), 150);
        }, { passive: false });

        // Tap to Edit
        this.viewport.addEventListener('click', (e) => {
            if (Math.abs(this.translateY - this.startTranslateY) < 5) {
                this.input.classList.remove('hidden');
                this.input.focus();
                this.input.select();
            }
        });

        this.input.addEventListener('blur', () => {
            this.input.classList.add('hidden');
            this.setValue(this.input.value);
        });

        this.input.addEventListener('keypress', e => {
            if (e.key === 'Enter') this.input.blur();
        });
    }

    snap() {
        const centerOffset = (this.container.offsetHeight / 2) - (this.itemHeight / 2);
        const index = Math.round((centerOffset - this.translateY) / this.itemHeight);
        const clampedIndex = Math.max(0, Math.min(this.items.length - 1, index));
        const item = this.items[clampedIndex];
        const val = parseFloat(item.dataset.value);
        this.setValue(val, true);
    }

    setValue(val, animate = true) {
        val = parseFloat(val);
        if (isNaN(val)) val = this.min;

        if (this.isLoop) {
            if (val > this.max) val = this.min;
            else if (val < this.min) val = this.max;
        } else {
            val = Math.max(this.min, Math.min(this.max, val));
        }
        
        this.value = val;
        this.scrollToValue(val, animate);
        if (this.onUpdate) this.onUpdate(val);
    }
}

// State Management
let state = {
    lang: localStorage.getItem('fitbbeak_lang') || 'en',
    theme: localStorage.getItem('fitbbeak_theme') || 'dark',
    isWorkoutRunning: false,
    isPaused: false,
    readyTime: Math.min(9, parseInt(localStorage.getItem('fitbbeak_readyTime')) || 5),
    interval: Math.min(1.9, parseFloat(localStorage.getItem('fitbbeak_interval')) || 1.5),
    beepsPerRep: Math.min(19, parseInt(localStorage.getItem('fitbbeak_beepsPerRep')) || 2),
    maxReps: Math.min(199, parseInt(localStorage.getItem('fitbbeak_maxReps')) || 20),
    currentCount: 0,
    currentBeep: 0,
    startTime: null,
    timer: null,
    countdownTimer: null,
    audioCtx: null
};

// DOM Elements
const elements = {
    body: document.body,
    brandHeader: document.getElementById('brand-header'),
    langSelect: document.getElementById('langSelect'),
    themeToggle: document.getElementById('theme-toggle'),
    counter: document.getElementById('counter'),
    statusText: document.getElementById('status-text'),
    startBtn: document.getElementById('startBtn'),
    activeBtns: document.getElementById('activeBtns'),
    pauseBtn: document.getElementById('pauseBtn'),
    stopBtn: document.getElementById('stopBtn'),
    mainContainer: document.getElementById('main-container'),
    flashOverlay: document.getElementById('flash-overlay'),
    progressRing: document.querySelector('.progress-ring__circle'),
    guideTitle: document.getElementById('guide-title'),
    guideContent: document.getElementById('guide-content'),
    linkPrivacy: document.getElementById('link-privacy'),
    linkTerms: document.getElementById('link-terms'),
    linkSupport: document.getElementById('link-support'),
    copyright: document.getElementById('copyright')
};

// Picker Instances
let pickers = {};
function initPickers() {
    pickers.readyTime = new WheelPicker('readyTime', 1, 9, 1, state.readyTime, (val) => {
        state.readyTime = val;
        localStorage.setItem('fitbbeak_readyTime', val);
    }, true);
    pickers.interval = new WheelPicker('interval', 0.1, 1.9, 0.1, state.interval, (val) => {
        state.interval = val;
        localStorage.setItem('fitbbeak_interval', val);
        if (state.isWorkoutRunning && !state.isPaused) restartWorkoutTimer();
    }, true, 10);
    pickers.beepsPerRep = new WheelPicker('beepsPerRep', 1, 19, 1, state.beepsPerRep, (val) => {
        state.beepsPerRep = val;
        localStorage.setItem('fitbbeak_beepsPerRep', val);
    }, true);
    pickers.maxReps = new WheelPicker('maxReps', 1, 199, 1, state.maxReps, (val) => {
        state.maxReps = val;
        localStorage.setItem('fitbbeak_maxReps', val);
    }, true);
}

// Progress Ring Configuration
const radius = elements.progressRing.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
elements.progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
elements.progressRing.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    elements.progressRing.style.strokeDashoffset = offset;
}

// Audio Engine
function playSound(freq, duration = 0.1, volume = 0.5, type = 'sine') {
    if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (state.audioCtx.state === 'suspended') state.audioCtx.resume();

    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);

    gain.gain.setValueAtTime(volume, state.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, state.audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(state.audioCtx.destination);

    osc.start();
    osc.stop(state.audioCtx.currentTime + duration);

    // Visual Flash
    elements.flashOverlay.classList.remove('flash-active');
    void elements.flashOverlay.offsetWidth;
    elements.flashOverlay.classList.add('flash-active');
}

// UI Updates
function updateUI() {
    const data = i18n[state.lang];
    elements.brandHeader.innerText = data.brand;
    document.getElementById('label-ready').innerText = data.labelReady;
    document.getElementById('label-interval').innerText = data.labelInterval;
    document.getElementById('label-beeps').innerText = data.labelBeeps;
    document.getElementById('label-goal').innerText = data.labelGoal;
    elements.startBtn.innerText = data.start;
    elements.stopBtn.innerText = data.stop;
    elements.pauseBtn.innerText = state.isPaused ? data.resume : data.pause;
    elements.guideTitle.innerText = data.guideTitle;
    elements.guideContent.innerHTML = data.guideContent;
    elements.linkPrivacy.innerText = data.privacy;
    elements.linkTerms.innerText = data.terms;
    elements.linkSupport.innerText = data.support;
    elements.copyright.innerText = `© 2026 ${data.brand}. All rights reserved.`;

    // New: Units
    document.getElementById('unit-ready').innerText = data.unitSec;
    document.getElementById('unit-interval').innerText = data.unitSec;
    document.getElementById('unit-beeps').innerText = data.unitCount;
    document.getElementById('unit-goal').innerText = data.unitReps;

    // Theme
    elements.body.className = state.theme === 'dark' ? 'dark-mode' : '';
}

// Actions
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fitbbeak_theme', state.theme);
    updateUI();
}

function adjustValue(id, dir) {
    const picker = pickers[id];
    let val = picker.value;
    let step = picker.step;
    
    // Smart Step for interval (kept from original)
    if (id === 'interval') {
        if (dir === 1) { // Increasing
            if (val < 0.795) step = 0.1;
            else if (val >= 0.795 && val < 1.495) step = 0.01;
            else step = 0.1;
        } else { // Decreasing
            if (val <= 0.805) step = 0.1;
            else if (val > 0.805 && val <= 1.505) step = 0.01;
            else step = 0.1;
        }
    }

    val = val + (step * dir);
    val = parseFloat(val.toFixed(id === 'interval' ? 2 : 0));
    
    picker.setValue(val);
}

function startWorkout() {
    state.isWorkoutRunning = true;
    state.isPaused = false;
    state.currentCount = 0;
    state.currentBeep = 0;
    
    elements.startBtn.classList.add('hidden');
    elements.activeBtns.classList.remove('hidden');
    
    let prepCount = state.readyTime;
    elements.statusText.innerText = i18n[state.lang].statusPreparing;
    elements.counter.innerText = prepCount;
    elements.mainContainer.classList.add('counting-down');
    
    playSound(440, 0.1, 0.3, 'square'); // Prep beep

    state.countdownTimer = setInterval(() => {
        if (state.isPaused) return;
        prepCount--;
        if (prepCount > 0) {
            elements.counter.innerText = prepCount;
            playSound(440, 0.1, 0.3, 'square');
            setProgress(( (state.readyTime - prepCount) / state.readyTime) * 100);
        } else {
            clearInterval(state.countdownTimer);
            elements.mainContainer.classList.remove('counting-down');
            playSound(880, 0.3, 0.6, 'sine'); // Start beep
            runWorkoutLoop();
        }
    }, 1000);
}

function runWorkoutLoop() {
    elements.statusText.innerText = i18n[state.lang].statusWorkout;
    elements.counter.innerText = "0";
    setProgress(0);

    const ms = state.interval * 1000;
    state.timer = setInterval(() => {
        if (state.isPaused) return;

        state.currentBeep++;
        const isLastBeep = state.currentBeep >= state.beepsPerRep;
        
        // Progress within a rep
        setProgress((state.currentBeep / state.beepsPerRep) * 100);

        if (isLastBeep) {
            state.currentCount++;
            state.currentBeep = 0;
            elements.counter.innerText = state.currentCount;
            playSound(1200, 0.2, 0.5, 'triangle'); // Rep complete
            
            // Visual feedback
            elements.counter.style.transform = "scale(1.2)";
            setTimeout(() => elements.counter.style.transform = "scale(1)", 100);

            if (state.currentCount >= state.maxReps) {
                finishWorkout();
            }
        } else {
            playSound(600, 0.1, 0.4, 'sine'); // Normal beep
        }
    }, ms);
}

function restartWorkoutTimer() {
    clearInterval(state.timer);
    runWorkoutLoop();
}

function pauseWorkout() {
    state.isPaused = !state.isPaused;
    elements.pauseBtn.innerText = state.isPaused ? i18n[state.lang].resume : i18n[state.lang].pause;
}

function stopWorkout() {
    clearInterval(state.timer);
    clearInterval(state.countdownTimer);
    state.isWorkoutRunning = false;
    state.isPaused = false;
    
    elements.startBtn.classList.remove('hidden');
    elements.activeBtns.classList.add('hidden');
    elements.statusText.innerText = i18n[state.lang].statusStopped;
    elements.counter.innerText = "0";
    setProgress(0);
    elements.mainContainer.classList.remove('counting-down');
}

function finishWorkout() {
    stopWorkout();
    elements.statusText.innerText = i18n[state.lang].statusFinished;
    playSound(1500, 0.5, 0.6, 'sine');
}

// Event Listeners
elements.langSelect.addEventListener('change', (e) => {
    state.lang = e.target.value;
    localStorage.setItem('fitbbeak_lang', state.lang);
    updateUI();
});

elements.themeToggle.addEventListener('click', toggleTheme);

document.querySelectorAll('.btn-adjust').forEach(btn => {
    btn.addEventListener('click', () => {
        adjustValue(btn.dataset.target, parseInt(btn.dataset.dir));
    });
});

elements.startBtn.addEventListener('click', startWorkout);
elements.pauseBtn.addEventListener('click', pauseWorkout);
elements.stopBtn.addEventListener('click', stopWorkout);

// Init
elements.langSelect.value = state.lang;
initPickers();
updateUI();
setProgress(0);

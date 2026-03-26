/* Copyright 2026 NUREUM Labs (JIHO MIN). All rights reserved. ButtonNureum@gmail.com */
(function() {
    'use strict';
    console.log('Protected by NUREUM Labs');

    const FitBbeak_i18n = {
        en: { brand: 'FitBbeak', labelReady: 'Ready Time', labelInterval: 'Interval', labelBeeps: 'Beeps/Rep', labelGoal: 'Goal Reps', start: 'START WORKOUT', pause: 'PAUSE', resume: 'RESUME', stop: 'STOP', statusReady: 'Ready?', statusPreparing: 'Prepare!', statusWorkout: 'GO!', statusFinished: 'Done!', statusStopped: 'Stopped', unitSec: 'sec', unitCount: 'count', unitReps: 'reps', speechStart: 'Start', speechRest: 'Rest', speechFinished: 'Great job' },
        ko: { brand: '핏삑', labelReady: '준비 시간', labelInterval: '신호 간격', labelBeeps: '카운트당 삑', labelGoal: '목표 횟수', start: '운동 시작', pause: '일시정지', resume: '재개', stop: '종료', statusReady: '준비됐나요?', statusPreparing: '준비하세요!', statusWorkout: '시작!', statusFinished: '달성!', statusStopped: '중단됨', unitSec: '초', unitCount: '회', unitReps: '개', speechStart: '시작', speechRest: '휴식', speechFinished: '수고하셨습니다' },
        de: { brand: 'FitBbeak', labelReady: 'Vorbereitung', labelInterval: 'Intervall', labelBeeps: 'Pieptöne/Wdh.', labelGoal: 'Ziel Wdh.', start: 'STARTEN', pause: 'PAUSE', resume: 'WEITER', stop: 'STOPP', statusReady: 'Bereit?', statusPreparing: 'Fertig machen!', statusWorkout: 'LOS!', statusFinished: 'Fertig!', statusStopped: 'Gestoppt', guideTitle: 'Warum das Workout-Tempo wichtig ist', guideContent: '<p>...</p>', privacy: 'Datenschutz', terms: 'AGB', support: 'Support (Toss Me)', unitSec: 'Sek', unitCount: 'Zähl', unitReps: 'Wdh', speechStart: 'Start', speechRest: 'Pause', speechFinished: 'Gut gemacht' },
        es: { brand: 'FitBbeak', labelReady: 'Preparación', labelInterval: 'Intervalo', labelBeeps: 'Pitidos/Rep', labelGoal: 'Meta Reps', start: 'EMPEZAR', pause: 'PAUSA', resume: 'REANUDAR', stop: 'PARAR', statusReady: '¿Listo?', statusPreparing: '¡Prepárate!', statusWorkout: '¡VAMOS!', statusFinished: '¡Meta!', statusStopped: 'Detenido', unitSec: 'seg', unitCount: 'cont', unitReps: 'reps', speechStart: 'Inicio', speechRest: 'Descanso', speechFinished: 'Buen trabajo' }
    };

    class FitBbeak_Picker {
        constructor(a, b, c, d, e, f, g = true) {
            this.id = a;
            this.cnt = document.querySelector(`.number-control[data-target="${a}"] .wheel-picker`);
            this.scr = this.cnt.querySelector('.wheel-scroller');
            this.inp = this.cnt.querySelector('.wheel-input');
            this.vpt = this.cnt.querySelector('.wheel-viewport');
            this.min = b; this.max = c; this.stp = d; this.val = e; this.upd = f; this.lp = g; this.cc = 5;
            this.ih = 30; this.its = []; this.sy = 0; this.ty = 0; this.sty = 0; this.to = null;
            this._i();
        }
        _i() {
            this._g(); this._e();
            setTimeout(() => {
                if (this.its.length > 0) {
                    const h = parseFloat(window.getComputedStyle(this.its[0]).height);
                    this.ih = h > 0 ? h : 30;
                }
                this.sv(this.val, false);
            }, 50);
            window.addEventListener('resize', () => {
                if (this.its.length > 0) {
                    const h = parseFloat(window.getComputedStyle(this.its[0]).height);
                    if (h > 0) this.ih = h;
                }
                this.rn();
            });
        }
        _g() {
            this.scr.innerHTML = ''; this.its = [];
            let v_s = (this.id === 'interval') ? this._gv() : [];
            if (this.id !== 'interval') for (let v = this.min; v <= this.max; v = parseFloat((v + this.stp).toFixed(2))) v_s.push(v);
            const r_v = this.lp ? [...v_s.slice(-this.cc), ...v_s, ...v_s.slice(0, this.cc)] : v_s;
            r_v.forEach(v => {
                const i = document.createElement('div');
                i.className = 'wheel-item';
                i.innerText = (this.id === 'interval' && v >= 0.81 && v <= 1.49) ? v.toFixed(2) : v;
                i.dataset.value = v;
                this.scr.appendChild(i); this.its.push(i);
            });
        }
        rn() {
            const h = this.cnt.getBoundingClientRect().height;
            if (h <= 0) return;
            const co = (h / 2) - (this.ih / 2);
            this.ty = co - (this._gi(this.val) * this.ih);
            this.scr.style.transform = `translateY(${this.ty}px)`;
            this._us();
        }
        _gi(v) {
            if (this.id === 'interval') {
                const v_s = this._gv();
                const bi = v_s.indexOf(v);
                return this.lp ? bi + this.cc : bi;
            }
            const bi = Math.round((v - this.min) / this.stp);
            return this.lp ? bi + this.cc : bi;
        }
        _gv() {
            let v = [];
            for (let i = 0.1; i <= 0.8; i = parseFloat((i + 0.1).toFixed(2))) v.push(i);
            for (let i = 0.81; i <= 1.49; i = parseFloat((i + 0.01).toFixed(2))) v.push(i);
            for (let i = 1.5; i <= 2.5; i = parseFloat((i + 0.1).toFixed(2))) v.push(i);
            for (let i = 3.0; i <= 5.0; i = parseFloat((i + 0.5).toFixed(2))) v.push(i);
            return v;
        }
        _us() {
            const co = (this.cnt.getBoundingClientRect().height / 2) - (this.ih / 2);
            const rs = -(this.ty - co);
            this.its.forEach((i, idx) => {
                const ip = idx * this.ih;
                const d = Math.abs(rs - ip);
                i.classList.remove('active', 'nearby', 'far');
                if (d < this.ih * 0.4) i.classList.add('active');
                else if (d < this.ih * 1.2) i.classList.add('nearby');
                else i.classList.add('far');
                const rot = (ip - rs) / 35 * 65;
                const s = 1 - (d / 120);
                const z = (d < 12) ? 15 : 0;
                i.style.transform = `rotateX(${rot}deg) scale(${s}) translateZ(${z}px)`;
                i.style.opacity = Math.max(0.1, 1 - (d / 60));
            });
        }
        _st(y) {
            this.ty = y;
            if (this.lp) {
                const oc = this.its.length - (2 * this.cc);
                const th = oc * this.ih;
                const co = (this.cnt.getBoundingClientRect().height / 2) - (this.ih / 2);
                const mb = co - (this.its.length - this.cc) * this.ih;
                const max_b = co - (this.cc - 1) * this.ih;
                if (this.ty < mb) this.ty += th;
                if (this.ty > max_b) this.ty -= th;
            }
            this.scr.style.transform = `translateY(${this.ty}px)`;
            this._us();
        }
        sv(v, a = true) {
            this.val = v; this.inp.value = v;
            this.scr.style.transition = a ? 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
            this.rn();
        }
        _e() {
            let id = false;
            const os = (y) => { id = true; this.sy = y; this.sty = this.ty; this.scr.style.transition = 'none'; this.vpt.style.cursor = 'grabbing'; };
            const om = (y) => { if (!id) return; const dy = y - this.sy; this._st(this.sty + dy); };
            const oe = () => { if (!id) return; id = false; this.vpt.style.cursor = 'ns-resize'; this.sn(); };
            this.vpt.addEventListener('mousedown', e => os(e.pageY));
            window.addEventListener('mousemove', e => om(e.pageY));
            window.addEventListener('mouseup', oe);
            this.vpt.addEventListener('touchstart', e => os(e.touches[0].pageY));
            this.vpt.addEventListener('touchmove', e => { e.preventDefault(); om(e.touches[0].pageY); }, { passive: false });
            this.vpt.addEventListener('touchend', oe);
            this.cnt.addEventListener('wheel', e => {
                e.preventDefault(); this.scr.style.transition = 'none'; this._st(this.ty - e.deltaY * 0.5);
                clearTimeout(this.to); this.to = setTimeout(() => this.sn(), 150);
            }, { passive: false });
            this.vpt.addEventListener('click', () => { if (Math.abs(this.ty - this.sty) < 5) { this.inp.classList.remove('hidden'); this.inp.focus(); this.inp.select(); } });
            this.inp.addEventListener('blur', () => { this.inp.classList.add('hidden'); this.set(this.inp.value); });
            this.inp.addEventListener('keypress', e => { if (e.key === 'Enter') this.inp.blur(); });
        }
        sn() {
            const co = (this.cnt.getBoundingClientRect().height / 2) - (this.ih / 2);
            const idx = Math.max(0, Math.min(this.its.length - 1, Math.round((co - this.ty) / this.ih)));
            this.set(parseFloat(this.its[idx].dataset.value), true);
        }
        _gn(r) {
            let v = (this.id === 'interval') ? this._gv() : [];
            if (this.id !== 'interval') for (let i = this.min; i <= this.max; i = parseFloat((i + this.stp).toFixed(2))) v.push(i);
            if (v.length === 0) return r;
            return v.reduce((p, c) => Math.abs(c - r) < Math.abs(p - r) ? c : p);
        }
        set(v, a = true) {
            v = parseFloat(v); if (isNaN(v)) v = this.min;
            if (this.lp) { if (v > this.max) v = this.min; else if (v < this.min) v = this.max; }
            else v = Math.max(this.min, Math.min(this.max, v));
            v = this._gn(v); this.val = v; this.sv(v, a);
            if (this.upd) this.upd(v);
        }
    }

    let _0x_lock = null;
    const _0x_ks = async () => {
        try { if ('wakeLock' in navigator) _0x_lock = await navigator.wakeLock.request('screen'); } catch (e) {}
        try { if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.KeepAwake) await window.Capacitor.Plugins.KeepAwake.keepAwake(); } catch (e) {}
    };
    const _0x_as = async () => {
        if (_0x_lock !== null) { try { await _0x_lock.release(); _0x_lock = null; } catch (e) {} }
        try { if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.KeepAwake) await window.Capacitor.Plugins.KeepAwake.allowSleep(); } catch (e) {}
    };

    let NUREUM_state = {
        l: localStorage.getItem('fb_l') || 'en', t: localStorage.getItem('fb_t') || 'dark',
        r: false, p: false, rt: Math.min(9, parseInt(localStorage.getItem('fb_rt')) || 5),
        i: Math.max(0.1, Math.min(5.0, parseFloat(localStorage.getItem('fb_i')) || 1.5)),
        b: Math.min(19, parseInt(localStorage.getItem('fb_b')) || 2), m: Math.min(199, parseInt(localStorage.getItem('fb_m')) || 20),
        cc: 0, cb: 0, tm: null, cdt: null, ac: null, sk: 'statusReady'
    };

    const _0x_els = {
        b: document.body, bh: document.getElementById('brand-header'),
        c: document.getElementById('counter'), sb: document.getElementById('startBtn'), ab: document.getElementById('activeBtns'),
        pb: document.getElementById('pauseBtn'), stb: document.getElementById('stopBtn'), mc: document.getElementById('main-container'),
        fo: document.getElementById('flash-overlay'), pr: document.querySelector('.progress-ring__circle')
    };

    let _0x_pks = {};
    function _0x_ip() {
        _0x_pks.readyTime = new FitBbeak_Picker('readyTime', 1, 9, 1, NUREUM_state.rt, (v) => { NUREUM_state.rt = v; localStorage.setItem('fb_rt', v); }, true);
        _0x_pks.interval = new FitBbeak_Picker('interval', 0.1, 5.0, 0.1, NUREUM_state.i, (v) => { NUREUM_state.i = v; localStorage.setItem('fb_i', v); if (NUREUM_state.r && !NUREUM_state.p) _0x_rw(); }, true, 10);
        _0x_pks.beepsPerRep = new FitBbeak_Picker('beepsPerRep', 1, 19, 1, NUREUM_state.b, (v) => { NUREUM_state.b = v; localStorage.setItem('fb_b', v); }, true);
        _0x_pks.maxReps = new FitBbeak_Picker('maxReps', 1, 199, 1, NUREUM_state.m, (v) => { NUREUM_state.m = v; localStorage.setItem('fb_m', v); }, true);
    }

    const _0x_rad = _0x_els.pr.r.baseVal.value;
    const _0x_cir = _0x_rad * 2 * Math.PI;
    _0x_els.pr.style.strokeDasharray = `${_0x_cir} ${_0x_cir}`;
    _0x_els.pr.style.strokeDashoffset = _0x_cir;

    function _0x_sp(p) { _0x_els.pr.style.strokeDashoffset = _0x_cir - (p / 100 * _0x_cir); }

    function _0x_ps(f, d = 0.1, v = 0.5, t = 'sine') {
        if (!NUREUM_state.ac) NUREUM_state.ac = new (window.AudioContext || window.webkitAudioContext)();
        if (NUREUM_state.ac.state === 'suspended') NUREUM_state.ac.resume();
        const n = NUREUM_state.ac.currentTime, o = NUREUM_state.ac.createOscillator(), g = NUREUM_state.ac.createGain();
        o.type = t; o.frequency.setValueAtTime(f, n); g.gain.setValueAtTime(v, n); g.gain.exponentialRampToValueAtTime(0.01, n + d);
        o.connect(g); g.connect(NUREUM_state.ac.destination); o.start(n); o.stop(n + d);
        _0x_els.fo.classList.remove('flash-active'); void _0x_els.fo.offsetWidth; _0x_els.fo.classList.add('flash-active');
    }

    function _0x_cb(h) { _0x_ps(h ? 800 : 440, 0.1, h ? 0.5 : 0.3, 'square'); }
    function _0x_tb(c) { _0x_ps(c ? 1200 : 600, c ? 0.2 : 0.1, c ? 2.0 : 1.5, c ? 'triangle' : 'sine'); }
    function _0x_stb() { _0x_ps(800, 0.5, 0.7, 'sine'); }

    function _0x_ui() {
        const d = FitBbeak_i18n[NUREUM_state.l];
        _0x_els.bh.innerText = d.brand;
        document.getElementById('label-ready').innerText = d.labelReady;
        document.getElementById('label-interval').innerText = d.labelInterval;
        document.getElementById('label-beeps').innerText = d.labelBeeps;
        document.getElementById('label-goal').innerText = d.labelGoal;
        _0x_els.sb.innerText = d.start; _0x_els.stb.innerText = d.stop; _0x_els.pb.innerText = NUREUM_state.p ? d.resume : d.pause;
        document.getElementById('unit-ready').innerText = d.unitSec; document.getElementById('unit-interval').innerText = d.unitSec;
        document.getElementById('unit-beeps').innerText = d.unitCount; document.getElementById('unit-goal').innerText = d.unitReps;
        _0x_els.b.className = NUREUM_state.t === 'dark' ? 'dark-mode' : '';
    }

    window.NUREUM_toggleTheme = function() {
        NUREUM_state.t = NUREUM_state.t === 'dark' ? 'light' : 'dark';
        localStorage.setItem('fb_t', NUREUM_state.t); _0x_ui();
    };

    function _0x_av(i, d) {
        const p = _0x_pks[i]; let v = p.val, s = p.stp;
        if (i === 'interval') { if (d === 1) s = (v < 0.795) ? 0.1 : (v < 1.495) ? 0.01 : (v < 2.495) ? 0.1 : 0.5; else s = (v <= 0.805) ? 0.1 : (v <= 1.505) ? 0.01 : (v <= 2.505) ? 0.1 : 0.5; }
        v = parseFloat((v + (s * d)).toFixed(i === 'interval' ? 2 : 0)); p.set(v);
    }

    window.FitBbeak_startWorkout = function() {
        _0x_ks(); NUREUM_state.r = true; NUREUM_state.p = false; NUREUM_state.cc = 0; NUREUM_state.cb = 0;
        if (!NUREUM_state.ac) NUREUM_state.ac = new (window.AudioContext || window.webkitAudioContext)();
        if (NUREUM_state.ac.state === 'suspended') NUREUM_state.ac.resume();
        _0x_els.sb.classList.add('hidden'); _0x_els.ab.classList.remove('hidden');
        let pc = NUREUM_state.rt; NUREUM_state.sk = 'statusPreparing'; _0x_els.c.innerText = pc; _0x_els.mc.classList.add('counting-down'); _0x_cb(pc <= 3);
        NUREUM_state.cdt = setInterval(() => {
            if (NUREUM_state.p) return; pc--;
            if (pc > 0) {
                _0x_els.c.innerText = pc; _0x_cb(pc <= 3); _0x_sp(((NUREUM_state.rt - pc) / NUREUM_state.rt) * 100);
                if (pc <= 3) { _0x_els.c.style.transform = "scale(1.2)"; setTimeout(() => _0x_els.c.style.transform = "scale(1)", 100); }
            } else { clearInterval(NUREUM_state.cdt); _0x_els.mc.classList.remove('counting-down'); _0x_stb(); _0x_run(); }
        }, 1000);
    };

    function _0x_run() {
        NUREUM_state.sk = 'statusWorkout'; _0x_els.c.innerText = "0"; _0x_sp(0);
        NUREUM_state.tm = setInterval(() => {
            if (NUREUM_state.p) return; NUREUM_state.cb++;
            const il = NUREUM_state.cb >= NUREUM_state.b; _0x_sp((NUREUM_state.cb / NUREUM_state.b) * 100);
            if (il) {
                NUREUM_state.cc++; NUREUM_state.cb = 0; _0x_els.c.innerText = NUREUM_state.cc; _0x_tb(true);
                _0x_els.c.style.transform = "scale(1.2)"; setTimeout(() => _0x_els.c.style.transform = "scale(1)", 100);
                if (NUREUM_state.cc >= NUREUM_state.m) _0x_fw();
            } else _0x_tb(false);
        }, NUREUM_state.i * 1000);
    }

    function _0x_rw() { clearInterval(NUREUM_state.tm); _0x_run(); }

    window.FitBbeak_pauseWorkout = function() {
        NUREUM_state.p = !NUREUM_state.p; _0x_els.pb.innerText = NUREUM_state.p ? FitBbeak_i18n[NUREUM_state.l].resume : FitBbeak_i18n[NUREUM_state.l].pause;
        if (NUREUM_state.p) _0x_as(); else _0x_ks(); _0x_stb();
    };

    window.NUREUM_stopWorkout = function() {
        clearInterval(NUREUM_state.tm); clearInterval(NUREUM_state.cdt); NUREUM_state.r = false; NUREUM_state.p = false; NUREUM_state.sk = 'statusStopped';
        _0x_as(); _0x_els.sb.classList.remove('hidden'); _0x_els.ab.classList.add('hidden'); _0x_els.c.innerText = "0"; _0x_sp(0); _0x_els.mc.classList.remove('counting-down');
    };

    function _0x_fw() { NUREUM_stopWorkout(); NUREUM_state.sk = 'statusFinished'; _0x_stb(); }

    document.addEventListener('click', (e) => {
        const sm = document.getElementById('settings-menu');
        const stBtn = document.getElementById('settings-toggle');
        if (sm && !sm.contains(e.target) && stBtn && !stBtn.contains(e.target)) { sm.classList.add('hidden'); }
    });
    document.querySelectorAll('.btn-adjust').forEach(b => { b.addEventListener('click', () => { _0x_av(b.dataset.target, parseInt(b.dataset.dir)); }); });
    _0x_els.sb.addEventListener('click', FitBbeak_startWorkout);
    _0x_els.pb.addEventListener('click', FitBbeak_pauseWorkout);
    _0x_els.stb.addEventListener('click', NUREUM_stopWorkout);

    // Settings menu toggle
    const _0x_settingsToggle = document.getElementById('settings-toggle');
    const _0x_settingsMenu = document.getElementById('settings-menu');
    if (_0x_settingsToggle && _0x_settingsMenu) {
        _0x_settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const hide = _0x_settingsMenu.classList.toggle('hidden');
            if (!hide) {
                Object.values(_0x_pks).forEach(p => p.rn());
            }
        });
    }

    // Settings menu: lang buttons
    function _0x_smUpdateLangBtns() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === NUREUM_state.l);
        });
    }
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            NUREUM_state.l = btn.dataset.lang;
            localStorage.setItem('fb_l', NUREUM_state.l);
            _0x_ui();
            _0x_smUpdateLangBtns();
        });
    });

    // Settings menu: theme button
    const _0x_stThemeBtn = document.getElementById('settings-theme-btn');
    if (_0x_stThemeBtn) {
        _0x_stThemeBtn.addEventListener('click', (e) => { e.stopPropagation(); NUREUM_toggleTheme(); });
    }

    _0x_ip(); _0x_ui(); _0x_sp(0);
    _0x_smUpdateLangBtns();

    window.FitBbeak_sendEmail = function() {
        const e = "ButtonNureum@gmail.com", s = encodeURIComponent("[핏삑/FitBbeak] 코드 구매 및 협업 문의"), b = encodeURIComponent("안녕하세요, '버튼누름'님.\n\n핏삑(FitBbeak) 앱의 소스 코드 구매 및 비즈니스 협업에 대해 문의드립니다."), u = `mailto:${e}?subject=${s}&body=${b}`;
        const isApp = window.location.protocol === 'capacitor:' || (window.location.protocol === 'http:' && window.Capacitor);
        if (isApp) window.open(u, '_system'); else window.location.href = u;
    };
})();

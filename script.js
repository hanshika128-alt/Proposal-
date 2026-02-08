const CONFIG = {
    sections: [
        { id: 'opening', moon: { top: '15%', right: '12%', size: 160 } },
        { id: 'uss', moon: { top: '20%', right: '18%', size: 150 } },
        { id: 'promises', moon: { top: '25%', right: '15%', size: 140 } },
        { id: 'meeting', moon: { top: '20%', right: '10%', size: 150 } },
        { id: 'proposal', moon: { top: '15%', right: '50%', size: 200 } }
    ]
};

let state = {
    currentSection: 0,
    isPlaying: false,
    audioContext: null,
    sparkles: []
};

const dom = {
    sections: null,
    scrollIndicator: null,
    moon: null,
    nightSky: null,
    audio: null,
    songBtn: null,
    songInfo: null,
    musicPlayer: null,
    constellationHeart: null,
    easterEgg: null
};

document.addEventListener('DOMContentLoaded', () => {
    initializeDOM();
    createStars();
    createConstellation();
    setupEventListeners();
    setupAudio();
    startShootingStars();
    showSection(0);
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function initializeDOM() {
    dom.sections = document.querySelectorAll('.section');
    dom.scrollIndicator = document.getElementById('scrollIndicator');
    dom.moon = document.getElementById('moon');
    dom.nightSky = document.getElementById('nightSky');
    dom.audio = document.getElementById('backgroundMusic');
    dom.songBtn = document.getElementById('songBtn');
    dom.songInfo = document.getElementById('songInfo');
    dom.musicPlayer = document.getElementById('musicPlayer');
    dom.constellationHeart = document.getElementById('constellationHeart');
    dom.easterEgg = document.getElementById('easterEgg');
    
    for (let i = 0; i < dom.sections.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => showSection(i));
        dom.scrollIndicator.appendChild(dot);
    }
}

function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star-intense';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.boxShadow = '0 0 10px white';
        star.style.animation = `starTwinkle ${Math.random() * 3 + 2}s infinite`;
        
        if (i % 10 === 0) {
            star.style.cursor = 'pointer';
            star.addEventListener('click', showEasterEgg);
        }
        
        dom.nightSky.appendChild(star);
    }
}

function createConstellation() {
    const points = [
        { x: 50, y: 20 }, { x: 30, y: 35 }, { x: 25, y: 50 },
        { x: 30, y: 65 }, { x: 50, y: 80 }, { x: 70, y: 65 },
        { x: 75, y: 50 }, { x: 70, y: 35 }
    ];
    
    points.forEach(point => {
        const dot = document.createElement('div');
        dot.className = 'constellation-point';
        dot.style.left = `${point.x}%`;
        dot.style.top = `${point.y}%`;
        dom.constellationHeart.appendChild(dot);
    });
}

function showSection(index) {
    if (index < 0 || index >= dom.sections.length) return;
    
    state.currentSection = index;
    dom.sections.forEach(section => section.classList.remove('active'));
    
    document.querySelectorAll('.scroll-dot').forEach((dot, i) => {
        i === index ? dot.classList.add('active') : dot.classList.remove('active');
    });
    
    dom.sections[index].classList.add('active');
    updateMoonPosition(index);
    updateConstellation(index);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (index === 2) triggerDawnEffect();
    if (index === 4) intensifyStars();
}

function nextSection() {
    if (state.currentSection < dom.sections.length - 1) {
        showSection(state.currentSection + 1);
    }
}

function updateMoonPosition(index) {
    const moonPos = CONFIG.sections[index].moon;
    dom.moon.style.top = moonPos.top;
    dom.moon.style.right = moonPos.right;
    dom.moon.style.width = `${moonPos.size}px`;
    dom.moon.style.height = `${moonPos.size}px`;
}

function updateConstellation(index) {
    dom.constellationHeart.style.opacity = index === 2 ? '1' : '0';
}

function triggerDawnEffect() {
    const shimmer = document.createElement('div');
    shimmer.style.position = 'fixed';
    shimmer.style.top = '0';
    shimmer.style.left = '0';
    shimmer.style.width = '100%';
    shimmer.style.height = '100%';
    shimmer.style.background = 'linear-gradient(45deg, transparent 30%, rgba(249, 213, 229, 0.1) 50%, transparent 70%)';
    shimmer.style.zIndex = '2';
    shimmer.style.pointerEvents = 'none';
    shimmer.style.animation = 'shimmer 3s ease-out';
    
    document.body.appendChild(shimmer);
    setTimeout(() => shimmer.remove(), 3000);
}

function intensifyStars() {
    document.querySelectorAll('.star-intense').forEach(star => {
        star.style.animationDuration = '1s';
        star.style.boxShadow = '0 0 30px white';
    });
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star-intense';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = '8px';
        star.style.height = '8px';
        star.style.boxShadow = '0 0 40px white';
        dom.nightSky.appendChild(star);
        setTimeout(() => star.remove(), 5000);
    }
}

function startShootingStars() {
    setInterval(createShootingStar, Math.random() * 10000 + 5000);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.top = Math.random() * 40 + 10 + '%';
    star.style.right = '0';
    star.style.width = '100px';
    star.style.height = '2px';
    star.style.background = 'linear-gradient(90deg, transparent, white, transparent)';
    star.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    star.style.zIndex = '999';
    star.style.opacity = '0';
    
    document.body.appendChild(star);
    
    star.animate([
        { transform: `rotate(${Math.random() * 30 - 15}deg) translateX(0)`, opacity: 0 },
        { transform: `rotate(${Math.random() * 30 - 15}deg) translateX(-100vw)`, opacity: 1 },
        { transform: `rotate(${Math.random() * 30 - 15}deg) translateX(-100vw)`, opacity: 0 }
    ], {
        duration: 2000,
        easing: 'cubic-bezier(0.1, 0.7, 0.1, 1)'
    }).onfinish = () => star.remove();
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-trail';
    sparkle.style.left = e.pageX + (Math.random() - 0.5) * 20 + 'px';
    sparkle.style.top = e.pageY + (Math.random() - 0.5) * 20 + 'px';
    
    const size = Math.random() * 6 + 3;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    const colors = ['#b8a4ff', '#ffffff', '#e0e0ff'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.querySelector('.cursor-sparkles').appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});

document.querySelectorAll('.sparkle-trigger').forEach(el => {
    el.addEventListener('click', () => createNameSparkle(el));
    el.addEventListener('mouseenter', () => createNameSparkle(el));
});

function createNameSparkle(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-trail';
        const angle = (Math.PI * 2 / 8) * i;
        const radius = 30;
        sparkle.style.left = rect.left + rect.width / 2 + Math.cos(angle) * radius + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + Math.sin(angle) * radius + 'px';
        sparkle.style.background = '#b8a4ff';
        document.querySelector('.cursor-sparkles').appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * 50}px, ${Math.sin(angle) * 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => sparkle.remove();
    }
}

function setupAudio() {
    dom.audio.volume = 0.4;
    dom.songBtn.addEventListener('click', toggleAudio);
    
    document.addEventListener('click', () => {
        dom.audio.play().catch(() => {
            dom.songInfo.textContent = 'Click "song" to play';
        });
    }, { once: true });
    
    dom.audio.addEventListener('play', () => {
        dom.songInfo.textContent = 'Quiet Nights - Playing';
        dom.songBtn.innerHTML = '<i class="fas fa-pause"></i><span class="btn-text">song</span>';
        state.isPlaying = true;
    });
    
    dom.audio.addEventListener('pause', () => {
        dom.songInfo.textContent = 'Quiet Nights - Paused';
        dom.songBtn.innerHTML = '<i class="fas fa-play"></i><span class="btn-text">song</span>';
        state.isPlaying = false;
    });
}

function toggleAudio() {
    if (state.isPlaying) {
        dom.audio.pause();
    } else {
        dom.audio.play();
    }
}

function playStarSound() {
    if (!state.audioContext) {
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const audioContext = state.audioContext;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function respond(choice) {
    const messages = {
        always: '💜 Always, my Axam. Through every screen, every mile, every moment.',
        forever: '🌙 Forever and always. I choose you in this universe and every other.'
    };
    
    const messageEl = document.createElement('div');
    messageEl.innerHTML = `
        <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;background:rgba(10,15,26,0.95);backdrop-filter:blur(20px);padding:40px;border-radius:20px;border:2px solid ${choice==='always'?'#b8a4ff':'#f8f3e6'};text-align:center;max-width:500px;width:90vw;">
            <p style="font-family:'Dancing Script',cursive;font-size:1.8rem;color:${choice==='always'?'#b8a4ff':'#f8f3e6'};margin-bottom:20px;">${messages[choice]}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="background:transparent;border:none;color:white;position:absolute;top:10px;right:10px;cursor:pointer;font-size:1.2rem;">✕</button>
        </div>
    `;
    document.body.appendChild(messageEl);
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = choice === 'always' ? ['💜','❤️','✨'][Math.floor(Math.random()*3)] : ['🌙','⭐','✨'][Math.floor(Math.random()*3)];
            particle.style.position = 'fixed';
            particle.style.fontSize = Math.random() * 30 + 20 + 'px';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '100vh';
            particle.style.zIndex = '9999';
            document.body.appendChild(particle);
            particle.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.9 },
                { transform: `translateY(-${window.innerHeight+100}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], { duration: Math.random() * 2000 + 2000 }).onfinish = () => particle.remove();
        }, i * 100);
    }
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

function showEasterEgg() {
    dom.easterEgg.style.display = 'flex';
}

function closeEasterEgg() {
    dom.easterEgg.style.opacity = '0';
    setTimeout(() => {
        dom.easterEgg.style.display = 'none';
        dom.easterEgg.style.opacity = '1';
    }, 300);
}

function setupEventListeners() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); nextSection(); break;
            case 'ArrowUp': case 'PageUp': e.preventDefault(); if(state.currentSection>0) showSection(state.currentSection-1); break;
            case 'Home': e.preventDefault(); showSection(0); break;
            case 'End': e.preventDefault(); showSection(dom.sections.length-1); break;
        }
    });
    
    let wheelTimer;
    document.addEventListener('wheel', (e) => {
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
            if (e.deltaY > 50) nextSection();
            else if (e.deltaY < -50 && state.currentSection > 0) showSection(state.currentSection-1);
        }, 100);
    }, { passive: true });
    
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSection();
            else if (state.currentSection > 0) showSection(state.currentSection-1);
        }
    }, { passive: true });
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        document.querySelectorAll('.cloud').forEach((cloud, i) => {
            const speed = 0.3 + (i * 0.1);
            cloud.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
        });
    });
}

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s ease';
console.log('✨ Proposal website initialized for Axam');

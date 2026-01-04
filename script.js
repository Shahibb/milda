// Configuration
const CONFIG = {
    anniversaryDate: new Date('January 5, 2026 00:00:00').getTime(),
    unlockDate: new Date('January 5, 2026 00:00:00').getTime(),
    typingText: "Halooo sayanggnyaaa akuu, nggak terasa yaa, udah setahun kita bersamaa ❤️",
    typingSpeed: 80,
    images: Array.from({length: 8}, (_, i) => `img/galerry/${i + 1}.jpeg`),
    captions: Array.from({length: 8}, (_, i) => `Momen Indah #${i + 1}`)
};

// Countdown & Unlock
function checkUnlock() {
    if (new Date().getTime() >= CONFIG.unlockDate) {
        document.getElementById('lockedMessage').style.display = 'none';
        document.querySelectorAll('.hidden-content').forEach(el => el.classList.remove('hidden-content'));
    }
}

function updateCountdown() {
    const distance = CONFIG.anniversaryDate - new Date().getTime();
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h2 style="font-size: 2em;">🎉 Happy Anniversary! 🎉</h2>';
        return;
    }

    ['days', 'hours', 'minutes', 'seconds'].forEach((unit, i) => {
        const divisor = [86400000, 3600000, 60000, 1000][i];
        const value = Math.floor((distance % (divisor * [1, 24, 60, 60][i])) / divisor);
        document.getElementById(unit).textContent = String(value).padStart(2, '0');
    });
    
    checkUnlock();
}

// Typing Effect
function typingEffect() {
    let i = 0;
    const element = document.getElementById("love");
    const type = () => {
        if (i < CONFIG.typingText.length) {
            element.innerHTML += CONFIG.typingText.charAt(i++);
            setTimeout(type, CONFIG.typingSpeed);
        }
    };
    type();
}

// Lightbox
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    document.getElementById('lightbox-img').src = CONFIG.images[index];
    document.getElementById('lightbox-caption').textContent = CONFIG.captions[index];
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + CONFIG.images.length) % CONFIG.images.length;
    document.getElementById('lightbox-img').src = CONFIG.images[currentImageIndex];
    document.getElementById('lightbox-caption').textContent = CONFIG.captions[currentImageIndex];
}

// Particle Effects
function createParticle(className, emoji, duration) {
    const particle = document.createElement("div");
    particle.className = className;
    particle.innerHTML = emoji;
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDuration = duration + "s";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
}

// Canvas Stars Animation
function initStars() {
    const canvas = document.getElementById("stars");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const particles = Array.from({length: 100}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
    }));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
            p.x = (p.x + p.vx + canvas.width) % canvas.width;
            p.y = (p.y + p.vy + canvas.height) % canvas.height;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Confetti Effect
function confetti(x, y) {
    const colors = ["#ff006e", "#fb5607", "#ffbe0b", "#8338ec", "#3a86ff"];
    for (let i = 0; i < 25; i++) {
        const piece = document.createElement("div");
        Object.assign(piece.style, {
            position: "fixed",
            width: "6px",
            height: "6px",
            background: colors[Math.floor(Math.random() * colors.length)],
            left: x + "px",
            top: y + "px",
            opacity: 1,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)"
        });
        document.body.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 120 + 30;
        piece.animate([
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px)`, opacity: 0 }
        ], { duration: 800, easing: "ease-out" });

        setTimeout(() => piece.remove(), 800);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    typingEffect();
    initStars();

    // Particles
    setInterval(() => createParticle("heart", "❤️", Math.random() * 2 + 3), 200);
    setInterval(() => createParticle("floating-heart", ["❤️", "💖", "💘", "💕"][Math.floor(Math.random() * 4)], Math.random() * 5 + 5), 800);

    // Mouse trail
    document.addEventListener("mousemove", (e) => {
        const dot = document.createElement("div");
        dot.className = "trail";
        Object.assign(dot.style, { left: e.clientX + "px", top: e.clientY + "px" });
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 600);
    });

    // Tilt effect
    document.querySelectorAll(".tilt").forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.05)`;
        });
        el.addEventListener("mouseleave", () => el.style.transform = "rotateX(0) rotateY(0) scale(1)");
    });

    // Confetti on click
    document.addEventListener("click", (e) => confetti(e.clientX, e.clientY));

    // Lightbox keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        }
    });
});

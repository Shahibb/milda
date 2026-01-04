// Configuration
const CONFIG = {
    password: "mildacantik", // Ganti dengan kata sandi yang diinginkan
    typingText: "Halooo sayanggnyaaa akuu, nggak terasa yaa, udah setahun kita bersamaa ❤️",
    typingSpeed: 80,
    images: Array.from({length: 8}, (_, i) => `img/galerry/${i + 1}.jpeg`),
    captions: Array.from({length: 8}, (_, i) => `Momen Indah #${i + 1}`)
};

// Fungsi untuk membuat efek kejutan confetti
function surpriseEffect() {
    // Membuat banyak confetti di seluruh layar
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            confetti(x, y);
        }, i * 30); // Delay agar efeknya tidak muncul sekaligus
    }
    
    // Tambahkan efek partikel hati
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle("heart", ["❤️", "💖", "💘", "💕", "💗", "💓"][Math.floor(Math.random() * 6)], Math.random() * 3 + 4);
        }, i * 100);
    }
    
    // Tambahkan efek khusus untuk membuat tampilan teks "SELAMAT!" di tengah layar
    const successElement = document.createElement("div");
    successElement.id = "successMessage";
    successElement.innerHTML = "💖 lope yoouu sayanggnyaa akuu";
    Object.assign(successElement.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "2.5em",
        fontWeight: "bold",
        color: "#ff6b9d",
        textAlign: "center",
        zIndex: "9999",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        background: "rgba(255, 255, 255, 0.2)",
        padding: "30px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        animation: "fadeInOut 3s ease-in-out forwards"
    });
    
    document.body.appendChild(successElement);
    
    // Tambahkan animasi CSS untuk pesan
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
    `;
    document.head.appendChild(style);
    
    // Hapus pesan setelah animasi selesai
    setTimeout(() => {
        successElement.remove();
        style.remove();
    }, 3000);
}

// Fungsi untuk membuka konten setelah kata sandi benar
function unlockContent() {
    const inputPassword = document.getElementById('passwordInput').value;
    if (inputPassword === CONFIG.password) {
        document.getElementById('lockedMessage').style.display = 'none';
        document.querySelectorAll('.hidden-content').forEach(el => el.classList.remove('hidden-content'));
        // Sembunyikan form kata sandi setelah berhasil
        const passwordForm = document.getElementById('passwordForm');
        if(passwordForm) {
            passwordForm.style.display = 'none';
        }
        
        // Tambahkan efek kejutan
        surpriseEffect();
    } else {
        alert('Kata sandi salah! Silakan coba lagi.');
    }
}

// Fungsi untuk mengecek apakah sudah terbuka (jika kata sandi sudah dimasukkan sebelumnya)
function checkUnlock() {
    // Tidak perlu mengecek tanggal lagi karena sekarang berbasis kata sandi
}

// Countdown & Unlock
function updateCountdown() {
    // Karena sekarang berbasis kata sandi, kita tidak perlu fungsi countdown
    // Tapi kita tetap tampilkan pesan bahwa sekarang sistemnya berbasis kata sandi
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
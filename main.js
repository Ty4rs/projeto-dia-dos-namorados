window.addEventListener('load', function() {
    const loaderBg = document.getElementById('loader-bg');
    if (loaderBg) {
        // Garante que o loader fique visível por pelo menos 2 segundos
        const minTime = 2000;
        const start = performance.timing.navigationStart || Date.now();
        const now = Date.now();
        const elapsed = now - start;
        const wait = Math.max(0, minTime - elapsed);

        setTimeout(() => {
            loaderBg.style.opacity = '0';
            setTimeout(() => loaderBg.style.display = 'none', 400);
        }, wait);
    }
});



// Parallax das fotos
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    const ft1 = document.getElementById('ft1');
    const ft2 = document.getElementById('ft2');
    const ft3 = document.getElementById('ft3');
    if (ft1 && ft2 && ft3) {
        const speed1 = ft1.getAttribute('data-speed');
        const yPos1 = scrollY * speed1;
        ft1.style.transform = `translateY(${yPos1}px) rotate(-9deg)`;
        const speed2 = ft2.getAttribute('data-speed');
        const yPos2 = scrollY * speed2;
        ft2.style.transform = `translateY(${yPos2}px)`;
        const speed3 = ft3.getAttribute('data-speed');
        const yPos3 = scrollY * speed3;
        ft3.style.transform = `translateY(${yPos3}px) rotate(6deg)`;
    }
});

// Animação de texto "typewriter" para o p#typewriter
function typeWriter(element, text, speed = 30) {
    element.textContent = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Detecta quando o #ft3 aparece na tela e dispara o typewriter
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const p = document.getElementById('typewriter');
            if (p) typeWriter(p, "te amo", 120);
        }
    });
}, { threshold: 0.5 });

const ft3 = document.getElementById('ft3');
if (ft3) observer.observe(ft3);

/* // Partículas de brilho na .cont4
const canvas = document.querySelector('.cont4 canvas');
let ctx = null;
if (canvas) ctx = canvas.getContext('2d');

const style = getComputedStyle(canvas);
canvas.width = parseInt(style.width);
canvas.height = parseInt(style.height);

function resizeCanvas() {
    if (!canvas) return;
    // Pega o tamanho computado pelo CSS
    const style = getComputedStyle(canvas);
    canvas.width = parseInt(style.width);
    canvas.height = parseInt(style.height);
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('DOMContentLoaded', resizeCanvas);
window.addEventListener('load', resizeCanvas);
resizeCanvas();

function randomBetween(a, b) {
    return Math.random() * (b - a) + a;
}

class Sparkle {
    constructor() {
        this.x = randomBetween(0, canvas.width);
        this.y = randomBetween(0, canvas.height);
        this.maxSize = randomBetween(10, 22); // tamanho máximo menor
        this.size = 0;
        this.growing = true;
        this.opacity = 1;
        this.life = randomBetween(0.8, 1.5); // tempo de vida em segundos
        this.age = 0;
        this.angle = randomBetween(0, Math.PI * 2);
    }

    update(dt) {
        this.age += dt;
        if (this.growing) {
            this.size += dt * this.maxSize * 2.2;
            if (this.size >= this.maxSize) {
                this.growing = false;
            }
        } else {
            this.size -= dt * this.maxSize * 2.2;
            if (this.size <= 0) this.size = 0;
        }
        this.opacity = 1 - (this.age / this.life);
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(this.opacity, 0);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Círculo central "gordinho"
        let radius = Math.max(this.size * 0.45, 1);
        let grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
        grad.addColorStop(0, 'rgba(241, 3, 3, 0.95)');
        grad.addColorStop(0.7, 'rgba(209, 23, 23, 0.4)');
        grad.addColorStop(1, 'rgba(104, 0, 0, 0)');
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Cruz de brilho
        ctx.strokeStyle = 'red';
        ctx.shadowColor = '#fffbe9';
        ctx.shadowBlur = 8;
        ctx.lineWidth = Math.max(this.size * 0.18, 1);

        // Linha vertical
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(0, this.size);
        ctx.stroke();

        // Linha horizontal
        ctx.beginPath();
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(this.size, 0);
        ctx.stroke();

        ctx.restore();
    }

    isDead() {
        return this.age > this.life;
    }
}

let sparkles = [];
let lastTime = performance.now();

function animateSparkles(now) {
    if (!ctx) return;
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mais partículas por frame
    if (Math.random() < 0.38) {
        sparkles.push(new Sparkle());
    }

    sparkles.forEach(s => s.update(dt));
    sparkles.forEach(s => s.draw(ctx));
    sparkles = sparkles.filter(s => !s.isDead());

    requestAnimationFrame(animateSparkles);
}

// Só inicia a animação depois que a página e o canvas estiverem prontos
window.addEventListener('load', () => {
    resizeCanvas();
    animateSparkles(performance.now());
});
 */
// Animação do "Te Amo" da cont4
const cont4h2 = document.querySelector('.cont4 h2');
const observerH2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            cont4h2.classList.remove('typewriter-anim'); // reseta
            void cont4h2.offsetWidth; // força reflow para reiniciar a animação
            cont4h2.classList.add('typewriter-anim');
        }
    });
}, { threshold: 0.5 });

if (cont4h2) observerH2.observe(cont4h2);
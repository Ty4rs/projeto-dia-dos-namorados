document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.retro-images img');
    const progress = document.querySelector('.retro-progress');
    const dot = document.querySelector('.retro-dot');
    const counter = document.querySelector('.retro-counter');
    const playPauseBtn = document.querySelector('.retro-playpause');
    const slider = document.querySelector('.retro-slider');
    let current = 0;
    const total = images.length;
    let interval = null;
    let playing = true;
    const tempoPorFoto = 2500; // ms

    const ordem = [0, 1, 2];
    let ordemIdx = 0;
    let progressAnimFrame = null;

    function showImage(idx) {
        images.forEach((img, i) => img.classList.toggle('active', i === idx));
        
    }

    function updateProgressBar(value) {
    // value de 0 a 1
    // Atualiza barra
    progress.style.setProperty('--progress', (value * 100) + '%');
    // Atualiza bolinha
    const timelineWidth = progress.offsetWidth;
    const dotSize = 18;
    const left = value * (timelineWidth - dotSize);
    dot.style.left = `${left}px`;
}

    function animateProgressBar(from, to, duration, cb) {
        if (progressAnimFrame) cancelAnimationFrame(progressAnimFrame);
        const startTime = performance.now();
        function animate(now) {
            let elapsed = now - startTime;
            let t = Math.min(elapsed / duration, 1);
            t = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
            const value = from + (to - from) * t;
            updateProgressBar(value);
            slider.value = value * (slider.max - slider.min) + Number(slider.min);
            if (t < 1) {
                progressAnimFrame = requestAnimationFrame(animate);
            } else {
                updateProgressBar(to);
                slider.value = to * (slider.max - slider.min) + Number(slider.min);
                if (cb) cb();
            }
        }
        progressAnimFrame = requestAnimationFrame(animate);
    }

    function nextImage() {
        let prevIdx = ordem[ordemIdx];
        ordemIdx = (ordemIdx + 1) % ordem.length;
        current = ordem[ordemIdx];
        showImage(current);
        animateProgressBar(prevIdx / (total - 1), current / (total - 1), tempoPorFoto * 0.7);
    }

    function startRetroPlayer() {
        if (interval) clearInterval(interval);
        showImage(current);
        animateProgressBar(current / (total - 1), ordem[(ordemIdx + 1) % ordem.length] / (total - 1), tempoPorFoto);
        if (playing) {
            interval = setInterval(() => {
                nextImage();
            }, tempoPorFoto);
        }
    }

    playPauseBtn.addEventListener('click', () => {
    playing = !playing;
    const icon = playPauseBtn.querySelector('.material-symbols-outlined');
    icon.textContent = playing ? 'pause' : 'play_arrow';
    startRetroPlayer();
});

    slider.addEventListener('input', (e) => {
        let prev = current;
        current = parseInt(e.target.value);
        ordemIdx = ordem.indexOf(current) !== -1 ? ordem.indexOf(current) : 0;
        showImage(current);
        animateProgressBar(prev / (total - 1), current / (total - 1), 400);
        if (!playing) startRetroPlayer();
    });

    document.querySelector('.retro-images').addEventListener('click', () => {
        if (!playing) {
            nextImage();
            showImage(current);
        }
    });

    // Inicia ao carregar
    if (images.length) {
        slider.max = total - 1;
        ordemIdx = 0;
        current = ordem[ordemIdx];
        showImage(current);
        updateProgressBar(0);
        slider.value = 0;
        setTimeout(() => {
            animateProgressBar(0, current / (total - 1), 600);
        }, 10);
        startRetroPlayer();
    }
});
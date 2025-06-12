// --- CONTADOR DE TEMPO E ANIMAÇÃO DOS ASTROS ---

// Data que vocês se conheceram (exemplo: 2022-06-10 20:00)
const dataInicio = new Date('2025-01-09T19:10:00');

// Função para atualizar o contador
function atualizaContador() {
    const agora = new Date();
    let diff = Math.floor((agora - dataInicio) / 1000); // diferença em segundos

    const dias = Math.floor(diff / (60 * 60 * 24));
    diff -= dias * 60 * 60 * 24;
    const horas = Math.floor(diff / (60 * 60));
    diff -= horas * 60 * 60;
    const minutos = Math.floor(diff / 60);

    document.getElementById('contador-amor').innerHTML =
        `<span style="font-size:2.5rem;">${dias}</span> dias, ` +
        `<span style="font-size:2.5rem;">${horas}</span> horas e ` +
        `<span style="font-size:2.5rem;">${minutos}</span> minutos juntos`;
}
setInterval(atualizaContador, 1000);
atualizaContador();

const astroCanvas = document.getElementById('astro-canvas');

function resizeAstroCanvas() {
    const style = getComputedStyle(astroCanvas);
    astroCanvas.width = parseInt(style.width);
    astroCanvas.height = parseInt(style.height);
}
window.addEventListener('resize', resizeAstroCanvas);
window.addEventListener('DOMContentLoaded', resizeAstroCanvas);
window.addEventListener('load', resizeAstroCanvas);
resizeAstroCanvas();

const astroCtx = astroCanvas.getContext('2d');

// ...restante do seu código...

function drawAstros(time) {
    const w = astroCanvas.width;
    const h = astroCanvas.height;
    astroCtx.clearRect(0, 0, w, h);

    // Centro do sol
    const cx = w / 2;
    const cy = h / 2 + 20;

    // Sol
    astroCtx.save();
    astroCtx.beginPath();
    astroCtx.arc(cx, cy, 40, 0, 2 * Math.PI);
    astroCtx.fillStyle = 'gold';
    astroCtx.shadowColor = 'yellow';
    astroCtx.shadowBlur = 25;
    astroCtx.fill();
    astroCtx.restore();

    // Terra orbitando o sol
    const terraOrbitRadius = 130;
    const terraAngle = (time / 4000) % (2 * Math.PI);
    const terraX = cx + terraOrbitRadius * Math.cos(terraAngle);
    const terraY = cy + terraOrbitRadius * Math.sin(terraAngle);

    // Órbita da terra
    astroCtx.beginPath();
    astroCtx.arc(cx, cy, terraOrbitRadius, 0, 2 * Math.PI);
    astroCtx.strokeStyle = 'rgba(255,255,255,0.15)';
    astroCtx.lineWidth = 1.5;
    astroCtx.stroke();

    // Terra
    astroCtx.save();
    astroCtx.beginPath();
    astroCtx.arc(terraX, terraY, 14, 0, 2 * Math.PI);
    astroCtx.fillStyle = '#3a8ee6';
    astroCtx.shadowColor = '#3a8ee6';
    astroCtx.shadowBlur = 10;
    astroCtx.fill();
    astroCtx.restore();

    // Lua orbitando a terra
    const luaOrbitRadius = 36;
    const luaAngle = (time / 1200) % (2 * Math.PI);
    const luaX = terraX + luaOrbitRadius * Math.cos(luaAngle);
    const luaY = terraY + luaOrbitRadius * Math.sin(luaAngle);

    // Órbita da lua
    astroCtx.beginPath();
    astroCtx.arc(terraX, terraY, luaOrbitRadius, 0, 2 * Math.PI);
    astroCtx.strokeStyle = 'rgba(255,255,255,0.10)';
    astroCtx.lineWidth = 1;
    astroCtx.stroke();

    // Lua
    astroCtx.save();
    astroCtx.beginPath();
    astroCtx.arc(luaX, luaY, 5, 0, 2 * Math.PI);
    astroCtx.fillStyle = '#eee';
    astroCtx.shadowColor = '#fff';
    astroCtx.shadowBlur = 6;
    astroCtx.fill();
    astroCtx.restore();

    requestAnimationFrame(drawAstros);
}
requestAnimationFrame(drawAstros);
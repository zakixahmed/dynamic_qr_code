const socket = io();

socket.on('new-qr', (qr) => {
  const qrImage = document.getElementById('qrCode');
  qrImage.src = qr;
});

function stylizeQR(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;
    const cx = width / 2, cy = height / 2;
    const spikes = 5, outerRadius = 100, innerRadius = 50;

    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos((Math.PI * 2 / spikes) * i - Math.PI / 2) * outerRadius, cy + Math.sin((Math.PI * 2 / spikes) * i - Math.PI / 2) * outerRadius);
        ctx.lineTo(cx + Math.cos((Math.PI * 2 / spikes) * i - Math.PI / 2 + Math.PI / spikes) * innerRadius, cy + Math.sin((Math.PI * 2 / spikes) * i - Math.PI / 2 + Math.PI / spikes) * innerRadius);
    }
    ctx.closePath();
    ctx.fill();
}

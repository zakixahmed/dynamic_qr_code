document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 500;
    const height = canvas.height = 500;
    canvas.style.backgroundColor = 'black';

    const brightColors = [
        'rgba(255, 69, 0, 0.9)',   // Red-Orange
        'rgba(255, 140, 0, 0.9)',  // Dark Orange
        'rgba(255, 0, 255, 0.9)',  // Magenta
        'rgba(0, 255, 255, 0.9)',  // Cyan
        'rgba(255, 255, 0, 0.9)',  // Yellow
        'rgba(0, 191, 255, 0.9)'   // Deep Sky Blue
    ];

    const predefinedData = [
        "F5G9H7I6J0",
        "K2L3M4N5O1",
        "P6Q7R8S9T2",
        "U3V4W5X6Y7",
        "Z8A9B0C1D2",
        "E4F5G6H7I8",
        "J9K0L1M2N3",
        "O5P6Q7R8S9",
        "T2U3V4W5X6",
        "Y7Z8A9B0C1"
    ];

    // Use local storage to get the current index, increment it, and wrap around if necessary
    let dataIndex = (localStorage.getItem('dataIndex') || 0) % predefinedData.length;
    localStorage.setItem('dataIndex', (dataIndex + 1) % predefinedData.length);
    let colorIndex = dataIndex % brightColors.length; // Synchronize color index with data index

    // Create a separate canvas for the QR code
    const qrCanvas = document.createElement('canvas');
    qrCanvas.width = 200;
    qrCanvas.height = 200;
    const qr = new QRious({
        element: qrCanvas,
        size: 200,
        value: predefinedData[dataIndex],
        level: 'H',
        background: 'transparent',
        foreground: brightColors[colorIndex]
    });

    function updateQRCode() {
        dataIndex = (localStorage.getItem('dataIndex') || 0) % predefinedData.length;
        localStorage.setItem('dataIndex', (dataIndex + 1) % predefinedData.length);
        colorIndex = dataIndex % brightColors.length; // Update color index in sync with data index
        qr.set({
            value: predefinedData[dataIndex],
            foreground: brightColors[colorIndex]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        updateQRCode();  // Update the QR code with the next predefined data
        renderSphere(brightColors[colorIndex]);  // Pass the synchronized color
        ctx.drawImage(qrCanvas, (width - qrCanvas.width) / 2, (height - qrCanvas.height) / 2);
        setTimeout(animate, 1000);  // Adjusted for clarity in viewing changes
    }

    animate();
});

function renderSphere(color) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < 1500; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 175 + 30 * Math.sin(5 * theta);
        const x = width / 2 + r * Math.sin(phi) * Math.cos(theta);
        const y = height / 2 + r * Math.sin(phi) * Math.sin(theta);
        const dotSize = 2 * Math.sin(phi);
        const opacity = 0.3 + 0.7 * Math.sin(phi);
        ctx.fillStyle = color;  // Use the synchronized color
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

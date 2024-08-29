document.addEventListener('DOMContentLoaded', function() {
    var qr = new QRious({
        element: document.getElementById('qrCanvas'),
        size: 300,
        value: 'https://example.com',
        level: 'H', // High error correction
        background: 'white',  // Background color of the QR code
        foreground: 'purple'  // Foreground color of the QR code
    });

    // If you want to apply additional styling or effects, you may need to manipulate the canvas directly
    stylizeQR(qr.canvas);
});

function stylizeQR(canvas) {
    const ctx = canvas.getContext('2d');
    // Apply custom drawing, masking, or effects here
    // This is a conceptual placeholder to suggest where you might add custom graphics
}

function generateUniqueId() {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateQRCode() {
    const uniqueId = generateUniqueId(); // Generate unique ID
    qr.set({ value: uniqueId.toString() }); // Set this unique ID as the new value for the QR code
}

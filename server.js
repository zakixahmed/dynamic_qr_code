const sharp = require('sharp');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const QRCode = require('qrcode');
const multer = require('multer'); // For handling file uploads
const jsQR = require('jsqr'); // Ensure jsQR is installed and required

const upload = multer({ dest: 'uploads/' }); // Store uploads in the 'uploads' directory

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));  // Serve static files from 'public' directory

// Handle file upload and QR code decoding
app.post('/upload', upload.single('qrimage'), (req, res) => {
    const path = req.file.path;
    sharp(path)
        .greyscale() // Convert to greyscale to enhance QR code detection
        .toBuffer()
        .then(processedImage => {
            const imageData = new Uint8ClampedArray(processedImage); // Assuming this format for jsQR
            const code = jsQR(imageData, processedImage.info.width, processedImage.info.height, {
                inversionAttempts: "attemptBoth",
            });

            if (code) {
                res.send(`QR Code Data: ${code.data}`);
            } else {
                res.send('No QR code found.');
            }
        })
        .catch(err => {
            console.error('Error processing image:', err);
            res.status(500).send('Error processing image.');
        });
});

io.on('connection', (socket) => {
  console.log('A user connected');
  setInterval(async () => {
    const data = "123456789" + new Date().toISOString();
    QRCode.toBuffer(data, {
      type: 'png',
      color: {
        dark: '#000000FF',  // Black color for QR code
        light: '#0000'      // Transparent background for QR code
      }
    }).then(qrBuffer => {
      sharp('path/to/nebula/background.png') // Ensure this path is correct
        .resize(400, 400)
        .composite([{ input: qrBuffer, blend: 'over', top: 100, left: 100 }])
        .toBuffer()
        .then(composedBuffer => {
          const qrImageDataUrl = `data:image/png;base64,${composedBuffer.toString('base64')}`;
          socket.emit('new-qr', qrImageDataUrl);
        })
        .catch(err => console.error('Error processing image:', err));
    }).catch(err => console.error('Error generating QR code:', err));
  }, 5000);
});

const PORT = 3004;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

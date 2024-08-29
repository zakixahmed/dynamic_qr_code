# Dynamic QR code generator and decoder 
This project is a comprehensive QR code management system that includes generating dynamic QR codes, decoding them, and performing image manipulations using server-side technologies.

## Features
Dynamic QR Code Generation: Generate QR codes dynamically with custom colors and error correction levels.
QR Code Decoding: Decode QR codes from uploaded images using jsQR.
Image Manipulation: Apply image transformations and effects using the sharp library.
Real-Time Updates: Utilize WebSocket communication to emit new QR codes to all connected clients in real-time.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You need to have Node.js installed on your system to run the server and the necessary dependencies. You can download it from Node.js official website.

### Installing
First, clone the repository to your local machine: 

#### git clone https://github.com/zakixahmed/dynamic_qr_code.git
#### cd dynamic_qr_code

Then, install the required packages:
#### "npm install"

Running the Server
To start the server, run the following command:
#### "node server.js"

The server will start running on http://localhost:3004.

![image](https://github.com/user-attachments/assets/60e76e90-97ba-4a2f-b21a-5f32a0eba0e9)

![image](https://github.com/user-attachments/assets/fd764861-4359-4885-b1ea-21917cdc74af)


##### Usage
After starting the server, you can access the QR code generator and decoder through their respective HTML files:

###### Generate QR Code: Open index.html in your browser to create and view dynamic QR codes.
###### Decode QR Code: Open decode.html in your browser to upload and decode QR code images.

#### Built With
Express - The web framework used for handling HTTP requests
Socket.IO - Enables real-time bidirectional event-based communication
Sharp - Used for image manipulation tasks
Multer - Middleware for handling multipart/form-data

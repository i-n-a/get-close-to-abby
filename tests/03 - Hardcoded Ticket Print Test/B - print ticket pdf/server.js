require('dotenv').config();
const isDevelopment = (process.env.NODE_ENV === 'development');
const express = require('express');
const app = express();
const fs = require('fs'); // fs is the Node.js File System module, used to read and write files on the server.
const path = require('path');
const http = require('http');
const https = require('https');

let options = {};
if (isDevelopment) {
  options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
  };
}

const server = isDevelopment
  ? https.createServer(options, app)
  : http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});

app.use(express.json());
app.use(express.static('public'));

const PDFDocument = require('pdfkit');
const sharp = require('sharp');
const frontImagePath = path.join(__dirname, 'public', 'assets', 'image_front.jpeg');
const backImagePath = path.join(__dirname, 'public', 'assets', 'ticket_back.jpeg');


// function to generate a double-sided PDF ticket with centered front page content and a back page with a form image that fills the entire page because the page size is set to the back image size
// the server handles the POST request when the user clicks the button to generate a double-sided PDF ticket
// this will be downloaded as a PDF file when the user clicks the "Generate Ticket" button so it can be printed later through the automator file action "printe finder items" setup on the Mac
app.post('/generate-ticket', async (req, res) => {
  try {
    // Load back image metadata to set correct page size
    const backMeta = await sharp(backImagePath).metadata();

    const pageWidth = backMeta.width;
    const pageHeight = backMeta.height;

    // Load and resize front image proportionally (e.g., 80% page width)
    const frontImageWidth = Math.floor(pageWidth * 0.8);
    const frontImageProcessed = await sharp(frontImagePath)
      .resize({ width: frontImageWidth })
      .grayscale()
      .png()
      .toBuffer();

    const doc = new PDFDocument({ autoFirstPage: false });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="ticket-double-sided.pdf"');

    doc.pipe(res);

    // --- FRONT PAGE ---
    doc.addPage({ size: [pageWidth, pageHeight] });

    const frontImageX = (pageWidth - frontImageWidth) / 2;
    const frontImageY = 150;

    doc.image(frontImageProcessed, frontImageX, frontImageY, { width: frontImageWidth });

    const ticketTitle = `WHAT YOU CAN DO`;
    const ticketText = `A ROOM WITH NO RULES, 
    BUT PLENTY OF SEATS. 
    COME TO THINK, TO REST, OR MEET.`;

    doc.fontSize(20).text(ticketTitle, frontImageX, 550, {
      width: pageWidth - frontImageX * 2, // Center text below the image
      align: 'center',
    });

    doc.fontSize(12).text(ticketText, frontImageX, 600, {
      width: pageWidth - frontImageX * 2, // Center text below the title
      align: 'center',
    });

    // --- BACK PAGE ---
    doc.addPage({ size: [pageWidth, pageHeight] });

    const backImageBuffer = await sharp(backImagePath)
      .resize({ width: pageWidth, height: pageHeight, fit: 'cover' })
      .grayscale()
      .png()
      .toBuffer();

    doc.image(backImageBuffer, 0, 0, { width: pageWidth, height: pageHeight });

    doc.end();

    console.log('✅ Double-sided PDF ticket generated');
  } catch (err) {
    console.error('❌ Error generating PDF:', err.message);
    if (!res.headersSent) {
      res.status(500).send('Failed to generate ticket');
    } else {
      res.destroy();
    }
  }
});
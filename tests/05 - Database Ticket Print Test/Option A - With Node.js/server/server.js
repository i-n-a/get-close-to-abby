const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const server = http.createServer(app); // ✅ use HTTP unconditionally
const port = 3000;
server.listen(port, () => {
  console.log(`✅ App listening at http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173'
}));
// CORS middleware sets the appropriate HTTP headers like:
//Access-Control-Allow-Origin: http://localhost:5173
//Access-Control-Allow-Methods: POST, GET, OPTIONS
//Access-Control-Allow-Headers: Content-Type
//That tells the browser: "Yes, it's okay to allow requests from Vite."

app.use(express.json());
app.use(express.static('public'));

const PDFDocument = require('pdfkit');
const sharp = require('sharp');
const backImagePath = path.join(__dirname, 'assets', 'personal-invitation-transparent.png');

app.post('/generate-ticket', async (req, res) => {
  try {
    const { imageUrl, clueText } = req.body;
    const clueTitle = `WHAT YOU CAN DO`;

    if (!imageUrl || !clueText) {
      return res.status(400).send('Missing data');
    }

    const pageWidth = 298; // A6 size is 105mm x 148mm, which is 298px x 420px at 300 DPI
    const pageHeight = 420;
    const doc = new PDFDocument({ size: [pageWidth, pageHeight], autoFirstPage: false });

    // const doc = new PDFDocument({ size: 'A6', autoFirstPage: false });
    // doc.addPage({ size: 'A6' }); 
    // const { width: pageWidth, height: pageHeight } = doc.page.size; // retrieving the A6 sizes is not possible

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="ticket.pdf"');
    doc.pipe(res);

    console.log(`Page size: ${pageWidth}x${pageHeight}`);
    const maxImageWidth = pageWidth * 0.6;
    const maxImageHeight = pageHeight * 0.4;

    // Fetch and process the front image from the Supabase URL
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const frontImageProcessed = await sharp(imageBuffer)
      .resize({
        width: Math.floor(maxImageWidth),
        height: Math.floor(maxImageHeight),
        fit: 'inside'
      })
      .grayscale()
      .png()
      .toBuffer();

    // FRONT PAGE
    doc.addPage();

    const abbyLogoPath = path.join(__dirname, 'assets', 'abby_basic_logo_black_rgb.png');

    // Scale the image to a fixed width (e.g., 80 pixels), maintaining aspect ratio
    const logoWidth = pageWidth * 0.4; // 60% of page width
    const logoX = (pageWidth - logoWidth) / 2; // center horizontally
    const logoY = 10; // place near top of page

    doc.image(abbyLogoPath, logoX, logoY, { width: logoWidth });

    const frontImageX = (pageWidth - maxImageWidth) / 2;
    const frontImageY = pageHeight * 0.15;

    doc.image(frontImageProcessed, frontImageX, frontImageY, { width: maxImageWidth });

    const margin = (pageWidth - maxImageWidth) / 2;
    const contentWidth = maxImageWidth;
    const titleY = pageHeight * 0.74; 
    
    doc.fontSize(12).text(clueTitle, margin, titleY, {
      width: contentWidth,
      align: 'justify',
    });
    doc.moveDown(0.1);

    // No specifying x & y pos here; this will place clueText after clueTitle and doc moved down
    doc.fontSize(8).text(clueText, {
      width: contentWidth,
      align: 'left',
    });

    // BACK PAGE

    const backImageBuffer = await sharp(backImagePath)
      .grayscale()
      .png()
      .toBuffer();

    doc.addPage();
    doc.image(backImageBuffer, 0, 0, { width: pageWidth, height: pageHeight });

    doc.end();
    console.log("✅ PDF generated and sent");
  } catch (err) {
    console.error('❌ PDF Error:', err.message);
    if (!res.headersSent) res.status(500).send('Failed to generate ticket');
  }
});


// first code but too big for A6 and the front image & front text is still overlapping
// app.post('/generate-ticket', async (req, res) => {
//   try {
//     const { imageUrl, clueText } = req.body;

//     if (!imageUrl || !clueText) {
//       return res.status(400).send('Missing data');
//     }

//     // Load back image metadata for page size
//     const backMeta = await sharp(backImagePath).metadata();
//     const pageWidth = backMeta.width;
//     const pageHeight = backMeta.height;

//     // Fetch and process the front image from the Supabase URL
//     const response = await fetch(imageUrl);
//     const arrayBuffer = await response.arrayBuffer();
//     const imageBuffer = Buffer.from(arrayBuffer);

//     const frontImageWidth = Math.floor(pageWidth * 0.8);
//     const frontImageProcessed = await sharp(imageBuffer)
//       .resize({ width: frontImageWidth })
//       .grayscale()
//       .png()
//       .toBuffer();

//     const doc = new PDFDocument({ autoFirstPage: false });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename="ticket.pdf"');
//     doc.pipe(res);

//     // FRONT PAGE
//     doc.addPage({ size: '[pageWidth, pageHeight]' });

//     const frontImageX = (pageWidth - frontImageWidth) / 2;
//     const frontImageY = 150;

//     doc.image(frontImageProcessed, frontImageX, frontImageY, { width: frontImageWidth });

//     const clueTitle = `WHAT YOU CAN DO`;
//     doc.fontSize(24).text(clueTitle, frontImageX, 550, {
//       width: pageWidth - frontImageX * 2,// Center text below the image
//       align: 'center',
//     });

//     doc.fontSize(16).text(clueText, frontImageX, 600, {
//       width: pageWidth - frontImageX * 2,// Center text below the title
//       align: 'center',
//     });

//     // BACK PAGE
//     const backImageBuffer = await sharp(backImagePath)
//       .resize({ width: pageWidth, height: pageHeight, fit: 'cover' })
//       .grayscale()
//       .png()
//       .toBuffer();

//     doc.addPage({ size: [pageWidth, pageHeight] });
//     doc.image(backImageBuffer, 0, 0, { width: pageWidth, height: pageHeight });

//     doc.end();
//     console.log("✅ PDF generated and sent");
//   } catch (err) {
//     console.error('❌ PDF Error:', err.message);
//     if (!res.headersSent) res.status(500).send('Failed to generate ticket');
//   }
// });

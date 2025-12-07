import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import mapImage from '../assets/images/png/ticket/abby_map.png';
import { convertImageToGrayscale } from './grayscale';
import logo from '../assets/images/png/ticket/logo-abby-get-close.png';
import qrCode from '../assets/images/png/ticket/qr-code.png';
import fontRegularUrl from "../assets/fonts/GT-Walsheim/Desktop/GT-Walsheim-Regular.ttf";
import fontBoldUrl    from "../assets/fonts/GT-Walsheim/Desktop/GT-Walsheim-Bold.ttf";

// (0,0) is bottom-left in pdf-lib

function splitTextIntoLines(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (lineWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines;
}

export async function generateTicketPDF(
  closeup,
  clue,
  ticketNumber
) {
  const pdfDoc = await PDFDocument.create();

  // 🔑 register fontkit BEFORE embedFont
  pdfDoc.registerFontkit(fontkit);

  const pageWidth = 298;
  const pageHeight = 420;
  const margin = 17;

  // Load font bytes
  const fontRegularBytes = await fetch(fontRegularUrl).then(res => res.arrayBuffer());
  const fontBoldBytes = await fetch(fontBoldUrl).then(res => res.arrayBuffer());
  // Embed in pdf-lib
  const fontRegular = await pdfDoc.embedFont(fontRegularBytes,{ subset: false });
  const fontBold = await pdfDoc.embedFont(fontBoldBytes,{ subset: false });

  /* ---------------- FRONT PAGE ---------------- */

  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // LOGO (top-left)
  const logoBytes = await fetch(logo).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoScale = 0.25;
  const logoDims = logoImage.scale(logoScale);

  let cursorY = pageHeight - margin; // start just below top margin
  const logoY = cursorY - logoDims.height;
  page1.drawImage(logoImage, {
    x: margin,
    y: logoY,
    width: logoDims.width,
    height: logoDims.height,
  });

  // HEADER TEXT (top-right: "YOUR INVITATION / TO GET CLOSE")
  const headerLines = ['YOUR INVITATION', 'TO GET CLOSE'];
  const headerFontSize = 12;
  headerLines.forEach((line, i) => {
    const w = fontBold.widthOfTextAtSize(line, headerFontSize);
    page1.drawText(line, {
      x: pageWidth - margin - w,
      y: logoY + logoDims.height - headerFontSize - i * (headerFontSize + 2),
      size: headerFontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
  });

  // Move cursor below logo / header
  cursorY = logoY - 25;

  // INTRO TEXT
  const introText =
    'This close-up image is part of Abby’s new Stadsliving spaces.';
  const introBold = 'Can you find where it belongs?';
  const bodySize = 9;
  const introLines = splitTextIntoLines(
    introText,
    fontRegular,
    bodySize,
    pageWidth - 2 * margin
  );

  introLines.forEach((line, i) => {
    page1.drawText(line, {
      x: margin,
      y: cursorY - i * (bodySize + 2),
      size: bodySize,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
  });

  cursorY -= introLines.length * (bodySize + 2) + 6;

  page1.drawText(introBold, {
    x: margin,
    y: cursorY+4,
    size: bodySize,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  cursorY -= bodySize;

  // CLOSE-UP IMAGE (grayscale, centered)
  const grayscaleImage = await convertImageToGrayscale(closeup);
  const imageBytes = await fetch(grayscaleImage).then((res) => res.arrayBuffer());
  const image =
    grayscaleImage.endsWith('.png')
      ? await pdfDoc.embedPng(imageBytes)
      : await pdfDoc.embedJpg(imageBytes);

  const availableImageWidth = pageWidth - 2 * margin;
  const availableImageHeight = pageHeight/2; // fits nicely on page
  const scale = Math.min(
    availableImageWidth / image.width,
    availableImageHeight / image.height
  );
  const imageDims = image.scale(scale);

  const imageX = (pageWidth - imageDims.width) / 2;
  const imageY = cursorY - imageDims.height;
  page1.drawImage(image, {
    x: imageX,
    y: imageY,
    width: imageDims.width,
    height: imageDims.height,
  });

  cursorY = imageY - 4;

  // CAPTION BAR (grey strip under image)
  const captionHeight = 28;
  const captionY = cursorY - captionHeight;
  page1.drawRectangle({
    x: margin,
    y: captionY+4,
    width: pageWidth - 2 * margin,
    height: captionHeight,
    color: rgb(0.9, 0.9, 0.9),
  });

  const captionText =
    'This was captured by another visitor, find its location to unlock a reflection this person left for you.';
  const captionSize = 8;
  const captionLines = splitTextIntoLines(
    captionText,
    fontRegular,
    captionSize,
    pageWidth - 2 * margin - 8
  );
  let captionTextY = captionY + captionHeight - captionSize;
  captionLines.forEach((line) => {
    page1.drawText(line, {
      x: margin + 4,
      y: captionTextY,
      size: captionSize,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
    captionTextY -= captionSize + 1;
  });

  cursorY = captionY - 18;

  // CLUE TITLE
  const clueTitle = 'CLUE - Which room?';
  const clueTitleSize = 10;
  page1.drawText(clueTitle, {
    x: margin,
    y: cursorY,
    size: clueTitleSize,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  cursorY -= clueTitleSize + 6;

  // CLUE TEXT (comes from argument)
  const clueSize = 8;
  const clueLines = splitTextIntoLines(
    clue,
    fontRegular,
    clueSize,
    pageWidth - 2 * margin
  );
  clueLines.forEach((line, i) => {
    page1.drawText(line, {
      x: margin,
      y: cursorY - i * (clueSize + 2)+2,
      size: clueSize,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
  });

  // TICKET NUMBER BOX (bottom-centre, black with white text)
  const boxWidth = 33;
  const boxHeight = 28;
  const boxX = (pageWidth - boxWidth) / 2;
  const boxY = margin-8;
  page1.drawRectangle({
    x: boxX,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0, 0, 0),
  });

  const ticketNumberText = `# ${ticketNumber}`;
  const ticketFontSize = 10;
  const ticketTextWidth = fontRegular.widthOfTextAtSize(
    ticketNumberText,
    ticketFontSize
  );
  page1.drawText(ticketNumberText, {
    x: boxX + (boxWidth - ticketTextWidth) / 2,
    y: boxY + (boxHeight - ticketFontSize) / 2 + 2,
    size: ticketFontSize,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  /* ---------------- BACK PAGE ---------------- */

  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);

  // TOP BLACK BAR WITH "Plan of Abby" REPEATED
  const topBarHeight = 36;
  page2.drawRectangle({
    x: 0,
    y: pageHeight - topBarHeight,
    width: pageWidth,
    height: topBarHeight,
    color: rgb(0, 0, 0),
  });

  const planText = 'Plan of Abby';
  const planSize = 16;
  const planWidth = fontRegular.widthOfTextAtSize(planText, planSize);
  let planX = margin;
  const planY = pageHeight - topBarHeight / 2 - planSize / 2 + 3;

  while (planX < pageWidth - planWidth / 2) {
    page2.drawText(planText, {
      x: planX-26,
      y: planY,
      size: planSize,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });
    planX += planWidth + 24;
  }

  // TITLE + SUBTITLE ABOVE MAP
  let backCursorY = pageHeight - topBarHeight - margin;

  const backTitle = 'The Stadsliving Spaces';
  page2.drawText(backTitle, {
    x: margin,
    y: backCursorY,
    size: 11,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  backCursorY -= 15;
  const backSubtitle = 'Use this map to navigate yourself at Abby.';
  page2.drawText(backSubtitle, {
    x: margin,
    y: backCursorY,
    size: 9,
    font: fontRegular,
    color: rgb(0, 0, 0),
  });

  backCursorY -= 18;

  // MAP IMAGE
  const mapImageBytes = await fetch(mapImage).then((res) => res.arrayBuffer());
  const mapPdfImage = await pdfDoc.embedPng(mapImageBytes);

  const availableMapWidth = pageWidth;
  const availableMapHeight = pageHeight;
  const mapScale = Math.min(
    availableMapWidth / mapPdfImage.width,
    availableMapHeight / mapPdfImage.height
  );
  const mapDims = mapPdfImage.scale(mapScale);

  //const mapX = (mapDims.width) / 2;
  const mapY = backCursorY - mapDims.height;
  page2.drawImage(mapPdfImage, {
    x: 0,
    y: mapY+12,
    width: mapDims.width,
    height: mapDims.height,
  });

  // BOTTOM BLACK FOOTER WITH TEXT + QR
  const footerHeight = 77;
  const footerY = 0;
  page2.drawRectangle({
    x: 0,
    y: footerY,
    width: pageWidth,
    height: footerHeight,
    color: rgb(0, 0, 0),
  });

  const footerTitle = 'Found where the image fits at Abby?';
  const footerBodyLines = [
    'Scan to unlock the reflection &',
    'contribute your close-up and reflection.',
  ];
  const footerTitleSize = 10;
  const footerBodySize = 9;

  let footerTextY = footerY + footerHeight - 24;
  page2.drawText(footerTitle, {
    x: margin,
    y: footerTextY,
    size: footerTitleSize,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  footerTextY -= footerTitleSize + 6;
  footerBodyLines.forEach((line) => {
    page2.drawText(line, {
      x: margin,
      y: footerTextY,
      size: footerBodySize,
      font: fontRegular,
      color: rgb(1, 1, 1),
    });
    footerTextY -= footerBodySize + 2;
  });

  // QR IMAGE (bottom-right)
  const qrBytes = await fetch(qrCode).then((res) => res.arrayBuffer());
  const qrImageEmbed = await pdfDoc.embedPng(qrBytes);
  const qrSize = 60;
  const qrScale = qrSize / qrImageEmbed.width;
  const qrDims = qrImageEmbed.scale(qrScale);

  page2.drawImage(qrImageEmbed, {
    x: pageWidth - margin - qrDims.width,
    y: footerY + (footerHeight - qrDims.height) / 2,
    width: qrDims.width,
    height: qrDims.height,
  });

  /* ---------------- SAVE ---------------- */

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `abby-your-invitation-to-get-close-${ticketNumber}.pdf`;
  a.click();
}

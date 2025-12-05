// OPTION 2: with jspdf
// import jsPDF from 'jspdf';
// import { convertImageToGrayscale } from './grayscale';
// import invitationImage from '../assets/personal-invitation-transparent.png';
// import logo from "../assets/abby_basic_logo_black_rgb.png";

// export async function generateTicketPDF(closeup, clue) {
//   const doc = new jsPDF({ unit: 'pt', format: [298, 420] });
//   const pageWidth = 298;

//   // Logo
//   const logoBase64 = await toBase64(logo);
//   const logoDims = { width: 125, height: 42 };
//   const logoX = (pageWidth - logoDims.width) / 2;
//   doc.addImage(logoBase64, 'PNG', logoX, 10, logoDims.width, logoDims.height);

//   // Grayscale image
//   const grayscaleImage = await convertImageToGrayscale(closeup.image_url);
//   const imgDims = { width: 240 * 0.75, height: 320 * 0.75 };
//   const imgX = (pageWidth - imgDims.width) / 2;
//   doc.addImage(grayscaleImage, 'JPEG', imgX, 70, imgDims.width, imgDims.height);

//   // Clue title and text
//   const clueTitle = 'WHAT YOU CAN DO';
//   const clueText = clue.room_clue;
//   const maxTextWidth = 310;

//   const lines = doc.splitTextToSize(clueText, maxTextWidth);
//   const startX = (pageWidth - imgDims.width) / 2;

//   doc.setFont('helvetica', 'bold');
//   doc.setFontSize(12);
//   doc.text(clueTitle, startX, 340);

//   doc.setFont('helvetica', 'normal');
//   doc.setFontSize(8);
//   lines.forEach((line, i) => {
//     doc.text(line, startX, 360 + i * 10); // 10pt line height spacing
//   });

//   // Page 2 with invitation
//   doc.addPage([298, 420]);
//   const invitationBase64 = await toBase64(invitationImage);
//   doc.addImage(invitationBase64, 'PNG', 0, 0, 298, 420);

//   doc.save('ticketwithjsPDF.pdf');
// }


// async function toBase64(url) {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const reader = new FileReader();

//   return await new Promise((resolve, reject) => {
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// }

// OPTION 1: with pdf-lib

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import invitationImage from '../assets/images/png/ticket-test/personal-invitation-transparent.png';
import { convertImageToGrayscale } from './grayscale';
import logo from "../assets/images/png/ticket-test/abby_basic_logo_black_rgb.png";

// //In pdf-lib, (0, 0) is at the bottom-left of the page, unlike HTML where it's top-left.

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


export async function generateTicketPDF(closeup, clue, ticketNumber) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 298;
  const pageHeight = 420;
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Load & draw logo
  const logoBytes = await fetch(logo).then(res => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.03);
  const logoY = pageHeight - logoDims.height - 10; // 10pt from top
  page1.drawImage(logoImage, {
    x: (pageWidth - logoDims.width) / 2,
    y: logoY,
    width: logoDims.width,
    height: logoDims.height,
  });

  // Convert & draw grayscale image
  console.log('Converting closeup image to grayscale:', closeup);
  const grayscaleImage = await convertImageToGrayscale(closeup);
  const imageBytes = await fetch(grayscaleImage).then(res => res.arrayBuffer());
  const image = grayscaleImage.endsWith('.png')
    ? await pdfDoc.embedPng(imageBytes)
    : await pdfDoc.embedJpg(imageBytes);

  const imageDims = image.scale(0.75);
  const imageY = logoY - imageDims.height - 20;
  page1.drawImage(image, {
    x: (pageWidth - imageDims.width) / 2,
    y: imageY,
    width: imageDims.width,
    height: imageDims.height,
  });

  // Font & text

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const clueTitle = 'WHAT YOU CAN DO';
    const clueText = clue;

    // Split clueText to lines of max ~240px width
    const maxTextWidth = 180;
    const clueLines = splitTextIntoLines(clueText, fontRegular, 10, maxTextWidth);


    // Measure title and line widths
    //const titleWidth = fontBold.widthOfTextAtSize(clueTitle, 12);
    //const lineWidths = clueLines.map(line => fontRegular.widthOfTextAtSize(line, 10));
    //const blockWidth = Math.max(titleWidth, ...lineWidths);

    // Calculate x so the whole block is centered
    const xStart = (pageWidth - imageDims.width) / 2;

    // Position text under image
    const titleY = imageY - 30;
    const textStartY = titleY - 16;

    // Draw bold title
    page1.drawText(clueTitle, {
    x: xStart,
    y: titleY,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
    });

    // Draw clue lines
    clueLines.forEach((line, i) => {
    page1.drawText(line, {
        x: xStart,
        y: textStartY - i * 12,
        size: 10,
        font: fontRegular,
        color: rgb(0, 0, 0),
    });
    });

    const ticketNumberText = `${ticketNumber}`;
    page1.drawText(ticketNumberText, {
      x: xStart,
      y: textStartY - clueLines.length * 12 - 20,
      size: 10,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });


  // Add second page
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  const invitationImageBytes = await fetch(invitationImage).then(res => res.arrayBuffer());
  const invitationPdfImage = await pdfDoc.embedPng(invitationImageBytes);
  const invitationDims = invitationPdfImage.scale(0.25);
  page2.drawImage(invitationPdfImage, {
    x: 0,
    y: pageHeight - invitationDims.height,
    width: invitationDims.width,
    height: invitationDims.height,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ticketwithPDFdocument.pdf';
  a.click();
}

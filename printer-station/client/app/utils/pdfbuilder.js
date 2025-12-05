import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import invitationImage from '../assets/images/v3/abby-get-close-ticket-back.png';
import { convertImageToGrayscale } from './grayscale';
import logo from "../assets/images/v3/logo-s.png";

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

export async function generateTicketPDF(id, closeup, clue, previewOnly = false) {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 298;
  const pageHeight = 420;
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  const logoBytes = await fetch(logo).then(res => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.3);
  const logoY = pageHeight - logoDims.height - 13; 
  page1.drawImage(logoImage, {
    x: 17,
    y: logoY,
    width: logoDims.width,
    height: logoDims.height,
  });

  const grayscaleImage = await convertImageToGrayscale(closeup);
  const imageBytes = await fetch(grayscaleImage).then(res => res.arrayBuffer());
  const image = grayscaleImage.endsWith('.png')
    ? await pdfDoc.embedPng(imageBytes)
    : await pdfDoc.embedJpg(imageBytes);

  const imageDims = image.scale(1);
  const imageY = logoY - imageDims.height - 20;
  page1.drawImage(image, {
    x: (pageWidth - imageDims.width) / 2,
    y: imageY,
    width: imageDims.width,
    height: imageDims.height,
  });

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const tagline1 = "YOUR INVITATION";
  const tagline2 = "TO GET CLOSE";

  const introTitle = "This close-up image is part of Abby’s new Stadsliving spaces.";
  const introText = "Can you find where it belongs?";
  const clueTitle = 'CLUE - Which Room?';
  const clueText = clue;

  // Split clueText to lines of max ~240px width
  const maxTextWidth = 180;
  const clueLines = splitTextIntoLines(clueText, fontRegular, 8, maxTextWidth);

  const imageInfoText = "This was captured by another visitor, find it’s location to unlock a reflection this person left for you.";
  const imageInfoTextLines = splitTextIntoLines(imageInfoText, fontRegular, 10, maxTextWidth + 100);

  const ticketNumber = `#${id}`;
  
  // Calculate x so the whole block is centered
  const xStart = (pageWidth - imageDims.width) / 2;

  // Draw taglines
  page1.drawText(tagline1, {
    x: 182,
    y: pageHeight - 13 - 10,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page1.drawText(tagline2, {
    x: 200,
    y: pageHeight - 13 - 22,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
    });

  imageInfoTextLines.forEach((line, i) => {
    page1.drawText(line, {
      x: (pageWidth - imageDims.width) / 2 + 2,
      y: imageY - i * 12 - 10,
      size: 8,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
  });

  // Position text under image
  const titleY = imageY - 50;
  const textStartY = titleY - 16;
  
    page1.drawRectangle({
    x: xStart,
    y: 120,
    z: 0,
    width: imageDims.width,
    height: 28,
    borderWidth:0,
    color:rgb(0.5, 0.5, 0.5),
    opacity: 0.5,
  });

  page1.drawText(clueTitle, {
    x: xStart,
    y: titleY,
    size: 12,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  clueLines.forEach((line, i) => {
    page1.drawText(line, {
      x: xStart,
      y: textStartY - i * 16,
      z: 1,
      size: 10,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
  });

  page1.drawText(ticketNumber, {
        x: (pageWidth - 10) / 2,
        y: 17 ,
        z:1,
        size: 10,
        font: fontRegular,
        color: rgb(0,0,0),
  });

  // page1.drawRectangle({
  //   x: (pageWidth - 10) / 2,
  //   y: 25,
  //   width: 33,
  //   height: 28,
  //   borderWidth:0,
  //   color: rgb(0,0,0),
  //   opacity: 1,
  // });


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
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = 'ticketwithPDFdocument.pdf';
  // a.click();

  if (previewOnly) {
    return url; // 👈 Return URL for <iframe> preview
  } else {
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${id}.pdf`;
    a.click();
    return null;
  }
}





// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import logo from "../assets/v2/logo-s.png";
// import invitationImage from '../assets/v2/other-side-QR.png';

// function splitTextIntoLines(text, font, fontSize, maxWidth) {
//   const words = text.split(' ');
//   const lines = [];
//   let currentLine = '';

//   for (const word of words) {
//     const testLine = currentLine ? currentLine + ' ' + word : word;
//     const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

//     if (lineWidth <= maxWidth) {
//       currentLine = testLine;
//     } else {
//       if (currentLine) lines.push(currentLine);
//       currentLine = word;
//     }
//   }
//   if (currentLine) lines.push(currentLine);

//   return lines;
// }


// export async function generateTicketPDF({ id, closeup, clue }) {
//   try {
//     console.log('Generating ticket PDF with id:', id);
//     console.log('Closeup image URL:', closeup);
//     console.log('Clue object:', clue);

//     const pdfDoc = await PDFDocument.create();
//     const pageWidth = 298;
//     const pageHeight = 420;
//     const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

//     // LOGO
//     const logoBytes = await fetch(logo).then(res => res.arrayBuffer());
//     const logoImage = await pdfDoc.embedPng(logoBytes);
//     const logoDims = logoImage.scale(0.03);
//     const logoY = pageHeight - logoDims.height - 10;

//     page1.drawImage(logoImage, {
//       x: (pageWidth - logoDims.width) / 2,
//       y: logoY,
//       width: logoDims.width,
//       height: logoDims.height,
//     });

//     // IMAGE: try skipping grayscale step temporarily
//     const imageBytes = await fetch(closeup).then(res => {
//       if (!res.ok) throw new Error(`Failed to load image: ${res.statusText}`);
//       return res.arrayBuffer();
//     });
//     const image = await pdfDoc.embedJpg(imageBytes); // assuming it's JPG

//     const imageDims = image.scale(0.75);
//     const imageY = logoY - imageDims.height - 20;
//     page1.drawImage(image, {
//       x: (pageWidth - imageDims.width) / 2,
//       y: imageY,
//       width: imageDims.width,
//       height: imageDims.height,
//     });

//     // TEXT
//     const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//     const clueText = clue?.room_clue || "No clue available";

//     const clueLines = splitTextIntoLines(clueText, fontRegular, 10, 180);
//     const titleY = imageY - 30;
//     const textStartY = titleY - 16;
//     const xStart = (pageWidth - imageDims.width) / 2;

//     page1.drawText('WHAT YOU CAN DO', {
//       x: xStart,
//       y: titleY,
//       size: 12,
//       font: fontBold,
//       color: rgb(0, 0, 0),
//     });

//     clueLines.forEach((line, i) => {
//       page1.drawText(line, {
//         x: xStart,
//         y: textStartY - i * 12,
//         size: 10,
//         font: fontRegular,
//         color: rgb(0, 0, 0),
//       });
//     });

//     // PAGE 2
//     const invitationImageBytes = await fetch(invitationImage).then(res => res.arrayBuffer());
//     const invitationImageEmbedded = await pdfDoc.embedPng(invitationImageBytes);
//     const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
//     const invitationDims = invitationImageEmbedded.scale(0.25);
//     page2.drawImage(invitationImageEmbedded, {
//       x: 0,
//       y: pageHeight - invitationDims.height,
//       width: invitationDims.width,
//       height: invitationDims.height,
//     });

//     // SAVE
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `ticket-${id}.pdf`;
//     a.click();

//   } catch (err) {
//     console.error("🔥 PDF generation failed:", err);
//     alert("PDF generation failed. See console for details.");
//   }
// }




// OPTION 1: with pdf-lib

// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// // import invitationImage from '../assets/personal-invitation-transparent.png';
// import invitationImage from '../assets/v2/logo-s.png';
// import { convertImageToGrayscale } from './grayscale';
// import logo from "../assets/abby_basic_logo_black_rgb.png";

// // //In pdf-lib, (0, 0) is at the bottom-left of the page, unlike HTML where it's top-left.

// function splitTextIntoLines(text, font, fontSize, maxWidth) {
//   const words = text.split(' ');
//   const lines = [];
//   let currentLine = '';

//   for (const word of words) {
//     const testLine = currentLine ? currentLine + ' ' + word : word;
//     const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

//     if (lineWidth <= maxWidth) {
//       currentLine = testLine;
//     } else {
//       if (currentLine) lines.push(currentLine);
//       currentLine = word;
//     }
//   }
//   if (currentLine) lines.push(currentLine);

//   return lines;
// }


// export async function generateTicketPDF({id,closeup, clue}) {
//   console.log('Generating ticket PDF with id:', id);
//   console.log('Closeup image URL:', closeup);
//   console.log('Clue text:', clue);
//   const pdfDoc = await PDFDocument.create();
//   const pageWidth = 298;
//   const pageHeight = 420;
//   const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

//   // Load & draw logo
//   const logoBytes = await fetch(logo).then(res => res.arrayBuffer());
//   const logoImage = await pdfDoc.embedPng(logoBytes);
//   const logoDims = logoImage.scale(0.03);
//   const logoY = pageHeight - logoDims.height - 10; // 10pt from top
//   page1.drawImage(logoImage, {
//     x: (pageWidth - logoDims.width) / 2,
//     y: logoY,
//     width: logoDims.width,
//     height: logoDims.height,
//   });

//   // Convert & draw grayscale image
//   const grayscaleImage = await convertImageToGrayscale(closeup);
//   const imageBytes = await fetch(grayscaleImage).then(res => res.arrayBuffer());
//   const image = grayscaleImage.endsWith('.png')
//     ? await pdfDoc.embedPng(imageBytes)
//     : await pdfDoc.embedJpg(imageBytes);

//   const imageDims = image.scale(0.75);
//   const imageY = logoY - imageDims.height - 20;
//   page1.drawImage(image, {
//     x: (pageWidth - imageDims.width) / 2,
//     y: imageY,
//     width: imageDims.width,
//     height: imageDims.height,
//   });

//   // Font & text

//     const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//     const clueTitle = 'WHAT YOU CAN DO';
//     const clueText = clue.room_clue;

//     // Split clueText to lines of max ~240px width
//     const maxTextWidth = 180;
//     const clueLines = splitTextIntoLines(clueText, fontRegular, 10, maxTextWidth);


//     // Measure title and line widths
//     //const titleWidth = fontBold.widthOfTextAtSize(clueTitle, 12);
//     //const lineWidths = clueLines.map(line => fontRegular.widthOfTextAtSize(line, 10));
//     //const blockWidth = Math.max(titleWidth, ...lineWidths);

//     // Calculate x so the whole block is centered
//     const xStart = (pageWidth - imageDims.width) / 2;

//     // Position text under image
//     const titleY = imageY - 30;
//     const textStartY = titleY - 16;

//     // Draw bold title
//     page1.drawText(clueTitle, {
//     x: xStart,
//     y: titleY,
//     size: 12,
//     font: fontBold,
//     color: rgb(0, 0, 0),
//     });

//     // Draw clue lines
//     clueLines.forEach((line, i) => {
//     page1.drawText(line, {
//         x: xStart,
//         y: textStartY - i * 12,
//         size: 10,
//         font: fontRegular,
//         color: rgb(0, 0, 0),
//     });
//     });


//   // Add second page
//   const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
//   const invitationImageBytes = await fetch(invitationImage).then(res => res.arrayBuffer());
//   const invitationPdfImage = await pdfDoc.embedPng(invitationImageBytes);
//   const invitationDims = invitationPdfImage.scale(0.25);
//   page2.drawImage(invitationPdfImage, {
//     x: 0,
//     y: pageHeight - invitationDims.height,
//     width: invitationDims.width,
//     height: invitationDims.height,
//   });

//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'ticketwithPDFdocument.pdf';
//   a.click();
// }

// OPTION 1: with pdf-lib

// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import invitationImage from '../assets/v2/other-side-QR.png';
// import blackBoxImage from '../assets/black_box_ticket_number.png';
// import { convertImageToGrayscale } from './grayscale';
// // import logo from "../assets/abby_basic_logo_black_rgb.png";
// //import logo from "../assets/v2/logo-l.png";
// import logo from "../assets/v2/logo-s.png";
// //import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// // import fontkit from '@pdf-lib/fontkit';
// // import { PDFDocument, rgb } from 'pdf-lib';

// // //In pdf-lib, (0, 0) is at the bottom-left of the page, unlike HTML where it's top-left.

// function splitTextIntoLines(text, font, fontSize, maxWidth) {
//   const words = text.split(' ');
//   const lines = [];
//   let currentLine = '';

//   for (const word of words) {
//     const testLine = currentLine ? currentLine + ' ' + word : word;
//     const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

//     if (lineWidth <= maxWidth) {
//       currentLine = testLine;
//     } else {
//       if (currentLine) lines.push(currentLine);
//       currentLine = word;
//     }
//   }
//   if (currentLine) lines.push(currentLine);

//   return lines;
// }


// // export async function generateTicketPDF(ticketNumber, closeup, clue, returnUrlOnly = false) {

// //   // Variables

// //   // console.log('Generating ticket PDF with ticketNumber:', ticketNumber);
// //   // console.log('Closeup image URL:', closeup);
// //   // console.log('Clue text:', clue);
// //   const pdfDoc = await PDFDocument.create();
// //  //pdfDoc.registerFontkit(fontkit); // This line is required before embedFont
// //   // const walsheimFont = await pdfDoc.embedFont(fontBytes);
// //   // // Load font file as Uint8Array
// //   // const fontRegularUrl = '/ticket-fonts/GT-Walsheim-Regular.otf'; // must be served from public folder
// //   // const fontBoldUrl = '/ticket-fonts/GT-Walsheim-Bold.otf'; // must be served from public folder
// //   // const walsheimBytes = await fetch(fontRegularUrl).then(res => res.arrayBuffer());
// //   // const walsheimFontRegular = await pdfDoc.embedFont(walsheimBytes);
// //   // // If you have a bold variant:
// //   // const walsheimBoldBytes = await fetch(fontBoldUrl).then(res => res.arrayBuffer());
// //   // const walsheimFontBold = await pdfDoc.embedFont(walsheimBoldBytes);

// //   // const walsheimFontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
// //   // const walsheimFont = await pdfDoc.embedFont(walsheimFontBytes);
// //   const pageWidth = 298;
// //   const pageHeight = 420;
// //   const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

// //   // Load & draw logo
// //   const logoBytes = await fetch(logo).then(res => res.arrayBuffer());
// //   const logoImage = await pdfDoc.embedPng(logoBytes);
// //   const logoDims = logoImage.scale(0.3); // Scale down to 30%
// //   const logoY = pageHeight - logoDims.height - 10; // 10pt from top
// //   page1.drawImage(logoImage, {
// //     x: 17,
// //     y: pageHeight - 13 - logoDims.height, // 13pt from top
// //     width: logoDims.width,
// //     height: logoDims.height,
// //   });

// //   // Introduction
// //   const introText = "This close-up image is part of Abby's new Stadsliving spaces.";
// //   const introText2 = "Can you find where it belongs?";

// //   // Convert & draw grayscale image
// //   const grayscaleImage = await convertImageToGrayscale(closeup);
// //   // try Grayscale: = "Grayscale" or Grayscale: = "CMYK"to see if pdf does greyscaling for you
// //   const imageBytes = await fetch(grayscaleImage).then(res => res.arrayBuffer());
// //   const image = grayscaleImage.endsWith('.png')
// //     ? await pdfDoc.embedPng(imageBytes)
// //     : await pdfDoc.embedJpg(imageBytes);

// //   const imageDims = image.scale(1);
// //   const imageY = logoY - imageDims.height - 20;
// //   page1.drawImage(image, {
// //     x: (pageWidth - imageDims.width) / 2,
// //     y: imageY,
// //     width: imageDims.width,
// //     height: imageDims.height,
// //   });

// //   // Font & text
  
    
// //     const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
// //     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

// //     const imageInfoText = "This was captured by another visitor, find it's location to unlock a reflection this person left for you.";

// //     const clueTitle = 'CLUE - Which Room?';
// //     const clueText = clue;

// //     const ticketNumberText = `${ticketNumber}`;

   
// //     // Split clueText to lines of max ~240px width
// //     const maxTextWidth = 180;
// //     const clueLines = splitTextIntoLines(clueText, fontRegular, 10, maxTextWidth);
// //     //const clueLines = splitTextIntoLines(clueText, walsheimFontRegular, 10, maxTextWidth);


// //     // Measure title and line widths
// //     //const titleWidth = fontBold.widthOfTextAtSize(clueTitle, 12);
// //     //const lineWidths = clueLines.map(line => fontRegular.widthOfTextAtSize(line, 10));
// //     //const blockWidth = Math.max(titleWidth, ...lineWidths);

// //     // Calculate x so the whole block is centered
// //     const xStart = (pageWidth - imageDims.width) / 2;

// //     // Position text under image
// //     const titleY = imageY - 30;
// //     const textStartY = titleY - 16;
// //       // Besides the logo
// //     const tagline1 = "YOUR INVITATION";
// //     const tagline2 = "TO GET CLOSE";

// //     // Draw bold title
// //     page1.drawText(tagline1, {
// //     x: 182,
// //     y: pageHeight - 13 - 10,
// //     size: 12,
// //     font: fontBold,
// //     color: rgb(0, 0, 0),
// //     });

// //       // Draw bold title
// //     page1.drawText(tagline2, {
// //     x: 200,
// //     y: pageHeight - 13 - 22,
// //     size: 12,
// //     font: fontBold,
// //     color: rgb(0, 0, 0),
// //     });

// //     // Draw bold title
// //     page1.drawText(clueTitle, {
// //     x: xStart,
// //     y: titleY,
// //     size: 12,
// //     font: fontBold,
// //     color: rgb(0, 0, 0),
// //     });

// //     // Draw clue lines
// //     clueLines.forEach((line, i) => {
// //     page1.drawText(line, {
// //         x: xStart,
// //         y: textStartY - i * 12,
// //         size: 10,
// //         font: fontRegular,
// //         color: rgb(0, 0, 0),
// //     });
// //     });

// //     // Draw ticket number
// //     // page1.drawText(ticketNumberText, {
// //     //     x: (pageWidth - 10) / 2,
// //     //     y: textStartY - clueLines.length * 12 - 20,
// //     //     size: 10,
// //     //     font: fontRegular,
// //     //     color: rgb(255, 255, 255),
// //     // });

// //     // page1.drawRectangle({
// //     //     x: 100,
// //     //     y: 20,
// //     //     width: 40,
// //     //     height: 40,
// //     //     color: rgb(1, 1, 1), // White background
// //     // });

// //     // page1.drawRect({
// //     //   x: 100,
// //     //   y: 20,
// //     //   width: 40,
// //     //   height: 40,
// //     //   color: rgb(1, 1, 1), // White
// //     //   borderColor: rgb(0, 0, 0), // Optional: Black border
// //     //   borderWidth: 1,
// //     // });

// //   // const blackBoxUrl = './assets/black_box_ticket_number.png';
// //   // const blackBoxBytes = await fetch(blackBoxUrl).then(res => res.arrayBuffer());

// //   // const imageBlackBox = blackBoxUrl.endsWith('.png')
// //   //   ? await pdfDoc.embedPng(blackBoxBytes)
// //   //   : await pdfDoc.embedJpg(blackBoxBytes);

// //   // // const imageDims = imageBlackBox.scale(1);
// //   // // const imageY = logoY - imageDims.height - 20;
// //   // page1.drawImage(imageBlackBox, {
// //   //   x: (pageWidth - imageDims.width) / 2,
// //   //   y: imageY,
// //   //   width: imageDims.width,
// //   //   height: imageDims.height,
// //   // });

// //   // const blackBoxUrl = './assets/black_box_ticket_number.jpg';
// //   // const blackBoxImageBytes = await fetch(blackBoxUrl).then(res => res.arrayBuffer());
// //   // const blackBoxPdfImage = await pdfDoc.embedJpg(blackBoxImageBytes);
// //   // const blackBoxDims = blackBoxPdfImage.scale(0.25);
// //   // page2.drawImage(blackBoxPdfImage, {
// //   //   x: 0,
// //   //   y: pageHeight - blackBoxDims.height,
// //   //   width: blackBoxDims.width,
// //   //   height: blackBoxDims.height,
// //   // });




// //   // Add second page
// //   const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
// //   const invitationImageBytes = await fetch(invitationImage).then(res => res.arrayBuffer());
// //   const invitationPdfImage = await pdfDoc.embedPng(invitationImageBytes);
// //   const invitationDims = invitationPdfImage.scale(0.25);
// //   page2.drawImage(invitationPdfImage, {
// //     x: 0,
// //     y: pageHeight - invitationDims.height,
// //     width: invitationDims.width,
// //     height: invitationDims.height,
// //   });

// //   const pdfBytes = await pdfDoc.save();
// //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
// //   const url = URL.createObjectURL(blob);

// //   if (returnUrlOnly) {
// //     return url; // ✅ Only return the URL, do NOT download
// //   } else {
// //     // ✅ Only download if explicitly requested
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = 'ticketwithPDFdocument.pdf';
// //     a.click();
// //   }
// // }
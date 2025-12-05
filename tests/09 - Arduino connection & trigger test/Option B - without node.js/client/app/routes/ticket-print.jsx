// with clientLoader for data fetching

import { useRef, useState } from 'react';
import { generateTicketPDF } from '../utils/pdfbuilder';
import { getLatestCloseup, getClueForCloseup } from '../utils/supabase';

export const clientLoader = async () => {
  const closeup = await getLatestCloseup();
  const clue = await getClueForCloseup(closeup.room_id);
  return { closeup, clue };
};

function TicketPrint({ loaderData }) {
  const { closeup, clue } = loaderData;

  const [port, setPort] = useState(null);
  const readerRef = useRef(null);

  const connectToArduino = async () => {
    try {
      const serialPort = await navigator.serial.requestPort();
      await serialPort.open({ baudRate: 9600 });
      setPort(serialPort);

      const decoder = new TextDecoderStream();
      const inputDone = serialPort.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();
      readerRef.current = reader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value && value.trim() === 'pressed') {
          console.log('Arduino button pressed');
          generateTicketPDF(closeup, clue);
        }
      }

      await reader.cancel();
      await inputDone;
      await serialPort.close();
    } catch (error) {
      console.error('Serial connection error:', error);
    }
  };

  return (
    <div>
      <button onClick={connectToArduino}>Connect to Arduino</button>
      <button onClick={() => generateTicketPDF(closeup, clue)}>Download Ticket PDF</button>
    </div>
  );
}

export default TicketPrint;

// with useEffect and useState instead of clientLoader to get data from supabase fetch functions
// import { useEffect, useState, useRef } from 'react';
// import { getLatestCloseup, getClueForCloseup } from '../utils/supabase';
// import { generateTicketPDF } from '../utils/pdfbuilder';

// function TicketPrint() {
//   const [ticketData, setTicketData] = useState(null);
//   const [port, setPort] = useState(null);
//   const readerRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       const closeup = await getLatestCloseup();
//       const clue = await getClueForCloseup(closeup.room_id);
//       setTicketData({ closeup, clue });
//     }

//     fetchData();
//   }, []);

//   const connectToArduino = async () => {
//     try {
//       const serialPort = await navigator.serial.requestPort();
//       await serialPort.open({ baudRate: 9600 });
//       setPort(serialPort);

//       const decoder = new TextDecoderStream();
//       const inputDone = serialPort.readable.pipeTo(decoder.writable);
//       const reader = decoder.readable.getReader();
//       readerRef.current = reader;

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         if (value && value.trim() === 'pressed') {
//           console.log('Arduino button pressed');

//           let data = ticketData;
//           if (!data) {
//             const closeup = await getLatestCloseup();
//             const clue = await getClueForCloseup(closeup.room_id);
//             data = { closeup, clue };
//             setTicketData(data);
//           }

//           generateTicketPDF(data.closeup, data.clue);
//         }
//       }

//       await reader.cancel();
//       await inputDone;
//       await serialPort.close();
//     } catch (error) {
//       console.error('Serial connection error:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={connectToArduino}>
//         Connect to Arduino
//       </button>

//       {ticketData && (
//         <button onClick={() => generateTicketPDF(ticketData.closeup, ticketData.clue)}>
//           Download Ticket PDF
//         </button>
//       )}
//     </div>
//   );
// }

// export default TicketPrint;

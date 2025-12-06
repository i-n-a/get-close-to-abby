// with clientLoader for data fetching

import { useEffect, useRef, useState } from 'react';
import { generateTicketPDF } from '../utils/pdfbuilder';
import { getTicketWithClue } from '../utils/supabase';

export const clientLoader = async () => {
  const ticketData = await getTicketWithClue();
  if (!ticketData) {
    throw new Error("Failed to load ticket data");
  }
  //console.log("Ticket data loaded:", ticketData);
  return { ticketData };
};

function TicketPrint({ loaderData }) {
  // const { closeup, clue } = loaderData;
  const { ticketData } = loaderData;
  console.log("Ticket Data in TicketPrint:", ticketData);
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
          generateTicketPDF(ticketData.ticketImage,ticketData.ticketClue,ticketData.ticketId);
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
    <>
      <div>
        <button onClick={connectToArduino}>Connect to Arduino</button>
        <button onClick={() => generateTicketPDF(ticketData.ticketImage, ticketData.ticketClue,ticketData.ticketId)}>Download Ticket PDF</button>
      </div>
    </>
  );
}

export default TicketPrint;

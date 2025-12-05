import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getLatestCloseup, getClueForCloseup } from '../utils/supabase';
import { generateTicketPDF } from '../utils/pdfbuilder';

function TicketPrint() {
  const [ticketData, setTicketData] = useState(null);

  // Fetch ticket data on mount
  useEffect(() => {
    async function fetchData() {
      const closeup = await getLatestCloseup();
      const clue = await getClueForCloseup(closeup.room_id);
      setTicketData({ closeup, clue });
    }

    fetchData();
  }, []);

  useEffect(() => {
    //const socket = io('http://localhost:3001'); // 👈 use the port of your arduino-server
    const socket = io('https://localhost:3001'); // 👈 use the port of your arduino-server

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('button_pressed', async () => {
      console.log('Button pressed from Arduino');

      let data = ticketData;

      if (!data) {
        const closeup = await getLatestCloseup();
        const clue = await getClueForCloseup(closeup.room_id);
        data = { closeup, clue };
        setTicketData(data);
      }

      generateTicketPDF(data.closeup, data.clue);
    });

    return () => socket.disconnect();
  }, [ticketData]);

  return (
    <div>
      {ticketData && (
        <button onClick={() => generateTicketPDF(ticketData.closeup, ticketData.clue)}>
          Download Ticket PDF
        </button>
      )}
    </div>
  );
}

export default TicketPrint;

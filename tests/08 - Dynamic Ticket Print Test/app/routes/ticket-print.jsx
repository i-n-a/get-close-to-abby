import { useEffect, useState } from 'react';
import { getLatestCloseup, getRandomCloseup, getClueForCloseup } from '../utils/supabase';
import { generateTicketPDF } from '../utils/pdfbuilder';

function TicketPrint() {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const closeup = await getLatestCloseup();
      const clue = await getClueForCloseup(closeup.room_id);
      setTicketData({ closeup, clue });
    }

    fetchData();
  }, []);

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
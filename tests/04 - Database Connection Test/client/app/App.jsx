import { useEffect, useState } from 'react';
import { getRandomCloseup, getClueForCloseup } from './utils/supabase';

function downloadTicketFromData(closeup, clue) {
  const text = `🎟 Ticket
Clue: ${clue.room_clue}
Image URL: ${closeup.image_url}`;

  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ticket.txt';
  link.click();
}

function App() {
  const [closeup, setCloseup] = useState(null);
  const [clue, setClue] = useState(null);

  useEffect(() => {
    async function fetchTicketData() {
      const fetchedCloseup = await getRandomCloseup();
      const roomId = fetchedCloseup.room_id;
      const fetchedClue = await getClueForCloseup(roomId);

      setCloseup(fetchedCloseup);
      setClue(fetchedClue);
    }

    fetchTicketData();
  }, []);

  return (
    <div>
      <button
        onClick={() => downloadTicketFromData(closeup, clue)}
        disabled={!closeup || !clue} // Disable button until data is ready
      >
        Download Ticket
      </button>
    </div>
  );
}

export default App;


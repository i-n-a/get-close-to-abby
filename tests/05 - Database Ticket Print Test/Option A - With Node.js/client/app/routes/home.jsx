//import { useState } from 'react';
import { getRandomCloseup, getClueForCloseup } from '../utils/supabase';
import { useLoaderData } from "react-router";

export async function loader() {
  const closeup = await getRandomCloseup();
  const roomId = closeup.room_id;
  const clue = await getClueForCloseup(roomId);
  console.log('Closeup:', closeup);
  console.log('Clue:', clue);
  return { closeup, clue };
}

async function fetchTicketAndDownloadPDF(closeup, clue) {
  const ticket = {
    imageUrl: closeup.image_url,
    clueText: clue.room_clue
  };

  const response = await fetch(`http://localhost:3000/generate-ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ticketwithpdfkitandnodejs.pdf';
  link.click();
}

function App() {
  const { closeup, clue } = useLoaderData();
  //const {closeup} = loaderData;
  //const {clue} = loaderData;
  //console.log('Closeup:', closeup);
  //console.log('Clue:', clue);

  return (
    <button onClick={() => fetchTicketAndDownloadPDF(closeup, clue)} disabled={!closeup || !clue}>
      Generate Ticket (PDF)
    </button>
  );
}

export default App;




// test 04 but with react-router and server loading

// import { getRandomCloseup, getClueForCloseup } from '../utils/supabase';

// export async function loader() {
//   const closeup = await getRandomCloseup();
//   const roomId = closeup.room_id;
//   const clue = await getClueForCloseup(roomId);
//   return { closeup, clue };
// }

// function downloadTicketFromData(closeup, clue) {
//   const text = `🎟 Ticket
// Clue: ${clue.room_clue}
// Image URL: ${closeup.image_url}`;

//   const blob = new Blob([text], { type: 'text/plain' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = 'ticket.txt';
//   link.click();
// }

// function App({loaderData}) {
//   const {closeup} = loaderData;
//   const {clue} = loaderData;  

//   return (
//     <div>
//       <button
//         onClick={() => downloadTicketFromData(closeup, clue)}
//         disabled={!closeup || !clue} // Disable button until data is ready
//       >
//         Download Ticket
//       </button>
//     </div>
//   );
// }

// export default App;


import {Link} from "react-router";
export function meta() {
  return [
    { title: "Abby Kortrijk" },
    { name: "description", content: "Website of the museum Abby in Kortrijk" },
  ];
}

export default function Home() {
  return (
    <>
      <h1> ABBY Kortrijk</h1>
      <Link className="button" to="/ticket-print">Go get a physical ticket</Link>
      <section>
        <h2>How it works</h2>
        <article>
          <span>1</span>
          <h3>Get your close-up ticket</h3>
        </article>
        <article>
          <span>2</span>
          <h3> Find where it belongs</h3>
        </article>
        <article>
          <span>3</span>
          <h3> Submit your own close-up</h3>
          <p>You’ve seen a part of what makes Abby special. Now, you can help someone else see it through your eyes.</p>
          <p>Submit a close-up of something you noticed. We’ll turn it into a new invitation , so others can begin their journey where yours left off.</p>
          <Link className="button" to="/submit-closeup">Submit Close-Up</Link>
        </article>
         <article>
          <span>4</span>
          <h3> Flip your ticket</h3>
        </article>
      </section>
    </>
  );
}


//     Developer Notes:
//     ==================    
    
//     Arduino Button connection & trigger test:
//     Can the button trigger to get a printed ticket be replaced by an arduino connected button so the printer get ticket based on if somebody pressed the button?

//     Option B - without node.js:
//     - The web serial API is used to connect to the arduino and listen to the button press event.
//     - When the button is pressed, the web serial API sends a message to the client to trigger the ticket generation.
//     - You can still click the button in the UI to generate a ticket without the arduino connection.

//     Learnings:
//       - You can order the close-ups in the table based on created_at timestamps and then you can select the first one in the table to get the latest submitted close-up plus corresponding clue
//       - The room clue is picked up because the close-up table and clue table are linked through the room_id from the rooms table.
//       - In Supabase, every table is linked through the room_id of the rooms table.
//       - You can code the ticket-print.jsx route to listen to the button press event and then trigger the ticket generation. But also to still allow the user to click the button in the UI to generate a ticket without the arduino connection.
    
//     Solution:
//     - use web serial api instead of node.js server and socket.io in ticket-print.jsx

//     ‼️ Limitations:
//     - There is no restraint on the image volume yet and it is set to .png upload
//     - The submitted is semi-validated on the client side because some easy error conditions are being used (like if empty, please fill it in)
//     - The ticket generation is added to the route ticket-print.jsx and the pdf is made in pdfbuilder.js with either pdf-lib or pdfmake. The image is converted to grayscale via Canvas API in utils/grayscale.js.
//     - The ticket is generated based on the latest close-up submitted by the user and the corresponding clue.
//     - The ticket is generated as a pdf and then downloaded to the user’s device. You need to set up your computer so when you download the ticket.pdf in downloads folder a folder action starts that prints the pdf automatically. This is done by using Automator on MacOS.
//     - arduino is with a usb connection. You need to first connect with arduino and give user permission before you can press the button to generate the ticket from the js funcitions via react.

//     Further Dev:
//     - Right now the website with submission form and the physical ticket generation is in 1 react app. We need to split them into two projects.
//        1. Public Website (Online)
//          Users can submit data.
//          Built with Vite + React, connects to Supabase.
//          Hosted online (e.g., Vercel, Netlify, or Supabase's built-in hosting).
//          This app is where people enter content that later appears on the ticket.
//        2. Ticket Generator (Offline, Physical Station)
//          Arduino + USB + Button
//          When button is pressed, fetches data from Supabase and generates a PDF ticket.
//          Runs in a local browser (React + Web Serial API) on a Mac, and the ticket is auto-printed with Automator.
//          This is used in a physical installation — like a kiosk.

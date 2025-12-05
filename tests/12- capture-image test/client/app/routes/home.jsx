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

//     Learnings:
//       - You can order the close-ups based on created_at timestamps and then you can select the first one to get the latest submitted close-up plus corresponding clue
    
//     Solution:
//     - use web serial api instead of node.js server and socket.io

//     ‼️ Limitations:
//     - There is no restraint on the image volume yet and it is set to .png upload
//     - The submitted is semi-validated on the client side because some easy error conditions are being used (like if empty, please fill it in)
//     - the ticket generation for the printer is not added in this test
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
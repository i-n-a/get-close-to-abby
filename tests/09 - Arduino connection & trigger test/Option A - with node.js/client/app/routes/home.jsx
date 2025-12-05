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

//     Option A - with node.js:
//     An arduino-server is set up that listens to the button press event and broadcasts the message "button_pressed" to the client via socket.io. The client listens to the button press event and then triggers the ticket generation.

//     Learnings:
//       - You can order the close-ups in the table based on created_at timestamps and then you can select the first one in the table to get the latest submitted close-up plus corresponding clue
//       - The room clue is picked up because the close-up table and clue table are linked through the room_id from the rooms table.
//       - In Supabase, every table is linked through the room_id of the rooms table.
//       - You can code the ticket-print.jsx route to listen to the button press event and then trigger the ticket generation. But also to still allow the user to click the button in the UI to generate a ticket without the arduino connection.
    
//     Solution:
//     - Dev Setup: 
//       - front-end will be react in vite (+ gsap later added for interactions) 
//       - supabase for database
//       - react router for routing
//       - reacter router framework used for action but actually everything can be done through clientAction.
//     - Files from test 06 are used and the route ticket-print.jsx is added. So you can test the submitting form and the ticket generation.
//     - The ticket is generated based on the latest close-up submitted by the user and the corresponding clue.
//     - The ticket is generated as a pdf and then downloaded to the user’s device.

//     ‼️ Limitations:
//     - There is no restraint on the image volume yet and it is set to .png upload
//     - The submitted is semi-validated on the client side because some easy error conditions are being used (like if empty, please fill it in)
//     - The ticket generation is added to the route ticket-print.jsx and the pdf is made in pdfbuilder.js with either pdf-lib or pdfmake. The image is converted to grayscale via Canvas API in utils/grayscale.js.
//     - The ticket is generated based on the latest close-up submitted by the user and the corresponding clue.
//     - The ticket is generated as a pdf and then downloaded to the user’s device. You need to set up your computer so when you download the ticket.pdf in downloads folder a folder action starts that prints the pdf automatically. This is done by using Automator on MacOS.
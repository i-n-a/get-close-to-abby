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
    
//     User Input Form Test:
//     Can a user enter their close-up and reflection into a form and submit it to Supabase?

//     Learnings:
//       - You need to put a policy on the database and supabase storage bucket (= where images are held) in order to be able to post something.
//       - Because supabase js library works via RESTful API, everything can be done on the client side.
//       - The data can be send through handleSubmit() and normal html form element by using State.
//       - Or you send the data through client action and use the Form component from react-router.
//       - The form can be validated on the client side, but it is not a full validation.
//       - The form can be submitted to the database and the image can be uploaded to the storage bucket.
    
//     Solution:
//     - Dev Setup: 
//       - front-end will be react in vite (+ gsap later added for interactions) 
//       - supabase for database
//       - react router for routing
//       - reacter router framework used for action but actually everything can be done through clientAction.
//     - The submit-closeup.jsx file is being coded in three different ways. You can find the different ways in the test files folder in the app/routes folder. The last one is used for the page and route.

//     ‼️ Limitations:
//     - There is no restraint on the image volume yet and it is set to .png upload
//     - The submitted is semi-validated on the client side because some easy error conditions are being used (like if empty, please fill it in)
//     - the ticket generation for the printer is not added in this test. It focus on the user input form and the submission of the close-up and reflection to the database.
//     - The close-up and reflection are not shown on the page after submission, but can be seen in the database and test tables.
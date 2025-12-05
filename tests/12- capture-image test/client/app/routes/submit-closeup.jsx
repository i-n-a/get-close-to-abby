// TO test on phone:
//    npm run dev -- --host
//    put the network link in your phone
 
 
// FOR NOW:
// - On submit:
//       The form data (room, message, resized image) is saved locally
//       A card is added to a list below showing that submission
 
// LEARNED:
// - no way to force user to only capture
// - might be good to use useActionData for validation form
// - Scale the image to fit within the box, then center it on a canvas of size 263×208.
 
 
import { Form, useNavigation, redirect } from 'react-router';
// import { uploadCloseUpWithReflection } from '../utils/supabase'; // new helper
import { useState } from 'react';
import "./submit-closeup.css";
 
// This handles the form submission when posting to supabase
// export async function clientAction({ request }) {
//   const formData = await request.formData();
 
//   const room = parseInt(formData.get('room'), 10);
//   const message = formData.get('message');
//   const file = formData.get('image');
 
//   // if (!file || isNaN(room)) {
//   //   return { error: 'Missing required fields.' };
//   // }
//   if (!file.type.startsWith('image/')) {
//     return { error: 'Uploaded file must be an image.' };
//   }
//   if (message.length === 0) {
//     return { error: 'Please insert your reflection or message.' };
//   }
//   if (isNaN(room)) {
//     return { error: 'Please select the room where you took the picture' };
//   }
 
//   try {
//     await uploadCloseUpWithReflection({ room, message, file });
//     return redirect('/submit-closeup/confirmation');
//   } catch (error) {
//     console.error('Submission error:', error.message);
//     return { error: error.message };
//   }
// }
 
export default function SubmitCloseUp() {
  const [preview, setPreview] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const navigation = useNavigation();
  
 
  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      //crop img
      img.onload = () => {
        const TARGET_WIDTH = 263;
        const TARGET_HEIGHT = 208;
        const TARGET_ASPECT = TARGET_WIDTH / TARGET_HEIGHT;
      
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgAspect = imgWidth / imgHeight;
      
        let cropWidth, cropHeight, cropX, cropY;
      
        if (imgAspect > TARGET_ASPECT) {
          // Image is too wide → crop sides
          cropHeight = imgHeight;
          cropWidth = imgHeight * TARGET_ASPECT;
          cropX = (imgWidth - cropWidth) / 2;
          cropY = 0;
        } else {
          // Image is too tall → crop top/bottom
          cropWidth = imgWidth;
          cropHeight = imgWidth / TARGET_ASPECT;
          cropX = 0;
          cropY = (imgHeight - cropHeight) / 2;
        }
      
        const canvas = document.createElement("canvas");
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
      
        const ctx = canvas.getContext("2d");
      
        // Optional: white background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
      
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          TARGET_WIDTH,
          TARGET_HEIGHT
        );
      
        canvas.toBlob((blob) => {
          setResizedImage(blob);
          setPreview(canvas.toDataURL("image/jpeg", 0.8));
        }, "image/jpeg", 0.8);
      };
    };
  
    reader.readAsDataURL(file);
  };
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const room = e.target.room.value;
    const message = e.target.message.value;
 
    if (!room || !message || !resizedImage) {
      alert("Please complete all fields and take a photo.");
      return;
    }
 
    // Save form data to local submission list
    const newSubmission = {
      room,
      message,
      image: preview, // use preview DataURL
      id: Date.now(),
    };
 
    setSubmissions([newSubmission, ...submissions]);
 
    // Clear form
    e.target.reset();
    setPreview(null);
    setResizedImage(null);
  };
  
  return (
    <section>
      <h2>Submit Your Close-up</h2>
 
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
 
      {/*
        encType should be included to properly send binary file data, like the uploaded image
        What it does:
        - Splits the data into "parts"
        - Each form field (text, file, etc.) becomes its own separate chunk of data
        - Handles large files efficiently
      */}
 
      <Form className="closeup-form" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="room">Close-up taken in ABBY's</label>
        <select id="room" name="room" required>
          <option value="">Select a room</option>
          <option value="1">Atelier</option>
          <option value="2">Café</option>
          <option value="3">Living</option>
          <option value="4">Salon</option>
        </select>
 
        <label htmlFor="message">Your reflection or message</label>
        <textarea
          id="message"
          name="message"
          placeholder="What did this detail make you feel or think about?"
          required
          rows="4"
          cols="50"
        />
 
        <label htmlFor="image">Take your Close-up image</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          name="image"
          id="image"
          onChange={handleCapture}
          required
        />
 
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview"
            style={{ width: "100%", maxWidth: 263, marginTop: "10px" }}
          />
        )}
 
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Submitting...' : 'Submit My Close-Up'}
        </button>
      </Form>
 
      {/* Submission cards below */}
      {submissions.length > 0 && (
        <div style={{ marginTop: "2rem", width: "100%", maxWidth: "500px" }}>
          <h3>Your Submissions:</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {submissions.map((item) => (
              <div key={item.id} style={{
                background: "#f0f0f0",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc"
              }}>
                <img
                  src={item.image}
                  alt="Submitted"
                />
                <p><strong>Room:</strong> {item.room}</p>
                <p><strong>Message:</strong> {item.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
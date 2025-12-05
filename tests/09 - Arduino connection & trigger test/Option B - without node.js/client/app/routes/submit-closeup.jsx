import { Form, useNavigation, redirect } from 'react-router';
import { uploadCloseUpWithReflection } from '../utils/supabase'; // new helper
import { useState } from 'react';

// This handles the form submission
export async function clientAction({ request }) {
  const formData = await request.formData();

  const room = parseInt(formData.get('room'), 10);
  const message = formData.get('message');
  const file = formData.get('image');

  // if (!file || isNaN(room)) {
  //   return { error: 'Missing required fields.' };
  // }
  if (!file.type.startsWith('image/')) {
    return { error: 'Uploaded file must be an image.' };
  }
  if (message.length === 0) {
    return { error: 'Please insert your reflection or message.' };
  }
  if (isNaN(room)) {
    return { error: 'Please select the room where you took the picture' };
  }

  try {
    await uploadCloseUpWithReflection({ room, message, file });
    return redirect('/submit-closeup/confirmation');
  } catch (error) {
    console.error('Submission error:', error.message);
    return { error: error.message };
  }
}

export default function SubmitCloseUp() {
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  return (
    <section>
      <h2>Submit Your Close-up</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 
        encType should be included to properly send binary file data, like the uploaded image
        What it does:
        - Splits the data into "parts"
        - Each form field (text, file, etc.) becomes its own separate chunk of data
        - Handles large files efficiently
      */}

      <Form className="closeup-form" method="post" encType="multipart/form-data" onSubmit={() => setError(null)}>
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

        <label htmlFor="image">Your Close-up image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          required
        />

        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Submitting...' : 'Submit My Close-Up'}
        </button>
      </Form>
    </section>
  );
}

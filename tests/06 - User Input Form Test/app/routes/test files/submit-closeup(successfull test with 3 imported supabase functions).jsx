import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  uploadCloseupImage,
  saveCloseupToDB,
  saveReflectionMessage
} from '../../utils/supabase';

export default function SubmitCloseUp() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!room || isNaN(parseInt(room))) return alert('Please select a room.');
    if (!imageFile) return alert('Please upload an image.');

    try {
      const imageUrl = await uploadCloseupImage(imageFile);
      await saveCloseupToDB(room, imageUrl);
      await saveReflectionMessage(message);

      navigate('/submit-closeup/confirmation');
    } catch (err) {
      console.error(err);
      alert('Something went wrong: ' + err.message);
    }
  }

  return (
    <section>
      <h2>Submit Your Close-up</h2>
      <form className="closeup-form" onSubmit={handleSubmit}>
        <label htmlFor="room">Close-up taken in ABBY's</label>
        <select
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        >
          <option value="" disabled>Select a room</option>
          <option value="1">Atelier</option>
          <option value="2">Café</option>
          <option value="3">Living</option>
          <option value="4">Salon</option>
        </select>

        <label htmlFor="message">Your reflection or message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What did this detail make you feel or think about?"
          required
          rows="4"
          cols="50"
        />

        <label htmlFor="image">Your Close-up image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button type="submit">Submit My Close-Up</button>
      </form>
    </section>
  );
}

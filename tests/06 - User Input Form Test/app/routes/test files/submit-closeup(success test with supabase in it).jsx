import { useState } from 'react';
import supabase from '../../utils/supabase'; // Adjust the import path as needed
import { useNavigate } from 'react-router';

export default function SubmitCloseUp() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  console.log('Supabase URL:', supabaseUrl);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imageFile) return alert('Please upload an image.');

    // Upload image to Supabase Storage
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('test-abby-close-ups')
      .upload(fileName, imageFile,{
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/png'
     });

    
    const imageUrl = `${supabaseUrl}/storage/v1/object/public/test-abby-close-ups/${fileName}`;
    const roomInt = parseInt(room, 10); // Ensure room is an integer
    console.log(roomInt);

    if (isNaN(roomInt)) {
    alert('Please select a valid room.');
    return;
    }

    //Insert record into Supabase
  
    const { data, error } = await supabase
        .from('close_ups_test')
        .insert({ 
            room_id: roomInt, // Ensure room is an integer
            image_url: imageUrl
        });

    if (error) {
        console.error('Insert error:', error);
        return alert('Insert failed: ' + error.message);
    }


    const { errorMessage } = await supabase.from('reflections_test').insert([
      {
        reflection_message: message
      },
    ]);

    if (errorMessage) return alert('Database error:', error.message);
    console.log('Image URL:', imageUrl);
    console.log('Room ID:', room);
    navigate('/submit-closeup/confirmation');
  }

  return ( 
    <>
        <section>
            <h2>Submit Your Close-up</h2>
            <form className="closeup-form" onSubmit={handleSubmit}>
                <label htmlFor='room'>Close-up taken in ABBY's</label>
                <select id='room' value={room} onChange={(e) => setRoom(e.target.value)} required>
                    <option value="" disabled>Select a room</option>
                    <option value="1">Atelier</option>
                    <option value="2">Café</option>
                    <option value="3">Living</option>
                    <option value="4">Salon</option>
                </select>

                <label htmlFor='message'>Your reflection or message</label>
                <textarea
                    id='message'
                    placeholder="What did this detail make you feel or think about?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="4" cols="50"
                />

                <label htmlFor='image'>Your Close-up image</label>
                <input
                    type="file"
                    id='image'
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                />

                <button type="submit">Submit My Close-Up</button>
            </form>
        </section>
    </>
  );
}
import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "../utils/supabase";

export default function PosterCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalendarEvents()
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Poster Calendar</h1>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500">{event.start_date} – {event.end_date}</p>
              <a href={event.info_url} target="_blank" className="text-blue-600 hover:underline mt-2 inline-block">More Info</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
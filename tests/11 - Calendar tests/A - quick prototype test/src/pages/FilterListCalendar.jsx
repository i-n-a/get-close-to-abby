import { useEffect, useState } from "react";
import { fetchCalendarEvents } from "../utils/supabase";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);


export default function FilterListCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const weekdayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


 

  const currentMonthObject = dayjs().month(5); // June (0-indexed)
  console.log("Month number:", currentMonthObject.$M, typeof currentMonth);
  const currentYear = dayjs().year();

  // Build days in month
    const daysInMonth = currentMonthObject.daysInMonth();
    const firstDayIndex = dayjs(`${currentYear}-${currentMonthObject + 1}-01`).isoWeekday(); // 1 = Monday
  // Adjust so Monday = 0 index
  // You want the calendar grid columns to represent Monday (index 0) through Sunday (index 6). So the first day’s offset should be:
    const emptyCells = firstDayIndex - 1; // Monday = 0, Tuesday = 1, ..., Sunday = 6

  // Load events from Supabase
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

  console.log("Loaded events:", events);


    const dateHasEvents = (day) => {
    // Get today's month/year for demo (adjustable)
    const currentM = JSON.stringify(currentMonthObject.$M); // September
    const currentY = JSON.stringify(currentMonthObject.$y);
    const date = dayjs().year(currentY).month(currentM).date(day);
    if (!date.isValid()) return false;

    return events.some(event => {
        const start = dayjs(event.start_date);
        const end = dayjs(event.end_date);
        return date.isBetween(start, end, "day", "[]");
    });
    };



//   const filteredEvents = selectedDate
//     ? events.filter(e => e.start_date === selectedDate)
//     : events;

  const isEventInCurrentMonth = (event, monthStart, monthEnd) => {
    const eventStart = dayjs(event.start_date);
    const eventEnd = dayjs(event.end_date);
    // Check if event overlaps with month range
    return eventEnd.isAfter(monthStart.subtract(1, "day")) && eventStart.isBefore(monthEnd.add(1, "day"));
    };

    const monthStart = currentMonthObject.startOf("month");
    const monthEnd = currentMonthObject.endOf("month");

    const filteredEvents = selectedDate
  ? events.filter(event => {
      const eventStart = dayjs(event.start_date);
      const eventEnd = dayjs(event.end_date);
      const selected = dayjs(selectedDate);
      return selected.isBetween(eventStart, eventEnd, "day", "[]")
    })
  : events.filter(event => isEventInCurrentMonth(event, monthStart, monthEnd));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Filter List Calendar</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Filters (Coming Soon)</h2>
        <p className="text-gray-500">Room / Category filters will go here.</p>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">{currentMonthObject.format("MMMM YYYY")}</h2>
        {/* Week headers */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium text-gray-600">
        {weekdayHeaders.map(d => (
            <div key={d}>{d}</div>
        ))}
        </div>

        {/* Grid days */}
        <div className="grid grid-cols-7 gap-2 mt-2">
          {/* Empty cells before first day */}
            {Array.from({ length: emptyCells }).map((_, i) => (
                <div key={`empty-${i}`} />
            ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateString = dayjs(`${currentYear}-${currentMonthObject.$M + 1}-${day}`).format("YYYY-MM-DD");
            const hasEvent = dateHasEvents(day);
            const isSelected = selectedDate === dateString;

            return (
              <div
                key={day}
                className={`cursor-pointer p-2 rounded text-sm ${
                  isSelected ? "bg-blue-800 text-white" :
                  hasEvent ? "text-blue-600 font-semibold" :
                  "text-gray-700"
                } hover:bg-blue-100`}
                onClick={() => setSelectedDate(dateString)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          {selectedDate ? `Events on ${dayjs(selectedDate).format("D MMM YYYY")}` : "All Events"}
        </h2>
        {loading ? <p>Loading...</p> : (
          filteredEvents.length > 0 ? (
            <ul className="space-y-4">
              {filteredEvents.map(event => (
                <li key={event.id} className="border p-4 rounded">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm">{event.start_date} – {event.end_date}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-sm italic text-gray-500">{event.room || "No room assigned"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events for this date.</p>
          )
        )}
      </div>
    </div>
  );
}

//Option 1: Use useEffect + useState (simpler, works everywhere, but taken advantage of client-side rendering)
// import { useEffect, useState } from "react";
// import { fetchCalendarEvents } from "../utils/supabase";

// export default function FilterListCalendar() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchCalendarEvents()
//       .then(data => {
//         setEvents(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Failed to load events:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Filter List Calendar</h1>
//       {loading ? <p>Loading...</p> : (
//         <ul className="space-y-4">
//           {events.map(event => (
//             <li key={event.id} className="bg-white p-4 rounded shadow">
//               <h2 className="text-lg font-semibold">{event.title}</h2>
//               <p className="text-sm">{event.start_date} – {event.end_date}</p>
//               <p className="text-sm text-gray-600">{event.description}</p>
//               <p className="text-sm italic text-gray-500">{event.room || 'No Room Assigned'}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



// Option 2: Using clientLoader (for this the setup in the app should be different, using config file for routes, routes folder and react router framwork)
// import { fetchCalendarEvents } from "../utils/supabase";    

// export async function clientLoader() {
//   const events = await fetchCalendarEvents();
//   console.log('Fetched events:', events);
//   return {events};
// }

// export function FilterListCalendar({loaderData}) {
//   const { events } = loaderData || {};
//   console.log('Loader data:', events);
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Filter List Calendar</h1>
//       <p className="text-gray-700">This page will display a list of calendar events.</p>
//       {/* Future implementation for displaying events */}
//     </div>
//   );
// }

// export default FilterListCalendar;
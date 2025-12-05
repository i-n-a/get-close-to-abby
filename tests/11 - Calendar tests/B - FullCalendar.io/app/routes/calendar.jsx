// Test 2 - FullCalendar with Tailwind-friendly styles
// import { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dateClick

// export default function AbbyCalendar() {
//   const [selectedEvents, setSelectedEvents] = useState([]);

//   // Example events with room and shape data
//   const events = [
//     {
//       id: "1",
//       title: "Reading in Salon",
//       start: "2025-06-09",
//       end: "2025-06-09",
//       extendedProps: {
//         room: "salon",
//         shape: "🟧", // You can replace with a styled component or icon
//       },
//     },
//     {
//       id: "2",
//       title: "Garden Activity",
//       start: "2025-06-09",
//       end: "2025-06-09",
//       extendedProps: {
//         room: "garden",
//         shape: "🟩",
//       },
//     },
//     {
//       id: "3",
//       title: "Expo Living Room",
//       start: "2025-06-16",
//       end: "2025-06-16",
//       extendedProps: {
//         room: "living",
//         shape: "🔵",
//       },
//     },
//   ];

//   const handleDateClick = (arg) => {
//     const dateEvents = events.filter(
//       (event) => event.start === arg.dateStr
//     );
//     setSelectedEvents(dateEvents);
//   };

//   const renderEventContent = (eventInfo) => {
//     return (
//       <div className="text-sm flex items-center gap-1">
//         <span>{eventInfo.event.extendedProps.shape}</span>
//         <span className="truncate">{eventInfo.event.title}</span>
//       </div>
//     );
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Abby Calendar</h1>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Calendar */}
//         <div className="bg-white p-4 rounded shadow">
//           <FullCalendar
//             plugins={[dayGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             events={events}
//             dateClick={handleDateClick}
//             eventContent={renderEventContent}
//             height="auto"
//           />
//         </div>

//         {/* Event Details */}
//         <div className="bg-white p-4 rounded shadow">
//           <h2 className="text-lg font-semibold mb-2">
//             {selectedEvents.length > 0 ? "Events on Selected Day" : "Click a date to see events"}
//           </h2>
//           <ul className="space-y-3">
//             {selectedEvents.map((event) => (
//               <li key={event.id} className="border p-3 rounded">
//                 <p className="font-semibold">{event.title}</p>
//                 <p className="text-sm text-gray-600">Room: {event.extendedProps.room}</p>
//                 <a
//                   href="#" // Replace with actual registration link
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Register here
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// Test 1 - FullCalendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export function meta() {
  return [
    { title: "Abby's Calendar" },
    { name: "description", content: "Abby's Calendar" },
  ];
}

const events = [
  { title: 'Duo Workshop Birdhousemaking', 
    start: new Date('2025-06-07T10:30:00'), 
    end: new Date('2025-06-07T12:30:00'),
    allDay: false
  },
  {
    title: "F**klore. Reinventing tradition.",
    start: "2025-03-29",
    end: "2025-09-15", // End date is exclusive, so add +1 day
    allDay: true
  }
]

const eventTimeFormat = { 
  hour: 'numeric',
  minute: '2-digit',
  meridiem: false
}

export function DemoApp() {
  return (
    <div>
      <h1>Abby</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        // eventColor= '#378006'
        // eventBackgroundColor='#378006'
        // these don't work 
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
        eventTimeFormat={eventTimeFormat}
        displayEventTime={true}
        displayEventEnd={true}
        height="auto"
        headerToolbar={{
          left: 'prev',       // Just the title on the left
          center: 'title',          // Nothing in center
          right: 'today next'   // Arrows on the right
        }}
      />
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
     <div className="text-sm flex items-center gap-1 overflow-hidden w-full">
        <span>{eventInfo.timeText}</span>
        <span className="truncate whitespace-nowrap overflow-hidden w-full">
          {eventInfo.event.title}
        </span>
      </div>
    </>
  )
}

export default function AbbyCalendar() {
  return (
    <DemoApp />
  );
}


    // Developer Notes:
    // ==================    
    
    // Can we use FullCalendar.io?

    // Learnings:
    // - FullCalendar.io gives you a monthly calendar view with events.
    // - It allows you to customize the calendar with plugins and css customization.
    // - The Css customization is not as straightforward as Tailwind, but you can target certain variables in the :root selector. (https://github.com/fullcalendar/fullcalendar/blob/main/packages/core/src/styles/vars.css)
    // - You can also overwrite the css if you look up the class names in the browser inspector.
    // - The header toolbar can be customized to show only the title and navigation arrows, and you can also add a "today" button. You style this buttons and even replace the arrow with your own arrow svg.
    
    // Solution:
    // - Use FullCalendar.io to create a simple calendar application.
    // - You need to implement in your html as a component named <FullCalendar />. It has some props you can pass to it to adjus the component.
    // - Code option test 1 is a monthly grid with fake day event and multiday event.
    // - Code option test 2 is a monthly grid styled with Tailwind CSS and a simple event list on the right side. Here I use the shape emojis to represent the room shapes,but you can replace them with styled components or icons.

    // ‼️ Limitations:
    // - FullCalendar.io works with making a table in the component, so it's less flexible than a Tailwind CSS grid. So I am not sure if you can put a gap between the days.
    // - The calendar is not fully responsive, but you can adjust the styles to make it more mobile-friendly.
    // - Right now the events in a day are stacked vertically, and to stack it horizontally need to still be tested.
    // - The border of the header of the table is not easy to customize into no border.


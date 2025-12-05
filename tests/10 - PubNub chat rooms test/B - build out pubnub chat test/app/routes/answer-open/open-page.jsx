import { useState } from "react";
import kila from "../../assets/kila.png";
import faria from "../../assets/faria.png";
import mila from "../../assets/mila.png";
import peter from "../../assets/peter.png";
import simon from "../../assets/simon.png";
import ChatBox from "../../components/ChatBox/ChatBox";
import Popup from "../../components/Popup";
//import PubNub from 'pubnub';

const participants = [
  { name: "Kila Mernes", img: kila },
  { name: "Faria Sentaho", img: faria },
  { name: "Mila Depande", img: mila },
  { name: "Peter Biener", img: peter },
  { name: "Simon Tucker", img: simon },
];

const InvitePage = () => {
  const totalSlots = 10;
  const filledSlots = 3;
  const [showPopup, setShowPopup] = useState(false);

  const handleSignUp = () => {
    console.log("clicked sign up");
    setShowPopup(true);
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <div className="font-bold text-xl">ABBY <span className="text-sm font-normal">Kortrijk</span></div>
        <div className="flex items-center gap-4">
          <button className="bg-green-500 text-white px-2 py-1 rounded text-sm">EN</button>
          <div className="w-6 h-6 border-2 rounded border-black flex items-center justify-center">
            <div className="w-3 h-0.5 bg-black" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 space-y-6">
        {/* Title */}
        <div className="bg-blue-300 py-2 px-4 rounded">
          <h2 className="text-xl font-bold">Open Invitation <span className="text-black/60">#205</span></h2>
        </div>

        {/* Event Info */}
        <div className="space-y-2">
          <div><span className="text-blue-700 font-semibold">What</span><br />Learning how to crochet</div>
          <div><span className="text-blue-700 font-semibold">Where</span><br />At the Salon</div>
          <div><span className="text-blue-700 font-semibold">When</span><br />at 18:00 on 28/07/2025</div>
        </div>

        {/* Registration Progress */}
        <div className="bg-orange-200 p-4 rounded space-y-2">
          <p className="font-semibold">Participants Registered</p>
          <div className="flex gap-1">
            {[...Array(totalSlots)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-sm ${i < filledSlots ? "bg-orange-600" : "bg-orange-100 border border-orange-400"}`}
              />
            ))}
          </div>
          <p className="text-sm">{filledSlots}/{totalSlots} participants</p>
        </div>

        {/* Sign-up Button */}
        <div>
          <button onClick={handleSignUp} className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded w-full">
            Sign up to this event
          </button>
          <p className="text-sm mt-1 text-center text-gray-600">Unlock the event’s chat when you sign up</p>
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50">
              <Popup onClose={handleClosePopup} />
          </div>
        )}


        {/* Event Chat */}
        <ChatBox/>

        {/* Who's coming */}
        <div className="bg-purple-200 p-4 rounded space-y-3">
          <div className="flex justify-between items-center">
            <p className="font-medium">Want to see who is coming?</p>
            <span className="text-sm">ℹ️</span>
          </div>
          <p className="text-sm text-gray-700">{participants.length} people joined the event</p>
          <div className="space-y-2">
            {participants.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={p.img} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 text-sm text-black px-4 py-6 space-y-4 border-t">
        <div>
          <p className="font-semibold">Contact</p>
          <p>Begijnhofpark<br />8500 Kortrijk<br />+32 (0)56 27 74 60<br />abby@kortrijk.be</p>
        </div>

        <div>
          <p className="font-semibold">Opening hours</p>
          <p>
            Open from 10 AM to 10 PM<br />
            (exhibition halls 10 AM - 6 PM)<br />
            Last tickets: 5 PM<br />
            Closed on Mondays
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <p className="font-semibold">Stay informed</p>
          <form className="flex gap-2 mt-1">
            <input
              type="email"
              placeholder="Your email address"
              className="border-b border-black w-full py-1 outline-none bg-transparent"
            />
            <button type="submit" className="text-xl font-bold">➤</button>
          </form>
          <label className="text-sm mt-2 block">
            <input type="checkbox" className="mr-1" /> I agree with the <a href="#" className="underline">privacy policy</a>.
          </label>
        </div>

        {/* Logos */}
        <div className="flex flex-wrap gap-4 mt-4">
          <img src="https://via.placeholder.com/80x20?text=Kortrijk" alt="Kortrijk" />
          <img src="https://via.placeholder.com/80x20?text=Vlaanderen" alt="Vlaanderen" />
          <img src="https://via.placeholder.com/80x20?text=Interreg" alt="Interreg" />
          <img src="https://via.placeholder.com/80x20?text=UNESCO" alt="UNESCO" />
        </div>

        {/* Bottom */}
        <div className="text-xs text-gray-600 mt-4 border-t pt-4 flex flex-col sm:flex-row justify-between">
          <p>© 2025 Abby</p>
          <p className="flex gap-4">
            <a href="#">Privacy policy</a>
            <a href="#">UITPAS-partner</a>
            <a href="#">Website by Brandberries</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InvitePage;



// export default function Invitation() {
//   return (
//     <>
//       <section>
//         <h2>Open Invitation #203</h2>
//         <div>
//           <p> What </p>
//           <p> Learning how to crochet</p>
//           <p> Where </p>
//           <p>At the Salon</p>
//           <p> When</p>
//           <p>at 18:00 on 28/07/2025</p>
//         </div>
//         <div>
//           <p>Participants Registered</p>
//           <div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//           <p>3/10 participants</p>
//         </div>
//         <div>
//           <button>Sign Up for this event</button>
//           <p>Unlock the event's chat when you sign up</p>
//         </div>
//         <section>
//           <h3>Want to see who is coming?</h3>
//           <p>5 people joined the event</p>
//           <ul>
//             <li>
//               <p>Kila Mernes</p>
//             </li>
//             <li>
//               Alice Johnson
//             </li>
//             <li>
//               <p>Bob Smith</p>
//             </li>
//             <li>
//               <p>Charlie Brown</p>
//             </li>
//             <li>
//               <p>David Wilson</p>
//             </li>
//           </ul>
//         </section>
//       </section>
      
//     </>

//   );
// }

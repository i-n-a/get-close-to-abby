export default function Popup({ onClose }) {
    return (
        <section className="popup bg-white rounded shadow-lg p-6 relative">
            <div className="popup-content">
                <div className="flex column justify-between items-center mb-4">
                    <h2>Open Invitation #205</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                
                <p>You are about to register to</p>
                {/* Event Info */}
                <div className="space-y-2">
                    <div><span className="text-blue-700 font-semibold">What</span><br />Learning how to crochet</div>
                    <div><span className="text-blue-700 font-semibold">Where</span><br />At the Salon</div>
                    <div><span className="text-blue-700 font-semibold">When</span><br />at 18:00 on 28/07/2025</div>
                </div>
                <div>
                    <p>Please confirm your registration</p>
                    <button className="bg-yellow-400">Confirm my Participation</button>
                </div>
            </div>
        </section>
    );
}

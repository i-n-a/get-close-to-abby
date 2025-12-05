export default function ParticipantsList({ participants}) {
  return (
    <>
      {(!participants || participants.length === 0) && (
        <div className="invitation__participants">
          <p className="invitation__participants-empty">No one has joined the event yet.</p>
        </div>
      )}

      {(participants && participants.length > 0) && (
      <div className="invitation__participants">
        <div className="invitation__participants-header">
          <p className="invitation__participants-title">Want to see who is coming?</p>
        </div>
        <p className="invitation__participants-count">{participants.length} people joined the event</p>
        <div className="invitation__participants-list">
          {participants.map((p, i) => (
            <div key={i} className="invitation__participant">
              <img
                src={p.avatar_url}
                alt={p.name || "No name"}
                className="invitation__participant-avatar"
              />
              <p>{p.name} {p.family_name}</p>
            </div>
          ))}
        </div>
      </div>
      )}
    </>
  )}

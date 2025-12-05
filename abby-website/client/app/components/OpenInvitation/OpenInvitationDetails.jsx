import { capitalizeFirstLetter } from "../../utils/helper-functions";
import "../../routes/answer-open/open-page.css";

export default function OpenInvitationDetails({invitation}) {
  const {
    activity_what,
    activity_tag,
    room
  } = invitation;
  return (
    // {/* Event Info */}
    <section className="invitation__info">
      <h3 className="invitation__info-title">Activity information</h3>
      <div className="invitation__info-group">
        <p className="invitation__info-label">What</p>
        <p className="invitation__info-text" >
        <span className="invitation__info-value">
          {activity_tag
          ? capitalizeFirstLetter(activity_tag)
          : "Unknown"}</span>
        <span> - </span>
          <span className="invitation__info-name_desc">{activity_what
          ? capitalizeFirstLetter(activity_what)
          : "Unknown"}
        </span>
        </p>
      </div>
      <div className="invitation__info-group">
        <p className="invitation__info-label">Where</p>
        <p className="invitation__info-text">
          At the {room?.room_name
          ? capitalizeFirstLetter(room.room_name)
          : "Unknown"}</p>
      </div>
    </section>
  )
}

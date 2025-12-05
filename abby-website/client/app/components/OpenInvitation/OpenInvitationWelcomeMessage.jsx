import {capitalizeFirstLetter} from "../../utils/helper-functions.js";
import "../../routes/answer-open/open-registered.css";
import "../../routes/answer-open/open-page.css";
import "../../styles/app.css";

export default function OpenInvitationWelcomeMessage({ profile }) {
  return (
    <div className="invitation__welcome-message">
      <p className="invitation__welcome-message-guestname">Welcome {profile.name ? capitalizeFirstLetter(profile.name) : "Guest"} !</p>
      <p className="invitation__welcome-message-text">We&apos;ve sent you a confirmation email for this event with the link to this chat so you can come back to it any time</p>
    </div>
  )
}

import sadFace from "../../assets/images/svg/registration_closed.svg";
import "../../styles/app.css";
import "./RegistrationStatus.css";

export const RegistrationStatus = ({ totalSlots, filledSlots, onSignUp, registrationFull }) => {
  return (
    <section>
      <h3 className="visually-hidden">Register now to join the event!</h3>
      {/* Registration Progress */}
      {!registrationFull && (
        <div className="invitation__registration">
          <p className="invitation__info-label partcipants-counting">Participants Registered</p>
          <div className="invitation__slots">
            {[...Array(totalSlots)].map((_, i) => (
              <div
                key={i}
                className={`invitation__slot ${i < filledSlots ? "invitation__slot--filled" : ""}`}
              />
            ))}
          </div>
          <p className="invitation__registration-count">{filledSlots}/{totalSlots} participants</p>
        </div>
      )}
      {/* Sign Up Button */}
      {!registrationFull && (
        <div className="invitation__signup">
          <button onClick={onSignUp} className="invitation__signup-button button button--s button--yellow">
            <span className="medium">Sign up to this event</span>
          </button>
          <p className="invitation__signup-note">Unlock the event&apos;s chat when you sign up</p>
        </div>
      )}

      {/* Registration Full Message */}
      {registrationFull && (
        <div className="invitation__full-message">

          <div>
            <img className="sadface-emoji-closed" src={sadFace} alt="a sad face icon" />
            <p className="invitation__full-text">Registrations Closed</p>
          </div>
          <div>
            <p className="invitation__full-text-1 bodyM">Seems like this event is getting too big</p>
            <p className="invitation__full-text-2 bodyS">If you want to <span className="medium">add more people</span>, <br /> Abby can help you organise it.</p>
          </div>
          <button className="button button--green button--s" onClick={() => window.open("https://www.abbykortrijk.be/en/take-part/open-house")}>
            Send Abby a message
          </button>
        </div>
      )}
    </section>
  );
};

export default RegistrationStatus;

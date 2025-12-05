import { Link } from "react-router";
import "./goodbye.css";
import "../../styles/app.css";
import sadFace from "../../assets/images/svg/registration_closed.svg";

export default function GoodbyePage() {
  return (
    <section className="confirmation-page side-margins ">
      <img className="sadface-confirmation-page" src={sadFace} alt="a sad face icon" />
      <div className="confirmation-page__container">
        <h2 className="confirmation-page__title">You&apos;ve left the event</h2>
        <p className="confirmation-page__text">
          Thanks for being part of it! You won&apos;t receive any more messages from this event.
        </p>
        <Link
          to="https://www.abbykortrijk.be/bezoek/kalender"
          className="confirmation-page__button button button--s button--blue"
        >
          See other upcoming events
        </Link>
      </div>
    </section>
  );
}

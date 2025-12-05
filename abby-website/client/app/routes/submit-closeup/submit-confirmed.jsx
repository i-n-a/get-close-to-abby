import { Link } from "react-router";
import "../../styles/app.css";
import "./submit-confirmed.css";
import smileyAvif from "../../assets/images/awif/smiley-green.avif";
import smileyPng from "../../assets/images/png/smiley-green.png";
import choiceoneAvif from "../../assets/images/awif/open-confirmation-img-choice-one.avif";
import choiceonePng from "../../assets/images/png/open-confirmation-img-choice-one.png";
import choicetwoAvif from "../../assets/images/awif/open-confirmation-img-choice-two.avif";
import choicetwoPng from "../../assets/images/png/open-confirmation-img-choice-two.png";
import choicethreeAvif from "../../assets/images/awif/open-confirmation-img-choice-three.avif";
import choicethreePng from "../../assets/images/png/open-confirmation-img-choice-three.png";
import arrowAvif from "../../assets/images/awif/arrow-left.avif";
import arrowPng from "../../assets/images/png/arrow-left.png";

export default function SubmitConfirmed() {
  return (
    <>
      <div className="backButton phone-side-margin">
        <picture>
          <source srcSet={arrowAvif} type="image/avif" />
          <img src={arrowPng} alt="Arrow to navigate back"
              className="arrowBack" />
        </picture>
        <Link to="/open-call/get-close-to-abby/become-part-of-abby/found-it" className="arrow-back-text" >Go back</Link>
      </div>

      <section className="submit-confirmed-intro">
        <picture className="smiley-succesfull_green">
          <source srcSet={smileyAvif} type="image/avif" />
          <img src={smileyPng} alt="Smiley Green as one of the Abby brand icons"
              className="smiley-succesfull_green" />
        </picture>

        <h1>Your close-up has been submitted!</h1>
      </section>

      <section className="side-margins submit-confirmed-text-main">
        <h2>Thank You!</h2>
        <p className="submit-confirmed-text-1 bodyS">Your close-up is now part of Abby!</p>
        <p className="submit-confirmed-text-2 bodyS">Because of you, it continues to evolve and become more and more alive.</p>
        <p className="submit-confirmed-text-3 bodyS">You can now follow the signs and who knows, maybe you&#39;ll meet your close-up once again.</p>
      </section>


      <section className="open-confirmation-next_step_section">
        <h4 className="side-margins">What&#39;s next?</h4>
          <article className="open-confirmation-next_step_choices side-margins">
            <div className="open-confirmation-next_step_choice_1">
              <picture>
                <source srcSet={choiceoneAvif} type="image/avif" />
                <img src={choiceonePng} alt="Girls reading newspaper in Abby Atelier"
                    className="open-confirmation-image_choice_1" />
              </picture>
              <h5 className="medium">Plan a moment together</h5>
              <p className="bodyM">Think of someone you&#39;d love to connect with in Abby&#39;s open spaces, and invite them to explore, create, or just be together.</p>
              <Link
              to="/open-call/get-close-to-abby/become-part-of-abby/private-invitation/confirmation"
                  className="button--s button--blue button button_open_confirmed"
              >
              Create a Personal Invitation
              </Link>
            </div>

            <div className="open-confirmation-next_step_choice_2">
              <picture>
                  <source srcSet={choicetwoAvif} type="image/avif" />
                  <img src={choicetwoPng} alt="A view to the garden from Abby cafe"
                      className="open-confirmation-image_choice_2"/>
              </picture>
                <h5 className="medium">Explore the Spaces</h5>
                <p className="bodyM">Explore the Living Room, Salon, Workshop, Café and Garden. See what each space offers, when it&#39;s open, and how you can use it.</p>
                <Link
                    to="#"
                    className="button--s button--green button button_open_confirmed"
                >
                    Explore the Stadsliving
                </Link>
            </div>

            <div className="open-confirmation-next_step_choice_3">
              <picture>
                  <source srcSet={choicethreeAvif} type="image/avif" />
                  <img src={choicethreePng} alt="Girls watching a TV in Abby Exhibition Space"
                      className="open-confirmation-image_choice_3" />
                </picture>
                <h5 className="medium">Discover Abby&#39;s events</h5>
                <p className="bodyM">Browse what&#39;s already planned. You might find something worth joining.</p>
                <Link
                    to="#"
                    className="button--s button--yellow button button_open_confirmed"
                >
                    See Upcoming Events
                </Link>
            </div>
          </article>
        </section>
    </>
  );
}

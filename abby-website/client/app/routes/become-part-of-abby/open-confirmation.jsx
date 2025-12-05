import { Link, useLocation } from "react-router";
import "../../styles/app.css";
import "./open-confirmation.css";
import smileyAvif from "../../assets/images/awif/open-confirmation-smiley.avif";
import smileyPng from "../../assets/images/png/open-confirmation-smiley.png";
import ticket368 from "../../assets/images/png/open-ticket_eojocy_c_scale,w_368.png";
import choiceoneAvif from "../../assets/images/awif/open-confirmation-img-choice-one.avif";
import choiceonePng from "../../assets/images/png/open-confirmation-img-choice-one.png";
import choicetwoAvif from "../../assets/images/awif/open-confirmation-img-choice-two.avif";
import choicetwoPng from "../../assets/images/png/open-confirmation-img-choice-two.png";
import choicethreeAvif from "../../assets/images/awif/open-confirmation-img-choice-three.avif";
import choicethreePng from "../../assets/images/png/open-confirmation-img-choice-three.png";

export default function openConfirmation() {
  const location = useLocation();
  const type = location.state?.type;
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Open Calls</Link></li>
          <li><Link to="/open-call/get-close-to-abby">Get Close to Abby</Link></li>
          <li><Link to="/open-call/get-close-to-abby/become-part-of-abby">Becoming part of Abby</Link></li>
          <li aria-current="page"><span>Open invitation sent</span></li>
        </ol>
      </nav>
      {type === "signedUp" &&
        <section className="logged-in_confirmation">
          <div className="open-confirm-hello-wrapper">
              <h1 className="open-confirm-hello-text"> Hello Francis! </h1>
          </div>

          <div className="confirmation-text-para phone-side-margin">
            <picture className="smiley-succesfull_blue-pic">
                <source srcSet={smileyAvif} type="image/avif" />
                <img src={smileyPng} alt="Smiley as one of the Abby brand icons"/>
            </picture>

            <section className="open-confirmation-main-para">
                <h1>Your <span className="blue-font">Open Invitation</span> Has Been Shared!</h1>
                <p className="bodyXL bold open-confirmation-text-1">Your idea is now part of Abby.</p>
                <p className="bodyXL open-confirmation-text-2">It will be printed and placed in the Salon, inviting others to notice it, reflect, and connect.</p>
                <p className="bodyM medium open-confirmation-text-3">Every new piece shapes the whole. <br /> Thank you for adding yours.</p>
            </section>

            <section className="devider-line-open-confirmation-section">
                <div className="devider-line-open-confirmation"></div>
                <p className="bodyM"> You can now manage your Open Invitation and chat with others.</p>
                <Link
                    to="#"
                    className="button--s button--secondary button button_open_confirmed"
                >
                    Go to My Open Invitation Page
                </Link>
            </section>
          </div>
        </section>
      }
      {type === "justSubmitted" &&
        <div>
          <section className="not-logged-in_confirmation">
            <div className="confirmation-text-para phone-side-margin">
                <picture className="smiley-succesfull_blue-pic">
                    <source srcSet={smileyAvif} type="image/avif" />
                    <img src={smileyPng} alt="Smiley as one of the Abby brand icons"/>
                </picture>

                <section className="open-confirmation-main-para">
                    <h1>Your <span className="blue-font">Open Invitation</span> Has Been Shared!</h1>
                    <p className="bodyXL bold open-confirmation-text-1">Your idea is now part of Abby.</p>
                    <p className="bodyXL open-confirmation-text-2">It will be printed and placed in the Salon, inviting others <br />to notice it, reflect, and connect.</p>
                    <p className="bodyM medium open-confirmation-text-3">Every new piece shapes the whole. <br /> Thank you for adding yours.</p>
                </section>
            </div>

            <picture className="ticket-open-float-left">
                <img src={ticket368} alt="Open ticket" />
            </picture>
            <picture className="ticket-open-float-right">
                <img src={ticket368} alt="Open ticket" />
            </picture>
          </section>

          <section className="open-confirmation-next_step_section">
            <h4 className="side-margins">What would you like to do next?</h4>
            <article className="open-confirmation-next_step_choices side-margins">
                <div className="open-confirmation-next_step_choice_1">
                    <picture>
                        <source srcSet={choiceoneAvif} type="image/avif" />
                        <img src={choiceonePng} alt="Girls reading newspaper in Abby Atelier"
                            className="open-confirmation-image_choice_1" />
                    </picture>
                    <h5 className="medium">Plan a moment with someone</h5>
                    <p className="bodyM">Think of someone you&#39;d love to connect with in Abby&#39;s open spaces, and invite them to explore, create, or just be together.</p>
                    <Link
                        to="/open-call/get-close-to-abby/become-part-of-abby/private-invitation"
                        className="button--s button--blue button button_open_confirmed"
                    >
                        Create Private Invitation
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
                        to="/"
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
                        to="/"
                        className="button--s button--yellow button button_open_confirmed"
                    >
                        See Upcoming Events
                    </Link>
                </div>
            </article>
          </section>
        </div>
      }
    </>
  )
}


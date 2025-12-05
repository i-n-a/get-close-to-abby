import { Link } from "react-router";
import "../../styles/app.css";
import "./private-confirmation.css";
import smileyAvif from "../../assets/images/awif/smiley-yellow.avif";
import smileyPng from "../../assets/images/png/smiley-yellow.png";
import ticketFloat from "../../assets/images/png/mokcup-float-personal-invite.png";
import choiceoneAvif from "../../assets/images/awif/open-confirmation-img-choice-one.avif";
import choiceonePng from "../../assets/images/png/open-confirmation-img-choice-one.png";
import choicetwoAvif from "../../assets/images/awif/open-confirmation-img-choice-two.avif";
import choicetwoPng from "../../assets/images/png/open-confirmation-img-choice-two.png";
import choicethreeAvif from "../../assets/images/awif/open-confirmation-img-choice-three.avif";
import choicethreePng from "../../assets/images/png/open-confirmation-img-choice-three.png";

export default function privateConfirmation() {
    return (
        <section>
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol>
                    <li><Link to="/">Open Calls</Link></li>
                    <li><Link to="/open-call/get-close-to-abby">Get Close to Abby</Link></li>
                    <li><Link to="/open-call/get-close-to-abby/become-part-of-abby">Becoming part of Abby</Link></li>
                    <li aria-current="page"><span>Create a Personal Invite</span></li>
                </ol>
            </nav>

            <section className="private-confirm-main">
                <picture className="smiley-succesfull_yellow-pic">
                    <source srcSet={smileyAvif} type="image/avif" />
                    <img src={smileyPng} alt="Smiley as one of the Abby brand icons"
                        className="smiley-succesfull_yellow" />
                </picture>

                <div className="side-margins private-confirm-main-text">
                    <h1>Your <span className="yellow-font">Personal Invitation</span> Has Been Sent!</h1>
                    <p className="bodyM private-confirm-main-text-1">They&rsquo;ll receive it shortly, <br /> and you&rsquo;ve just opened the door to something shared.</p>
                    <p className="bodyXL medium private-confirm-main-text-2">Sometimes, all it takes is a small step to start something beautiful. <br /> Whether they say yes or not, your gesture matters.</p>
                </div>

                <picture className="ticket-private-float-left">
                    <img src={ticketFloat} alt="Private ticket" />
                </picture>

                <picture className="ticket-private-float-right">
                    <img src={ticketFloat} alt="Private ticket" />
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
                        <h5 className="medium">Invite others in</h5>
                        <p className="bodyM">Send an open invitation to be printed at Abby. It&rsquo;s a simple way to share an idea for something you&rsquo;d like to do in Abby&rsquo;s spaces, and see who might want to join you.</p>
                        <Link
                            to="/open-call/get-close-to-abby/become-part-of-abby/open-invitation"
                            className="button--s button--blue button button_private_confirmed"
                        >
                            Create Open Invitation
                        </Link>
                    </div>

                    <div className="open-confirmation-next_step_choice_2">
                        <picture>
                            <source srcSet={choicetwoAvif} type="image/avif" />
                            <img src={choicetwoPng} alt="A view to the garden from Abby cafe"
                                className="open-confirmation-image_choice_2"/>
                        </picture>
                        <h5 className="medium">Explore the Spaces</h5>
                        <p className="bodyM">Explore the Living Room, Salon, Workshop, Café and Garden. See what each space offers, when it&rsquo;s open, and how you can use it.</p>
                        <Link
                            to="#"
                            className="button--s button--green button button_private_confirmed"
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
                        <h5 className="medium">Discover Abby&rsquo;s events</h5>
                        <p className="bodyM">Browse what&rsquo;s already planned. You might find something worth joining.</p>
                        <Link
                            to="#"
                            className="button--s button--yellow button button_private_confirmed"
                        >
                            See Upcoming Events
                        </Link>
                    </div>
                </article>
            </section>
        </section>
    );
}

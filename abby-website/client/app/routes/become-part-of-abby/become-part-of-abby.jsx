import { Link } from "react-router";
import "../../styles/app.css";
import "./become-part-of-abby.css";
import notreadyWebp from "../../assets/images/webp/become-part-of-abby-notready.webp";
import notreadyPng from "../../assets/images/png/become-part-of-abby-notready.png";
import aloneWebp from "../../assets/images/webp/become-part-of-abby-alone.webp";
import alonePng from "../../assets/images/png/become-part-of-abby-alone.png";

export default function becomePartOfAbby() {
    return (
        <section className="become-part-of-abby-page">
            <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol>
                    <li><Link to="/">Open Calls</Link></li>
                    <li><Link to="/open-call/get-close-to-abby">Get Close to Abby</Link></li>
                    <li><Link to="/open-call/get-close-to-abby/become-part-of-abby">Becoming part of Abby</Link></li>
                </ol>
            </nav>

            <section className="become-part-of-abby-intro">
                <div className="become-part-of-abby-intro-left">
                    <h1 className="become-part-of-abby-intro-left_h1">Become Part of Abby</h1>
                    <p className="become-part-of-abby-intro-left_textone bodyM">You looked closer, and now you&rsquo;re here. You have gotten close to Abby, now it&rsquo;s time to get close to someone else with Abby within Abby.</p>
                    <p className="become-part-of-abby-intro-left_texttwo bodyL">It&rsquo;s not just a museum. It&rsquo;s a community built from many stories, shaped by many hands. Some come to rest. Some come to explore. </p>
                </div>
                <div className="become-part-of-abby-intro-right yellow-font">
                    <span className="abby-a letter-fly">A</span>
                    <span className="abby-b-one letter-fly">B</span>
                    <span className="abby-b-two letter-fly">B</span>
                    <span className="abby-y letter-fly">Y</span>
                </div>
            </section>
            <div className="sticker-wrapper" > <p className="sticker-send-invitation">Send <br />invitation</p> </div>

            <section className="become-part-of-abby-intro-bottom">
                <div className="become-part-of-abby-intro-bottom_image">
                    <picture>
                        <source srcSet={aloneWebp} type="image/webp" />
                        <img src={alonePng} alt="An image of a girl sitting alone reading newspapers"
                            className="become-part-of-abby_alone-girl"/>
                    </picture>
                </div>
                <div className="become-part-of-abby-intro-bottom_text">
                    <p className="become-part-of-abby-intro-bottom_text_one bodyM">In the Salon room in Abby, and here online, your voice is welcome too.</p>
                    <p className="become-part-of-abby-intro-bottom_text_two bodyL medium"> Abby Space is yours. </p>
                    <p className="become-part-of-abby-intro-bottom_text_three bodyM">What will you do with it?</p>
                </div>
            </section>

            <section className="become-part-of-abby-invitations">
                <article className="bodyM become-part-of-abby-invitation-personal">
                    <h2>Get close with <br /> <span className="yellow-font" > Personal Invitation </span> </h2>
                    <div className="become-part-of-abby-invitation-texts">
                        <p className="bodyM become-part-of-abby-invitation-personal_text-1">Now that you got close to Abby, get close with someone else. You don&rsquo;t need a big idea or reason to reach out.</p>
                        <ul className="become-part-of-abby_invitation_dashlist">
                            <li className="bodyS">A journal session in the Living Room?</li>
                            <li className="bodyS">Coffee and quiet talk in the Café?</li>
                            <li className="bodyS">Sketching side by side in the Workshop?</li>
                        </ul>
                    </div>
                    <div className="invitation-cta">
                        <p className="bodyL become-part-of-abby-invitation_upbutton_text">Leave a personal invitation, just for them.</p>
                        <Link
                            to="/open-call/get-close-to-abby/become-part-of-abby/private-invitation"
                            className="button--s button--yellow button button_become_part"
                        >
                            Send a Private Invitation
                        </Link>
                    </div>
                </article>

                <div className="divider-line"></div>

                <article className="bodyM become-part-of-abby-invitation-open">
                    <h2>Share an <br /> <span className="blue-font" > Open Invitation </span> </h2>
                    <div className="become-part-of-abby-invitation-texts">
                        <p className="bodyM become-part-of-abby-invitation-open_text-1">Have an idea for something others might join?</p>
                        <p className="bodyM become-part-of-abby-invitation-open_text-2">You don&rsquo;t need to be an expert. Just start something small and see who responds.</p>
                        <ul className="become-part-of-abby_invitation_dashlist">
                            <li className="bodyS">Is there something you&rsquo;d like to <span className="bold pill">Learn</span> <span className="bold pill">Explore</span> <span className="bold pill">Share</span> ?</li>
                            <li className="bodyS">What kind of people would you like to gather?</li>
                            <li className="bodyS">What space what would you like to open?</li>
                        </ul>
                    </div>
                    <div className="invitation-cta">
                        <p className="bodyL become-part-of-abby-invitation_upbutton_text">Leave a personal invitation, just for them.</p>
                        <Link
                            to="/open-call/get-close-to-abby/become-part-of-abby/open-invitation"
                            className="button--s button--green button button_become_part"
                        >
                            Send an Open Invitation
                        </Link>
                    </div>
                </article>
                <div className="become-part-of-abby-ps_message">
                        <p className="bodyXL become-part-of-abby-ps_message-text">P.S: Your idea does not need polish, only your heart.</p>
                        <p className="bodyM">Start with a question, a hope, a creative itch...</p>
                    </div>
            </section>


            <section
                className="banner-wrapper"
                style={{
                    backgroundColor: "var(--color-yellow)",
                    color: "var(--color-black)",
                    textTransform: "uppercase",
                }}
            >
                <div className="banner-section">
                    <div
                        className="banner-text"
                        style={{ fontSize: "var(--font-step-0)" }}
                    >
                        <p>Get Close</p> <p>Get Close</p> <p>Get Close</p> <p>Get Close</p>{" "}
                        <p>Get Close</p> <p>Get Close</p> <p>Get Close</p> <p>Get Close</p>{" "}
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                        <p>Get Close</p>
                    </div>
                </div>
            </section>

            <section className="become-part-of-abby_not_ready_section_mobile">
                <div className="become-part-of-abby-not-ready">
                    <h3 className="become-part-of-abby-not-ready_title">Not ready to <br /> start something yourself?</h3>
                    <div>
                        <p className="bodyM become-part-of-abby-not-ready_text_1">Visit the Stadsliving spaces at Abby museum, and discover the open invitations others have already shared in the Salon.</p>
                        <p className="bodyM become-part-of-abby-not-ready_text_2">Maybe you&rsquo;ll find an Open Invitation that feels just right for you to join.</p>
                    </div>
                </div>
                <div>
                    <picture>
                        <source srcSet={notreadyWebp} type="image/webp" />
                        <img src={notreadyPng} alt="An image of an Abby garden with chairs" />
                    </picture>
                </div>
                <div className="become-part-of-abby_next_steps">
                    <p className="bodyL become-part-of-abby_next_step">Your next step might already be waiting.</p>
                    <Link
                        to="#"
                        className="button--s button--green button button_become_part"
                    >
                        Visit the Stadsliving
                    </Link>
                </div>
            </section>

            <section className="become-part-of-abby_not_ready_section_desktop">
                <div className="become-part-of-abby-not-ready">
                    <h3 className="become-part-of-abby-not-ready_title">Not ready to <br /> start something yourself?</h3>
                    <p className="bodyM become-part-of-abby-not-ready_text_1">
                        Visit the Stadsliving spaces at Abby museum, and discover the open invitations others have already shared in the Salon.
                    </p>
                    <p className="bodyM become-part-of-abby-not-ready_text_2">
                        Maybe you&rsquo;ll find an Open Invitation that feels just right for you to join.
                    </p>
                    <p className="bodyL become-part-of-abby_next_step">
                        Your next step might already be waiting.
                    </p>
                    <Link
                        to="#"
                        className="button--s button--green button button_become_part"
                    >
                        Visit the Stadsliving
                    </Link>
                </div>

                <div className="become-part-of-abby-not-ready-image">
                    <picture>
                        <source srcSet={notreadyWebp} type="image/webp" />
                        <img src={notreadyPng} alt="An image of an Abby garden with chairs" />
                    </picture>
                </div>
            </section>
        </section>

    );
}

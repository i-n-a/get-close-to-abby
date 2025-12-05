import { Link } from "react-router";
import "./get-close-to-abby.css";
import "../../styles/app.css";
import closeupWebp from "../../assets/images/webp/IMG_6803.webp";
import closeupPng from "../../assets/images/png/IMG_6803.png";
import boxSvg from "../../assets/images/svg/get-close-box-2.svg";
import ticketWebp from "../../assets/images/webp/step-one-ticket.webp";
import ticketPng from "../../assets/images/png/step-one-ticket.png";
import livingWebp from "../../assets/images/webp/stadsliving-living.webp";
import livingPng from "../../assets/images/png/stadsliving-living.png";
import salonWebp from "../../assets/images/webp/stadsliving-salon.webp";
import salonPng from "../../assets/images/png/stadsliving-salon.png";
import gardenWebp from "../../assets/images/webp/stadsliving-garden.webp";
import gardenPng from "../../assets/images/png/stadsliving-garden.png";
import cafeWebp from "../../assets/images/webp/stadsliving-cafe.webp";
import cafePng from "../../assets/images/png/stadsliving-cafe.png";
import atelierWebp from "../../assets/images/webp/stadsliving-atelier.webp";
import atelierPng from "../../assets/images/png/stadsliving-atelier.png";
import scrollRightWebp from "../../assets/images/webp/stadsliving-scroll-icon-2.webp";
import scrollRightPng from "../../assets/images/png/stadsliving-scroll-icon-2.png";
import phoneWebp from "../../assets/images/webp/step-three-phone.webp";
import phonePng from "../../assets/images/png/step-three-phone.png";
import stepThreeCloseupWebp from "../../assets/images/webp/step-three-closeup.webp";
import stepThreeCloseupPng from "../../assets/images/png/step-three-closeup.png";
import ticket150Avif from "../../assets/images/awif/open-ticket_eojocy_c_scale,w_150.avif";
import ticket295Avif from "../../assets/images/awif/open-ticket_eojocy_c_scale,w_295.avif";
import ticket368Avif from "../../assets/images/awif/open-ticket_eojocy_c_scale,w_368.avif";
import ticket150 from "../../assets/images/png/open-ticket_eojocy_c_scale,w_150.png";
import ticket295 from "../../assets/images/png/open-ticket_eojocy_c_scale,w_295.png";
import ticket368 from "../../assets/images/png/open-ticket_eojocy_c_scale,w_368.png";
import scollDownAvif from "../../assets/images/awif/purple-arrow.avif";
import scrollDownPng from "../../assets/images/png/purple-arrow.png";

import garden350Avif from "../../assets/images/awif/abby-garden_kdsomb_c_scale,w_350.avif";
import garden716Avif from "../../assets/images/awif/abby-garden_kdsomb_c_scale,w_716.avif";
import garden979Avif from "../../assets/images/awif/abby-garden_kdsomb_c_scale,w_979.avif";
import garden350 from "../../assets/images/png/abby-garden_kdsomb_c_scale,w_350.png";
import garden716 from "../../assets/images/png/abby-garden_kdsomb_c_scale,w_716.png";
import garden979 from "../../assets/images/png/abby-garden_kdsomb_c_scale,w_979.png";

export default function getCloseToAbby() {
  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="#">Home</Link></li>
          <li><Link to="/">Open Calls</Link></li>
          <li aria-current="page"><span>Get close to Abby</span></li>
        </ol>
      </nav>
      <section className="get-close-to-abby-header">
        <div
          className="get-close-to-abby-intro side-margins"
          style={{ paddingBlock: "var(--fluid-space-m)" }}
        >
          <h1 className="h1">
            Get Close to{" "}
            <span className="get-close-to-abby-header-span">Abby</span>
          </h1>
          <p
            style={{
              fontSize: "var(--font-step-1)",
              marginBlockEnd: "var(--fluid-space-xs)",
            }}
          >
            Hidden in Abby&rsquo;s rooms are pieces waiting to be seen. <br />
          </p>
          <p style={{ fontSize: "var(--font-step-1)" }}>
            Take a closer look and become part of the story.
          </p>
        </div>
        <div className="get-close-to-abby-intro-2">
          <p>Get a FREE Close-up Ticket to start the Experience!</p>
          <Link
            to="/open-call/get-close-to-abby/ticket"
            className="button button--m button--green"
          >
            Claim my Close-up Ticket
          </Link>
          <p
            style={{
              fontSize: "var(--font-step--1)",
              paddingBlockStart: "var(--fluid-space-m)",
            }}
          >
            *This isn&rsquo;t an official museum entry ticket. You&rsquo;ll
            still need a regular ticket to enter Abby.
          </p>
        </div>
        <div className="get-close-to-abby-images">
          <picture>
            <source srcSet={closeupWebp} type="image/webp" />
            <img src={closeupPng} alt="An image of a close-up in Abby" />
          </picture>
        </div>
      </section>

      <section
        className="banner-wrapper"
        style={{
          backgroundColor: "var(--color-purple)",
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
      <section className="howto-section side-margins">
        <h2>How it works...</h2>
        <div className="howto-line"></div>
        <p className="howto-step bodyM">Get a Close-up Ticket</p>
        <div className="howto-line"></div>
        <p className="howto-step bodyM">Explore &amp; Find</p>
        <div className="howto-line"></div>
        <p className="howto-step bodyM">Match &amp; Leave a Mark</p>
        <div className="howto-line"></div>
        <p className="howto-step bodyM">Become part of Abby</p>
      </section>
      <section className="step-one-section">
        <h2 className="step-one-title side-margins">
          <span className="step-number">1</span>
          <br />
          Get Your Close-Up Ticket
        </h2>
        <img
          className="step-one-box"
          src={boxSvg}
          alt="An abstract blue shape of an Abby box"
        />
        <div className="step-one-ticket-wrapper">
          <picture>
            <source srcSet={ticketWebp} type="image/webp" />
            <img src={ticketPng} alt="An image of a physical Close-up Ticket" />
          </picture>
        </div>
        <div className="step-one-paragraph-section side-margins">
          <div className="step-one-paragraph-sections">
            <p className="bodyL step-one-subtitles">Your quest?</p>
            <p className="bodyM p-limit">
              Receive a unique fragment of Abby, a close-up detail from one of
              it&rsquo;s open spaces. These images were shared by other
              visitors.
            </p>
          </div>
          <div className="step-one-paragraph-sections">
            <p className="bodyL step-one-subtitles">How to start?</p>
            <p className="bodyM p-limit">
              Find where it belongs in the museum to unlock the personal
              reflection they left behind.
            </p>
          </div>
          <div className="step-one-button-section">
            <Link
              to="/open-call/get-close-to-abby/ticket"
              className="button button--s button--secondary"
            >
              Claim my Close-up Ticket
            </Link>
            <p className="bodyS">
              Get your Close-up Ticket from an Abby box in the city or download
              one digitally here.
            </p>
          </div>
        </div>
      </section>
      <section className="step-two-section">
        <div className="side-margins">
          <h2 className="step-two-title">
            <span className="step-number">2</span>
            <br />
            Find where it belongs
          </h2>
          <p className="bodyM p-limit step-two-paragraph">
            Wander through Abby&rsquo;s Stadsliving open spaces and match your
            close-up image to it&rsquo;s hidden spot.
          </p>
        </div>
        <div className="stadsliving-scroll-message">
          <p className="labelS">
            Scroll to see <br />
            all rooms{" "}
          </p>
          <div className="stadsliving-icon">
            <picture>
              <source srcSet={scrollRightWebp} type="image/webp" />
              <img
                src={scrollRightPng}
                alt="An image of the Living open space in Abby. Bright and colourful room with different seats and other elements."
              />
            </picture>
          </div>
        </div>

        <div className="step-two-scrollable-wrapper">
          <div className="step-two-scoll-card yellow stadsliving-title-section">
            <h3 className="bodyL">
              Stadsliving <br />
              Spaces
            </h3>
            <p>Open 10AM - 10PM</p>
          </div>
          <div className="step-two-scoll-card step-two-scoll-room-card purple">
            <div className="stadsliving-image">
              <picture>
                <source srcSet={livingWebp} type="image/webp" />
                <img
                  src={livingPng}
                  alt="An image of the Living open space in Abby. Bright and colourful room with different seats and other elements."
                />
              </picture>
            </div>
            <div className="stadsliving-text side-margins">
              <h3 className="stadsliving-name">The Living</h3>
              <p className="bodyS">
                A cozy living room space to read, relax, and reflect. By night,
                it transforms into a café for drinks, talks, and artful
                evenings.
              </p>
            </div>
          </div>
          <div className="step-two-scoll-card step-two-scoll-room-card blue">
            <div className="stadsliving-image">
              <picture>
                <source srcSet={salonWebp} type="image/webp" />
                <img
                  src={salonPng}
                  alt="An image of the Salon open space in Abby. Empty, light room with wooden floors and ceilings."
                />
              </picture>
            </div>

            <div className="stadsliving-text side-margins">
              <h3 className="stadsliving-name">The Salon</h3>
              <p className="bodyS">
                Once the nuns sleeping quarters, now a space for shared ideas
                and experiments.Anyone can organise or join, from discussions to
                exhibitions.
              </p>
            </div>
          </div>
          <div className="step-two-scoll-card step-two-scoll-room-card green">
            <div className="stadsliving-image">
              <picture>
                <source srcSet={gardenWebp} type="image/webp" />
                <img
                  src={gardenPng}
                  alt="An image of the Garden open space outside of Abby. Sunny, full of nature and plants with the museums cafe in the center."
                />
              </picture>
            </div>

            <div className="stadsliving-text side-margins">
              <h3 className="stadsliving-name">The Garden</h3>
              <p className="bodyS">
                A modern herb and vegetable garden rooted in tradition. Wander
                through edible flowers, quiet beauty, and living history, a
                green space where art meets rest.
              </p>
            </div>
          </div>
          <div className="step-two-scoll-card step-two-scoll-room-card orange">
            <div className="stadsliving-image">
              <picture>
                <source srcSet={cafeWebp} type="image/webp" />
                <img
                  src={cafePng}
                  alt="An image of the Garden open space outside of Abby. Sunny, full of nature and plants with the museums cafe in the center."
                />
              </picture>
            </div>

            <div className="stadsliving-text side-margins">
              <h3 className="stadsliving-name">The Café</h3>
              <p className="bodyS">
                From brunch to aperitif, Abby Café offers comfort and
                conversation. Grab a bite, sip something seasonal, or unwind.
              </p>
            </div>
          </div>
          <div className="step-two-scoll-card step-two-scoll-room-card yellow">
            <div className="stadsliving-image">
              <picture>
                <source srcSet={atelierWebp} type="image/webp" />
                <img
                  src={atelierPng}
                  alt="An image of the Garden open space outside of Abby. Sunny, full of nature and plants with the museums cafe in the center."
                />
              </picture>
            </div>

            <div className="stadsliving-text side-margins">
              <h3 className="stadsliving-name">The Atelier</h3>
              <p className="bodyS">
                A working studio with tables, sinks, and tools. Stop by to
                sketch, paint, make, or simply think with your hands.
              </p>
            </div>
          </div>
        </div>

        <div className="step-two-button-section side-margins">
          <div className="step-two-button">
            <Link
              to="#"
              className="button button--s button--yellow step-two-button"
            >
              More about Stadsliving
            </Link>
          </div>
          <div className="step-two-button">
            <Link
              to="#"
              className="button button--s button--secondary step-two-button"
            >
              Discover Upcoming Events
            </Link>
          </div>
        </div>
      </section>
      <section className="step-three-section">
        <div className="step-three-layout">
          <div className="side-margins step-three-text">
            <div>
              <h2>
                <span className="step-number">3</span>
                <br />
                Match the close-up!
              </h2>
              <div className="step-three-paragraph-section">
                <p className="bodyL">Unlock a reflection left for you.</p>
                <p className="bodyM">
                  Scan the QR Code on the ticket to unlock the personal
                  reflection left by the visitor who shared it.
                </p>
              </div>
              <div className="step-three-paragraph-section">
                <p className="bodyL orange-font">Want to leave a mark?</p>
                <p className="bodyM">
                  You&rsquo;ve seen a part of what makes Abby special. Now, you
                  can help someone else see it though your eyes.
                </p>
                <p className="bodyM">
                  Reflect and submit a close-up of something you noticed or
                  liked most in the Stadsliving spaces. We&rsquo;ll turn it into
                  a new Abby ticket, so others can begin their journey where
                  yours left off.
                </p>
              </div>
            </div>
          </div>
          <div className="step-three-image-section">
            <div className="step-three-closeup">
              <picture>
                <source srcSet={stepThreeCloseupWebp} type="image/webp" />
                <img
                  src={stepThreeCloseupPng}
                  alt="An image of the close-up image that was on the phone. An art-piece closeup showing a red heart on white canvas."
                />
              </picture>
            </div>
            <div className="step-three-phone">
              <picture>
                <source srcSet={phoneWebp} type="image/webp" />
                <img
                  src={phonePng}
                  alt="An image of a hand holding a phone with an art-piece close-up image in it."
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
      <section className="step-four-section purple ">
        <div className="step-four-part-one-layout">
          <div className="step-four-part-one-text">
            <div className="side-margins">
              <h2 className="step-four-title">
                <span className="step-number">4</span>
                <br />
                Become Part of Abby
              </h2>
              <div className="step-four-paragraph-section">
                <p className="medium bodyL">Follow the arrows on the walls.</p>
                <p className="bodyM p-limit">
                  They will guide you to a station where you&rsquo;re invited to
                  imagine what&rsquo;s possible in Abby&rsquo;s open spaces.
                </p>
              </div>
              <div className="step-four-paragraph-section">
                <p className="bodyL medium">Shape what is next.</p>
                <p className="bodyM p-limit">
                  Send a Personal Invite to someone you&rsquo;d like to share
                  the space with. Or post an Open Invitation for others to join
                  your idea.
                </p>
              </div>

              <p className="bodyXL step-four-quote yellow-font medium">
                Visit Abby to get the complete Experience!
              </p>
            </div>
          </div>

          <div className="scroll-down-section">
            <p className="labelS">Scroll down for more</p>
            <div className="scroll-down-icon">
              <picture>
                <source srcSet={scrollRightWebp} type="image/webp" />
                <img
                  src={scrollRightPng}
                  alt="An image of the Living open space in Abby. Bright and colourful room with different seats and other elements."
                />
              </picture>
            </div>
          </div>
          <div className="step-four-image-wrapper">
            <div className="step-four-image-container">
              <div className="step-four-ticket-one">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${ticket150Avif} 150w, ${ticket295Avif} 295w, ${ticket368Avif} 368w`}
                    sizes="(max-width: 368px) 100vw, 368px"
                  />
                  <img
                    sizes="(max-width: 368px) 100vw, 368px"
                    srcSet={`${ticket150} 150w, ${ticket295} 295w, ${ticket368} 368w`}
                    src={ticket368}
                    alt="Open ticket"
                  />
                </picture>
              </div>
              <div className="step-four-ticket-two">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${ticket150Avif} 150w, ${ticket295Avif} 295w, ${ticket368Avif} 368w`}
                    sizes="(max-width: 368px) 100vw, 368px"
                  />
                  <img
                    sizes="(max-width: 368px) 100vw, 368px"
                    srcSet={`${ticket150} 150w, ${ticket295} 295w, ${ticket368} 368w`}
                    src={ticket368}
                    alt="Open ticket"
                  />
                </picture>
              </div>
              <div className="step-four-arrow-one">
                <picture>
                  <source srcSet={scollDownAvif} type="image/avif" />
                  <img
                    src={scrollDownPng}
                    alt="A purple coloured arrow on a shape of the Abby museum letter A in their logo."
                  />
                </picture>
              </div>
              <div className="step-four-arrow-two">
                <picture>
                  <source srcSet={scollDownAvif} type="image/avif" />
                  <img
                    src={scrollDownPng}
                    alt="A purple coloured arrow on a shape of the Abby museum letter A in their logo."
                  />
                </picture>
              </div>
              <div className="step-four-arrow-three">
                <picture>
                  <source srcSet={scollDownAvif} type="image/avif" />
                  <img
                    src={scrollDownPng}
                    alt="A purple coloured arrow on a shape of the Abby museum letter A in their logo."
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <div className=" step-four-paragraph-section-two">
          <div className="step-four-last-page">
            <div className="step-four-last-page-text">
              <h3 className="bodyL medium side-margins">
                What would you like to do at Abby?
              </h3>
              <div className="side-margins">
                <p className="bodyM p-limit">
                  What would you love to create in the Salon or Atelier? What
                  experience do you wish existed - for you or for others?
                </p>
                <p className="bodyM p-limit">
                  Whether it&rsquo;s a quiet workshop, a shared story, a game of
                  cards, reading a book, spontaneous gatherings or something
                  entirely new...
                </p>
              </div>
            </div>
            <div className="step-four-last-page-image">
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${garden350Avif} 350w, ${garden716Avif} 716w, ${garden979Avif} 979w`}
                  sizes="(max-width: 979px) 100vw, 979px"
                />
                <img
                  sizes="(max-width: 979px) 100vw, 979px"
                  srcSet={`${garden350} 350w, ${garden716} 716w, ${garden979} 979w`}
                  src={garden979}
                  alt="An image of the museum's garden with sunny weather, people walking around and exploring the garden space, and the Abby cafe in the middle."
                />
              </picture>
            </div>
          </div>
        </div>
        <div className="blue step-four-cta-section ">
          <p className="bodyL medium side-margins">
            Abby is a space in progress. And your piece belongs here.
          </p>
          <Link
            to="/open-call/get-close-to-abby/become-part-of-abby"
            className="button button--m button--yellow"
          >
            Become part of Abby
          </Link>
        </div>
      </section>
      <nav
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      ></nav>
    </section>
  );
}

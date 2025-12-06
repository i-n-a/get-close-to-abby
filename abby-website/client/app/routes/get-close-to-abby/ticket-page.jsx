import { Link } from "react-router";
import { useState } from "react";
import "./ticket-page.css";

import ticketAvif from "../../assets/images/awif/ticket-page-ticket.avif";
import ticketPng from "../../assets/images/png/ticket-page-ticket.png";
import ticketBox from "../../assets/images/svg/ticket-page-box.svg";
import museum390Avif from "../../assets/images/awif/ticket-page-museum_qpnilt_c_scale,w_390.avif";
import museum1058Avif from "../../assets/images/awif/ticket-page-museum_qpnilt_c_scale,w_1058.avif";
import museum1500Avif from "../../assets/images/awif/ticket-page-museum_qpnilt_c_scale,w_1500.avif";
import museum390 from "../../assets/images/png/ticket-page-museum_qpnilt_c_scale,w_390.png";
import museum1058 from "../../assets/images/png/ticket-page-museum_qpnilt_c_scale,w_1058.png";
import museum1500 from "../../assets/images/png/ticket-page-museum_qpnilt_c_scale,w_1500.png";
import splitLogoAvif from "../../assets/images/awif/ticket-page-split-icon.avif";
import splitLogoPng from "../../assets/images/png/ticket-page-split-icon.png";
import guyAvif from "../../assets/images/awif/ticket-page-guy.avif";
import guyPng from "../../assets/images/png/ticket-page-guy.png";
import triangleAvif from "../../assets/images/awif/ticket-page-triangle.avif";
import trianglePng from "../../assets/images/png/ticket-page-triangle.png";
import downloadedSvg from "../../assets/images/svg/check-circle.svg";
import mapAvif from "../../assets/images/awif/map.avif";
import mapPng from "../../assets/images/png/map.png";
import arrowBack from "../../assets/images/svg/arrowleft.svg";
import {getTicketWithClue} from "../../services/supabase";
import { generateTicketPDF } from "../../utils/pdfbuilder";

export async function clientLoader() {
  const ticketData = await getTicketWithClue();
  if (!ticketData) {
    throw new Error("Failed to load ticket data");
  }
  //console.log("Ticket data loaded:", ticketData);
  return { ticketData };
}

export default function ticketPage({loaderData}) {
  const { ticketData } = loaderData;
  //console.log("Ticket data in component:", ticketData);
  const [currentModal, setCurrentModal] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const handleDownloadClick = async (source) => {
  if (source === "initial") {
    setLoadingInitial(true);
  } else if (source === "modal") {
    setLoadingModal(true);
  }

  try {
    await generateTicketPDF(ticketData.ticketImage, ticketData.ticketClue, ticketData.ticketId);
    setCurrentModal("download");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Sorry, there was a problem downloading your ticket. Please try again.");
  } finally {
    if (source === "initial") {
      setLoadingInitial(false);
    } else if (source === "modal") {
      setLoadingModal(false);
    }
  }
};

  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Open Calls</Link></li>
          <li><Link to="/open-call/get-close-to-abby">Get close to Abby</Link></li>
          <li aria-current="page"><span>Close-up Ticket</span></li>
        </ol>
      </nav>

      <section className="ticket-heading">
        <h1>Ticket Page</h1>
        <div className="ticket-heading__back-button bodyM side-margins">
          <Link
            to="/open-call/get-close-to-abby"
            className="backButton phone-side-margin"
          >
            {" "}
            <div className="ticket-heading__back-button-content">
              <img
                className="arrowBack"
                src={arrowBack}
                alt="arrow backwards"
              />
              Back
            </div>
          </Link>
        </div>

        <p className="ticket-heading__sticker bodyS">
          Download a Ticket here, or a Physical one from a box
        </p>
        <div className="ticket-heading__image-container">
          <div className="ticket-heading__image-container-layout">
            <div className="animation-hidden"></div>
            <div className="box__blue-slot"></div>
            <div className="box__ticket-image">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
          </div>
        </div>

        <div className="ticket-heading__text-container side-margins">
          <p className="bodyL medium">
            Somewhere in Abby museum, this detail lives.{" "}
          </p>
          <p className="bodyM">
            A texture. A shape. A whisper of a story. Can you find it where it
            belongs?
          </p>
          <div className="ticket-heading__button-section">
            <div>
              {/* change to button because it triggers a download or action, not navigation */}
              <button
                className="button button--m button--yellow"
                onClick={() => handleDownloadClick("initial")}
                disabled={loadingInitial}
              >
                Download a Ticket
              </button>
            </div>
            <div>
              <button
                className="button button--s button--secondary"
                onClick={() => setCurrentModal("map")}
              >
                Find Close-up Ticket Box
              </button>
            </div>
          </div>
        </div>

        <img
          className="step-one-box"
          src={ticketBox}
          alt="An abstract blue shape of an Abby box"
        />
      </section>
      {currentModal === "download" && (
        <dialog open className="modal">
          <button
            aria-label="closeSignUp"
            className="button-close-modal"
            onClick={() => setCurrentModal(null)}
          >
            ✕
          </button>
          <div className="pop-up__content">
            <div className="pop-up__content-layout">
              <img
                className="pop-up__downloaded-icon"
                src={downloadedSvg}
                alt="A yellow check icon inside a yellow circle"
              />
              <p className="bodyL">Download Complete!</p>
              <p className="bodyM">
                Your Abby Close-up Ticket should be in downloads.
              </p>
              <div className="pop-up__downloaded-button-section">
                <div>
                  <button
                    className="button button--s button--secondary"
                    onClick={() => handleDownloadClick("modal")}
                    disabled={loadingModal}
                  >
                    Download Ticket again
                  </button>
                </div>
                <div>
                  <button
                    className="button button--s button--secondary"
                    onClick={() => setCurrentModal("map")}
                  >
                    Find Close-up Ticket Box
                  </button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
      {currentModal === "map" && (
        <dialog open className="modal">
          <button
            aria-label="closeSignUp"
            className="button-close-modal"
            onClick={() => setCurrentModal(null)}
          >
            ✕
          </button>
          <div className="pop-up__content map__pop-up">
            <div className="map__pop-up-content">
              <p className="bodyL">
                Where to find Close-up Ticket Boxes? Look and see...
              </p>
              <div className="map-pop-up__image">
                <picture>
                  <source srcSet={mapAvif} type="image/avif" />
                  <img
                    src={mapPng}
                    alt="A line map of Kortrijk on yellow background showing the location of Abby museum with a green arrow, and little blue circles in the map indicating the location of all boxes"
                  />
                </picture>
              </div>
            </div>
          </div>
        </dialog>
      )}
      <section className="banner-wrapper">
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
      <section className="ticket-bridge__container side-margins">
        <p className="bodyXL">Bridging a gap between You and Abby</p>
        <div className="ticket-bridge__image-container">
          <div className="ticket-bridge__a-container">
            <div className="ticket-bridge__a">
              <picture>
                <source srcSet={splitLogoAvif} type="image/avif" />
                <img
                  src={splitLogoPng}
                  alt="The Abby logo, the A shape, cut in two and shown the left side"
                />
              </picture>
            </div>
          </div>
          <div className="ticket-bridge__ticket-container">
            <div className="ticket-bridge__ticket-image ticket-one">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
            <div className="ticket-bridge__ticket-image ticket-two">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
            <div className="ticket-bridge__ticket-image ticket-three">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
            <div className="ticket-bridge__ticket-image ticket-four">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
            <div className="ticket-bridge__ticket-image ticket-five">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
            <div className="ticket-bridge__ticket-image ticket-six">
              <picture>
                <source srcSet={ticketAvif} type="image/avif" />
                <img src={ticketPng} alt="An image of a close-up ticket" />
              </picture>
            </div>
          </div>
        </div>

        <p className="bodyXL">One ticket at a time.</p>
      </section>

      <section>
        <div className="what-next__section">
          <div className="what-next__text-section side-margins">
            <h2>What to do next...</h2>
            <div className="what-next__steps">
              <h3 className="bodyL">Visit Abby</h3>
              <p className="bodyM">
                The Standsliving or open spaces of Abby await: Salon, Living,
                Garden, etc.
              </p>
              <Link to="/" className="button button--s button--secondary">
                Discover Stadsliving Spaces
              </Link>
            </div>
            <div className="what-next__steps">
              <h3 className="bodyL">Look closely</h3>
              <p className="bodyM">
                Explore the museum and find the exact place the object lives.
                Read the clues, because they might hint on what to look out for
                and the potential of that specific room.
              </p>
            </div>
            <div className="what-next__steps">
              <h3 className="bodyL">Share your own</h3>
              <p className="bodyM">
                You can reflect on your discovery and submit a close-up of your
                favourite object. This image will then become someone
                else&rsquo;s discovery.
              </p>
            </div>
            <p className="bodyL yellow-font bold what-next__quote">
              Follow the signs and get even closer!
            </p>
          </div>
          <div className="what-next__image">
            <picture>
              <source
                type="image/avif"
                srcSet={`${museum390Avif} 390w, ${museum1058Avif} 1058w, ${museum1500Avif} 1500w`}
                sizes="(max-width: 1500px) 100vw, 1500px"
              />
              <img
                sizes="(max-width: 1500px) 100vw, 1500px"
                srcSet={`${museum390} 390w, ${museum1058} 1058w, ${museum1500} 1500w`}
                src={museum1500}
                alt="An image showing the Abby musuem gardens with the cafe in the centre and people walking around and exploring the spaces"
              />
            </picture>
          </div>
        </div>
        <div className="stadsliving-information__section">
          <h3 className="bodyL medium">Stadsliving Abby</h3>
          <div className="stadsliving-information__information-section">
            <div className="stadsliving-information__information bodyS">
              <p className="medium">10:00 - 22:00</p>
              <p>Broelkaai 6, 8500 Kortrijk, Belgium</p>
            </div>
          </div>
        </div>
      </section>
      <section className="other-exhibitions__section">
        <div className="side-margins other-exhibitions__intro-section">
          <h2>Curious about the exhibitions too?</h2>
          <p className="bodyM">
            Abby museum also hosts rotating art shows, exhibitions and curated
            collections beyond the open rooms.
          </p>
          <p className="bodyM medium">
            Visit and discover what&rsquo;s on view.
          </p>
        </div>

        <article className="gallery-exhibition__section">
          <h3 className="gallery-title side-margins bodyL medium">
            Dieter Van Caneghem
          </h3>
          <div className="gallery-portrait">
            <picture>
              <source srcSet={guyAvif} type="image/avif" />
              <img
                src={guyPng}
                alt="A black and white image of the artist Dieter with long hair and a smile"
              />
            </picture>
          </div>

          <div className="gallery-text side-margins">
            <p className="bodyM">
              Artistic Construction Photography on the Birth of a New Museum
            </p>
            <p className="bodyL">Gallery</p>
          </div>
          <div className="gallery-button side-margins">
            <Link to="/" className="button button--s button--secondary">
              More Info
            </Link>
          </div>
          <div className="gallery-photo">
            <picture>
              <source srcSet={triangleAvif} type="image/avif" />
              <img src={trianglePng} alt="An image of a close-up in Abby" />
            </picture>
          </div>
        </article>
        <div className="discover__button side-margins">
          <Link to="/" className="button button--m button--yellow">
            Discover Exhibitions
          </Link>
        </div>
      </section>
    </section>
  );
}

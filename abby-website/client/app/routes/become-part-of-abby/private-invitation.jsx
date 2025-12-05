import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "./private-invitation.css";
import PrivateInviteForm from "../../components/Forms/private-invite-form";
import peopleCutoutA from "../../assets/images/awif/aPeopleCutout.avif";
import peopleCutouPng from "../../assets/images/png/aPeopleCutout.png";
import WhatsApp from "../../assets/images/png/whatsapp.png";
import mail from "../../assets/images/png/mail.png";

export default function privateInvitation() {
  const [currentModal, setCurrentModal] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Open Calls</Link></li>
        <li><Link to="/open-call/get-close-to-abby">Get Close to Abby</Link></li>
        <li><Link to="/open-call/get-close-to-abby/become-part-of-abby">Becoming part of Abby</Link></li>
        <li aria-current="page"><span>Send a private invitation</span></li>
      </ol>
    </nav>

    <section className="p-iHeader phone-side-margin">
      <h1>Send a <em className="yellow-font">Personal Invitation</em></h1>
      <p className="bodyM">Sometimes, all it takes is a gentle nudge. A personal invite makes it easier to say yes, and to feel welcome, together.</p>
      <p className="bodyM">Get close with someone with Abby within Abby.</p>
    </section>

    <section className="banner-wrapper">
        <div className="banner-section">
          <div className="banner-text p-iBanner">
            <p>Personal Invitation</p> <p>Personal Invitation</p> <p>Personal Invitation</p> <p>Personal Invitation</p>{" "}
            <p>Personal Invitation</p> <p>Personal Invitation</p> <p>Personal Invitation</p> <p>Personal Invitation</p>{" "}
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
            <p>Personal Invitation</p>
          </div>
        </div>
      </section>

    <section className="p-iMain">
      <div className="phone-side-margin p-iForm">
        <PrivateInviteForm setCurrentModal={setCurrentModal}/>
        <picture className="imageDesktop">
          <source srcSet={peopleCutoutA} type="image/avif" />
          <img src={peopleCutouPng} alt="An image of two firls laughing" />
        </picture>
      </div>
    </section>

      {/* MODAL: Ideas */}
      {currentModal === 'ideas' && (
        <dialog open className="modal">
          <button aria-label="closeSignUp" className="button-close-modal" onClick={() => setCurrentModal(null)}>✕</button>
          <div className="modalIdeaText">
            <p className="bodyL bold">Not sure what to write?</p>
            <p className="bodyM">Here are some ideas</p>
            <ul>
              <li>Want to draw quietly?</li>
              <li>How about a poetry swap?</li>
              <li>Have a coffee + reading session</li>
              <li>Start a slow sketch circle</li>
            </ul>
          </div>
        </dialog>
      )}

      {/* MODAL: Share */}
      {currentModal?.type === 'share' && (
        <dialog open className="modal">
          <button aria-label="closeSignUp" className="button-close-modal" onClick={() => setCurrentModal(null)}>✕</button>
          <p className="bodyL bold">How do you want to share the invite?</p>
          <ul>
            <li className="listItem">
              <a
                href={currentModal.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 iconLink"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/open-call/get-close-to-abby/become-part-of-abby/private-invitation/confirmation");
                  }, 100);
                }}
              >
                <img
                  className="iconSocial"
                  src={WhatsApp}
                  alt="WhatsApp logo"
                />
                Share on WhatsApp
              </a>
            </li>
            <li className="listItem">
              <a href={currentModal.emailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 iconLink"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/open-call/get-close-to-abby/become-part-of-abby/private-invitation/confirmation");
                  }, 100);
                }}>
                <img
                  className="iconSocial"
                  src={mail}
                  alt="gmail logo"
                />
                Share via Email
              </a>
            </li>
          </ul>

        </dialog>
      )}
    </>
  );
}

import PopUpCloseButton from './PopUpCloseButton.jsx';
import iconBack from "../../assets/images/svg/icon_arrow_prev.svg";
import "./RegistrationConfirmationPopup.css";
import { Form } from "react-router";

export default function RegistrationConfirmationPopUp({ profile, onCancel, onClose, invitationId, onGoBack }) {
  return (
    <section className="confirmation-popup confirmation-popup--overlay">
      <div className="confirmation-popup__content">
        {/* Header Section */}
        <div className="confirmation-popup__header">
          <PopUpCloseButton onClose={onClose} />
          <div className="confirmation-popup__title-container">
            <h4 className="confirmation-popup__title">Open Invitation #{invitationId}</h4>
          </div>
          <p className="confirmation-popup__subtitle">Confirm Registration</p>
        </div>

        {/* Go Back to Profile Selection PopUp */}
        <button
          onClick={onGoBack}
          className="confirmation-popup__back-button"
          type="button"
        >
          <img src={iconBack} alt="Back to profile choosing" width="20" height="20" className='confirmation-popup__back-icon'/>
          <span className='go-back-form-setting-p'>Go back to profile setting</span>
        </button>

        {/* Profile Confirmation Section */}
        <div className="confirmation-popup__profile">
          <img src={profile.avatar_url} alt={profile.name} className="confirmation-popup__profile-avatar" />
          <p className="confirmation-popup__profile-text">Continue as <strong className='bold chosen-name-p'>{profile.name}</strong>?</p>
        </div>


        {/* Event Info Section */}
        <div className="confirmation-popup__event-info">
            <p className='confirmation-popup__info-intro'>You are about to register to</p>
            <p className="confirmation-popup__event-info-title"> Activity Information</p>
            <div className='confirmation-popup__event-info-group'><span className="confirmation-popup__event-info-label">What</span>Learning how to crochet</div>
            <div className='confirmation-popup__event-info-group'><span className="confirmation-popup__event-info-label">Where</span>At the Salon</div>
        </div>

        {/* Confirmation Buttons */}
        <Form method="post" className="confirmation-popup__actions">
          <input type="hidden" name="profileId" value={profile.id} />
          <input type="hidden" name="invitationId" value={invitationId} />

          <button
            type="submit"
            className="confirmation-popup__button confirmation-popup__button--confirm"
          >
            Confirm my Participation
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="confirmation-popup__button confirmation-popup__button--cancel"
          >
            Cancel
          </button>
        </Form>
      </div>
    </section>
  );
}


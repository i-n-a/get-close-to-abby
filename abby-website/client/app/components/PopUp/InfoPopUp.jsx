import PopUpCloseButton from "./PopUpCloseButton";
import "./InfoPopUp.css"

export default function InfoPopUp({ onClose }) {
    return (
    <section className="chat-notice-popup">
      <div className="chat-notice-popup__content">
        <div className="chat-notice-popup__header">
          <h5 className="chat-notice-popup__title">Public Chat Notice</h5>
          <PopUpCloseButton onClose={onClose} />
        </div>
        <p className="chat-notice-popup__message">
          This chat is visible to other participants. Please be mindful of the information you share, and respect others at all times. Disrespectful or inappropriate messages will be removed.
        </p>
      </div>
    </section>
    );
}

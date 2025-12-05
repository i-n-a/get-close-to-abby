import closeIcon from '../../assets/images/svg/icon_close_popup.svg';
export default function PopUpCloseButton({ onClose }) {
    return (
         <button onClick={onClose} className="popup__close-btn">
          <img src={closeIcon} alt="icon to close popup" />
        </button>
    );
}

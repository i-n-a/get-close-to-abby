import './ProfileSelectionPopUp.css';
import {chunkProfileLayout} from "../../utils/helper-functions.js";
import { useState } from 'react';
import infoIcon from '../../assets/images/svg/icon_info.svg'
import PopUpCloseButton from './PopUpCloseButton.jsx';

export default function ProfileSelectionPopup({ onSelectProfile,onCancel, onClose, profiles, registeredParticipants }) {
  const existingParticipantIds = registeredParticipants?.map(p => p.id) || [];
  const availableProfiles = profiles?.filter(
    profile => !existingParticipantIds.includes(profile.id)
  ) || [];
  const displayProfiles = availableProfiles.length > 5
  ? availableProfiles.slice(0, 5)
  : availableProfiles;

  const circleLayoutRows = chunkProfileLayout(displayProfiles);
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [error, setError] = useState(null);
  const handleContinue = () => {
    if (selectedProfileId) {
      const profile = displayProfiles.find(p => p.id === selectedProfileId);
      onSelectProfile(profile);
    } else {
      setError("Please select a profile.");
    }
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <div className="popup__header">
          <PopUpCloseButton onClose={onClose} />
          <h2 className="popup__title">Sign Up</h2>
          <p className="popup__info">
            <img src={infoIcon} alt="Info icon" className="popup__info-icon" />
            This simulates signing in with your email account to create a profile and join an event.
          </p>
        </div>

        <p className="popup__subtitle">Choose your profile</p>

        <div className="popup__profiles">
          {circleLayoutRows.map((row, rowIndex) => (
            <div key={rowIndex} className="popup__profile-row">
              {row.map((profile) => {
                const isSelected = selectedProfileId === profile.id;

                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      setSelectedProfileId(profile.id);
                      setError(null);
                    }}
                    className={`popup__profile ${isSelected ? 'popup__profile--selected' : ''}`}
                  >
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="popup__avatar"
                    />
                    <span className="popup__name">{profile.name}</span>

                    {isSelected && (
                      <span className="popup__check">
                        ✅
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>


        {error && <p className="popup__error">{error}</p>}

        <div className="popup__actions">
          <button
            onClick={handleContinue}
            className={`popup__btn ${selectedProfileId ? 'popup__btn--active' : 'popup__btn--disabled'}`}
            disabled={!selectedProfileId}
          >
            Continue
          </button>
          <button
            onClick={onCancel}
            className="popup__btn popup__btn--cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

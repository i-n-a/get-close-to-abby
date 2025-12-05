import {chunkProfileLayout} from "../../utils/helper-functions.js";
import iconBack from "../../assets/images/svg/icon_arrow_prev.svg";
import "./GroupChatMembersPopup.css";

export default function GroupChatMembersPopUp({ onGoBack, registeredParticipants, onLeave }) {
  const displayProfiles = registeredParticipants.length > 10
  ? registeredParticipants.slice(0, 10)
  : registeredParticipants;
  const circleLayoutRows = chunkProfileLayout(displayProfiles);
  console.log("Circle layout rows:", circleLayoutRows);

  return (
    <div className="group-popup">
      <div className="group-popup__content">
        <div className="group-popup__header">
          <button
            onClick={onGoBack}
            className="group-popup__back-button"
            type="button"
          >
            <img src={iconBack} alt="Back to profile choosing" width="20" height="20" className='group-popup__back-icon'/>
            <p>Back to the Chat</p>
          </button>
          <div className="group-popup__title-container group-popup__title-container--participants">
            <h2 className="group-popup__title">Participants</h2>
            <p>{registeredParticipants.length} people</p>
          </div>
        </div>

        <div className="group-popup__profiles">
          {circleLayoutRows.map((row, rowIndex) => (
            <ul className="group-popup__profile-row" key={rowIndex}>
              {row.map((profileWrapper) => {
                const profile = profileWrapper;

                return (
                  <li key={profile.id} className="group-popup__profile-row-item">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="group-popup__avatar"
                    />
                    <span className="group-popup__name">{profile.name}</span>
                    {/* <span className="group-popup__name">{profile.family_name}</span> */}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        <div className="group-popup__actions">
          <button
            onClick={onLeave}
            className=" button button--secondary button--small"
          >
            Leave Event
          </button>
        </div>
      </div>
    </div>
  );
}

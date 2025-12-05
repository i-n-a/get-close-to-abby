// in progress, first do supabase functions separation
// // routes/answer-open/OpenInvitationLayout.jsx
// import { useState } from "react";
// import { Outlet} from "react-router";
// //import { getInvitation, getParticipants, getUserProfile } from "../services/supabase";
// import { getInvitation, getParticipants, getUserProfile } from "../services/supabase-ing";
// import {capitalizeFirstLetter} from "../../utils/helper-functions.js";
// import WelcomeMessage from "../components/Invitation/WelcomeMessage";
// import infoIcon from "../../assets/images/svg/icon_info.svg";
// import InvitationInfo from "../components/Invitation/InvitationInfo"// Adjust the import path as needed
// import capitalizeFirstLetter from "../../utils/helper-functions.js";

// export async function clientLoader({ params }) {
//   const invitation = await getInvitation(params.openInvitationToken);
//   const participants = await getParticipants(invitation.id);
//   const profile = await getUserProfile();

//   return { invitation, participants, profile };
// }

// export default function OpenInvitationLayout({ loaderData }) {
//   const { invitation, participants, profile } = loaderData;

//   const [showInfoPopUp, setShowInfoPopUp] = useState(false);

//   return (
//     <section className="invitation">
//       <div className="invitation__container">
//         {/* Title */}
//         <div className="invitation__title">
//           <h2 className="invitation__title-text">
//             {id ? `Open Event #${id}` : "Open Event"}
//           </h2>
//         </div>

//         {/* Event Info */}
//         <section className="invitation__info">
//           <h3 className="invitation__info-title">Activity information</h3>
//           <div className="invitation__info-group">
//             <p className="invitation__info-label">What</p>
//             <p className="invitation__info-text" >
//             <span className="invitation__info-value">
//               {activity_tag
//               ? capitalizeFirstLetter(activity_tag)
//               : "Unknown"}</span>
//             <span> - </span>
//             <span>{activity_what
//               ? capitalizeFirstLetter(activity_what)
//               : "Unknown"}
//             </span>
//             </p>
//           </div>
//           <div className="invitation__info-group">
//             <p className="invitation__info-label">Where</p>
//             <p className="invitation__info-text">
//               At the {invitation.room?.room_name
//               ? capitalizeFirstLetter(invitation.room.room_name)
//               : "Unknown"}</p>
//           </div>
//         </section>
//            <p>Welcome {profile.name ? capitalizeFirstLetter(profile.name) : "Guest"} !</p>
//         <Outlet/>

//         {/* Registration */}
//         {/* <RegistrationStatus
//           totalSlots={totalSlots}
//           filledSlots={filledSlots}
//           onSignUp={handleSignUp}
//           registrationFull={filledSlots >= totalSlots}
//         /> */}

//         {/* Profile Selection PopUp */}
//         {/* {showProfileSelectionPopup && (
//           <ProfileSelectionPopup
//             onClose={handleClosePopUp}
//             onCancel={handleCancelProfileSelection}
//             onSelectProfile={handleProfileSelected}
//             profiles={profiles}
//             registeredParticipants={participants}
//           />
//         )} */}

//         {/* Registration Confirmation PopUp */}
//         {/* {showRegistrationConfirmationPopup && selectedProfile && (
//           <RegistrationConfirmationPopup
//             profile={selectedProfile}
//             onCancel={handleCancelRegistration}
//             onClose={handleClosePopUp}
//             invitationId={invitation.id}
//             onGoBack={handleGoBackToProfileSelection}
//           />
//         )} */}

//         {/* Participants */}
//         <div className="invitation__participants">
//           <div className="invitation__participants-header">
//             <p className="invitation__participants-title">Want to see who is coming?</p>
//             <span className="invitation__participants-info"><img src={infoIcon} alt="Info icon to know more" /></span>
//           </div>
//           <p className="invitation__participants-count">{participants.length} people joined the event</p>
//           <div className="invitation__participants-list">
//             {participants.map((p, i) => (
//               <div key={i} className="invitation__participant">
//                 <img
//                   src={p.profiles.avatar_url}
//                   alt={p.profiles.name || "No name"}
//                   className="invitation__participant-avatar"
//                 />
//                 <p>{p.profiles.name} {p.profiles.family_name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




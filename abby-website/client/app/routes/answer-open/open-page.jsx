import { useState } from "react";
import { redirect} from "react-router";
import ProfileSelectionPopup from "../../components/PopUp/ProfileSelectionPopUp.jsx";
import RegistrationStatus from "../../components/Registration/RegistrationStatus.jsx";
import RegistrationConfirmationPopUp from "../../components/PopUp/RegistrationConfirmationPopup.jsx";
import OpenInvitationDetails from "../../components/OpenInvitation/OpenInvitationDetails.jsx";
import ParticipantsList from "../../components/OpenInvitation/OpenInvitationParticipantsList.jsx";
import OpenInvitationTitle from "../../components/OpenInvitation/OpenInvitationTitle.jsx";
import bannerEventImageAvif from "../../assets/images/awif/openevent-image-page.avif";
import bannerEventImagePng from "../../assets/images/png/openevent-image-page.png";

import "../../styles/app.css";
import "./open-page.css";
import {
  getAllProfiles,
  getInvitationByToken,
  getParticipantsByInvitationId,
  addParticipant,
} from "../../services/supabase.js";

export async function clientLoader({params}) {
  const profiles = await getAllProfiles();
  const invitation = await getInvitationByToken(params.openInvitationToken);
  const participantRows = await getParticipantsByInvitationId(invitation.id);
  const participants = participantRows.filter(
    (p) => p && typeof p.id === 'string' && p.name && p.avatar_url
  );
  return { invitation, profiles, participants };
}

export async function clientAction({ request}) {
  const formData = await request.formData();
  const profileId = formData.get("profileId");
  const invitationId = formData.get("invitationId");
  await addParticipant(profileId, invitationId);
  // On success, redirect to the "registered" route with profileId in URL or state
  return redirect(`./registered/${profileId}`);
}


export default function OpenRegistered({ loaderData }) {
 {/* Loader Data */}
  const { profiles } = loaderData || [];
  const { invitation } = loaderData;
  const { participants } = loaderData;

   {/* Fallback */}
  if (!invitation) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Invitation Not Found</h2>
        <p className="mb-4 text-gray-600">
          Oops! We couldn&apos;t find an invitation linked to this QR code. It might have expired, been used already, or never existed.
        </p>
        <p className="text-sm text-gray-500">
          If you think this is a mistake, please contact Abby or try scanning a different QR code.
        </p>
      </div>
    );
  }

  {/* Registration Progress */}
  const totalSlots = 10;
  const filledSlots = (participants?.length) || 0;
  const handleSignUp = () => {
    setShowProfileSelectionPopup(true);
  };

  {/* PopUps*/}
  const [showRegistrationConfirmationPopUp, setShowRegistrationConfirmationPopUp] = useState(false);
  const handleClosePopUp = () => {
    setShowProfileSelectionPopup(false);
    setShowRegistrationConfirmationPopUp(false);
    setSelectedProfile(null);
  };

  {/* Profile Selection PopUp */}
  const [showProfileSelectionPopup, setShowProfileSelectionPopup] = useState(false);
  const handleProfileSelected = (profile) => {
    setSelectedProfile(profile);
    setShowProfileSelectionPopup(false);
    setShowRegistrationConfirmationPopUp(true);
  };

  {/* Go Back to Profile Selection PopUp */}
  const [selectedProfile, setSelectedProfile] = useState(null);
  const handleGoBackToProfileSelection = () => {
    setShowRegistrationConfirmationPopUp(false);
    setShowProfileSelectionPopup(true);
  };

  {/* Cancel Handlers */}
  const handleCancelRegistration = () => {
    setShowRegistrationConfirmationPopUp(false);
    setSelectedProfile(null);
  };

  const handleCancelProfileSelection = () => {
    setShowProfileSelectionPopup(false);
  };

  return (
    <section className="invitation">
      <picture className="banner-image-open_event">
        <source srcSet={bannerEventImageAvif} type="image/avif" />
        <img src={bannerEventImagePng} alt="An image of the Devine Team sitting in Abby living room" />
      </picture>
      <div className="invitation__container">

        {/* Title */}
        <OpenInvitationTitle invitation={invitation} />

        {/* Details */}
        <OpenInvitationDetails invitation={invitation} />

        {/* Registration */}
        <RegistrationStatus
          totalSlots={totalSlots}
          filledSlots={filledSlots}
          onSignUp={handleSignUp}
          registrationFull={filledSlots >= totalSlots}
        />

        {/* Profile Selection PopUp */}
        {showProfileSelectionPopup && (
          <ProfileSelectionPopup
            onClose={handleClosePopUp}
            onCancel={handleCancelProfileSelection}
            onSelectProfile={handleProfileSelected}
            profiles={profiles}
            registeredParticipants={participants}
          />
        )}

        {/* Registration Confirmation PopUp */}
        {showRegistrationConfirmationPopUp && selectedProfile && (
          <RegistrationConfirmationPopUp
            profile={selectedProfile}
            onCancel={handleCancelRegistration}
            onClose={handleClosePopUp}
            invitationId={invitation.id}
            onGoBack={handleGoBackToProfileSelection}
          />
        )}

        <ParticipantsList participants={participants} />
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link,redirect } from "react-router";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./open-registered.css";
import "../../styles/app.css";

import InfoPopUp from "../../components/PopUp/InfoPopUp.jsx";
import WarningPopUp from "../../components/PopUp/WarningPopUp.jsx";
import ChatIntro from "../../components/ChatBox/ChatIntro.jsx";

import {
  getAllProfiles,
  getProfileById,
  getInvitationByToken,
  getParticipantsByInvitationId,
  getInvitationIdByToken,
  removeParticipant,
} from "../../services/supabase.js";

import OpenInvitationDetails from "../../components/OpenInvitation/OpenInvitationDetails.jsx";
import OpenInvitationTitle from "../../components/OpenInvitation/OpenInvitationTitle.jsx";
import OpenInvitationWelcomeMessage from "../../components/OpenInvitation/OpenInvitationWelcomeMessage.jsx";

export async function clientLoader({ params }) {
  const { openInvitationToken, profileId } = params;
  const profiles = await getAllProfiles();
  if (!openInvitationToken || !profileId) {
    throw new Response("Missing parameters", { status: 400 });
  }
  const profile = await getProfileById(profileId);
  if (!profile) {
    throw new Response("Profile not found", { status: 404 });
  }
  const invitation = await getInvitationByToken(params.openInvitationToken);
  if (!invitation || !invitation.id) {
    throw new Response("Invitation not found", { status: 404 });
  }
  const participantRows = await getParticipantsByInvitationId(invitation.id);
  const participants = participantRows.filter(
    (p) => p && typeof p.id === 'string' && p.name && p.avatar_url
  );
  return { profiles, invitation, profile, participants: participants || [] };
}

export async function clientAction({ request, params }) {
  const { profileId, openInvitationToken } = params;
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent !== "leave-event") return null;
  const invitationId = await getInvitationIdByToken(openInvitationToken);
  if (!invitationId) {
    return { error: "Invitation not found." };
  }
    try {
    await removeParticipant(profileId, invitationId);
  } catch {
    return { error: "Failed to remove participant." };
  }
  // Redirect or respond as needed
  return redirect("/open-call/get-close-to-abby/become-part-of-abby/open-invitation/goodbye");
}

export default function OpenRegistered({ loaderData }) {
  const { profile } = loaderData;
  const { invitation } = loaderData;
  const { participants } = loaderData;

  const [showInfoPopUp, setShowInfoPopUp] = useState(false);

  if (!profile || !invitation) {
    return (
      <div className="text-center p-4">
        <h2 className="text-xl font-semibold mb-2">Invitation Not Found</h2>
        <p className="mb-4 text-gray-600">
          Oops! We couldn&apos;t setup your registration. Please try again later.
        </p>
        <p className="text-sm text-gray-500">
          If you think this is a mistake, please <Link to="mailto:abby@example.com">contact Abby</Link>.
        </p>
      </div>
    );
  }

  // Little Icon click for more information

  const handleClickInfoButton = () => {
    setShowInfoPopUp(true);
  }
  const handleCloseInfoPopUp = () => {
    setShowInfoPopUp(false);
  };

  // Leave Event and Chat confirmation
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const handleLeaveClick = (e) => {
    e.preventDefault();
    setShowConfirmLeave(true);
  };

  const cancelLeave = () => {
    setShowConfirmLeave(false);
  };

  return (
    <section className="invitation">
      <div className="invitation__container">
        {/* Title */}
        <OpenInvitationTitle invitation={invitation} />

        {/* Details */}
        <OpenInvitationDetails invitation={invitation} />

        <OpenInvitationWelcomeMessage
          profile={profile}
        />
      </div>

      <div className="chat__room-wrapper">
        <section className="chat__container">
          <ChatIntro onClick={handleClickInfoButton} />
          {/* Info PopUp */}
          {showInfoPopUp && (
            <InfoPopUp onClose={handleCloseInfoPopUp} />
          )}
          {/* Event Chat */}
          <ChatBox profile={profile} invitationActivity={invitation.activity_what} invitationId={invitation.id} invitationToken={invitation.invitation_token} registeredParticipants={participants} onLeave={handleLeaveClick}/>
        </section>
      </div>


      <div>
        <section className="leave-event-section">
        <h6 className="leave-event-q">Want to leave this event?</h6>
        <p className="leave-event-q-text">If you leave this event, you won&apos;t be able to see new messages</p>
        <button
          type="button"
            className="button--secondary button--s button"
          onClick={handleLeaveClick}
        >
          Leave Event
        </button>

        {showConfirmLeave && (
          <WarningPopUp
            onCancel={cancelLeave}
            onClose={cancelLeave}
          />
        )}
        </section>


        <section className="what-abby-organises-section">
          <h6 className="what-abby-organises-section-title">Want to see what Abby organises</h6>
          <p className="what-abby-organises-section-text">Take a look at what&apos;s already planned, you might find something worth stepping into.</p>
          <Link className="button--secondary button--s button" to="https://www.abbykortrijk.be/bezoek/kalender">See Other Upcoming Events</Link>
        </section>
      </div>


    </section>
  );
}

export default function OpenInvitationTitle({ invitation }) {
  const { id } = invitation;

  return (
    <div className="invitation__title">
      <h2 className="invitation__title-text">
        {id ? `Open Event #${id}` : "Open Event"}
      </h2>
    </div>
  );
}

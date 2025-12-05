export default function OpenRegistered() {
    return (
        <div>
        <h2>Registration Successful</h2>
        <p>You have successfully registered for the open invitation.</p>
        <p>Thank you for joining us!</p>
        <button onClick={() => window.location.href = '/open-call/get-close-to-abby/become-part-of-abby/open-invitation/1'}>
            Go Back to Invitation
        </button>
        </div>
    );
}
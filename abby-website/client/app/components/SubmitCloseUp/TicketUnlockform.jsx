import { useState } from "react";


export default function TicketUnlockForm({ onSubmit, onSkip, error }) {
  const [ticketNumber, setTicketNumber] = useState("");

  const handleChange = (e) => {
    setTicketNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ticketNumber);
    setTicketNumber("");
  };

  return (
    <>
      <section className="phone-side-margin">
        <h1>Did you match your close-up?</h1>
        <p className="bodyM submitHeaderText">If you found where your image close-up belongs at Abby, you can unlock a reflection from the visitor who shared it.</p>
      </section>

      <section className="submitFormSection">
        <div className="phone-side-margin submitFromLayout">
          <p className="bodyL bold">Want to unlock the reflection?</p>
          <p className="bodyM">Look at your Close-up Ticket and write the ticket number you see at the bottom.</p>
          <form onSubmit={handleSubmit} className="getTicketForm">
            <div className="form-field">
              <label htmlFor="ticket" >Ticket Number:</label>
              <input
                type="number"
                id="ticket"
                value={ticketNumber}
                onChange={handleChange}
                min="1"
                step="1"
                placeholder="Enter number"
                required
              />
              {error && <p className="error">{error}</p>}
            </div>

            <button className="button button--m button--green spaceButton" type="submit">Unlock Reflection</button>
          </form>
        </div>
      </section>


      <section className="skipSection phone-side-margin">
        <button className="button button--m button--secondary spaceButton" type="button" onClick={onSkip}>Skip</button>
        <p>*by skipping, you won’t be able to unlock the tickets reflection, but you still will be able to upload your own close-up</p>
      </section>

    </>
  );
}



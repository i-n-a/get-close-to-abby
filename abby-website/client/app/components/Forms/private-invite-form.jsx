import { useState } from "react";
import "../../routes/become-part-of-abby/private-invitation.css";
import infoIcon from "../../assets/images/svg/material-symbols_info.svg";
// Need to save info and send it as link to share on socials!!

export default function PrivateInviteForm( {setCurrentModal}) {
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    personName: "",
    action: "",
    activity: "",
    room: "",
    date: "",
    time: "",
    signedBy: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === "time") {
      const [hour, minute] = value.split(":").map(Number);
      const totalMinutes = hour * 60 + minute;

      if (totalMinutes < 600 || totalMinutes > 1320) {
        setErrors((prev) => ({
          ...prev,
          time: "Time must be between 10:00 and 22:00.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, time: null }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (!formData[name]?.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required." }));
    }
  };

  const validate = () => {
    // this validates data if sent with missing info ; for browser who don't do it automatically; Edge-case protection
    const newErrors = {};
    if (!formData.personName.trim()) newErrors.personName = "Please enter the name.";
    if (!formData.action) newErrors.action = "Please select an action.";
    if (!formData.activity.trim()) newErrors.activity = "Please describe the activity.";
    if (!formData.room) newErrors.room = "Please select a room.";
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.time) {
      newErrors.time = "Please select a time.";
    } else {
      const [hour, minute] = formData.time.split(":").map(Number);
      const totalMinutes = hour * 60 + minute;
      if (totalMinutes < 600 || totalMinutes > 1320) {
        newErrors.time = "Time must be between 10:00 and 22:00.";
      }
    }
    if (!formData.signedBy.trim()) newErrors.signedBy = "Please sign your name.";

    return newErrors;
  };

  const handleSubmitPersonalInvite = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Encode form data
      const message = `
        Hey ${formData.personName},
        I’d love to ${formData.activity} with you in the ${formData.room} at ${formData.time} on ${formData.date}.
        Let’s meet at Abby!
        – ${formData.signedBy}
        https://www.abbykortrijk.be
        `.trim();

      // Send it to modal with WhatsApp-encoded link
      const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
      const emailLink = `mailto:?subject=Invitation to Abby&body=${encodeURIComponent(message)}`;

      //Open share modal
      setCurrentModal({ type: "share", waLink, emailLink });

      // Reset form
      setFormData({
        personName: "",
        action: "",
        activity: "",
        room: "",
        date: "",
        time: "",
        signedBy: ""
      });
      setErrors({});
    }
  };

  return (
    <form className="privateInvForm" onSubmit={handleSubmitPersonalInvite}>
      <h2>Let&#39;s Get Close at ABBY</h2>
      <p className="bodyM">Create a personal invitation to share a moment, a space and a story together.</p>

      <div className="form-field">
        <p className="bold bodyM">Dear</p>
        <label className="labelS">
          Name of the person
          <input
            type="text"
            name="personName"
            placeholder="Jane Lotrik"
            value={formData.personName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </label>
        {touched.personName && errors.personName && (
          <p className="error">{errors.personName}</p>
        )}
      </div>

      <div className="form-field">
        <p className="bold bodyM">I&#39;d love to...</p>
        <label className="labelL">
          Action:
          <select
            name="action"
            value={formData.action}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">Choose an action</option>
            <option value="Learn">Learn</option>
            <option value="Create">Create</option>
            <option value="Meet">Meet</option>
            <option value="Make">Make</option>
            <option value="Reflect">Reflect</option>
            <option value="Talk">Talk</option>
            <option value="Explore">Explore</option>
            <option value="Collaborate">Collaborate</option>
            <option value="Try">Try</option>
          </select>
        </label>
        {touched.action && errors.action && (
          <p className="error">{errors.action}</p>
        )}
        <label className="labelL labelLayout">
          <span className="labelHeader">
            <img
              className="infoIcon"
              src={infoIcon}
              alt="An info tag"
              onClick={() => setCurrentModal("ideas")}
            />
            Activity:
          </span>
          <textarea
            name="activity"
            placeholder="...how to draw flowers"
            value={formData.activity}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={350}
            rows={3}
            required
          />

          <p className="labelS">{formData.activity.length}/350 characters</p>
        </label>
        {touched.activity && errors.activity && (
          <p className="error">{errors.activity}</p>
        )}
      </div>

      <div className="form-field">
        <p className="bold bodyM">In Abby’s</p>
        <label className="labelS">
          Room
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">Select a room</option>
            <option value="Atelier">Atelier</option>
            <option value="Café">Café</option>
            <option value="Living">Living</option>
            <option value="Salon">Salon</option>
            <option value="Garden">Garden</option>
          </select>
        </label>
        {touched.room && errors.room && (
          <p className="error">{errors.room}</p>
        )}
      </div>

      <div className="form-field">
        <p className="bold bodyM">At</p>
        <label className="labelS">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </label>
        {touched.date && errors.date && (
          <p className="error">{errors.date}</p>
        )}
        <label className="labelS">
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            min="10:00"
            max="22:00"
            required
          />
        </label>
        {touched.time && errors.time && (
          <p className="error">{errors.time}</p>
        )}
      </div>

      <div className="form-field">
        <p className="bold bodyM">Signed</p>
        <label>
          Your name:
          <input
            type="text"
            name="signedBy"
            value={formData.signedBy}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={100}
            required
          />
        </label>
        {touched.signedBy && errors.signedBy && (
          <p className="error">{errors.signedBy}</p>
        )}
      </div>
      <button className="button button--blue button--m" type="submit">Share My Invitation</button>
    </form>
  )
}

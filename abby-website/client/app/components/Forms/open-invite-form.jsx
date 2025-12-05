import {useActionData, useNavigation, Form } from "react-router";
import { useState } from "react";


export default function OpenInviteForm() {
  const serverError = useActionData();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    action: "",
    activity: "",
    room: "",
    signedBy: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Live error clearing
    if (value.trim()) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    if (!formData[name]?.trim()) {
      setErrors(prev => ({ ...prev, [name]: "This field is required." }));
    }
  };

  const validate = () => {
    // this validates data if sent with missing info ; for browser who don't do it automatically; Edge-case protection
    const newErrors = {};
    if (!formData.action) newErrors.action = "Please select an action.";
    if (!formData.activity.trim()) newErrors.activity = "Please describe the activity.";
    if (!formData.room) newErrors.room = "Please select a room.";
    if (!formData.signedBy.trim()) newErrors.signedBy = "Please sign your name.";

    return newErrors;
  };

  const handleClientValidation = (e) => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      e.preventDefault();
      setErrors(validationErrors);
    }
  };

  return (
    <Form className="open-form phone-side-margin" method="post" action="." encType="multipart/form-data" onSubmit={handleClientValidation}>
      <div className="headerForm">
        <h2 className="specialFont">Let&#39;s Get Close at ABBY</h2>
        <p className="bodyM">Create an open invitation to share a moment, a space and a story together.</p>
      </div>

      {serverError?.error && <p className="error">{serverError.error}</p>}
      <div className="form-field">
        <p className="bold bodyL">I&#39;d love to...</p>
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
        <label className="labelL">
          Activity:
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
        <p className="bold bodyL">In Abby’s</p>
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
            <option value="1">Atelier</option>
            <option value="2">Café</option>
            <option value="3">Living</option>
            <option value="4">Salon</option>
            <option value="6">Garden</option>
          </select>
        </label>
        {touched.room && errors.room && (
          <p className="error">{errors.room}</p>
        )}
      </div>

      <div className="form-field">
        <p className="bold bodyL">Signed</p>
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

      <button className="button button--yellow button--m" type="submit" disabled={navigation.state === 'submitting'}>
        {navigation.state === 'submitting' ? 'Submitting...' : 'Share My Open Invitation'}
      </button>
    </Form>
  )
}

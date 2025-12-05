// To test on mobile:
// npm run dev -- --host
// put network link in phone


import { useState, useRef } from "react";
import { Form, useNavigation, redirect } from "react-router";
import TicketUnlockForm from '../../components/SubmitCloseUp/TicketUnlockform';
import ReflectionReveal from '../../components/SubmitCloseUp/ReflectionReveal';
import { getTicketById, uploadCloseUpImage,insertCloseUpTicket  } from "../../services/supabase";
import { validateCloseUpForm  } from "../../utils/helper-functions";
import "./found-it.css";

import arrowBack from "../../assets/images/svg/arrowleft.svg";

export async function clientAction({ request }) {
  console.log("in client action")
  const formData = await request.formData();
  const room = parseInt(formData.get("room"), 10);
  const message = formData.get("message");
  const file = formData.get("image");

  const errors = validateCloseUpForm({ room, message, file });
  if (Object.values(errors).some(Boolean)) {
    return { error: Object.values(errors).join(" ") };
  }

  try {
    const imageUrl = await uploadCloseUpImage({file, room});
    await insertCloseUpTicket({
      room,
      message,
      imageUrl,
    });
    return redirect("/open-call/get-close-to-abby/become-part-of-abby/submit-confirmed");
  } catch (error) {
    console.error("Submission error:", error.message);
    return { error: error.message };
  }
}


export default function GetCloseUpInfo() {
  const [step, setStep] = useState(1);
  const [reflectionData, setReflectionData] = useState(null);
  const [errorGetTicket, setErrorGetTicket] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageReady, setIsImageReady] = useState(false);

  const navigation = useNavigation();
  const imageInputRef = useRef(null);

  const [formData, setFormData] = useState({ room: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Get ticket info
  const handleSubmitGetCloseUp = async (ticketNum) => {
    setErrorGetTicket(null);
    const ticketId = Number(ticketNum);

    if (isNaN(ticketId)) {
      setErrorGetTicket("Invalid ticket number.");
      return;
    }

    const { data, error: fetchError } = await getTicketById(ticketId);

    if (fetchError || !data) {
      setErrorGetTicket("Ticket not found. Please check the number and try again.");
      return;
    }

    setReflectionData(data);
    setStep(2);
  };

  const handleCapture = (e) => {
    const file = e.target.files[0];
    const newErrors = validateCloseUpForm({ ...formData, file });

    if (newErrors.image) {
      setErrors(prev => ({ ...prev, image: newErrors.image }));
      alert(newErrors.image);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const TARGET_WIDTH = 263;
        const TARGET_HEIGHT = 208;
        const TARGET_ASPECT = TARGET_WIDTH / TARGET_HEIGHT;

        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgAspect = imgWidth / imgHeight;

        let cropWidth, cropHeight, cropX, cropY;

        if (imgAspect > TARGET_ASPECT) {
          cropHeight = imgHeight;
          cropWidth = imgHeight * TARGET_ASPECT;
          cropX = (imgWidth - cropWidth) / 2;
          cropY = 0;
        } else {
          cropWidth = imgWidth;
          cropHeight = imgWidth / TARGET_ASPECT;
          cropX = 0;
          cropY = (imgHeight - cropHeight) / 2;
        }

        const canvas = document.createElement("canvas");
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);

        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], "closeup.jpg", { type: "image/jpeg" });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(croppedFile);
          if (imageInputRef.current) {
            imageInputRef.current.files = dataTransfer.files;
          }
          setPreview(canvas.toDataURL("image/jpeg", 0.8));
          setIsImageReady(true);
        }, "image/jpeg", 0.8);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const fieldError = validateCloseUpForm({ ...formData, file: imageInputRef.current?.files[0] })[name];
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  return (
    <>
      {step === 1 && (
        <>
          <TicketUnlockForm onSubmit={handleSubmitGetCloseUp}  onSkip={() => setStep(3)} error={errorGetTicket} />
        </>
      )}

      {step === 2 && (
        <>
          <button className="backButton phone-side-margin" onClick={() => setStep(1)}>
            <img
              className="arrowBack"
              src={arrowBack}
              alt="arrow backwards"
            />
            Back
          </button>
          <ReflectionReveal
            data={reflectionData}
            onNext={() => setStep(3)}
          />
        </>
      )}

      {step === 3 && (
        <>
          <button className="backButton phone-side-margin" onClick={() => {
              if (!reflectionData) {
                setStep(1);
              } else {
                setStep(2);
              }
            }}>
            <img
              className="arrowBack"
              src={arrowBack}
              alt="arrow backwards"
            />
            Back
          </button>
          <section className="createCloseUpHeader phone-side-margin">
            <h1>Submit your close-up</h1>
            <p className="bodyM">
              We encourage you to reflect on what you saw or experienced in the Stadsliving
              spaces of Abby.
            </p>
            <p className="bodyM">
              Take a close-up of something you liked most or what surprised you in the open
              spaces, and share your perspective with others by uploading it!
            </p>
          </section>

          <section className="createCloseUpFormSection ">
          <Form
              className="closeup-form phone-side-margin"
              method="post"
              encType="multipart/form-data"
              onSubmit={(e) => {
                const file = imageInputRef.current?.files[0];
                const validationErrors = validateCloseUpForm({
                  room: parseInt(formData.room, 10),
                  message: formData.message,
                  file,
                });

                const hasErrors = Object.values(validationErrors).some(Boolean);
                if (!isImageReady || hasErrors) {
                  e.preventDefault();
                  setErrors(validationErrors);
                }
              }}
            >
              <div className="form-field">
                <label className="bold" htmlFor="room">Close-up taken in Abby&#39;s</label>
                <select id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                onBlur={handleBlur}
                required>
                  <option value="">Select a room</option>
                  <option value="1">Atelier</option>
                  <option value="2">Café</option>
                  <option value="3">Living</option>
                  <option value="4">Salon</option>
                  <option value="6">Garden</option>
                </select>
                {touched.room && errors.room && <p className="error">{errors.room}</p>}
              </div>

              <div className="form-field">
                <label className="bold" htmlFor="message">Your reflection or message</label>
                <p className="LabelL fakeLabel">What caught your eye about this detail? <br />
                    How did it make you feel? <br />
                    What does it remind you of?
                </p>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What did this detail make you feel or think about?"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows="4"
                  cols="50"
                  maxLength={200}
                />
                <p className="labelS fakeLabel">{formData.message.length}/200 characters</p>
                {touched.message && errors.message && <p className="error">{errors.message}</p>}
              </div>

              <div className="form-field">
                <label className="bold" htmlFor="image">Take your Close-up image</label>
                <p className="labelS fakeLabel">50MB Max</p>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  id="image"
                  ref={imageInputRef}
                  name="image"
                  onChange={handleCapture}
                  required
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="preview"
                  />
                )}
                {touched.image && errors.image && <p className="error">{errors.image}</p>}
              </div>

              <button className="button button--m button--green spaceButton" type="submit" disabled={navigation.state === 'submitting'}>
                {navigation.state === 'submitting' ? 'Submitting...' : 'Submit My Close-Up'}
              </button>
            </Form>
          </section>
        </>
      )}
    </>
  );
}

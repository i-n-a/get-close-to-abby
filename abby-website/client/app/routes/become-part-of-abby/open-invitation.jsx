import { useSearchParams, redirect, Link} from "react-router";
import OpenInviteForm from '../../components/Forms/open-invite-form.jsx';
import ConfirmationModal from "../../components/PopUp/signUpOrSubmit";
import { insertOpenInvitation } from "../../services/supabase";
import "./open-invitation.css";

import headerImgA from "../../assets/images/awif/open-invitation-filled-pencil.avif";
import headerImgPng from "../../assets/images/png/open-invitation-filled-pencil.png";
import ticketHangA from "../../assets/images/awif/tickets-hanging2.avif";
import ticketHangPng from "../../assets/images/png/tickets-hanging2.png";
import peopleCutoutA from "../../assets/images/awif/aPeopleCutout.avif";
import peopleCutouPng from "../../assets/images/png/aPeopleCutout.png";
import downarrowA from "../../assets/images/awif/3downarrow.avif";
import downarrowPng from "../../assets/images/png/3downarrow.png";


export async function clientAction({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");
  const roomRaw = formData.get("room");
  const activity = formData.get("activity");
  const room = Number(formData.get("room"));
  const signedBy = formData.get("signedBy");

  console.log({ action, activity, roomRaw, room, signedBy });

  if (!action || !activity || !room || !signedBy) {
    return { error: "All fields are required." };
  }

  try {
    await insertOpenInvitation({ action, activity, room, signedBy });
    return redirect("/open-call/get-close-to-abby/become-part-of-abby/open-invitation?showModal=1");
  } catch (error) {
    console.error("Supabase error:", error.message);
    return { error: error.message };
  }
}

export default function privateInvitation() {
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get('showModal') === '1';

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Open Calls</Link></li>
          <li><Link to="/open-call/get-close-to-abby">Get Close to Abby</Link></li>
          <li><Link to="/open-call/get-close-to-abby/become-part-of-abby">Becoming part of Abby</Link></li>
          <li aria-current="page"><span>Send an open invitation</span></li>
        </ol>
      </nav>
      <section className="o-iHeader phone-side-margin ">
        <h1>Submit an <em className="blue-font">Open Invitation</em></h1>
        <p className="bodyM bold">What&#39;s an Open Invitation?</p>
        <p className="bodyM maxLength">Share an idea for something you&#39;d like to do in Abby&#39;s open spaces, big or small. It&#39;s your way to start something, and see who&#39;s ready to join in.</p>
        <picture>
          <source srcSet={headerImgA} type="image/avif" />
          <img src={headerImgPng} alt="An image of an open invitation filled up with a pen" />
        </picture>
      </section>

      <section className="stepsSection">
        <h2 className="phone-side-margin ">How to Submit <br /> your Open Invitation</h2>

        <div className="o-iStep o-iStep1 blueStep">
          <div   className="arrow-background">
            <picture className="downArrow imageDesktop">
              <source srcSet={downarrowA} type="image/avif"/>
              <img src={downarrowPng} alt="three arrows pointing down" />
            </picture>
          </div>
          <p className="numberOrange">1</p>
          <div className="o-iStep-info">
            <p className="bodyL">Fill out the form</p>
            <p className="bodyM">You can find the form to create <br /> your open invitation down below.</p>
          </div>
        </div>
        <div className="o-iStep o-iStep2">
          <p className="numberOrange">2</p>
          <div className="o-iStep-info">
            <p className="bodyL">We&#39;ll print the form and hang it in the Invitation Chandelier at the Salon.</p>
            <p className="bodyM">Not sure where to find the Salon?</p>
            <Link to="#" className="button button--m button--yellow">
              Explore the Stadsliving
            </Link>
          </div>
        </div>
        <div className="o-iStep o-iStep3">
          <p className="numberOrange">3</p>
          <div className="o-iStep-info">
            <p className="bodyL">Other visitors can scan the QR code to sign up and join the chat with you and others who are interested.</p>
            <p className="bodyM">Visit Abby to see your Open Invitation hanged up on the Invitation Chandelier, or come to check out the other ones. </p>
          </div>
        </div>
        <picture className="imageDesktop o-iStepPic">
          <source srcSet={ticketHangA} type="image/avif" />
          <img src={ticketHangPng} alt="An image of an open invitation filled up with a pen" />
        </picture>
      </section>

      <section className="banner-wrapper">
        <div className="banner-section">
          <div className="banner-text o-iBanner">
              <p>Open Invitation</p> <p>Open Invitation</p> <p>Open Invitation</p> <p>Open Invitation</p>{" "}
              <p>Open Invitation</p> <p>Open Invitation</p> <p>Open Invitation</p> <p>Open Invitation</p>{" "}
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
              <p>Open Invitation</p>
          </div>
        </div>
      </section>
      <section className="o-iForm">
        <OpenInviteForm/>
        <picture className="imageDesktop">
          <source srcSet={peopleCutoutA} type="image/avif" />
          <img src={peopleCutouPng} alt="An image of two firls laughing" />
        </picture>
        {showModal && <ConfirmationModal />}
      </section>
    </>
  );
}

import { useNavigate, Link} from "react-router";
import mockupTicket from "../../assets/images/png/mockup-ticket.png";
import "./signUpOrSubmit.css";

export default function SignUpOrSubmit(){
  const navigate = useNavigate();
  return(
    <dialog open className="modal modalSignUpOrSubmit">

      <section className="modalSignUpMain">
        <div className="modalImgBg show-on-desktop">
          <source srcSet={mockupTicket} type="image/png"/>
          <img
            src={mockupTicket}
            alt="Mockup of open call ticket hanging"
            className="imgModalSignUp"
          />
        </div>

        <article className="signUpModalInfo">
          <div className="closeSignUp">
            <button className="button-close-modal" aria-label="Close dialog" onClick={() => { navigate("/open-call/get-close-to-abby/become-part-of-abby/open-invitation");}}> ✕ </button>
          </div>

          <div className="flexText">
            <div className="signUpModalText">
              <h5 className="paddingBottom">Want to bring your idea to life?</h5>
              <p className="bold bodyM">If you&#39;re serious about making this happen, you can sign up so you can:</p>
              <ul className="ulMargin">
                <li >Sign up to your event</li>
                <li>Chat with others who show interest</li>
                <li>Be notified of who is interested if you want to</li>
              </ul>
              <p className="labelS">I already have a profile</p>
              <div className="buttonSpace">
                <Link
                  className="button--yellow button--s"
                  to="/open-call/get-close-to-abby/become-part-of-abby/open-invitation/confirmation"
                  state={{ type: "signedUp" }}
                >
                  Sign me up!
                </Link>
                <Link
                  className=" button--secondary button--s"
                  to="/open-call/get-close-to-abby/become-part-of-abby/open-invitation/confirmation"
                  state={{ type: "justSubmitted" }}
                >
                  Just submit my idea
                </Link>
              </div>
            </div>

            <div className="noteModal">
              <p>Take this small step to help your open invitation grow into something real, together with others.</p>
            </div>
          </div>
        </article>
      </section>
    </dialog>
  )
}

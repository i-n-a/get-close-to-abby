import infoIcon from "../../assets/images/svg/icon_info.svg";
import "../../routes/answer-open/open-registered.css";
import "../../styles/app.css";

export default function ChatHeader({ onClick }) {
   return (
     <header>
       <div className="chat-intro-wrapper-q side-margins">
         <p className="chat-intro-wrapper-q-p">Want to chat with others?</p>
         <button onClick={onClick} type="button">
           <img src={infoIcon} alt="Info Icon" />
         </button>
       </div>
       <p className="chat-intro-wrapper-q-pp side-margins">You can chat here with the other people who are signed up to this event. Get organised, inspired or creative!</p>
     </header>
   );
}

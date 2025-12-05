import PopUpCloseButton from "./PopUpCloseButton";
import { Form} from "react-router";
import "./WarningPopUp.css";

export const WarningPopUp = ({ onCancel, onClose }) => {
      return (
        <div className="warning-surrounding fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="warning-backround">
            <PopUpCloseButton onClose={onClose} />
            <div className="warning-main-div flex flex-column">
              <h6 className="warning-title text-xl font-bold mb-4">Confirm Leave</h6>
            </div>

            <p className="mb-6 warning-text-one">
              Are you sure you want to leave this event? You won&apos;t be able to see new messages and your registration will be undone.
            </p>
            <div className="warning-form flex justify-center gap-4">
              <Form method="post">
                <input type="hidden" name="intent" value="leave-event" />
                <input type="hidden" name="action" value="unregister" />
                <button
                  type="submit"
                  className="warning-buton-1 warning-buton button button--s"
                >
                  Yes, I&apos;m sure
                </button>
              </Form>
              <button
                className="warning-buton-2 warning-buton button button--s"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
}

export default WarningPopUp;

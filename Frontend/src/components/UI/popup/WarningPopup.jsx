import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./WarningPopup.module.scss";

const WarningPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup-container"]}>
        <div className={styles["icon-container"]}>
          <AiOutlineExclamationCircle size={40} />
        </div>
        <p className="text-center mt-4 text-gray-700 font-medium">
          Are You Sure You Want To End This Interview?
        </p>
        <p className="text-center text-gray-500 text-sm">
          You Will Lose Your Progress
        </p>
        <div className={styles["button-group"]}>
          <button className={styles["cancel-button"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["end-button"]} onClick={onConfirm}>
            End
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;

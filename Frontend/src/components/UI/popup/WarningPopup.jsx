import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./WarningPopup.module.scss";
import { Link } from "react-router-dom";

const WarningPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  sub_title,
  btn,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles["popup-overlay"]}>
      <div className={styles["popup-container"]}>
        <div className={styles["icon-container"]}>
          <AiOutlineExclamationCircle size={40} />
        </div>
        <p className="text-center mt-4 text-gray-700 font-medium">{title}</p>
        {sub_title && (
          <p className="text-center text-gray-500 text-sm">{sub_title}</p>
        )}
        <div className={styles["button-group"]}>
          <button className={styles["cancel-button"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["end-button"]} onClick={onConfirm}>
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningPopup;

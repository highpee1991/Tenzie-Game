import React from "react";

const Modal = ({ gameStart }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Oopss!! you lost</h4>
        </div>
        <div className="modal-footer">
          <button className="btns" onClick={gameStart}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useState, useEffect, useRef } from "react";

const Timeleft = ({ min, setMin, sec, setSec, zeroNum, clear }) => {
  useEffect(() => {
    zeroNum.current = window.setInterval(() => {
      if (sec === 0 && min === 0) {
        clear();
      } else if (sec === 59) {
        setSec((prev) => Math.max(prev - 1, 0));
      } else if (sec === 0) {
        setSec((prv) => (prv = 59));
        setMin((prev) => Math.max(prev - 1, 0));
      } else {
        setSec(sec - 1);
      }
    }, 1000);

    return () => clear();
  }, [sec]);

  // useEffect(() => {
  //   if (sec === 0 && min === 0) {
  //     clear();
  //   }
  // }, [sec, min]);

  const mainTimer = `${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;

  return (
    <div>
      <div>Time</div>
      <div> Left</div>
      <div className={min === 0 && sec > 10 ? "time-tic" : "tic-color"}>
        {/* {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec} */}
        {sec < 2 && min === 0 ? "00:00" : mainTimer}
      </div>
    </div>
  );
};

export default Timeleft;

import React, { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      //   setSeconds((prevSec) => Number(prevSec) + 1);
      setSeconds((prevSec) => {
        return prevSec < 9 ? "0" + (Number(prevSec) + 1) : Number(prevSec) + 1;
      });
      if (seconds === 59) {
        setMinutes((prevMinutes) => {
          return prevMinutes < 9
            ? "0" + (Number(prevMinutes) + 1)
            : Number(prevMinutes) + 1;
        });
        setSeconds("00");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

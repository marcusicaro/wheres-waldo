import React, { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSec) => Number(prevSec) + 1);
      if (seconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div>
      {minutes}:{seconds}
      {/* {() => (minutes < 10 ? "0" + minutes : minutes)}:
      {() => (seconds < 10 ? "0" + seconds : seconds)} */}
    </div>
  );
}

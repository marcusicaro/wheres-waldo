import React, { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setSeconds((prevSec) => Number(prevSec) + 1);
    }, 1000);
  }, []);

  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

import React, { useEffect, useState } from "react";

export default function Timer(props) {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (props.score !== 3) {
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
    return () => clearTimeout(timer) } if(props.score === 3) {
      const name = prompt('Please insert name')
      props.handleEndGame(name, minutes, seconds);
    } 
  }, [seconds]);



  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

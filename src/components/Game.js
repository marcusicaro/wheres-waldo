import React, { useState } from "react";
import "../Assets/styles/Game.css";

export default function Game() {
  const [position, setPosition] = useState({ x: "", y: "" });

  function handleMouseClick(e) {
    let X = e.pageX;
    let Y = e.pageY;
    setPosition({ x: X, y: Y });
  }
  return (
    <div>
      <h1>
        Mouse coordinates: {position.x} {position.y}
      </h1>
      <img
        src={require("../Assets/Images/egor-klyuchnyk-full-x-season-web.jpg")}
        alt='background with sci-fi characters'
        className='background'
        onClick={(e) => {
          handleMouseClick(e);
        }}
      />
    </div>
  );
}

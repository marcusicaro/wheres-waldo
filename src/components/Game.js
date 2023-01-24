import React, { useRef, useState, useEffect } from "react";
import getLocationData from "./data/getLocationData";
import styled from "styled-components";

import "../Assets/styles/Game.css";

const Menu = styled.h1`
  background: white;
  width: 200px;
  height: 250px;
  z-index: 999;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const ListItem = styled.li`
  list-style: none;
`;

export default function Game() {
  const [position, setPosition] = useState({ x: "", y: "" });
  const [positions, setPositions] = useState({});
  const [menuPosition, setMenuPosition] = useState({ top: "", left: "" });
  const [score, setScore] = useState(0);

  const imageRef = useRef();

  useEffect(() => {
    getLocationData().then((result) => setPositions(result));
  }, []);

  function handleGetPosition(e) {
    let X = e.pageX;
    let Y = e.pageY;
    const width = imageRef.current.offsetWidth;
    const height = imageRef.current.offsetHeight;

    let xPosition = ((X / width) * 100).toFixed(2);
    let yPosition = (((Y - 50) / height) * 100).toFixed(2);
    let newPosition = { x: xPosition, y: yPosition };
    console.log(newPosition);
    setPosition(newPosition);
  }

  function handleOpenMenu(e) {
    let currentTop = `${e.pageY - 50}px`;
    let currentLeft = `${e.pageX}px`;
    setMenuPosition({ top: currentTop, left: currentLeft });
  }

  function handlePlayerSelection(name) {
    function increaseScore() {
      let newScore = Number(score) + 1;
      setScore(newScore);
    }

    positions.forEach((el) => {
      if (el.name === name) {
        position.x >= 1 &&
          position.x <= 5 &&
          position.y >= 1 &&
          position.y <= 5 &&
          increaseScore();
      }
    });
  }

  function handleMouseClick(e) {
    handlePosition(e);
    handlePlayerSelection("vash");

    // handleGetPosition(e);
    // handleOpenMenu(e);
    // handlePlayerSelection(e, "vash");
  }

  function handlePosition(e) {
    let X = e.pageX;
    let Y = e.pageY;
    const width = imageRef.current.offsetWidth;
    const height = imageRef.current.offsetHeight;

    let xPosition = ((X / width) * 100).toFixed(2);
    let yPosition = (((Y - 50) / height) * 100).toFixed(2);
    let newPosition = { x: xPosition, y: yPosition };

    setPosition(newPosition);
  }

  return (
    <div className='background-container'>
      {/* <Menu top={menuPosition.top} left={menuPosition.left}>
        <ul>
          <ListItem onClick={(e) => handlePlayerSelection(e, "catbus")}>
            Catbus
          </ListItem>
          <ListItem onClick={(e) => handlePlayerSelection(e, "makoto")}>
            Makoto
          </ListItem>
          <ListItem onClick={(e) => handlePlayerSelection(e, "vash")}>
            Vash
          </ListItem>
        </ul>
      </Menu> */}
      <>
        {position.x} e {position.y}
      </>
      <br />
      <>{score}</>
      <img
        src={require("../Assets/Images/egor-klyuchnyk-full-x-season-web.jpg")}
        alt='background with sci-fi characters'
        className='background'
        onClick={(e) => {
          handleMouseClick(e);
        }}
        ref={imageRef}
      />
    </div>
  );
}

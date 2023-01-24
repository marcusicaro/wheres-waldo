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
  const [score, setScore] = useState("");

  const imageRef = useRef();

  useEffect(() => {
    let a = getLocationData().then((result) => setPositions(result));
  }, []);

  function handleGetPosition(e) {
    // setPosition({ x: xPosition, y: yPosition });
  }

  function handleOpenMenu(e) {
    let currentTop = `${e.pageY - 50}px`;
    let currentLeft = `${e.pageX}px`;
    setMenuPosition({ top: currentTop, left: currentLeft });
  }

  function handleCompareValues(e, name) {
    let X = e.pageX;
    let Y = e.pageY;
    const width = imageRef.current.offsetWidth;
    const height = imageRef.current.offsetHeight;

    let xPosition = ((X / width) * 100).toFixed(2);
    let yPosition = (((Y - 50) / height) * 100).toFixed(2);

    positions.forEach((el) => {
      if (el.name === name) {
        xPosition >= el.xMin &&
          xPosition <= el.xMax &&
          yPosition >= el.yMin &&
          yPosition <= el.yMax &&
          setScore(score + 1);
      }
    });
  }

  function handleMouseClick(e) {
    handleGetPosition(e);
    handleOpenMenu(e);
    handleCompareValues(e, "vash");
  }

  return (
    <div className='background-container'>
      <Menu top={menuPosition.top} left={menuPosition.left}>
        <ul>
          <ListItem onClick={(e) => handleCompareValues(e, "catbus")}>
            Catbus
          </ListItem>
          <ListItem onClick={(e) => handleCompareValues(e, "makoto")}>
            Makoto
          </ListItem>
          <ListItem onClick={(e) => handleCompareValues(e, "vash")}>
            Vash
          </ListItem>
        </ul>
      </Menu>
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

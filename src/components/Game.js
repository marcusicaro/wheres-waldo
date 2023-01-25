import React, { useRef, useState, useEffect } from "react";
import getLocationData from "./data/getLocationData";
import styled from "styled-components";

import "../Assets/styles/Game.css";

const BackgroundContainer = styled.div`
  position: relative;
`;

const Menu = styled.h1`
  background-color: rgba(255, 255, 255, 0.5);
  width: 200px;
  height: 250px;
  z-index: 999;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  display: ${(props) => props.display};
`;

const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  opacity: 1;
`;

const Marker = styled.p`
  z-index: 9;
  background: none;
  color: red;
  font-size: 200px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

export default function Game() {
  const [position, setPosition] = useState({ x: "", y: "" });
  const [positions, setPositions] = useState({});
  const [menuPosition, setMenuPosition] = useState({ top: "", left: "" });
  const [score, setScore] = useState(0);
  const [display, setDisplay] = useState("block");
  const [markers, setMarkers] = useState([]);

  const imageRef = useRef();

  useEffect(() => {
    getLocationData().then((result) => setPositions(result));
  }, []);

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

    // function addMarker() {
    //   return;
    // }

    positions.forEach((el) => {
      if (el.name === name) {
        position.x >= el.xMin &&
          position.x <= el.xMax &&
          position.y >= el.yMin &&
          position.y <= el.yMax &&
          increaseScore();
      }
    });
  }

  function handleCancel() {
    display === "block" ? setDisplay("none") : setDisplay("block");
  }

  function handleMouseClick(e) {
    handlePosition(e);
    handleOpenMenu(e);
    display === "none" && setDisplay("block");
  }

  return (
    <BackgroundContainer>
      <Menu top={menuPosition.top} left={menuPosition.left} display={display}>
        <ul>
          <ListItem onClick={() => handlePlayerSelection("catbus")}>
            Catbus
          </ListItem>
          <ListItem onClick={() => handlePlayerSelection("makoto")}>
            Makoto
          </ListItem>
          <ListItem onClick={() => handlePlayerSelection("vash")}>
            Vash
          </ListItem>
          <ListItem onClick={() => handleCancel()}>Cancel</ListItem>
        </ul>
        <>Score: {score}</>
        <br />
        <>
          {position.x} e {position.y}
        </>
      </Menu>

      <br />
      <>{score}</>
      <Marker top={`${position.y}%`} left={`${position.x}%`}>
        X
      </Marker>
      <img
        src={require("../Assets/Images/egor-klyuchnyk-full-x-season-web.jpg")}
        alt='background with sci-fi characters'
        className='background'
        onClick={(e) => {
          handleMouseClick(e);
        }}
        ref={imageRef}
      />
    </BackgroundContainer>
  );
}

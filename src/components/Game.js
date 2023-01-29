import React, { useRef, useState, useEffect } from "react";
import getLocationData from "./data/getLocationData";
import styled from "styled-components";
import { db } from "./firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import "../Assets/styles/Game.css";
import Menu from "./Menu";
import Header from "./Header";
import Leaderboard from "./Leaderboard";

const BackgroundContainer = styled.div`
  position: relative;
`;

const Marker = styled.p`
  z-index: 9;
  background: none;
  color: red;
  font-size: 75px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  display: ${(props) => props.display};
`;

export default function Game() {
  const [position, setPosition] = useState({ x: "", y: "" });
  const [positions, setPositions] = useState({});
  const [menuPosition, setMenuPosition] = useState({ top: "", left: "" });
  const [score, setScore] = useState(0);
  const [time, setTime] = useState("");
  const [display, setDisplay] = useState("none");
  const [markers, setMarkers] = useState([
    { name: "catbus", x: "", y: "", display: "none" },
    { name: "makoto", x: "", y: "", display: "none" },
    { name: "vash", x: "", y: "", display: "none" },
  ]);

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
      newScore === 3 && alert("Game over you won");
      setScore(newScore);
    }
    function addMarker() {
      let markersCopy = [...markers];
      markersCopy.forEach((el) => {
        if (el.name === name) {
          console.log(position.x);
          el.x = position.x - 3.2;
          el.y = position.y - 1;
          el.display = "block";
        }
      });
      setMarkers(markersCopy);
    }

    function addMarkerAndIncreaseScore() {
      addMarker();
      increaseScore();
    }

    positions.forEach((el) => {
      if (el.name === name) {
        position.x >= el.xMin &&
          position.x <= el.xMax &&
          position.y >= el.yMin &&
          position.y <= el.yMax &&
          addMarkerAndIncreaseScore();
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

  function handleEndGame(name, minutes, seconds) {
    const result = {
      name: name,
      time: `${minutes}:${seconds}`,
      score: `${minutes}${seconds}`,
    };
    setTime(result);
    console.log(result);
    setDoc(doc(db, "leaderboard", name), result);
  }

  return (
    <>
      <Leaderboard />
      <Header setTime={setTime} score={score} handleEndGame={handleEndGame} />
      <BackgroundContainer>
        <Menu
          menuPosition={menuPosition}
          display={display}
          handlePlayerSelection={handlePlayerSelection}
          handleCancel={handleCancel}
          score={score}
          position={position}
        />

        <br />
        <>{score}</>
        <Marker
          top={`${markers[0].y}%`}
          left={`${markers[0].x}%`}
          display={markers[0].display}
        >
          X
        </Marker>
        <Marker
          top={`${markers[1].y}%`}
          left={`${markers[1].x}%`}
          display={markers[1].display}
        >
          X
        </Marker>
        <Marker
          top={`${markers[2].y}%`}
          left={`${markers[2].x}%`}
          display={markers[2].display}
        >
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
    </>
  );
}

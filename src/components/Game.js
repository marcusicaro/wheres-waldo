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
  const [display, setDisplay] = useState("none");
  const [displayLeaderboard, setDisplayLeaderboard] = useState("none");
  const [markers, setMarkers] = useState([
    {
      name: "catbus",
      x: 14,
      y: 77,
      display: "none",
      displayName: "Catbus",
    },
    {
      name: "makoto",
      x: 57,
      y: 57.5,
      display: "none",
      displayName: "Makoto",
    },
    {
      name: "vash",
      x: 1.5,
      y: 93.5,
      display: "none",
      displayName: "Vash",
    },
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
    let currentTop = `${e.pageY}px`;
    let currentLeft = `${e.pageX}px`;
    setMenuPosition({ top: currentTop, left: currentLeft });
  }

  function handlePlayerSelection(name) {
    function increaseScore() {
      let newScore = Number(score) + 1;
      setScore(newScore);
    }
    function addMarker() {
      let markersCopy = [...markers];
      markersCopy.forEach((el) => {
        if (el.name === name) {
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

  function handleMarkersRender() {
    const render = markers.map((el, index) => (
      <Marker
        top={`${markers[index].y}%`}
        left={`${markers[index].x}%`}
        display={markers[index].display}
      >
        X
      </Marker>
    ));

    return render;
  }

  function handleEndGame(name, minutes, seconds) {
    const result = {
      name: name,
      time: `${minutes}:${seconds}`,
      score: `${minutes}${seconds}`,
    };
    setDoc(doc(db, "leaderboard", name), result);
    setDisplayLeaderboard("flex");
  }

  return (
    <>
      <Leaderboard displayLeaderboard={displayLeaderboard} />
      <Header score={score} handleEndGame={handleEndGame} />
      <BackgroundContainer>
        <Menu
          menuPosition={menuPosition}
          display={display}
          handlePlayerSelection={handlePlayerSelection}
          handleCancel={handleCancel}
          score={score}
          position={position}
          markers={markers}
        />

        <br />
        {handleMarkersRender()}
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

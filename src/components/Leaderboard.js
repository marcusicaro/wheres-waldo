import React, { useRef, useState, useEffect } from "react";
import getLeaderboardData from "./data/getLeaderboardData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import styled from "styled-components";

const LeaderboardContainer = styled.ol`
  z-index: 999;
  width: 250px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 35%;
  transform: translateX(-50%);
  background: white;
  list-style-position: inside;
  text-align: center;
`;

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboardData().then((result) => setLeaderboard(result));
  }, []);

  function handleListRender() {
    const orderedLeaderboard = leaderboard.sort((a, b) => {
      return a.score - b.score;
    });
    const table = orderedLeaderboard.map((el) => (
      <li key={el.name}>
        <>{el.name}</>: <>{el.score}</>
      </li>
    ));
    return table;
  }

  return <LeaderboardContainer>{handleListRender()}</LeaderboardContainer>;
}

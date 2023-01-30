import React, { useRef, useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
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
  display: ${(props) => props.display};
  flex-direction: column;
  justify-content: space-around;
`;

export default function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "leaderboard"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let scoresArr = [];
      querySnapshot.forEach((doc) => {
        scoresArr.push({ ...doc.data(), id: doc.id });
      });
      scoresArr.length > 10 && scoresArr.pop();
      setLeaderboard(scoresArr);
    });
    return () => unsubscribe();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  function handleListRender() {
    const orderedLeaderboard = leaderboard.sort((a, b) => {
      return a.score - b.score;
    });
    orderedLeaderboard.length > 9 && orderedLeaderboard.shift();
    const table = orderedLeaderboard.map((el) => (
      <li key={el.name}>
        <>{el.name}</>: <>{el.time}</>
      </li>
    ));
    return table;
  }

  return (
    <LeaderboardContainer display={props.displayLeaderboard}>
      {handleListRender()}
      <div
        onClick={refreshPage}
        style={{ color: "red", fontWeight: "25px", cursor: "pointer" }}
      >
        Retry
      </div>
    </LeaderboardContainer>
  );
}

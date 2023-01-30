import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "../Assets/styles/Header.css";
import Timer from "./Timer";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  z-index: 999999;
  background-color: white;
`;

export default function Header(props) {
  return (
    <HeaderContainer>
      <p>
        <Link to='/'>Home</Link>
      </p>
      <h1>Header</h1>
      <Timer
        setTime={props.setTime}
        score={props.score}
        handleEndGame={props.handleEndGame}
      />
    </HeaderContainer>
  );
}

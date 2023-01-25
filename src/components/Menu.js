import React from "react";
import styled from "styled-components";

const Container = styled.h1`
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

export default function Menu(props) {
  return (
    <Container
      top={props.menuPosition.top}
      left={props.menuPosition.left}
      display={props.display}
    >
      <ul>
        <ListItem onClick={() => props.handlePlayerSelection("catbus")}>
          Catbus
        </ListItem>
        <ListItem onClick={() => props.handlePlayerSelection("makoto")}>
          Makoto
        </ListItem>
        <ListItem onClick={() => props.handlePlayerSelection("vash")}>
          Vash
        </ListItem>
        {/* <ListItem onClick={() => props.handleCancel()}>Cancel</ListItem> */}
      </ul>
      <>Score: {props.score}</>
      <br />
      <>
        {props.position.x} e {props.position.y}
      </>
    </Container>
  );
}

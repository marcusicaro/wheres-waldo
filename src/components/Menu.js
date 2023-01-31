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

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  height: 250px;
`;

const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  opacity: 1;
  text-align: center;
`;

export default function Menu(props) {
  function handleMenuRender() {
    const render = props.markers.map(
      (el) =>
        el.display === "none" && (
          <ListItem onClick={() => props.handlePlayerSelection(el.name)}>
            {el.displayName}
          </ListItem>
        )
    );
    return render;
  }

  return (
    <Container
      top={props.menuPosition.top}
      left={props.menuPosition.left}
      display={props.display}
    >
      <ListContainer>
        {handleMenuRender()}
        <ListItem style={{ color: "red" }} onClick={() => props.handleCancel()}>
          Cancel
        </ListItem>
      </ListContainer>
    </Container>
  );
}

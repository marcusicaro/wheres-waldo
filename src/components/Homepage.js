import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Background = styled.div`
  background: grey;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background: white;
  width: 250px;
  height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Image = styled.img`
  height: 50px;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

export default function Homepage() {
  return (
    <Background>
      <Container>
        <h3>Characters</h3>
        <InfoContainer>
          <Image src={require("../Assets/Images/makoto.png")} />
          <p>Makoto</p>
        </InfoContainer>
        <InfoContainer>
          <Image src={require("../Assets/Images/vash.png")} />
          <p>Vash, the Stampede</p>
        </InfoContainer>
        <InfoContainer>
          <Image src={require("../Assets/Images/catbus.png")} />
          <p>Catbus</p>
        </InfoContainer>

        <br />
        <Link to='/game'>Play</Link>
      </Container>
    </Background>
  );
}

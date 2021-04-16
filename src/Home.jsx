import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "./Context";
import { useEffect } from "react";
import Infodivtog from "./layouts/Infodivtog";
import Inforoutediv from "./layouts/Inforoutediv";
import Infofoot from "./layouts/Infofoot";
import Messages from "./layouts/Messages";
import { Switch, Route, Link } from "react-router-dom";
const Infodiv = styled.div`
  width: 30%;
  height: 100%;
  float: left;

  background-color: black;
  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    transition: 1s;
    z-index: 10;
  } ;
`;

const Messagesdiv = styled.div`
  width: 70%;
  height: 100vh;
  float: left;

  @media (max-width: 768px) {
    width: 100%;
    z-index: 1;
  } ;
`;

function Home() {
  const { logout } = useContext(Context);

  const { clicktoggle } = useContext(Context);

  const { setclicktoggle } = useContext(Context);

  return (
    <div>
      <Infodiv style={{ left: clicktoggle ? "0" : "2000px" }}>
        <Infodivtog />
        <Inforoutediv />
      </Infodiv>
      <Messagesdiv>
        <Switch>
          <Route path='/Last/:title'>
            <Messages />
          </Route>
        </Switch>
      </Messagesdiv>
    </div>
  );
}

export default Home;

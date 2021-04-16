import React from "react";
import styled from "styled-components";
import { Switch, Route, Link } from "react-router-dom";
import Create from "./Create";
import Find from "./Find";
import Last from "./Last";

const Alldiv = styled.div`
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

function Inforoutediv() {
  return (
    <div>
      <Alldiv>
        <Switch>
          <Route path='/Last'>
            <Last />
          </Route>

          <Route path='/Find'>
            <Find />
          </Route>

          <Route path='/Create'>
            <Create />
          </Route>
        </Switch>
      </Alldiv>
    </div>
  );
}

export default Inforoutediv;

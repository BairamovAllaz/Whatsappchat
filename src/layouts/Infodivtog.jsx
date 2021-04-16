import React from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { Link } from "react-router-dom";

const Alldiv = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px lightgray;
`;

const Indiv = styled.div`
  width: auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
  font-family: sans-serif;
  cursor: pointer;
  &:hover {
    border-bottom: solid 3px lightgreen;
  }
`;

function Infodivtog() {
  return (
    <div>
      <Alldiv>
        <Indiv>
          <Link to='/Last' style={{ textDecoration: "none", color: "white" }}>
            Last
          </Link>
        </Indiv>

        <Indiv>
          <Link to='/Find' style={{ textDecoration: "none", color: "white" }}>
            Find
          </Link>
        </Indiv>

        <Indiv>
          <Link to='/Create' style={{ textDecoration: "none", color: "white" }}>
            create
          </Link>
        </Indiv>
      </Alldiv>
    </div>
  );
}

export default Infodivtog;

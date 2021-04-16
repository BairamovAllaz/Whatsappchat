import React, { useContext } from "react";
import styled from "styled-components";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { Context } from "../Context";
import { useEffect } from "react";
import { GiCancel } from "react-icons/gi";
const Navbarall = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: solid 2px lightgreen;
  position: fixed;
  z-index: 100;
  background-color: black;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Imgdiv = styled.div`
  width: 10%;
  height: 60px;
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;
const Userinfo = styled.div`
  width: 20%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Toggle = styled.div`
  width: 20%;
  height: 60px;
  margin-right: 10px;
  display: none;
  transition: 1s;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Username = styled.p`
  color: white;
  padding-left: 100px;
  padding-top: 10px;
`;

const Userlogo = styled.div`
  width: 20%;
  height: 60px;
`;

const Img = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

function Navbar() {
  const { clicktoggle } = useContext(Context);

  const { setclicktoggle } = useContext(Context);
  const { user } = useContext(Context);

  useEffect(() => {
    console.log(user.photoURL);
  }, []);
  return (
    <div>
      <Navbarall>
        <Imgdiv>
          <AiOutlineWhatsApp
            style={{ color: "white", fontSize: "40px", marginTop: "5px" }}
          />
        </Imgdiv>

        <Userinfo>
          <Username>{user.displayName}</Username>
          {user.photoURL ? (
            <Img src={user.photoURL} alt='Avatar' class='avatar'></Img>
          ) : (
            <Userlogo>
              <HiOutlineUserCircle
                style={{ color: "white", fontSize: "40px", marginTop: "5px" }}
              />
            </Userlogo>
          )}
        </Userinfo>

        <Toggle>
          {clicktoggle ? (
            <GiCancel
              style={{ color: "white", fontSize: "40px", marginTop: "5px" }}
              onClick={() => {
                setclicktoggle(false);
              }}></GiCancel>
          ) : (
            <HiOutlineMenu
              style={{ color: "white", fontSize: "40px", marginTop: "5px" }}
              onClick={() => {
                setclicktoggle(true);
              }}></HiOutlineMenu>
          )}
        </Toggle>
      </Navbarall>
    </div>
  );
}

export default Navbar;

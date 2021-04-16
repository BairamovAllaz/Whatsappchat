import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { AiOutlineAliwangwang, AiFillHome } from "react-icons/ai";
import Messagesdiv from "./Messagesdiv";
import fire from "../firebase";
import "firebase/firestore";
import Verifiedmodal from "./Verifiedmodal";
import { useContext } from "react";
import Allmessage from "./Allmessage";
function Messages() {
  const { title } = useParams();
  const [wants, setwants] = React.useState([]);
  const [roominfo, setroominfo] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const kutu = useRef();
  useEffect(() => {
    fire
      .firestore()
      .collectionGroup("wants")
      .where("roomname", "==", title)
      .where("status", "==", false)
      .onSnapshot((snapshot) =>
        setwants(snapshot.docs.map((doc) => doc.data())),
      );
  }, [title]);

  useEffect(() => {
    fire
      .firestore()
      .collection("Rooms")
      .where("roomname", "==", title)
      .onSnapshot((snapshot) =>
        setroominfo(snapshot.docs.map((doc) => doc.data())),
      );
  }, [title]);

  useEffect(() => {
    kutu.current &&
      kutu.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [roominfo]);

  return (
    <div>
      <Alldiv>
        <Logodiv>
          {roominfo.map((w) => (
            <div>
              <p
                style={{ fontSize: "30px", fontWeight: "800", color: "green" }}>
                <AiFillHome style={{ marginTop: "-5px" }} />
                <span>{w.roomname}</span>
                {w.user == user.displayName ? (
                  <span style={{ fontSize: "20px", paddingLeft: "5px" }}>
                    |you admin
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "20px",
                      paddingLeft: "5px",
                      marginBottom: "-10px",
                    }}>
                    |{w.user}
                  </span>
                )}
              </p>
            </div>
          ))}
          {roominfo.map((e) => {
            if (e.user == user.displayName) {
              return (
                <div>
                  <div>
                    <AiOutlineAliwangwang
                      style={{
                        fontSize: "50px",
                        marginRight: "30px",
                      }}
                      onClick={handleShow}
                    />
                    <Verifiedmodal
                      show={show}
                      handleClose={handleClose}
                      wants={wants}
                    />
                  </div>
                </div>
              );
            } else {
              <div></div>;
            }
          })}
        </Logodiv>
        <div style={{ width: "100%", height: "50px" }}></div>
        <Allmessage />

        <Messagesdiv kutu={kutu} />
        <div ref={kutu} style={{ width: "100%" }}></div>
      </Alldiv>
    </div>
  );
}

export default Messages;

const Alldiv = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ee6265-e947-474a-a378-6d78ab0d1117/d8fr7iz-082cab4c-3f87-47e1-b2f0-efdb504372e5.jpg/v1/fill/w_1024,h_576,q_75,strp/super_hero_whatsapp_background_by_x_ama_d8fr7iz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NzYiLCJwYXRoIjoiXC9mXC8xMmVlNjI2NS1lOTQ3LTQ3NGEtYTM3OC02ZDc4YWIwZDExMTdcL2Q4ZnI3aXotMDgyY2FiNGMtM2Y4Ny00N2UxLWIyZjAtZWZkYjUwNDM3MmU1LmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.vMsSrJL87xcHSN4_yT8cSlEGqymaknC5rvamCRrnlGU");
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

const Logodiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: fixed;
`;

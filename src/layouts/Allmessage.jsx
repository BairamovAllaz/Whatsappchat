import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import fire from "../firebase";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useContext } from "react";
function Allmessage() {
  const [allmessages, setallmessages] = useState([]);
  const { title } = useParams();
  const { user } = useContext(Context);

  useEffect(() => {
    fire
      .firestore()
      .collection("Rooms")
      .doc(title)
      .collection("Messages")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) =>
        setallmessages(snapshot.docs.map((doc) => doc.data())),
      );
  }, [title]);
  return (
    <div>
      <Alldiv>
        {allmessages.map((g) => {
          if (g.user == user.displayName) {
            return (
              <Messagediv>
                <Mymessage>
                  <span style={{ fontSize: "10px" }}>{g.user}</span>
                  <ProfilImg src={g.photo} />
                  <br />
                  <span style={{ fontWeight: "700" }}>{g.message}</span>
                </Mymessage>
              </Messagediv>
            );
          } else {
            return (
              <Messagediv>
                <Theirmessage>
                  <span style={{ fontSize: "10px" }}>{g.user}</span>
                  <ProfilImg src={g.photo} />
                  <br />
                  <span style={{ fontWeight: "700" }}>{g.message}</span>
                </Theirmessage>
              </Messagediv>
            );
          }
        })}
      </Alldiv>
    </div>
  );
}

export default Allmessage;

const Alldiv = styled.div`
  width: 100%;
  height: 100%;
`;

const Messagediv = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
`;

const Mymessage = styled.div`
  float: right;
  min-width: 100px;
  max-width: 180px;
  height: auto;
  margin-right: 20px;
  background-color: green;
  word-break: break-all;
  color: white;
`;

const Theirmessage = styled(Mymessage)`
  float: left;
  background-color: white;
  color: black;
  margin-left: 20px;
`;

const ProfilImg = styled.img`
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

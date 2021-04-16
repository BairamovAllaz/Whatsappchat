import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import fire from "../firebase";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import firebase from "firebase/app";
function Messagesdiv(props) {
  const { title } = useParams();
  const { user } = useContext(Context);
  const [inputvalue, setinputvalue] = useState("");

  const sendmessage = () => {
    if (inputvalue == "") {
      alert("type any message");
    } else {
      fire
        .firestore()
        .collection("Rooms")
        .doc(title)
        .collection("Messages")
        .doc()
        .set({
          user: user.displayName,
          message: inputvalue,
          photo: user.photoURL,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setinputvalue("");
          props.kutu.current &&
            props.kutu.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        });
    }
  };

  return (
    <div>
      <Alldiv>
        <Input>
          <Inputin
            className='form-control'
            placeholder='type any message'
            value={inputvalue}
            onChange={(e) => {
              setinputvalue(e.target.value);
            }}
          />
          <Inputbutton onClick={sendmessage}>
            <AiOutlineSend />
          </Inputbutton>
        </Input>
      </Alldiv>
    </div>
  );
}

export default Messagesdiv;

const Alldiv = styled.div`
  width: 100%;
`;

const Input = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  margin-top: 100vh;
`;

const Inputin = styled.input`
  width: 60%;
  float: left;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Inputbutton = styled.div`
  width: 10%;
  height: 35px;
  background-color: green;
  float: left;
  text-align: center;
  @media (max-width: 768px) {
    width: 20%;
  }
  color: white;
  font-size: 20px;
`;

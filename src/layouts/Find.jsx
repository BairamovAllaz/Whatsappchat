import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Context } from "../Context";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BiHomeSmile } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { MdVpnKey } from "react-icons/md";
import fire from "../firebase";
import firebase from "firebase/app";

function Find() {
  const { allrooms } = useContext(Context);
  const { user } = useContext(Context);

  useEffect(() => {}, []);

  const sendwant = (f) => {
    if (f.user == user.displayName) {
      alert("you cannot request your own room");
    } else {
      fire
        .firestore()
        .collection("Rooms")
        .doc(f.roomname)
        .collection("wants")
        .doc(user.displayName)
        .set({
          user: user.displayName,
          status: false,
          roomname: f.roomname,
          created: f.user,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          alert("You sent a request to join this room wait for an answer");
        });
    }
  };

  const sendopenwant = (f) => {
    if (f.user == user.displayName) {
      alert("you cannot join your room");
    } else {
      fire
        .firestore()
        .collection("Rooms")
        .doc(f.roomname)
        .collection("wants")
        .doc(user.displayName)
        .set({
          user: user.displayName,
          status: true,
          roomname: f.roomname,
          created: f.user,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          alert("you joined this room you can chat");
        });
    }
  };

  return (
    <div>
      {allrooms.map((f, index) => (
        <Alldiv key={index}>
          {f.userPhoto ? (
            <Img src={f.userPhoto} alt='Avatar' class='avatar'></Img>
          ) : (
            <Userlogo>
              <HiOutlineUserCircle
                style={{ color: "white", fontSize: "40px", marginTop: "5px" }}
              />
            </Userlogo>
          )}

          <Info>
            <p>
              <BiHomeSmile style={{ fontSize: "30px" }} />
              <span style={{ marginLeft: "10px" }}>{f.roomname}</span>
              <span
                style={{
                  float: "right",
                  marginRight: "50px",
                  fontSize: "18px",
                }}>
                <FaUserCheck />
              </span>
            </p>

            <p style={{ marginTop: "-5px" }}>
              <span style={{ marginLeft: "5px", marginTop: "20px" }}>
                {f.user}
              </span>
              {f.view == "true" ? (
                <button
                  style={{ float: "right", marginRight: "20px" }}
                  className='btn btn-success'
                  onClick={() => sendopenwant(f)}>
                  Join room
                </button>
              ) : (
                <span
                  style={{
                    float: "right",
                    marginRight: "50px",
                    fontSize: "23px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sendwant(f);
                  }}>
                  <MdVpnKey />
                </span>
              )}
            </p>
          </Info>
        </Alldiv>
      ))}
    </div>
  );
}

export default Find;

const Alldiv = styled.div`
  width: 100%;
  height: 90px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: solid 1px lightgray;
`;

const Img = styled.img`
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 15px;
  margin-left: 5%;
`;

const Userlogo = styled.div`
  width: 20%;
  height: 90px;
  margin-left: 10px;
`;

const Info = styled.div`
  width: 80%;
  height: 90px;

  > p {
    color: white;
    font-size: 18px;
    font-weight: 800;
    font-family: sans-serif;
  }
`;

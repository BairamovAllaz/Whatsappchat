import React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import { TiGroupOutline } from "react-icons/ti";
import { BiMessageDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import fire from "../firebase";
function Last() {
  const { user } = useContext(Context);
  const [joined, setjoined] = useState([]);
  const [myrooms, setmyrooms] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collectionGroup("wants")
      .where("status", "==", true)
      .where("user", "==", user.displayName)
      .onSnapshot((snapshot) =>
        setjoined(snapshot.docs.map((doc) => doc.data())),
      );
  }, []);

  useEffect(() => {
    fire
      .firestore()
      .collection("Rooms")
      .where("user", "==", user.displayName)
      .onSnapshot((snapshot) =>
        setmyrooms(snapshot.docs.map((doc) => doc.data())),
      );
  }, []);

  return (
    <div>
      <h6 style={{ color: "white", padding: "20px" }}>My rooms : </h6>

      {myrooms.map((e) => {
        return (
          <div>
            <Messagediv>
              <TiGroupOutline
                style={{
                  color: "white",
                  fontSize: "40px",
                  textAlign: "center",
                  marginTop: "7px",
                  marginLeft: "10px",
                }}
              />

              <span
                style={{
                  marginLeft: "20px",
                  color: "white",
                  marginBottom: "10px",
                }}>
                {e.roomname}
                <Link
                  style={{
                    float: "right",
                    marginRight: "40px",
                    fontSize: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                    color: "green",
                  }}
                  to={`/Last/${e.roomname}`}>
                  <BiMessageDetail />
                </Link>
              </span>

              <p>
                <span
                  style={{
                    marginLeft: "70px",
                    color: "white",
                    marginBottom: "10px",
                  }}>
                  {e.user}
                </span>
              </p>
            </Messagediv>
          </div>
        );
      })}

      {/* joined rooms>Q>>>>>> */}

      <h6 style={{ color: "white", padding: "20px", paddingTop: "30px" }}>
        Joined :
      </h6>

      <Joineddiv>
        {joined.map((e) => {
          return (
            <div>
              <TiGroupOutline
                style={{
                  color: "white",
                  fontSize: "40px",
                  textAlign: "center",
                  marginTop: "7px",
                  marginLeft: "10px",
                }}
              />

              <span
                style={{
                  marginLeft: "20px",
                  color: "white",
                  marginBottom: "10px",
                }}>
                {e.roomname}
                <Link
                  style={{
                    float: "right",
                    marginRight: "40px",
                    fontSize: "30px",
                    marginTop: "10px",
                    cursor: "pointer",
                    color: "green",
                  }}
                  to={`/Last/${e.roomname}`}>
                  <BiMessageDetail />
                </Link>
              </span>

              <p>
                <span
                  style={{
                    marginLeft: "70px",
                    color: "white",
                    marginBottom: "10px",
                  }}>
                  {e.created}
                </span>
              </p>
            </div>
          );
        })}
      </Joineddiv>
    </div>
  );
}

export default Last;

const Messagediv = styled.div`
  width: 100%;
  height: 80px;
  border: solid 1px #60ff83;
  margin-top: 10px;
`;

const Joineddiv = styled.div`
  width: 100%;
  height: 80px;
  border: solid 1px #60ff83;
  margin-top: 10px;
`;

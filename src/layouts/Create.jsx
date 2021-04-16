import React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import fire from "../firebase";
import firebase from "firebase/app";
function Create() {
  const [input, setinput] = useState("");
  const [view, setview] = useState("");
  const { user } = useContext(Context);

  const radios = (e) => {
    setview(e.target.value);
  };

  const addroom = () => {
    if (!input || !view) {
      alert("degerler bos olamaz");
      setinput("");
    } else {
      fire
        .firestore()
        .collection("Rooms")
        .doc(input)
        .set({
          user: user.displayName,
          userPhoto: user.photoURL,
          roomname: input,
          view: view,
          date: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setinput("");
          alert("room was created");
        });
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Room Name'
        className='form-control'
        style={{ marginTop: "30px" }}
        onChange={(e) => {
          setinput(e.target.value);
        }}
        value={input}
      />

      <Checkdiv>
        <div onChange={(e) => radios(e)}>
          <input type='radio' id='huey' name='drone' value='Openroom' value />
          <label
            htmlFor='huey'
            style={{ marginRight: "100px", color: "white" }}>
            Open
          </label>

          <input type='radio' id='huey' name='drone' value='Closeroom' />
          <label htmlFor='huey' style={{ color: "white" }}>
            Close
          </label>
        </div>
      </Checkdiv>

      <button
        className='btn btn-primary'
        style={{ width: "100%", marginTop: "20px" }}
        onClick={addroom}>
        Create
      </button>
    </div>
  );
}

export default Create;

const Checkdiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
`;

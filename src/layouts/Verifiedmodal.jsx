import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import fire from "../firebase";
import "firebase/firestore";
import { useParams } from "react-router-dom";
function Verifiedmodal({ handleClose, show, wants }) {
  const { title } = useParams();
  const verify = async (val, w) => {
    try {
      const value = await fire
        .firestore()
        .collectionGroup("wants")
        .where("roomname", "==", title)
        .where("user", "==", w.user)
        .get();

      value.docs.forEach((snapshot) => {
        snapshot.ref.update({
          status: true,
        });
      });
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            "max-height": "calc(100vh - 210px)",
            "overflow-y": "auto",
          }}>
          {wants.map((w) => (
            <Alldiv>
              <p style={{ fontSize: "20px" }}>{w.user}</p>
              <p>wants to join your group </p>
              <button
                className='btn btn-danger'
                style={{ marginRight: "20px" }}
                onClick={() => {
                  verify(false, w);
                }}>
                No
              </button>
              <button
                className='btn btn-success'
                onClick={() => {
                  verify(true, w);
                }}>
                Yes
              </button>
            </Alldiv>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Verifiedmodal;

const Alldiv = styled.div`
  width: 100%;
  min-height: 60px;
  border: solid 1px lightgray;
  text-align: center;
  height: auto;
  margin-top: 20px;
`;

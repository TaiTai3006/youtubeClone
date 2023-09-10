import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { BsMic, BsMicFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const [typeMic, setTypeMic] = useState(false);

  // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const { transcript, listening } = useSpeechRecognition();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // const handleStartListening = () => {
  //   const oscillator = audioContext.createOscillator();
  //   oscillator.type = 'triangle';
  //   oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  //   oscillator.connect(audioContext.destination);
  //   oscillator.start();
  //   oscillator.stop(audioContext.currentTime + 0.5);
  // };
  const [show, setShow] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };
  const handleTypeMic = (e) => {
    e.preventDefault();
    setShow(true);
    setInput("");
    setTypeMic(!typeMic);
    if (!typeMic) {
      // handleStartListening()
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!listening) {
      if (input !== "") {
        navigate(`/search/${input}`);
        handleClose();
      }
      setTypeMic(false);
    }
  }, [listening]);
  const handleClose = () => setShow(false);
  return (
    <div className="border border-dark header">
      {console.log(listening)}
      <FaBars className="header_menu" size={26} onClick={handleToggleSidebar} />
      <img
        onClick={() => {
          navigate("/");
        }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
        alt=""
        className="header_logo"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" style={{ padding: 0 }}>
          <AiOutlineSearch size={22} />
        </button>
        <button onClick={handleTypeMic}>
          {!typeMic ? <BsMic size={22} /> : <BsMicFill size={22} />}
        </button>
      </form>

      <div className="header_icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src={
            typeof user === "string" ? JSON.parse(user).photoURL : user.photoURL
          }
          alt="Avatar"
        />
      </div>

      <Modal show={show} onHide={handleClose} className="red-modal-background">
        <Modal.Header closeButton>
          {listening ? (
            <Modal.Title>{input === "" ? "Listening..." : input}</Modal.Title>
          ) : (
            <Modal.Title>
              {input === ""
                ? "I haven't heard clearly yet. Please say again."
                : input}
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {typeMic ? (
            <div className="circle_active" onClick={handleTypeMic}>
              <BsMicFill color="#fff" size={22} className="mic_active" />
            </div>
          ) : (
            <div className="circle_inactive" onClick={handleTypeMic}>
              <BsMic color="#fff" size={22} className="mic_active" />
            </div>
          )}
          {!listening && input === "" && (
            <p>Tap the microphone to try again.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;

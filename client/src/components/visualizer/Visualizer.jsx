import styled from "styled-components";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronRight,
  faPause,
  faPlay,
  faCirclePause,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

export function Visualizer(props) {
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPaused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const increaseIndex = () => {
    props.setVidIndex((props.vidIndex + 1) % 6);
  };

  const decreaseIndex = () => {
    if (props.vidIndex === 0) {
      props.setVidIndex(5);
    } else {
      props.setVidIndex((props.vidIndex - 1) % 6);
    }
  };

  return (
    <>
      <VisualizerItself>
        <video
          ref={videoRef}
          src={`${import.meta.env.VITE_DOMAIN}/films/processed_sample${
            props.vidIndex
          }.mp4`}
          autoPlay
          muted
          loop
          playsInline
        ></video>

        {/* <div className="topRow"> */}
        <h1 className="artifact-number">Artifact # ?</h1>
        {!props.isMobile && (
          <button
            className="modal-button"
            style={{ right: "1rem" }}
            onClick={props.openModal}
          >
            <h1>: : :</h1>
          </button>
        )}
        {/* </div> */}
        <div className="buttonWrapper">
          <button className="button" onClick={decreaseIndex}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </button>
          <button
            className="button"
            onClick={togglePlay}
            // style={{ padding: "0 0.7rem" }}
          >
            <FontAwesomeIcon
              icon={isPaused ? faCirclePlay : faCirclePause}
            ></FontAwesomeIcon>
          </button>

          <button className="button" onClick={increaseIndex}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </button>
        </div>
      </VisualizerItself>
    </>
  );
}

const VisualizerItself = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 2.5rem;
  overflow: hidden;
  max-width: 800px;
  max-height: 700px;
  background-color: black;

  padding: 0.75rem;
  top: 50%;
  left: 50%;
  box-shadow: 0px 0px 20px 0px var(--main-dark-color);
  transform: translate(-50%, -50%);
  /* margin-left: auto; */
  /* margin-right: auto; */

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
  }

  .artifact-number {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    font-size: clamp(1rem, 3vw, 20px);
    font-family: "Baloo Bhaijaan 2";
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem; */
    /* width: 100%; */
  }

  .modal-button {
    /// write vertically
    position: absolute;
    /* top: 1rem; */
    top: 1rem;
    right: 2rem;
    margin: 0.2rem;
    font-size: clamp(1rem, 3vw, 20px);
    border-radius: 5px;
    /* padding: 0.2rem 0.5rem 0.05rem; */
    padding: 0.4rem 0.29rem 0.4rem 0.25rem;
    background-color: var(--main-light-color);
    /* box-shadow: 0px 0px 20px 0px rgba(255, 20, 147, 0.3); */
    box-shadow: 0px 0px 10px 0px var(--main-dark-color);

    border-radius: 0.6rem;
    /* border-color: #d886c2; */
    /* border-style: solid; */
    border-width: 2px;
    text-align: center;
    cursor: pointer;
    color: var(--main-dark-color);

    h1 {
      writing-mode: vertical-lr;
      color: var(--main-dark-color);

      font-family: "Baloo Bhaijaan 2", cursive;
      font-size: clamp(1rem, 3vw, 20px);
      /* margin: 0; */
    }
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem; */
    /* width: 100%; */
  }

  .modal-button:hover {
    box-shadow: 0px 0px 10px 0px rgba(255, 20, 147, 1);
    box-shadow: 0px 0px 20px 0px rgba(255, 20, 147, 0.3);
  }

  .buttonWrapper {
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    /* transform: translateX(50%); */
    /* width: 50%; */
    margin: 0 auto;
    /* padding: 10px; */
    /* align-self: center; */
    font-size: clamp(19px, 2vw, 25px);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    font-family: "Baloo Bhaijaan 2", cursive;
    color: var(--main-light-color);
    // center items horizontally
    justify-items: center;
    /* justify-content: center; */
    // center items vertically
    /* align-items: center; */
    /* align-content: center; */
    /* justify-content: center; */
  }

  .button {
    border-radius: 5px;
    padding: 0.2rem 1rem 0rem;
    background-color: var(--main-light-color);
    box-shadow: 0px 0px 10px 0px rgba(255, 20, 147, 0.6);
    box-shadow: 0px 0px 10px 0px var(--main-dark-color);

    border-radius: 0.6rem;
    /* border-color: #d886c2; */
    font-size: clamp(1rem, 3vw, 20px);
    /* border-style: solid; */
    border-width: 2px;
    text-align: center;
    cursor: pointer;
    color: var(--main-dark-color);
  }

  .button:hover {
    box-shadow: 0px 0px 20px 0px rgba(255, 20, 147, 0.3);
  }

  @media (max-width: 820px) {
    .buttonWrapper {
      position: absolute;
      bottom: 1rem;
      right: 0;
      left: 0;
      padding: 0 1rem;

      /* transform: translateX(50%); */
      /* width: 50%; */
      margin: 0 auto;
      /* padding: 10px; */
      /* align-self: center; */
      color: var(--main-light-color);
      // center items horizontally
      justify-items: center;
      justify-content: center;
      // center items vertically
      align-items: center;
      align-content: center;
      justify-content: center;
    }
  }
`;

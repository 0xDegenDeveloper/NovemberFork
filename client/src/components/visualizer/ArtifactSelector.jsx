import Statement from "../global/Statement";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Select from "react-select";

const AlgoModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: var(--main-dark-color);
  padding: 2rem;
  display: grid;
  justify-items: center;
  border-radius: 1rem;

  background-color: var(--main-lightest-color);
  color: var(--main-dark-color);

  background-color: rgba(255, 255, 255, 0.01);

  background-color: rgba(23, 20, 60, 0.6);
  box-shadow: 0px 0px 10px 0px rgba(23, 20, 60, 0.5);

  /* background-color: rgba(224, 232, 255, 0.87); */
  background-color: rgb(35, 37, 41);

  h1 {
    color: var(--main-dark-color);
    font-family: "Baloo Bhaijaan 2", cursive;
  }

  button {
    margin-top: 2rem;
    font-family: "Baloo Bhaijaan 2", cursive;
    background-color: var(--main-light-color);
  }

  button:hover {
    background-color: var(--main-lightest-color);
  }
`;

function ArtifactSelector(props) {
  return (
    <AlgoModal>
      <h1 style={{ color: "var(--main-light-color)", paddingBottom: "1rem" }}>
        Find Artifacts
      </h1>

      <Grid>
        <ArtifactSelectors
          title="Etheract Count"
          id="etheract_count"
          traits={[
            { value: "one", label: "one" },
            { value: "two", label: "two" },
            { value: "three", label: "three" },
            { value: "four", label: "four" },
            { value: "five", label: "five" },
          ]}
        />
        <ArtifactSelectors
          title="Polarity"
          id="polarity"
          traits={[
            { value: "+", label: "+" },
            { value: "-", label: "-" },
          ]}
        />
        <ArtifactSelectors
          title="Trail Detected"
          id="trail_detected"
          traits={[
            { value: "true", label: "true" },
            { value: "false", label: "false" },
          ]}
        />
        <ArtifactSelectors
          title="Wavelength"
          id="wavelength"
          traits={[
            { value: "random", label: "random" },
            { value: "constant", label: "constant" },
            { value: "split", label: "split" },
            { value: "prism", label: "prism" },
          ]}
        />
        <ArtifactSelectors
          title="Trajectory"
          id="trajectory"
          traits={[
            { value: "still", label: "still" },
            { value: "linear", label: "linear" },
            { value: "polar", label: "polar" },
            { value: "spriral", label: "spriral" },
          ]}
        />
        <ArtifactSelectors
          title="Node Count"
          id="node_count"
          traits={[
            { value: "1-5", label: "1-5" },
            { value: "6-10", label: "6-10" },
            { value: "11-15", label: "11-15" },
            { value: "16-20", label: "16-20" },
            { value: "20-25", label: "20-25" },
          ]}
        />
        <ArtifactSelectors
          title="Node Size"
          id="node_size"
          traits={[
            { value: "none", label: "none" },
            { value: "small", label: "small" },
            { value: "medium", label: "medium" },
            { value: "large", label: "large" },
            { value: "xlarge", label: "xlarge" },
          ]}
        />
        <ArtifactSelectors
          title="Form Count"
          id="form_count"
          traits={[
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" },
            { value: "11", label: "11" },
          ]}
        />
        <ArtifactSelectors
          title="Entangled To"
          id="entangled_to"
          traits={[
            { label: "nothing", value: "nothing" },
            { label: "a smart contract", value: "a smart contract" },
            { label: "2d", value: "a physical 2d representation" },
            { label: "3d", value: "a physical 3d representation" },
            { label: "a higher intelligence", value: "a higher intelligence" },
          ]}
        />
      </Grid>
      <button onClick={props.onClose}>Search (coming soon)</button>
    </AlgoModal>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  /* margin: 1rem; */
  /* padding: 1rem; */
  /* overflow-y: scroll; */ /* border: 0; */
  /* border-radius: 0.1rem; */ //mobile

  > :last-child {
    grid-column: 1/-1;
    display: flex;
    justify-content: center;
    // seperate items to sides
  }
  @media (max-width: 820px) {
    /* grid-template-columns: 1fr; */
  }
`;

export function ArtifactSelectors(props) {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 830) {
  //       setIsMobile(true);
  //     } else {
  //       setIsMobile(false);
  //     }
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const [selectedOption, setSelectedOption] = useState("one");
  const handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <>
      <TraitOption>
        <p>{props.title}</p>
        <Select
          options={
            props.isMobile
              ? [...props.traits, { value: "any", label: "any" }]
              : props.traits
          }
          onChange={handleChange}
          isMulti={!props.isMobile}
          styles={OptionStyles}
          placeholder={"any"}
        />
      </TraitOption>
    </>
  );
}

const OptionStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "var(--main-light-color)",
    color: "var(--main-dark-color)",
    border: "none",
    boxShadow: "0px 0px 5px 0px var(--main-light-color)",
    borderRadius: "0.6rem",
    fontSize: "clamp(9px, 1vw, 13px)",
    fontFamily: "Baloo Bhaijaan 2",
    whiteSpace: "nowrap",
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--main-light-color)",
    color: "var(--main-dark-color)",
    border: "none",
    boxShadow: "0px 0px 5px 0px var(--main-light-color)",
    borderRadius: "0.6rem",
    fontSize: "clamp(9px, 1vw, 13px)",
    fontFamily: "Baloo Bhaijaan 2",
    overflow: "hidden",
    // whiteSpace: "nowrap",
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? "var(--main-dark-color)"
        : isFocused
        ? "var(--main-dark-color)"
        : null,
      color: isDisabled
        ? "var(--main-dark-color)"
        : isSelected
        ? "var(--main-light-color)"
        : isFocused
        ? "var(--main-light-color)"
        : "var(--main-dark-color)",
      cursor: isDisabled ? "not-allowed" : "default",
      textAlign: "center",
      borderRadius: "0.6rem",
    };
  },

  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "var(--main-dark-color)",
      color: "var(--main-light-color)",
    };
  },

  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "var(--main-light-color)",
  }),

  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "var(--main-light-color)",
    ":hover": {
      backgroundColor: "var(--main-dark-color)",
      color: "var(--main-light-color)",
    },
  }),

  input: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
  }),

  placeholder: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
    backgroundColor: "var(--main-dark-color)",
  }),

  clearIndicator: (styles) => ({
    ...styles,
    color: "var(--main-dark-color)",
  }),
};

const TraitOption = styled.div`
  font-family: Baloo Bhaijaan 2;
  color: var(--main-dark-color);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  p,
  h1 {
    color: var(--main-light-color);
    font-size: clamp(9px, 2vw, 16px);
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export default ArtifactSelector;

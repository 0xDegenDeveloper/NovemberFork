import React from "react";

// use state use effect
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Section } from "../components/global/GlobalStyles.style";
import Statement from "../components/global/Statement";

// function StudioPage(props) {
//   return (
//     <>
//       <Statement title="/Studio" text=": : : Make Stuff : : :" to="#welcome" />

//       <Section id="welcome">
//         <StudioStyle>
//           <div>
//             <h1>For the Digital World</h1>
//             <p>- Multiple mediums</p>
//             <p>Coming soon...</p>
//           </div>
//         </StudioStyle>
//       </Section>
//     </>
//   );
// }

const desktopText = {
  one: "W, A, S, D",
  two: ": : : Click Here for the Full Control Guide : : :",
  three: "Submission and voting on the roadmap",
};

const mobileText = {
  one: "Come back on desktop",
  two: ": : : Click Here for Control Guide : : :",
  three: "Submission and voting on the roadmap",
};

function StudioPage(props) {
  // const welcomeSectionRef = useRef(null);

  // useEffect(() => {
  //   const handleIntersection = (entries) => {
  //     entries.forEach((entry) => {
  //       props.setInStudio(entry.isIntersecting);
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersection, {
  //     threshold: 0.1, // Adjust the threshold value to trigger earlier or later
  //   });

  //   if (welcomeSectionRef.current) {
  //     observer.observe(welcomeSectionRef.current);
  //   }

  //   return () => {
  //     if (welcomeSectionRef.current) {
  //       observer.unobserve(welcomeSectionRef.current);
  //     }
  //   };
  // }, [props]);

  return (
    <>
      {/* <Statement title="/Studio" text=": : : Make Stuff : : :" to="#welcome" /> */}

      <Section id="welcome">
        <StudioStyle>
          <div>
            <h2>{props.isMobile ? mobileText.one : desktopText.one}</h2>
            <p>
              <a
                href="https://github.com/0xDegenDeveloper/Novemberfork/tree/main/client/README.md"
                target="_blank"
              >
                {props.isMobile ? mobileText.two : desktopText.two}
              </a>
            </p>
            <p>{props.isMobile ? mobileText.three : desktopText.three}</p>
          </div>
        </StudioStyle>
      </Section>
    </>
  );
}

const StudioStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  /// center vertically
  align-items: center;
  user-select: none;

  /* For older browsers */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  h1,
  p {
    padding: 1rem;
  }

  a {
    color: var(--main-light-color);
  }
`;

export default StudioPage;

import Statement from "../components/global/Statement";
import { Section } from "../components/global/GlobalStyles.style";

import styled from "styled-components";

function PhysicalsPage() {
  return (
    <>
      <Statement
        title="/Physicals"
        text=": : : Primate Art : : :"
        to="#welcome"
      />
      <Section id="welcome">
        <PhyStyles>
          <div>
            <h2>Multiple Mediums</h2>
            <h2>
              <p>Coming soon...</p>
            </h2>
          </div>
        </PhyStyles>
      </Section>
    </>
  );
}

const PhyStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  /// center vertically
  align-items: center;

  p {
    color: var(--main-light-color);
  }
`;

export default PhysicalsPage;

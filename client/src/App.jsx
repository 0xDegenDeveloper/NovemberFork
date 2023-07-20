import { useState, useEffect, useMemo, React } from "react";

import { Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./components/global/GlobalStyles.style.jsx";
import Navbar from "./components/global/navbar/Navbar.jsx";
import StudioControls from "./components/global/StudioControls.jsx";
import RootPage from "./pages/RootPage.jsx";
import MorePage from "./pages/MorePage.jsx";
import AlgorithmsPage from "./pages/AlgorithmsPage.jsx";
import PhysicalsPage from "./pages/PhysicalsPage.jsx";
import StudioPage from "./pages/StudioPage.jsx";
import Canvas from "./components/graphics/Canvas.jsx";
import Footer from "./components/global/Footer.jsx";
import { useWindowSize } from "./components/hooks/useWindowSize.js";
import { useRouteChange } from "./components/hooks/useRouteChange.js";

const gravityTyes = ["none", "wind", "constant"];
const routeToModeTable = {
  "/": {
    spawnFromCenter: false,
    gravityIndex: 0,
    isContained: false,
    isSpawnInFlow: true,
    gravityDirection: {
      x: -1,
      y: 1,
    },
  },
  "/algorithms": {
    spawnFromCenter: true,
    isContained: true,
    gravityIndex: 0,
    isSpawnInFlow: false,
    gravityDirection: {
      x: 0,
      y: 1,
    },
  },

  "/physicals": {
    spawnFromCenter: true,
    isContained: false,
    gravityDirection:
      // {
      //   x: 0,
      //   y: -1,
      // },
      null,
    isSpawnInFlow: false,
    gravityIndex: 0,
  },
  "/more": {
    spawnFromCenter: false,
    isContained: false,
    gravityIndex: 0,
    isSpawnInFlow: true,
    gravityDirection: {
      x: -1,
      y: -1,
    },
  },
  "/studio": {
    spawnFromCenter: false,
    isContained: false,
    gravityIndex: 1,
    isSpawnInFlow: true,
    gravityDirection: {
      x: -1,
      y: -1,
    },
  },
};
function App(props) {
  const theme = useRouteChange();
  const isMobile = useWindowSize();

  const inStudio = theme[3] === "/studio"; /// path
  const settings = routeToModeTable[theme[3]] || {};

  const [fullScreen, setFullScreen] = useState(false);

  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isBorder, setIsBorder] = useState(settings.isContained || false);
  const [gravityIndex, setGravityIndex] = useState(settings.gravityIndex || 0);
  const [gravityDirection, setGravityDirection] = useState(
    settings.gravityDirection || { x: 0, y: 0 }
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTrail, setIsTrail] = useState(false);
  const [isSpawnInFlow, setIsSpawnInFlow] = useState(
    settings.isSpawnInFlow || false
  );
  const [spawnFromCenter, setSpawnFromCenter] = useState(
    settings.spawnFromCenter || false
  );

  const handleKeyPress = (e) => {
    const key = e.key;
    const gravityIncrement = 0.5;

    if (inStudio) {
      if (e.key === "f") {
        setFullScreen((prev) => !prev);
      }

      if (e.key == "x") {
        setGravityDirection({ x: 0, y: 0 });
        setGravityIndex(2);
      }

      /// Traits
      if (e.key === "c") {
        setIsConnecting((prevState) => !prevState);
      }
      if (e.key === "t") {
        setIsTrail((prevState) => !prevState);
      }
      if (e.key === "b") {
        setIsBorder((prevState) => !prevState);
      }
      if (e.key === "0") {
        setGravityDirection({
          x: 0,
          y: 0,
        });
      }

      if (e.key === "q") {
        setSpawnFromCenter((prev) => !prev);
      }

      if (key === "g") {
        setGravityIndex((prev) => (prev + 1) % gravityTyes.length);
      }
      if (key === "w") {
        setGravityDirection((prev) => ({
          ...prev,
          y: prev.y - gravityIncrement,
        }));
      }
      if (key === "a") {
        setGravityDirection((prev) => ({
          ...prev,
          x: prev.x - gravityIncrement,
        }));
      }
      if (key === "s") {
        setGravityDirection((prev) => ({
          ...prev,
          y: prev.y + gravityIncrement,
        }));
      }
      if (key === "d") {
        setGravityDirection((prev) => ({
          ...prev,
          x: prev.x + gravityIncrement,
        }));
      }
      if (key === "y") {
        setIsSpawnInFlow((prev) => !prev);
      }
    }
  };

  useEffect(() => {
    const settings = routeToModeTable[location.pathname] || {};

    if (inStudio) {
      window.addEventListener("keypress", handleKeyPress);
    } else {
      window.removeEventListener("keypress", handleKeyPress);
      setIsTrail(false);
    }

    setGravityDirection(settings.gravityDirection || { x: 0, y: 0 });
    setIsBorder(settings.isContained || false);
    setIsSpawnInFlow(settings.isSpawnInFlow || false);
    setGravityIndex(settings.gravityIndex || 0);
    setSpawnFromCenter(settings.spawnFromCenter || false);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [location.pathname, inStudio]);

  useEffect(() => {
    const faviconPath = `${import.meta.env.VITE_DOMAIN}/novemberfork-logo.png`;
    const faviconLink = document.querySelector("#favicon-link"); // Use the id attribute
    faviconLink.setAttribute("href", faviconPath);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar isMobile={isMobile} fullScreen={fullScreen} />
      <StudioControls
        setIsContainedSystem={() => setIsBorder(!isBorder)}
        inStudio={inStudio}
        fullScreen={fullScreen}
      />

      <div
        style={{
          zIndex: `${fullScreen ? "0" : "2"}`,
          position: "relative",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <RootPage
                isMobile={isMobile}
                isFooterOpen={isFooterOpen}
                setIsFooterOpen={setIsFooterOpen}
              />
            }
          />
          <Route
            path="/algorithms"
            element={
              <AlgorithmsPage
                isMobile={isMobile}
                // tokenDetails={tokenDetails}
              />
            }
          />
          <Route
            path="/physicals"
            element={<PhysicalsPage />}
            isMobile={isMobile}
          />
          <Route path="/more" element={<MorePage isMobile={isMobile} />} />
          <Route path="/studio" element={<StudioPage isMobile={isMobile} />} />
        </Routes>
      </div>
      <Footer
        isFooterOpen={isFooterOpen}
        setIsFooterOpen={setIsFooterOpen}
        fullScreen={fullScreen}
      />
      <Canvas
        theme={theme}
        isConnecting={isConnecting}
        isTrail={isTrail}
        gravityDirection={gravityDirection}
        isBorder={isBorder}
        isSpawnInFlow={isSpawnInFlow}
        spawnFromCenter={spawnFromCenter}
        gravityType={gravityTyes[gravityIndex]}
        inStudio={theme[3] === "/studio"}
        fullScreen={fullScreen}
      />
    </>
  );
}

export default App;

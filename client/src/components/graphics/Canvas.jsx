import Sketch from "react-p5";
import { useEffect, useRef } from "react";
import style from "styled-components";

/// background images
const imageTable = {
  "/": { file_name: "root_bg_new", image: null },
  "/algorithms": { file_name: "algo_bg_new", image: null },
  "/physicals": { file_name: "phy_bg_new", image: null },
  "/more": { file_name: "more_bg_new", image: null },
  "/studio": { file_name: "studio_bg", image: null },
};

//// Tweak settings
const particleCount = window.innerWidth < 830 ? 50 : 199;
const particleSize = [0.8, 8];
const particleSpeed = [0.1, 1.5]; // 0.1, 1.2
const lineSize = 0.3;
const frameRate = 60; /// frame rate

let p5Global; /// p5 instance

let gravityVector; /// wind/gravity direction as p5 vector
let isBorder; /// walls around the canvas ?
let gravityType; /// 'none', 'constant', 'wind'

let isSpawnInFlow;

let clickSize = 5;

let spawnFromCenter;

let inStudio;

let particles = []; /// particle array (basic class)

const StyledSketch = style(Sketch)`
position: fixed;
top: 0;
z-index: ${(props) => (props.fullScreen ? "100" : "1")};
`;

export default (props) => {
  const p5Ref = useRef(null);

  const handleCanvasKeyPress = (e) => {
    if (e.key === "i") {
      clickSize += 1;
    }
    if (e.key === "o") {
      if (clickSize > 1) clickSize -= 1;
    }
    if (e.key === "p") {
      particles.push(new Particle(p5Ref.current, "click", null, null));
    }
    if (e.key === "l") {
      particles.pop();
    }
    if (e.key === "k") {
      particles.shift();
    }

    if (e.key === "0") {
      for (let i = 0; i < particles.length; i++) {
        particles[i].makeStill(p5Ref.current.createVector(0, 0));
      }
    }

    if (e.key === "r") {
      /// randomize direction of particles using previous magnitude, new direction
      for (let i = 0; i < particles.length; i++) {
        const magnitude = particles[i].velocity.mag();
        const randomUnitVector = p5Ref.current.createVector(
          p5Ref.current.random(-1, 1),
          p5Ref.current.random(-1, 1)
        );
        particles[i].velocity = randomUnitVector.mult(magnitude);
      }
    }

    if (e.key === "x") {
      particles = [];
      gravityVector = p5Ref.current.createVector(0, 0);
    }

    if (e.key === "z") {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(p5Ref.current, "center", null));
      }
    }
    if (e.key === "1" || e.key === "2" || e.key === "3") {
      for (let i = 0; i < 44 * parseInt(e.key); i++) {
        particles.push(new Particle(p5Ref.current, "center", null));
      }
    }

    if (e.key === "q") {
      spawnFromCenter = !spawnFromCenter;
    }
  };

  const handleCanvasClick = (e) => {
    if (e.button === 0) {
      particles.push(
        new Particle(p5Ref.current, "mouse", null, {
          x: parseFloat(e.clientX),
          y: parseFloat(e.clientY),
        })
      );
    }
  };

  useEffect(() => {
    if (props.inStudio) {
      window.addEventListener("keypress", handleCanvasKeyPress);
      window.addEventListener("click", handleCanvasClick);
    } else {
      window.removeEventListener("keypress", handleCanvasKeyPress);
      window.removeEventListener("click", handleCanvasClick);
    }

    return () => {
      window.removeEventListener("keypress", handleCanvasKeyPress);
      window.removeEventListener("click", handleCanvasClick);
    };
  }, [props.inStudio]);

  const setSettings = (props) => {
    const p5 = p5Ref.current;
    if (!p5) return;

    inStudio == props.inStudio;
    isSpawnInFlow = props.isSpawnInFlow;
    spawnFromCenter = props.spawnFromCenter;
    isBorder = props.isBorder;
    gravityType = props.gravityType;
    gravityVector = p5.createVector(
      props.gravityDirection.x,
      props.gravityDirection.y
    );
  };

  const preload = (p5) => {
    p5Ref.current = p5;
    /// replacing the file_name with the actual image obj
    for (const key in imageTable) {
      const { file_name } = imageTable[key];
      const path = `${
        import.meta.env.VITE_DOMAIN
      }/backgrounds/${file_name}.png`;
      imageTable[key].image = p5.loadImage(path);
    }
    // p5 = p5;
    setSettings(props);
  };

  const setup = (p5, canvasParentRef) => {
    p5.frameRate(frameRate);
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(p5, "center", null));
    }

    setSettings(props);
    window.addEventListener("resize", () => {
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
    });
  };

  const draw = (p5) => {
    p5.stroke(props.theme[1]);

    if (!props.isTrail)
      p5.image(imageTable[props.theme[3]].image, 0, 0, p5.width, p5.height);

    if (props.isConnecting) {
      p5.strokeWeight(lineSize);
      for (let i = 0; i < particles.length - 1; i++) {
        let p1 = particles[i];
        let p2 = particles[i + 1];
        p5.line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
      }
    }

    particles.forEach((p) => {
      p.draw();
      // console.log(p);
      p.update();
    });
    setSettings(props);
  };

  return <StyledSketch preload={preload} setup={setup} draw={draw} />;
};

class Particle {
  constructor(p5, type, prevSize, posSet) {
    const { position, size, velocity } = this.spawnParticle(
      p5,
      type,
      prevSize,
      posSet
    );
    this.p5 = p5;
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.velocityCopy = velocity.copy(); // store the original velocity
  }

  makeStill() {
    this.velocity = this.p5.createVector(0, 0);
    this.velocityCopy = this.p5.createVector(0, 0);
  }

  update() {
    /// Wind emulator
    if (gravityType === "wind") {
      const currentFlow = gravityVector.copy();
      this.velocity = currentFlow.copy().add(this.velocityCopy);
    }
    /// Instant movement
    else if (gravityType === "constant") {
      const newDirection = gravityVector.copy();
      const mag = this.velocityCopy.mag() == 0 ? 1 : this.velocityCopy.mag();
      this.velocity = newDirection.copy().mult(mag);
    }
    this.position.add(this.velocity);
    this.checkEdges();
  }

  draw() {
    this.p5.strokeWeight(this.size);
    this.p5.point(this.position.x, this.position.y);
  }

  checkEdges() {
    if (isBorder) this.handleBorderCollision();
    else this.handleSystemDeparture();
  }

  handleSystemDeparture() {
    const halfSize = this.size / 2;

    if (
      this.position.x - halfSize > window.innerWidth ||
      this.position.x + halfSize < 0
    ) {
      const direction = this.velocity.x > 0 ? "from-left" : "from-right";
      particles[particles.indexOf(this)] = new Particle(
        this.p5,
        direction,
        this.size,
        null
      );
    } else if (
      this.position.y - halfSize > window.innerHeight ||
      this.position.y + halfSize < 0
    ) {
      const direction = this.velocity.y > 0 ? "from-top" : "from-bottom";
      particles[particles.indexOf(this)] = new Particle(
        this.p5,
        direction,
        this.size,
        this.velocity
      );
    }
  }

  handleBorderCollision() {
    const halfSize = this.size / 2;

    if (
      this.position.x - halfSize < 0 ||
      this.position.x + halfSize > window.innerWidth
    ) {
      this.velocity.x = -this.velocity.x;
      this.position.x =
        this.position.x - halfSize < 0
          ? halfSize
          : window.innerWidth - this.size;
    }

    if (
      this.position.y - halfSize < 0 ||
      this.position.y + halfSize > window.innerHeight
    ) {
      // console.log("prev y vec", this.velocity.y);
      this.velocity.y = -this.velocity.y;
      window.innerHeight - halfSize;
      this.position.y =
        this.position.y - halfSize < 0
          ? halfSize
          : window.innerHeight - this.size;
    }
  }

  /// Particle Generation

  generateParticleDetails(p5, type, prevSize, pos) {
    const halfSize = !prevSize ? 0 : prevSize / 2;
    const fullWidth = window.innerWidth;
    const fullHeight = window.innerHeight;
    const randomWidth = Math.random() * fullWidth;
    const randomHeight = Math.random() * fullHeight;
    const position = p5.createVector(randomWidth, randomHeight);
    const angle = Math.random() * 2 * Math.PI;
    const velocityVector =
      spawnFromCenter || !isSpawnInFlow
        ? p5.createVector(Math.cos(angle), Math.sin(angle))
        : gravityVector;

    const spawnPositions = {
      center: () =>
        spawnFromCenter
          ? position.set(fullWidth / 2, fullHeight / 2)
          : position.set(randomWidth, randomHeight),
      "from-top": () => position.set(randomWidth, 0 - halfSize),
      "from-bottom": () => position.set(randomWidth, fullHeight + halfSize),
      "from-left": () => position.set(0 - halfSize, randomHeight),
      "from-right": () => position.set(fullWidth + halfSize, randomHeight),
      mouse: () => {
        position.set(pos.x, pos.y);
      },
      click: () => {
        position.set(p5.mouseX, p5.mouseY);
      },
    };

    // if (!isSpawnInFlow) {
    //     /// 1/4 change to come from left/top/right/bottom
    // }

    if (spawnPositions[type]) {
      spawnPositions[type]();
    } else {
      position.set(
        halfSize + Math.random() * (fullWidth - prevSize),
        halfSize + Math.random() * (fullHeight - prevSize)
      );
    }

    return { position, velocityVector };
  }

  spawnParticle(p5, type, prevSize, pos) {
    // console.log("left click");

    const size =
      type === "mouse"
        ? clickSize
        : particleSize[0] + Math.random() * (particleSize[1] - particleSize[0]);

    const { position, velocityVector } = this.generateParticleDetails(
      p5,
      type,
      prevSize,
      pos
    );
    let velocityMagnitude = p5.map(
      size,
      particleSize[0],
      particleSize[1],
      particleSpeed[0],
      particleSpeed[1]
    );

    if (velocityMagnitude > particleSpeed[1]) {
      velocityMagnitude = particleSpeed[1];
    }

    const velocity = velocityVector.copy().mult(velocityMagnitude);

    return { position, velocity, size };
  }
}

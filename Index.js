/* Open the sidenav */
function openFirstNav() {
  document.getElementById("firstNav").style.width = "50%";
}

/* Close/hide the sidenav */
function closeFirstNav() {
  document.getElementById("firstNav").style.width = "0";
}

/* Open the sidenav */
function openSecondNav() {
  document.getElementById("secondNav").style.width = "50%";
}

/* Close/hide the sidenav */
function closeSecondNav() {
  document.getElementById("secondNav").style.width = "0";
}

/* Open the sidenav */
function openThirdNav() {
  document.getElementById("thirdNav").style.width = "50%";
}

/* Close/hide the sidenav */
function closeThirdNav() {
  document.getElementById("thirdNav").style.width = "0";
}

/* Open the sidenav */
function openFourthNav() {
  document.getElementById("fourthNav").style.width = "50%";
}

/* Close/hide the sidenav */
function closeFourthNav() {
  document.getElementById("fourthNav").style.width = "0";
}

/* Close/hide the sidenav */
function closeAllNavs() {
  var sidenavs = document.getElementsByClassName("sidenav");

  for(var i=0;i<sidenavs.length; i++){
    sidenavs[i].style.width = "0";
  }
}

// Following Code is for Intro Particles
const parameters = {
  gravityCoefficient: 0.5,
  particleCount: 3000,
  centerMass: -100,
  matterDensity: 1.4,
  invertColors: false,
  explosionTime: 300,
  decelerationCoefficient: 0.95,
  containerSize: 1500
};

let isGravityDisabled = false;
const disableGravity = () => isGravityDisabled = true;
const enableGravity = () => isGravityDisabled = false;

document.addEventListener("mousedown", disableGravity);
document.addEventListener("touchstart", disableGravity);


document.addEventListener("mouseup", enableGravity);
document.addEventListener("touchend", enableGravity);

const getRadiusFromMass = mass =>
  Math.pow(3 / 4 * mass / Math.PI / parameters.matterDensity, 1 / 3);

const getMassFromRadius = radius =>
  4 / 3 * Math.PI * parameters.matterDensity * radius ** 3;

const canvas = document.querySelector("canvas");

const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

setCanvasSize();

window.addEventListener("resize", setCanvasSize);

const ctx = canvas.getContext("2d", { alpha: true });

const randomBetween = (a, b) => {
  return a + Math.random() * (b - a);
};

const getCoordinatesInCanvasFromPolar = (r, theta) => {
  const xInCenteredGrid = r * Math.cos(theta);
  const yInCenteredGrid = r * Math.sin(theta);
  return {
    x: xInCenteredGrid + canvas.width / 2,
    y: yInCenteredGrid + canvas.height / 2
  };
};

const centerParticle = {
  radius: getRadiusFromMass(parameters.centerMass),
  m: parameters.centerMass
};

const renderCenterParticle = () => {
  const { x, y } = getCoordinatesInCanvasFromPolar(0, 0);
  ctx.beginPath();
  ctx.arc(x, y, centerParticle.radius, 0, 2 * Math.PI);
  ctx.fill();
};

class Particle {
  constructor({ r, theta, radius, color, v, a, m, omega }) {
    this.r = r;
    this.a = a;
    this.v = v;
    this.m = m;
    this.omega = omega;
    this.theta = theta;
    this.radius = radius/2;
    this.alpha = 1;
  }

  render() {
    const { x, y } = getCoordinatesInCanvasFromPolar(this.r, this.theta);
    ctx.beginPath();
    ctx.arc(x, y, this.radius* 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const getAcceleration = (r, m) => {
  return isGravityDisabled
    ? 0
    : parameters.gravityCoefficient * centerParticle.m * m / r ** 2.5;
};

let particles = [];
function spawnParticles() {
  particles = new Array(parameters.particleCount).fill(null).map((p, i) => {
    const r = randomBetween(10, parameters.containerSize);

    //Varying radius size
    const radius = randomBetween(0.5, 3);
    const m = getMassFromRadius(radius);
    return new Particle({
      r,
      theta: randomBetween(0, Math.PI * 2),
      omega: randomBetween(0.0001, 0.001),
      v: 0,
      m,
      a: -getAcceleration(r, 2),
      radius
    });
  });
}
spawnParticles();

let framesAfterExplosion = Math.floor(parameters.explosionTime / (1000 / 60));

const renderParticlesFrame = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = parameters.invertColors ? "#ffffff00" : "#ffffff00";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = !parameters.invertColors ? "#a9a9a9" : "#a9a9a9";
  renderCenterParticle();
  const defaultContainerSize = Math.min(canvas.height, canvas.width) / 2.2;
  const containerSize = Math.min(
    parameters.containerSize,
    defaultContainerSize
  );
  

  let maxR = 0;
  particles.forEach(p => {
    p.render();
    p.a =
      framesAfterExplosion < Math.floor(parameters.explosionTime / (1000 / 60))
        ? 0
        : -getAcceleration(p.r, p.m);
    p.v += p.a;
    p.theta += p.omega;
    p.r += p.v;

    if (p.v > 0 && p.r >= containerSize * 0.5) {
      p.v *= parameters.decelerationCoefficient;
    }

    if (p.r >= containerSize && p.v > 0) {
      p.v *= -0.7;
    }

    // If the particle has been absorbed by the blackhole, keep it inside at a random position
    if (p.r < centerParticle.radius - p.radius / 2) {
      p.r = randomBetween(0, centerParticle.radius);

      if (!p.isAbsorbed) {
        p.a = 0;
        p.v = 0;
        p.isAbsorbed = true;
        centerParticle.m += p.m;
        centerParticle.radius = getRadiusFromMass(centerParticle.m);
      }
    }

    if (p.r >= maxR) {
      maxR = p.r;
    }
    
  });

  // If all of the particles have been absorbed, explode the blackhole
  if (maxR <= centerParticle.radius) {
    framesAfterExplosion = 0;
    centerParticle.radius = getRadiusFromMass(parameters.centerMass);
    centerParticle.m = parameters.centerMass;
    particles.forEach(p => {
      p.v = randomBetween(2, 10);
      p.a = 0;
      p.isAbsorbed = false;
    });
  }
  framesAfterExplosion++;
  window.requestAnimationFrame(renderParticlesFrame);
  
};
renderParticlesFrame();





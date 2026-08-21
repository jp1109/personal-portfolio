/* ALWAYS START AT THE TOP */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  
  window.addEventListener("pageshow", () => {
    window.scrollTo(0, 0);
  });
  
  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });



const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((section) => {

    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < windowHeight - 180) {
      section.classList.add("active");
    }

  });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});

const interactiveName = document.querySelector(".interactive-name");

if (interactiveName) {

  interactiveName.addEventListener("mousemove", (event) => {

    const rect = interactiveName.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    interactiveName.style.transform =
      `translate(${x * 10}px, ${y * 6}px)`;
  });


  interactiveName.addEventListener("mouseleave", () => {

    interactiveName.style.transform =
      "translate(0px, 0px)";

  });

}

/* ========================================
   ASCII PORTRAIT GENERATOR
======================================== */

const portraitImage =
  document.querySelector(".portrait-real");

const asciiCanvas =
  document.getElementById("ascii-canvas");


if (portraitImage && asciiCanvas) {

  const ctx =
    asciiCanvas.getContext("2d");


  function createAsciiPortrait() {

    const width = 310;
    const height = 388;

    asciiCanvas.width = width;
    asciiCanvas.height = height;


    /* temporary tiny canvas */

    const tempCanvas =
      document.createElement("canvas");

    const tempCtx =
      tempCanvas.getContext("2d");


    const cols = 75;

    const aspect =
      portraitImage.naturalHeight /
      portraitImage.naturalWidth;

    const rows =
      Math.floor(cols * aspect * 0.45);


    tempCanvas.width = cols;
    tempCanvas.height = rows;


    /* crop image similar to object-fit cover */

    tempCtx.drawImage(
      portraitImage,
      0,
      0,
      cols,
      rows
    );


    const imageData =
      tempCtx.getImageData(
        0,
        0,
        cols,
        rows
      );


    const pixels =
      imageData.data;


    const characters =
      "@%#*+=-:. ";


    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    ctx.fillStyle =
      "rgba(148, 163, 184, 0.85)";


    const fontSize =
      width / cols;


    ctx.font =
      `${fontSize}px monospace`;


    ctx.textBaseline = "top";


    for (let y = 0; y < rows; y++) {

      for (let x = 0; x < cols; x++) {

        const index =
          (y * cols + x) * 4;


        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];


        const brightness =
          (r + g + b) / 3;


        const charIndex =
          Math.floor(
            (brightness / 255) *
            (characters.length - 1)
          );


        const character =
          characters[charIndex];


        /*
          subtle blue highlights
        */

        if (brightness > 150) {

          ctx.fillStyle =
            "rgba(56,189,248,0.85)";

        } else {

          ctx.fillStyle =
            "rgba(148,163,184,0.75)";

        }


        ctx.fillText(
          character,
          x * fontSize,
          y * (height / rows)
        );

      }

    }

  }


  /* Wait until image loads */

  if (portraitImage.complete) {

    createAsciiPortrait();

  } else {

    portraitImage.addEventListener(
      "load",
      createAsciiPortrait
    );

  }

}

const asciiPortrait =
  document.querySelector(".floating-ascii");

window.addEventListener("scroll", () => {

  if (!asciiPortrait) return;

  const scrollY = window.scrollY;

  /*
    portrait becomes slightly more visible
    as you move down from the name
  */

  const opacity =
    Math.min(
      0.32,
      0.10 + scrollY / 1800
    );

  asciiPortrait.style.opacity = opacity;

  /*
    tiny movement creates depth
  */

  asciiPortrait.style.transform =
    `translateY(calc(-50% + ${scrollY * 0.035}px)) scale(0.96)`;

});

/* =========================
   REAL ASCII PORTRAIT
========================= */

const asciiSource = document.getElementById("ascii-source");
const asciiCanvas = document.getElementById("ascii-portrait");

if (asciiSource && asciiCanvas) {

  const asciiCtx = asciiCanvas.getContext("2d");

  function generateAsciiPortrait() {

    const canvasWidth = 300;
    const canvasHeight = 380;

    asciiCanvas.width = canvasWidth;
    asciiCanvas.height = canvasHeight;

    /* smaller image used for ASCII sampling */
    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d");

    const columns = 68;
    const rows = 78;

    sampleCanvas.width = columns;
    sampleCanvas.height = rows;


    /* CROP PHOTO TO PORTRAIT SHAPE */

    const imgWidth = asciiSource.naturalWidth;
    const imgHeight = asciiSource.naturalHeight;

    const targetRatio = columns / rows;
    const imageRatio = imgWidth / imgHeight;

    let sourceX = 0;
    let sourceY = 0;
    let sourceWidth = imgWidth;
    let sourceHeight = imgHeight;

    if (imageRatio > targetRatio) {

      sourceWidth = imgHeight * targetRatio;
      sourceX = (imgWidth - sourceWidth) / 2;

    } else {

      sourceHeight = imgWidth / targetRatio;

      /* slightly higher crop keeps face centered */
      sourceY = (imgHeight - sourceHeight) * 0.22;
    }


    sampleCtx.drawImage(
      asciiSource,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      columns,
      rows
    );


    const pixels = sampleCtx.getImageData(
      0,
      0,
      columns,
      rows
    ).data;


    asciiCtx.clearRect(
      0,
      0,
      canvasWidth,
      canvasHeight
    );


    const chars = "@%#*+=-:. ";

    const cellWidth = canvasWidth / columns;
    const cellHeight = canvasHeight / rows;

    asciiCtx.font =
      `${Math.max(4, cellWidth * 1.2)}px monospace`;

    asciiCtx.textAlign = "center";
    asciiCtx.textBaseline = "middle";


    for (let y = 0; y < rows; y++) {

      for (let x = 0; x < columns; x++) {

        const i = (y * columns + x) * 4;

        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const brightness =
          0.299 * r +
          0.587 * g +
          0.114 * b;


        /*
          Skip very bright background areas.
          This helps remove much of the water.
        */

        if (brightness > 205) {
          continue;
        }


        const charIndex = Math.floor(
          (brightness / 255) *
          (chars.length - 1)
        );

        const character = chars[charIndex];


        /*
          brighter ASCII = blue
          darker ASCII = soft gray
        */

        if (brightness > 125) {

          asciiCtx.fillStyle =
            "rgba(56, 189, 248, 0.68)";

        } else {

          asciiCtx.fillStyle =
            "rgba(203, 213, 225, 0.75)";
        }


        asciiCtx.fillText(
          character,
          x * cellWidth + cellWidth / 2,
          y * cellHeight + cellHeight / 2
        );
      }
    }
  }


  if (asciiSource.complete) {
    generateAsciiPortrait();
  } else {
    asciiSource.addEventListener(
      "load",
      generateAsciiPortrait
    );
  }
}

const scrollExplore = document.getElementById("scroll-explore");
const homeSection = document.getElementById("home");

if (scrollExplore && homeSection) {
  scrollExplore.addEventListener("click", () => {
    homeSection.scrollIntoView({
      behavior: "smooth"
    });
  });
}
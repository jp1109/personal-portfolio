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

const scrollExplore = document.getElementById("scroll-explore");
const homeSection = document.getElementById("home");

if (scrollExplore && homeSection) {
  scrollExplore.addEventListener("click", () => {
    homeSection.scrollIntoView({
      behavior: "smooth"
    });
  });
}
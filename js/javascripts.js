// ========== Navbar List Active ========== //
const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    this.classList.add("active");
  });
});

// ========== Parallax Effect ========== //
let layer_1 = document.querySelector(".layer-1");
let layer_2 = document.querySelector(".layer-2");
let layer_3 = document.querySelector(".layer-3");
let layer_4 = document.querySelector(".layer-4");
let layer_5 = document.querySelector(".layer-5");

window.onscroll = function () {
  let Y = window.scrollY;

  layer_1.style.transform = "translateY(" + Y / 1.5 + "px)";
  layer_2.style.transform = "translateY(" + Y / 2 + "px)";
  layer_3.style.transform = "translateY(" + Y / 1.5 + "px)";
  layer_4.style.transform = "translateY(" + Y / 2 + "px)";
  layer_5.style.transform = "translateY(" + Y / 3 + "px)";
};

// ========== Next Img ========== //
var swiper = new Swiper(".portofolio-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// ========== Animasi Skills ========== //
let animationObserver;

function animateSkillProgress(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillFill = entry.target.querySelector(".skill-progress-fill");
      const progressWidth = skillFill.style.width;
      skillFill.style.width = "0%";

      let currentWidth = 0;
      const targetWidth = parseInt(progressWidth);

      const animationStep = () => {
        if (currentWidth >= targetWidth) {
          clearInterval(animationInterval);
        } else {
          currentWidth++;
          skillFill.style.width = currentWidth + "%";
        }
      };

      const animationInterval = setInterval(animationStep, 15);
      animationIntervals.push(animationInterval);

      observer.unobserve(entry.target);
    }
  });
}

function startAnimationOnScroll() {
  const skillCards = document.querySelectorAll(".skills-list");

  skillCards.forEach((skillCard) => {
    animationObserver.observe(skillCard);
  });
}

function resetAnimation() {
  const skillFills = document.querySelectorAll(".skill-progress-fill");

  skillFills.forEach((skillFill) => {
    skillFill.style.width = "0%";
  });

  animationIntervals.forEach((interval) => {
    clearInterval(interval);
  });
}

animationObserver = new IntersectionObserver(animateSkillProgress, {
  threshold: 0.2,
});

window.addEventListener("scroll", startAnimationOnScroll);

window.addEventListener("beforeunload", resetAnimation);

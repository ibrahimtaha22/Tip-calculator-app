const billInput = document.getElementById("billinput");
const peopleInput = document.getElementById("peopleinput");
const tipButtons = document.querySelectorAll(".tip-button"); // جلب كل الأزرار
const tipResult = document.querySelector(".tip-result");
const totalResult = document.getElementsByName("totalresult")[0];
const resetBtn = document.querySelector(".reset-button");
const errorMsg = document.getElementById("error-msg");
let currentTip = 0;

const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!isDesktop || prefersReducedMotion) {
  document.querySelector(".character-wrapper")?.remove();
}
if (isDesktop || !prefersReducedMotion) {
  setTimeout(() => {
    characterGreeting();
  }, 1000);
}

function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (people <= 0 || isNaN(people)) {
    if (peopleInput.value !== "") {
      errorMsg.style.opacity = "1";
      peopleInput.style.border = "2px solid red";
    }
    tipResult.textContent = "0.00 $";
    totalResult.textContent = "0.00 $";
    return;
  } else {
    errorMsg.style.opacity = "0";
    peopleInput.style.border = "none";
  }

  if (bill >= 0 && people > 0) {
    const totalTip = bill * currentTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = (bill + totalTip) / people;

    tipResult.textContent = `${tipPerPerson.toFixed(2)} $`;
    totalResult.textContent = `${totalPerPerson.toFixed(2)} $`;
    animateResult();
  }
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentTip = parseFloat(button.value);

    tipButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    customTipInput.value = "";
    calculate();
    tipResult.classList.add("active-result");
    totalResult.classList.add("active-result");
  });
});

resetBtn.addEventListener("click", () => {
  totalResult.classList.add("fade-out");
  tipResult.classList.add("fade-out");
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  setTimeout(() => {
    billInput.value = "";
    peopleInput.value = "";
    errorMsg.style.opacity = "0";
    peopleInput.style.border = "none";
    tipResult.textContent = "0.00 $";
    totalResult.textContent = "0.00 $";
    currentTip = 0;

    totalResult.classList.remove("fade-out");
    tipResult.classList.remove("fade-out");
  }, 200);
});

const customTipInput = document.getElementById("inputcustom");

customTipInput.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  const customValue = parseFloat(customTipInput.value) / 100;

  if (customValue >= 0) {
    currentTip = customValue;
    calculate();
  } else {
    tipResult.textContent = "$ 0.00";
    totalResult.textContent = "$ 0.00";
  }
});

billInput.addEventListener("input", calculate);

peopleInput.addEventListener("input", calculate);

function animateResult() {
  tipResult.classList.add("animate-result");
  totalResult.classList.add("animate-result");

  setTimeout(() => {
    tipResult.classList.remove("animate-result");
    totalResult.classList.remove("animate-result");
  }, 200);
}

function characterGreeting() {
  const tl = gsap.timeline();

  tl.to("#hi-character", {
    y: 80,
    x: 170,
    opacity: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
  }).to("#hi-character", {
    rotation: 20,
    repeat: 3,
    yoyo: true,
    duration: 0.1,
  });

  tl.to("#hi-character", {
    y: 135,
    x: 265,
    duration: 0.7,
    ease: "power1.in",
  });
}

function extendedMenu() {
  document.querySelector("#extendMenu").classList.toggle("hidden");
}
function userProfileExpand() {
  document.querySelector("#userProfile").classList.toggle("hidden");
}
function menSectionExp() {
  document.querySelector("#menSection").classList.toggle("hidden");
}
function womenSectionExp() {
  document.querySelector("#womenSection").classList.toggle("hidden");
}
function searchSpanExp() {
  document.querySelector("#SearchSpan").classList.toggle("hidden");
}

//to make size category button visible and hide in men
let imgElements = document.querySelectorAll("img");
imgElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    const formId = element.getAttribute("aria-controls");
    const formElement = document.getElementById(formId);
    if (!formElement) {
      return;
    }
    formElement.classList.toggle("hidden");
  });
});
imgElements.forEach((element) => {
  element.addEventListener("mouseleave", () => {
    const formId = element.getAttribute("aria-controls");
    const formElement = document.getElementById(formId);
    if (!formElement) {
      return;
    }
    formElement.classList.toggle("hidden");
  });
});

var navbar = document.querySelector(".navbar");
var sticky = navbar.offsetTop;
var message = document.querySelector(".textmsg");
var charlimit = document.querySelector(".characterlimit");
var btn = document.querySelector(".icon");
var fontawe = document.querySelector("i");

btn.addEventListener("click", () => {
  if (window.getComputedStyle(navbar).display == "block") {
    navbar.style.display = "none";
    fontawe.classList.remove("fa-times");
    fontawe.classList.add("fa-bars");
  } else if (window.getComputedStyle(navbar).display == "none") {
    navbar.style.display = "block";
    fontawe.classList.remove("fa-bars");
    fontawe.classList.add("fa-times");
  }
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
message.addEventListener("input", function (e) {
  const target = e.target;
  const maxlen = target.getAttribute("maxlength");
  const currlen = target.value.length;
  charlimit.innerHTML = `${currlen} / ${maxlen}`;
});
function resetformdata() {
  document.querySelector("#connect-form").reset();
  document.querySelector(".characterlimit").innerHTML = "0 / 500";
}
var submitbtn = document.querySelector(".submitform");
submitbtn.addEventListener("click", () => {});

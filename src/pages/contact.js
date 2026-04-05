import { hamburgerHTML } from "../components/loadComponents/header/hamburgerItem.js";
import { navigationHTML } from "../components/loadComponents/header/navigationItem.js";
import { cartCountHTML } from "../components/loadComponents/header/cartCountItem.js";
import { footerHTML } from "../components/loadComponents/footer/footerItem.js";

const headerBar = document.getElementById("header-bar");
const footer = document.getElementById("footer");

headerBar.insertAdjacentHTML("beforeEnd", cartCountHTML());
headerBar.insertAdjacentHTML("beforeEnd", hamburgerHTML());
headerBar.insertAdjacentHTML(
  "beforeEnd",
  navigationHTML("./shop.html", "./about.html", "./contact.html"),
);

footer.innerHTML = footerHTML();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    this.style.display = "none";
    document.getElementById("form-success").classList.add("visible");
  });

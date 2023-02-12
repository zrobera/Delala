const whole = document.querySelector(".whole");

let result;
window.addEventListener("DOMContentLoaded", async () => {
  result = JSON.parse(localStorage.getItem("user"));
  let condition = result > 0 ? true : false;
  if (result) {
    condition = true;
  }

  console.log(condition);
  if (!condition) {
    whole.classList.add("revel");

    whole.innerHTML = `
  <div class="container h-100 d-flex justify-content-center align-items-center">
  <div class="shadow p-5 bg-light">
  <h3>Please Login to see our site</h3>
  <a href="index.html" class="btn btn-secondary">Login</a>
  </div>
  </div>`;
  } else {
    const cart = localStorage.getItem("cart");
    const cartbtn = document.querySelector(".cart");
    cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
  }
});
const logout = document.querySelector(".logout");
logout.addEventListener("click", handleLogout);
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

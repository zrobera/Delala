const email = document.querySelector("#email");
const password = document.querySelector("#password");
const clickBtn = document.querySelector(".clicked");
const caution = document.querySelector(".caution");
const username = document.querySelector("#name");

clickBtn.addEventListener("click", (e) => {
  handleClick(e);
});

function handleClick(e) {
  if (e.target.dataset.type === "signup") {
    handleSignup();
  }
  if (e.target.dataset.type === "login") {
    handleLogin();
  }
}
async function handleSignup() {
  const body = JSON.stringify({
    userName: username.value,
    password: password.value,
    email: email.value,
  });

  const response = await fetch("http://localhost:3000/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body,
  });
  const result = await response.json();
  if (response.ok) {
    handleRouting(result);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
  if (!response.ok) {
    console.log(result.message);

    caution.classList.add("border-danger");
    caution.classList.add("show");
    caution.innerHTML = `<h6 class="fs-5">${result.message}</h6>`;
  }
}

async function handleLogin() {
  const body = JSON.stringify({
    password: password.value,
    email: email.value,
  });

  const response = await fetch("http://localhost:3000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body,
  });
  const result = await response.json();
  if (response.ok) {
    handleRouting(result);
    const cart = await fetch(`http://localhost:3000/cart/${result.id}`, {
      mode: "cors",
    });
    const cartno = await cart.json();
    console.log(cartno);
    localStorage.setItem("cart", cartno.length);
    if (result.role === "visitor") {
      setTimeout(() => {
        window.location.href = "home.html";
      }, 2000);
    } else if (result.role === "admin") {
      setTimeout(() => {
        window.location.href = "Admin.html";
      }, 2000);
    }
  }
  if (!response.ok) {
    caution.classList.add("border-danger");
    caution.classList.add("show");
    caution.innerHTML = `<h6 class="fs-5">${result.message}</h6>`;
  }
}

function handleRouting(result) {
  caution.classList.remove("border-danger");
  caution.classList.add("border-success");
  caution.classList.add("show");
  caution.innerHTML = `<h6 class="fs-5">Successfull </h6>`;
  localStorage.setItem("user", JSON.stringify(result));
}

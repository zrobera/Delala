const resultContainer = document.querySelector(".result-container");
const summary = document.querySelector(".summary");

// fetch data
async function fetchData(endPoint) {
  const response = await fetch(endPoint, {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const result = await response.json();
  return result;
}

// display
function display(carts) {
  let html = carts.map((cart) => {
    return `<div class="row gap-3 shadow mt-5 align-items-center ">
              <div class="col-md-2">
                <img src="${cart.photo}" style="max-width: 100%" alt="" />
              </div>
              <div class="col-md-2 pt-3">
                <h6>${cart.name}</h6>
                   
              </div>
              <div class="col-md-2">
                <h6>${cart.count} House</h6>
              </div>
              <div class="col-md-2">
                <button class="btn  check-btn btn-dark">check availabilityy</button>
                <h6 class="d-none id">${cart._id}</h6>
                <h6 class="d-none id2">${cart.houseId}</h6>

              </div>
              <div class="col-md-auto ms-auto m-4">
                <button 
                  style="
                    border: none;
                    outline: none;
                    background-color: transparent;
                  "
                >
                  <img class="remove-btn " src="imgs/delete.png" style="width: 20px" alt="" />
                </button>
              </div>
            </div>`;
  });
  html = html.join("");

  return html;
}
let user;
let cart;
window.addEventListener("DOMContentLoaded", async () => {
  user = JSON.parse(localStorage.getItem("user"));
  let condition = user > 0 ? true : false;
  if (user) {
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
    cart = localStorage.getItem("cart");
    const cartbtn = document.querySelector(".cart");
    cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;

    const fetchedresult = await fetchData(
      `http://localhost:3000/cart/${user.id}`
    );
    const innerhtml = display(fetchedresult);
    const cartdetail = display2(fetchedresult);
    resultContainer.innerHTML = innerhtml;
    summary.innerHTML = cartdetail;
  }
});

function display2(cartList) {
  const number = cartList.length;
  let price = 0;
  cartList.forEach((element) => {
    price += element.price;
  });
  return `<h3 class="text-center">Cart summary</h3>
              <h5 class="d-flex justify-content-between p-4">
                <span>House Number</span> <span fs-5 class="number">${number}</span>
              </h5>
              <h5 class="d-flex justify-content-between px-4">
                <span>Total Price </span> <span class="price">${price} ETB</span>
              </h5>`;
}

// check
resultContainer.addEventListener("click", (e) => {
  handleCheck(e);
});
function handleCheck(e) {
  if (e.target.classList.contains("check-btn")) {
    const id = document.querySelector(".id2").innerText;
    console.log(id);
    localStorage.setItem("id", id);
    window.location.href = "house-detail.html";
  }
}

// remove functionality
resultContainer.addEventListener("click", (e) => {
  handleClick(e);
});

async function handleClick(e) {
  if (e.target.classList.contains("remove-btn")) {
    const child = e.target.parentElement.parentElement.parentElement;

    resultContainer.removeChild(child);
    const id = child.querySelector(".id").innerText;
    cart = cart - 1;
    const cartbtn = document.querySelector(".cart");
    cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
    localStorage.setItem("cart", cart);

    await removeCart(id);
    const fetched = await fetchData(`http://localhost:3000/cart/${user.id}`);
    const cartdetail = display2(fetched);
    console.log(fetched);
    summary.innerHTML = cartdetail;
  }
}

async function removeCart(id) {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
}
const logout = document.querySelector(".logout");
logout.addEventListener("click", handleLogout);
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

let resultContainer = document.querySelector("#result-house");

// fetch data
async function fetchData(endPoint) {
  const response = await fetch(endPoint, {
    mode: "cors",
    method: "GET",
    headers: {
      Authorization: `Bearer ${userResult.token}`,
    },
  });
  const result = await response.json();
  return result;
}

// display data
function display(result) {
  let html = result.map((house) => {
    return `<div class=" shadow row align-items-center mb-5" data-id="${house._id}" data-photo="${house.photos[0]} " data-place="${house.location} "data-price="${house.price}" >
                <div class="col-md-4"><img src="${house.photos[0]}"  class="mw-100" alt="main house3"></div>
                
                <div class="col-md-4">
                    <p>${house.description}</p>
                    <div class="price">${house.price} ETB</div>
                    <div class="add">${house.location}</div>
                    <div class="icons">
                        <img src="font/bed.png" alt="" width="30px"><span>${house.bed}</span></img>
                        <img src="font/bath-tub.png" alt="" width="30px"><span>${house.bathroom}</span></img>
                        <img src="font/car.png" alt="" width="30px"><span>${house.garage}</span></img>
                    </div>
                   <button class="btn btn-dark mt-5 link-btn">Make offer</button>
                   <button class="btn btn-dark mt-5 cart-btn">Add to cart</button>
                </div>
                <div class="col-md-4 container p-5">
                    <div class="row gap-3">
                        <div class="col-5"> <img src="${house.photos[1]}" class="mw-100" alt="other view1"></div>
                        <div class="col-5"> <img src="${house.photos[2]}" class="mw-100" alt="other view1"></div>
                        <div class="col-5"> <img src="${house.photos[3]}" class="mw-100" alt="other view1"></div>
                        <div class="col-5"> <img src="${house.photos[4]}" class="mw-100" alt="other view1"></div>
                    </div>
                </div>
                
               
            </div>`;
  });
  html = html.join("");
  return html;
}
let userResult;
let cart;
// what happens at loading
window.addEventListener("DOMContentLoaded", async () => {
  userResult = JSON.parse(localStorage.getItem("user"));
  const fetchedresult = await fetchData("http://localhost:3000/houses");
  const innerhtml = display(fetchedresult);
  resultContainer.innerHTML = innerhtml;
  cart = localStorage.getItem("cart");
  const cartbtn = document.querySelector(".cart");
  cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
});

// filter result

const loc = document.querySelector("#loc");
const bed = document.querySelector("#bed");
const price = document.querySelector("#price");
const sort = document.querySelector("#sortby");
const searchBtn = document.querySelector("#search-btn");
const canclehBtn = document.querySelector("#cancel-btn");

// reset all filter applied
canclehBtn.addEventListener("click", (e) => {
  handleCancle(e);
});
async function handleCancle(e) {
  e.preventDefault();
  page = 1;
  const fetchedresult = await fetchData("http://localhost:3000/houses");
  const innerhtml = display(fetchedresult);
  resultContainer.innerHTML = innerhtml;
  loc.value = "";
  bed.value = "";
  sort.value = "";
  price.value = "";
}
//  filter
searchBtn.addEventListener("click", (e) => {
  handleSearch(e);
});
async function handleSearch(e) {
  e.preventDefault();
  page = 1;
  const fetchedresult = await fetchData(
    `http://localhost:3000/houses?page=${page}&${
      bed.value && `bed=${bed.value}`
    } &${price.value && `price=${price.value}`}  &${
      sort.value && `sort=${sort.value}`
    }   &${
      loc.value &&
      `location=${loc.value.charAt(0).toUpperCase() + loc.value.slice(1)}`
    } `
  );
  const innerhtml = display(fetchedresult);
  resultContainer.innerHTML = innerhtml;
}

// load more fucntionality

const loadmoreBtn = document.querySelector("#loadmore");
let page = 1;
loadmoreBtn.addEventListener("click", loadmore);
async function loadmore() {
  page++;
  const fetchedresult = await fetchData(
    `http://localhost:3000/houses?page=${page}&${
      bed.value && `bed=${bed.value}`
    } &${price.value && `price=${price.value}`}  &${
      sort.value && `sort=${sort.value}`
    }   &${
      loc.value &&
      `location=${loc.value.charAt(0).toUpperCase() + loc.value.slice(1)}`
    } `
  );
  const htmlText = display(fetchedresult);
  let preHtml = resultContainer.innerHTML;
  preHtml = preHtml + htmlText;
  resultContainer.innerHTML = preHtml;
}
// route to  other page

resultContainer.addEventListener("click", (e) => {
  hadleClick(e);
});

async function hadleClick(e) {
  if (e.target.classList.contains("link-btn")) {
    const parent = e.target.parentElement.parentElement;
    const id = parent.dataset.id;
    localStorage.setItem("id", id);
    window.location.href = "house-detail.html";
  }
  if (e.target.classList.contains("cart-btn")) {
    const parent = e.target.parentElement.parentElement;
    body = JSON.stringify({
      houseId: parent.dataset.id,
      userId: userResult.id,
      count: 1,
      photo: parent.dataset.photo,
      name: parent.dataset.place,
      price: Number(parent.dataset.price),
    });
    await fetch("http://localhost:3000/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userResult.token}`,
      },
      mode: "cors",
      method: "POST",
      body,
    });
    cart++;
    const cartbtn = document.querySelector(".cart");
    cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
    localStorage.setItem("cart", cart);
  }
}

const logout = document.querySelector(".logout");
logout.addEventListener("click", handleLogout);
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

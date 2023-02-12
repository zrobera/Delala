const whole = document.querySelector(".whole");
let resultContainer = document.querySelector(".result-container");
let user;

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
    const cart = localStorage.getItem("cart");
    const cartbtn = document.querySelector(".cart");
    cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
    const fetchedresult = await fetchData(
      "http://localhost:3000/houses?limit=3"
    );
    const innerhtml = display(fetchedresult);
    resultContainer.innerHTML = innerhtml;
  }
});

// fetch data
async function fetchData(endPoint) {
  const response = await fetch(endPoint, {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  const result = await response.json();
  return result;
}

// display data
function display(result) {
  let html = result.map((house) => {
    return `
    <div class="col-lg-4 my-4">
                    <div class="card">
                        <img src="${house.photos[0]}"}" height="200px" class="card-img-top" alt="house">
                        <div class="card-body">
                            <h2 class="card-title">${house.price} ETB</h2>
                            <p class="card-text">${house.description}</p>
                            <span class="lead ">${house.location}</span>
                                
                            
                            <div class="item__icons d-flex ">
                                <img class="img me-2"src="font/bed.png"  width="20px" height="20px"  alt="">${house.bed}<span class="item__icons_number"></span></img>
                                <img class="img me-2"src="font/bath-tub.png"  width="20px" height="20px"  alt="">${house.bathroom}<span class="item__icons_number">2</span></img>
                                <img class="img me-2"src="font/car.png"   width="20px" height="20px"  alt="">${house.garage}<span class="item__icons_number">5</span></img>
                            </div>
                        </div>
                    </div>
                </div>`;
  });
  html = html.join("");
  return html;
}
// load more
const loadmoreBtn = document.querySelector(".more");
let page = 1;
loadmoreBtn.addEventListener("click", loadmore);
async function loadmore() {
  page++;
  const fetchedresult = await fetchData(
    `http://localhost:3000/houses?page=${page}&limit=3`
  );
  const htmlText = display(fetchedresult);
  let preHtml = resultContainer.innerHTML;
  preHtml = preHtml + htmlText;
  resultContainer.innerHTML = preHtml;
}
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  window.location.href = "sale.html";
});

const logout = document.querySelector(".logout");
logout.addEventListener("click", handleLogout);
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

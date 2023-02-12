const resultContainer1 = document.querySelector(".main");
const resultContainer2 = document.querySelector(".main2");
let user;

window.addEventListener("DOMContentLoaded", async () => {
  user = JSON.parse(localStorage.getItem("user"));
  const result = localStorage.getItem("id");
  const cart = localStorage.getItem("cart");
  const cartbtn = document.querySelector(".cart");
  cartbtn.innerHTML = ` Cart
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart}
    <span class="visually-hidden">unread messages</span>
  </span>`;
  let condition = result > 0 ? true : false;
  if (result) {
    condition = true;
  }
  if (result) {
    const fetchedresult = await fetchData(
      `http://localhost:3000/houses/${result}`
    );
    const innerhtml1 = display1(fetchedresult);
    const innerhtml2 = display2(fetchedresult);

    resultContainer1.innerHTML = innerhtml1;
    resultContainer2.innerHTML = innerhtml2;
  }
});
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

// display data
function display1(result) {
  let html = `<div class="container-lg">
            <p>
              <a rel="transcript" class="d-none" for="theVideo" title="English transcript" href="#theText">Transcript below</a>
                    </p>    
          <div class="row gap-3">
                <div class="col-lg-12">
                            <video controls class="mw-100">
                                <source src="${result.video}" type="video/mp4">
                                <p>The video depicts the entirety of the outside of a large, ground plus two house with a garden and swimming pool.
                                </p>
                            </video>
                            <transcript  class ="theText d-none" id="theText">Our website was created to fill a void in the Addis Ababa's land, apartment and house
                                marketplace to help sellers quickly dispose of burdensome properties that are often difficult to market and sell. We
                                have over 8 years of experience providing expert financial advice for both businesses and individuals. we’ll ensure
                                you’re getting the best guidance from the smartest people in the industry. For businesses and individuals, you can
                                rely on our Broker service.
                            </transcript>
                    </div>
            <div class="col-lg-5 card">
                <h2>${result.location}</h2>
                <div class="icons">
                    <img src="font/bed.png" width="30px" alt=""><span class="mf-5">${result.bed}</span></img>
                    <img src="font/bath-tub.png"  width="30px" alt=""><span class="mf-5">${result.bathroom}</span></img>
                    <img src="font/car.png"   width="30px"alt=""><span class="mf-5">${result.garage}</span></img>
                </div>
                <h4 class="text-muted">${result.price} birr</h4 >
            </div>
            <div class="col-lg-6 card">
                <h2>Eden Gelan</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, temporibus.</p>
                <a href="#">Meet the agent</a>
              
            </div>
       </div>
      </div>`;
  return html;
}
function display2(result) {
  let html = `<div class="container">
      <h1 class="text-muted">Description</h1>
      <div class="row">
        <div class="col-md-5">
            
                <div class="text">
                    <p class="text-muted">${result.description} 
                    </p>
                </div>
                <div class="detail text-muted">
                     <h1 class="">Detail</h1>
                    <span class="d-block">area: ${result.area}  SQ ft</span>
                    <span class="d-block">bed room: ${result.bed} </span>
                    <span class="d-block">bath room: ${result.bathroom} </span>
                    <span class="d-block">garage: ${result.garage} </span>
                    <span class="d-block">year build:${result.year_build} </span>
                    <span class="d-block">stories: 2</span>
                    <sapn class="d-block">roofing: new</sapn>
                </div>
            
        </div>
       
        <aside class="col-md-5">
                <button class="btn btn-lg btn-secondary">BUY NOW</button>
                <div class="map mt-3">
                    <iframe
                        src="${result.map}" style="border:0; width: 100%; height:310px" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
        </aside>
        
        </div>
    </div>`;
  return html;
}

const logout = document.querySelector(".logout");
logout.addEventListener("click", handleLogout);
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("id");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

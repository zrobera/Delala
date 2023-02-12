const price = document.querySelector("#price");
const description = document.querySelector("#description");
const bed = document.querySelector("#bed");
const bathroom = document.querySelector("#bathroom");
const parking = document.querySelector("#parking");
const photo = document.querySelector("#photo");
const video = document.querySelector("#video");
const reltor = document.querySelector("#relator");
const yearbuild = document.querySelector("#yearbuild");
const range = document.querySelector("#range");
const garage = document.querySelector("#garage");
const area = document.querySelector("#area");
const propertyname = document.querySelector("#propertyname");
const sat = document.querySelector(".status");
const loc = document.querySelector("#location");
const map = document.querySelector("#map");

const caution = document.querySelector(".caution");
const caution2 = document.querySelector(".caution2");

const createHouse = document.querySelector(".submit");

createHouse.addEventListener("click", (e) => {
  handleClick(e);
});

async function handleClick(e) {
  e.preventDefault();
  const photos = photo.value.split(",");
  const body = JSON.stringify({
    price: Number(price.value),
    description: description.value,
    bed: Number(bed.value),
    bathroom: Number(bathroom.value),
    parking: Number(parking.value),
    photos: photos,
    video: video.value,
    relator: reltor.value,
    year_build: Number(yearbuild.value),
    status: sat.value,
    price_range: range.value,
    garage: Number(garage.value),
    area: Number(area.value),
    location: loc.value,
    map: map.value,
  });
  const response = await fetch("http://localhost:3000/houses", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${result.token}`,
    },
    mode: "cors",
    method: "POST",
    body,
  });
  const result = await response.json();
  if (response.ok) {
    caution.classList.add("border-success");
    caution.classList.add("show");
    caution.innerHTML = `<h6 class="fs-5">Succesfully created</h6>`;
  }
  if (!response.ok) {
    caution.classList.add("border-danger");
    caution.classList.add("show");
    caution.innerHTML = `<h6 class="fs-5">${result.message}</h6>`;
  }
}
let result;
window.addEventListener("DOMContentLoaded", async () => {
  result = JSON.parse(localStorage.getItem("user"));
  let condition = result > 0 ? true : false;
  if (result) {
    condition = true;
  }
});

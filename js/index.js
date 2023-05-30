const MockApi = "http://localhost:3000/princess";
const Mock_Api = "http://localhost:3000/favorites";
let nav = document.querySelector(".mobileNav");
let bar = document.querySelector(".fa-bars");
let header = document.querySelector("header");
let logo2 = document.querySelector(".logo2");
let exit = document.querySelector(".fa-x");
let valueOfBar;
let row = document.querySelector(".row");
let sortBtn = document.querySelector("#sort");
let valueOfSort = "asc";
let sorted;
let filtered;
let value;
let valueOfSearch = "x";
let searchBtn = document.querySelector(".search");
bar.addEventListener("click", function (e) {
  e.preventDefault();

  valueOfBar = "y";
  bar.style.display = "none";
  valueOfBar = "x";
  nav.style.display = "block";
  header.style.backgroundColor = "black";
  logo2.style.display = "none";
});
exit.addEventListener("click", function () {
  valueOfBar = "y";
  nav.style.display = "none";
  bar.style.display = "block";
  // exit.style.display = "none";
  logo2.style.display = "block";
});

/////////////////////////////////////////////////////////

async function getAllData() {
  let res = await axios(MockApi);
  let data = res.data;
  listOfData(data);
  // getDataForSort();
}
function listOfData(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
  <div class="col-lg-4 col-sm-12">
              <div class="card" style="width: 25rem">
                <img src="./assets/img/images.jpg" class="card-img-top" alt="" />
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">
                    ${item.info}
                  </p>
                  <p class="card-text">
                    ${item.age}
                  </p>
                 <div class="card-buttons">
                  <a href="favorite.html?id=${item.id}" class="btn btn-primary"id=fav onclick=addFavorites(${item.id}) >Favorites</a>
                  <a href="addEdit.html?id=${item.id}" class="btn btn-primary" id="edit" onclick=editData(${item.id}) >Edit</a>
                  <a href="" class="btn btn-primary" id="delete" onclick=deleteData(${item.id})>Delete</a>
                 </div>
                </div>
              </div>
            </div>
  `;
  });
}
getAllData();
async function deleteData(id) {
  await axios.delete(`${MockApi}/${id}`);
}

sortBtn.addEventListener("click", function () {
  sortData();
  a();
});

async function sortData() {
  let res = await axios(MockApi);
  let data = res.data;

  if (valueOfSort === "asc") {
    valueOfSort = "dsc";
    sorted = data.sort((a, b) => +a.age - +b.age);
    sortBtn.innerHTML = `dsc`;
    listOfData(sorted);
  } else if (valueOfSort === "dsc") {
    valueOfSort = "def";
    sorted = data.sort((a, b) => +b.age - +a.age);
    sortBtn.innerHTML = `def`;
    listOfData(sorted);
  } else {
    valueOfSort = "asc";
    sortBtn.innerHTML = `Asc`;
    getAllData();
  }
}

// searchBtn.addEventListener("input", async function (e) {
//   let res = await axios(MockApi);
//   let data = res.data;
//   value = e.target.value;
//   filtered = data.filter((item) =>
//     item.name.toLowerCase().includes(value.toLowerCase())
//   );

//   sorted = filtered.sort((a, b) => +a.age - +b.age);

//   console.log(sorted);

//   listOfData(sorted);
//   getAllDataForSort();
// });

// async function getAllDataForSort() {
//   sorted.forEach((item) => {
//     row.innerHTML += `
//     <div class="col-lg-4 col-sm-12">
//                 <div class="card" style="width: 25rem">
//                   <img src="./assets/img/images.jpg" class="card-img-top" alt="" />
//                   <div class="card-body">
//                     <h5 class="card-title">${item.name}</h5>
//                     <p class="card-text">
//                       ${item.info}
//                     </p>
//                     <p class="card-text">
//                       ${item.age}
//                     </p>
//                    <div class="card-buttons">
//                     <a href="favorite.html?id=${item.id}" class="btn btn-primary"id=fav onclick=addFavorites(${item.id}) >Favorites</a>
//                     <a href="addEdit.html?id=${item.id}" class="btn btn-primary" id="edit" onclick=editData(${item.id}) >Edit</a>
//                     <a href="" class="btn btn-primary" id="delete" onclick=deleteData(${item.id})>Delete</a>
//                    </div>
//                   </div>
//                 </div>
//               </div>
//     ;
//     });
//     `;
//   });
// }

searchBtn.addEventListener("input", function (e) {
  value = e.target.value;
  a();
});
async function a() {
  let res = await axios(MockApi);
  let data = res.data;
  filtered = data.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  console.log(filtered);
  sortSearch();
}
async function sortSearch() {
  if (valueOfSearch === "x") {
    valueOfSearch = "y";
    sorted = filtered.sort((a, b) => +a.age - +b.age);
    listOfData(sorted);
  } else if (valueOfSearch === "y") {
    valueOfSearch = "z";
    sorted = filtered.sort((a, b) => +b.age - +a.age);
    listOfData(sorted);
  } 
  else {
    valueOfSearch = "x";
    listOfData(filtered)
  }
}

const MockApi = "http://localhost:3000/princess";
let form = document.querySelector("form");
let inputName = document.querySelector("#name");
let inputInfo = document.querySelector("#info");
let inputAge = document.querySelector("#age");
let id = new URLSearchParams(window.location.search).get("id");
let subBtn=document.querySelector("#sub")
async function addData() {
  let obj = {
    name: inputName.value,
    info: inputInfo.value,
    age: inputAge.value,
  };
  let res = await axios.post(MockApi, obj);
  let data = res.data;
}

async function editData(id) {
  let obj = {
    name: inputName.value,
    info: inputInfo.value,
    age: inputAge.value,
  };
  let res = await axios.patch(`${MockApi}/${id}`, obj);
  //   let data = res.data;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (id) {
    editData(id);
  } else {
    addData();
  }
  window.location = "../index.html";
});

async function getDataForEdit() {
  let res = await axios(`${MockApi}/${id}`);
  let data = res.data;
  (inputName.value = data.name),
    (inputInfo.value = data.info),
    (inputAge.value = data.age);
}
if (id) {
  getDataForEdit();
subBtn.innerHTML=`Edit`

}
else{
    subBtn.innerHTML=`Add`
}
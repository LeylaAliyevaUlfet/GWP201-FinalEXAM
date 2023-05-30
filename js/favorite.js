const MockApi="http://localhost:3000/favorites"
async function addFav() {
    let obj = {
      name: data.name,
      info: data.info,
      age: data.age,
    };
    let res = await axios.post(MockApi, obj);
    let data = res.data;
  }
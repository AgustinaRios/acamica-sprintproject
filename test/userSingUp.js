const assert = require('chai').assert;
const fetch = require('node-fetch');
const url = 'http://localhost:5000/users';

describe("Test API Register", () => {

    it("1.Signup: creación fallida de usuario", async () => {
      await fetch(url + "/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "name": "Leandro",
          "surname": "Vallejos",
          "email": "leandro@gmail.com",
          "password": "violeta"
        }),
      })
      .then(responseApi => responseApi.json())
      .then(data =>{
  
          
          assert.strictEqual(data.status, 500, 'One state expected: 500');
      })
    });
  
    it("2.Signup : Creación exitosa de usuario", async () => {
      await fetch(url + "/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "name": "Agustina",
          "surname": "Rios",
          "email": "Agus",
          "userName": "agus@gmail.com",
          "password": "nusa",
          "phone": "61835128",
          "adress": "allende 123"
        }),
      })
      .then(responseApi => responseApi.json())
      .then(data =>{
  
         
          assert.strictEqual(data.status, 201, 'One state expected: 201');
          assert.exists(data.response.token, 'A token is expected in response');
      })
    });
  
    it("3.Signup : Email repetido", async () => {
      await fetch(url + "/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          "name": "Agustina",
          "surname": "Rios",
          "email": "Agus",
          "userName": "agus@gmail.com",
          "password": "sanLorenzo",
          "phone": "61835128",
          "adress": "Santo Tome 4749"
        }),
      })
      .then(responseApi => responseApi.json())
      .then(data =>{
  
          
          assert.strictEqual(data.status, 400, 'One state expected: 400');
      })
    });
  });
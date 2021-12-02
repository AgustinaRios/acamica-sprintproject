const assert = require('chai').assert;
const fetch = require('node-fetch');
const urlAPI = 'http://localhost:5000/users';

describe("", () => {
  it("1.API Signup: Falla por faltante de datos", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "name": "datos",
        "surname": "prueba"
      }),
    })
    
    .then(data =>{

        assert.strictEqual(data.status, 500, 'HttpStatus esperado: 500');
    })
  });
});


describe("", (req,res) => {
  it("2. API Signup : Creacion correcta de usuario", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "name": "Juan",
        "surname": "Perez",
        "email": "juan@gmail.com",
        "userName": "juancito",
        "password": 'rock',
        "phone": '0821389231',
        "adress": "allende 232",
        "admin":false
      }),
    })
    //.then(responseApi => responseApi.json())
    .then(data =>{
        assert.strictEqual(data.status, 400, 'HttpStatus esperado: 400');
        
    })
  });
});



describe("", () => {
  it("3.API Signup : Existing email", async () => {
    await fetch(urlAPI + "/signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        "name": "admin",
        "surname": "admin",
        "email": "juan@gmail.com",
        "userName":"Juance",
        "password": "juanito",
        "phone": '123456',
        "adress": 'Santo tome 123',
        "admin": false,
        
      }),
    })
   
    .then(data =>{

 
        assert.strictEqual(data.status, 400, 'HttpStatus esperado: 400');
    })
  });
});
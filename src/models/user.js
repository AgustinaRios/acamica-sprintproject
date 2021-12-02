const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/db')

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

module.exports = User;
// the defined model is the class itself
console.log(User === sequelize.models.User); // true



/*class User {
    constructor(name,surname,userName,email,password,phone,adress,admin){
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.userName=userName;
        this.password=password;
        this.phone=phone;
        this.adress=adress;
        this.admin=admin;
       
    }
}

const create = (user) => {users.push(user)};


const getUser = (userName,password) => { 
    for (let i=0; i<users.length;i++){
        if( userName==users[i].userName&&password==users[i].password){
            return { found: true , user: users[i], index: i }; 
        }
    }
    return { found: false , user: null }; 
}

let users = []


let user1 = new User("agustina","rios","agus","agus@gmail.com","1990","81817","isla",false);
let user2 = new User("salva","rios","salva","salva@gmail.com","river","81857","santo tome",false);
let user3 = new User("martin","galano","tincho","martin@gmail.com","rojo","81817","allende",false);
let user4 = new User("admin","admin","admin","admin@gmail.com","admin","81817","admin",true);

users.push(user1);
users.push(user2);
users.push(user3);
users.push(user4);

module.exports={users,User,create,getUser};*/
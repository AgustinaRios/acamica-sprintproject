class Payment{
    constructor( name,_enabled){
       
        this.name=name;
        this._enabled=true;
    }
}

const create = (payment) => {payments.push(payment)};


const remove = (payment) => {
    if (payment._enabled=true){

        payment._enabled=false}
    
};


let payments=[];

let payment1= new Payment('cash',true);
let payment2= new Payment('credit card',true);
let payment3= new Payment('QR',true);                        

payments.push(payment1);
payments.push(payment2);
payments.push(payment3);

module.exports={Payment,payments,create,remove};
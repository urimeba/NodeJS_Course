
const person = {
    name: 'Uriel',
    age: 23,

    greet() {
        console.log("Hi, I'm " + this.name)
    }
};

const hobbies = ['Sports', 'Cooking']
// console.log(hobbies.map(hobby => 'Hobby: ' + hobby ));

// DESESTRUCTURNADO UN ARRAY
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);

// SLICE copia el array entero
// ... (SPREAD) saca todos los elementos de un array
// const CopiedArray =  [...hobbies];

// REST agrega elementos a un array 
// const toArray = (...args) =>{
//     return args;
// }



// DESTRUCTURANDO objetos con las llaves
const printName = ({name}) =>{
    console.log(name);
}

printName(person);

const {name, age} = person;
console.log(name, age);









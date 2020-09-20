const itemsContainer = document.getElementById("items");
import data from './data.js';

// the number of items in the array will determine the times it will loop through

for(let i = 0; i< data.length; i++){

    let newDiv = document.createElement("div");
    newDiv.className = "item";

    let img = document.createElement("img");

    img.src = data[i].image;
    img.width = 300;
    img.height = 300;

    newDiv.appendChild(img);
    console.log(img)
    itemsContainer.appendChild(newDiv);

    let desc = document.createElement("P");
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc);

    let price = document.createElement("P");
    price.innerText = data[i].price;
    newDiv.appendChild(price);

    let button = document.createElement("button");
    button.id = data[i].name;
    button.dataset.price = data[i].price;
    button.innerHTML = "Add to Cart";
    newDiv.appendChild(button);
    
}

const cart = [ ];

function addItem(name, price){
    const item = {name: name, price: price, qty: 1}
cart.push(item)
}

function showItems(){
    console.log( `you have ${cart.length} items in your cart`)
}

addItem('Apple', 0.99);
addItem('Orange', 1.29);
showItems();


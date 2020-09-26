const itemsContainer = document.getElementById("items");
import data from './data.js';

// the number of items in the array will determine the times it will loop through

data.forEach(function (object, index){
    // creates a new div element with the class name "item"
    let newDiv = document.createElement("div");
    newDiv.className = "item";

    // creates a img tag
    let img = document.createElement("img");
    // goes through each index called object and gives it these attributes
    img.src = object.image;
    img.width = 300;
    img.height = 300;
    // add it to the div tag
    newDiv.appendChild(img);
    document.querySelector('#items').appendChild(newDiv)
    console.log(img);

    // create a p tag
    let desc = document.createElement("p");
    desc.innerText = object.desc; // grabs the value for the key description
    newDiv.appendChild(desc); // adds it to the div tag
    console.log(desc);

     // create a p tag
    let price = document.createElement("p");
    price.innerText = object.price; // grabs the value for the key price
    newDiv.appendChild(price); // adds it to the div tag
    console.log(price)

    let button = document.createElement("button"); // create a button
    button.id = object.name;  // grabs the value for the key name
    button.dataset.price = object.price;
    button.innerHTML = "Add to Cart"; // name of button
    newDiv.appendChild(button); // add it to the div tag
    console.log(button)
    
});

const cart = [ ];
// --------------------------------------------
// Add Item
function addItem(name, price){
    for(let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            cart[i].qty += 1
            return
        }
    }
    const item = {name, price, qty: 1}
cart.push(item)
}
// -----------------------------------------------------------------------
// shows Items in the cart
function showItems(){
    const qty = getQty()
    const total = getTot()
    console.log( `you have ${qty} items in your cart`);
    
    for(let i = 0; i < cart.length; i += 1){
        console.log(`$${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
    }

    console.log(`Total in cart: $${total}`)
}
// -----------------------------------------------------------------------
// get and return the quantity
function getQty(){
    let qty = 0;
    for(let i = 0; i < cart.length; i += 1){
        qty += cart[i].qty;
    }
    return qty
}
// --------------------------------------------
//get and return the total
function getTot(){
    let total = 0;
    for(let i = 0; i < cart.length; i += 1){
        total += cart[i].price * cart[i].qty
    }
    return total.toFixed(2)
}

function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){

            if(qty > 0){
                cart[i].qty -= qty
            }

            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1)
            }
            return
        }
    }
}
// --------------------------------------------
// call add and show item functions. This prints it to the console
addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Apple', 0.99);
addItem('Orange', 1.29);
addItem('Grapes', 5.99);

removeItem('Orange')
removeItem('Grapes');
// shows the items to the console
showItems();


const itemsContainer = document.getElementById("items");
const itemList = document.getElementById("item-list");
const cartQty = document.getElementById("cart-qty");
const cartTotal = document.getElementById("cart-total");
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
    //console.log(img);

    // create a p tag
    let desc = document.createElement("p");
    desc.innerText = object.desc; // grabs the value for the key description
    newDiv.appendChild(desc); // adds it to the div tag
    //console.log(desc);

     // create a p tag
    let price = document.createElement("p");
    price.innerText = object.price; // grabs the value for the key price
    newDiv.appendChild(price); // adds it to the div tag
    //console.log(price)

    let button = document.createElement("button"); // create a button
    button.id = object.name;  // grabs the value for the key name
    button.dataset.price = object.price;
    button.innerHTML = "Add to Cart"; // name of button
    newDiv.appendChild(button); // add it to the div tag
    //console.log(button)
    
});
//add adds or removes items if item = 0 it'll remove the item from the cart
//itemList.addEventListener('click', function(){console.log(">>>>>>>>>")})
itemList.onclick = function(e){
    console.log("It's Clicked!!********")
    if(e.target && e.target.classList.contains("remove")){
        const name = e.target.dataset.name // same as data-name
        removeItem(name)
    } else if (e.target && e.target.classList.contains("add-one")){
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains("remove-one")){
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}
// connects to add to cart button to the add item function
const all_items_button = Array.from(document.querySelectorAll("button"))
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

const cart = [ ];
// --------------------------------------------

//Handle changed events on the update input
itemList.onchange = function(e){
    if(e.target && e.target.classList.contains("update")){
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

// --------------------------------------------
// Add Item
function addItem(name, price){
    for(let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            cart[i].qty += 1
            showItems()
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

    cartQty.innerHTML = `you have ${qty} items in your cart`
    
    let itemStr = ''
    for(let i = 0; i < cart.length; i += 1){
        // assigns each of these variables in the curly braces to cart[i]
        const {name, price, qty} = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = ${qty * price}
        <button class="remove" data-name="${name}"> Remove </button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr
    cartTotal.innerHTML = `Total in cart: $${total}`
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
            showItems()
            return
        }
    }
}

// --------------------------------------------

function updateCart(name, qty){
    for(let i = 0; i < cart.length; i += 1){
        if(cart[i].name === name){
            if(qty < 1){
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}
// --------------------------------------------
// call add and show item functions. This prints it to the console
// addItem('Apple', 0.99);
// addItem('Orange', 1.29);
// addItem('Apple', 0.99);
// addItem('Orange', 1.29);
// addItem('Grapes', 5.99);

// removeItem('Orange')
// removeItem('Grapes');
// // shows the items to the console
// showItems();

console.log(itemList)

console.log('start script');

let orderedElements = [];

fetch('./assets/Wacdonald/Wacdonald/menu.json')
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
    console.log(data);
    let menus = data;
    menus.map(menu => {
        let menuelement ="";
        let productelement ="";

        menu.cat==="menu" ? menuelement = `
        <div class="card-menu-item" id="`+menu.id+`" key="`+menu.key+`">
                    <img src="/assets/Wacdonald/Wacdonald/icons/`+menu.icon+`"/>
                    <div>`+menu.name+`</div>
                </div>
        ` : '' ;

        menu.cat==="product" ? productelement = `
        <div class="card-menu-item" id="`+menu.id+`">
                    <img src="/assets/Wacdonald/Wacdonald/icons/`+menu.icon+`"/>
                    <div>`+menu.name+`</div>
                </div>
        ` : '' ;

            document.getElementById("menu").insertAdjacentHTML('beforeend', menuelement);
            document.getElementById("product").insertAdjacentHTML('beforeend', productelement);
        });
        
        let elements = document.getElementsByClassName("card-menu-item");
        
        Array.from(elements).forEach(function(element){
            element.addEventListener("mouseenter",function(){
                //console.log("enter");
                element.className = "clicked-card-menu-item";
            });
            element.addEventListener("mouseleave",function(){
                //console.log("leave");
                element.className = "card-menu-item";
            });
            element.addEventListener("click",function(){
                
                let menuSelected = menus.find(menu => menu.id == element.id);
               
                
                orderedElements.includes(menuSelected) ? "" : orderedElements.push(menuSelected);

                console.log(orderedElements);
                addItemToOder();
            });
        });
});

function addItemToOder(){
    document.getElementById("orderlist").innerHTML ="";
    console.log("addItemToOder");
    let price = 0;
    orderedElements.map( order => {
        let orderelement = `
                    <div class="order-item">
                        <img src="/assets/Wacdonald/Wacdonald/icons/`+order.icon+`"/>
                        <div class="item-title">`+order.name+`</div>
                        <div class="item-price">$ `+order.price+`</div>
                        <div class="item-counter">
                            <button class="en-button" id="en-button-`+order.id+`" value="-">-</button>
                            <div class="counter" id="counter-`+order.id+`" value="1">1</div>
                            <button class="add-button" id="add-button-`+order.id+`" value="+">+</button>
                    </div>
                `;
                document.getElementById("orderlist").insertAdjacentHTML("beforeend", orderelement);
                    
        // up order price
       
        price = price + order.price;
        totalNode = document.getElementById("total-price");
        totalNode.innerHTML = "$"+price;
        totalNode.setAttribute("value", price);
        
        //adding the function buttons - 1 +
        let addButton = document.getElementById(`add-button-`+order.id);
        let enButton = document.getElementById(`en-button-`+order.id);

        addButton.addEventListener("click",function(){
            let counterValue = parseInt(document.getElementById(`counter-`+order.id).getAttribute("value"));
            console.log(counterValue);
            counterValue = counterValue + 1;
            document.getElementById(`counter-`+order.id).setAttribute("value",counterValue);
            document.getElementById(`counter-`+order.id).innerHTML = counterValue;

            //update price
            price = price + order.price;
            totalNode = document.getElementById("total-price");
            totalNode.innerHTML = "$"+price;
            totalNode.setAttribute("value", price);

        });

        enButton.addEventListener("click",function(){
            let counterValue = parseInt(document.getElementById(`counter-`+order.id).getAttribute("value"));
            if (counterValue > 0 ){
                console.log(counterValue);
                counterValue = counterValue - 1;
                document.getElementById(`counter-`+order.id).setAttribute("value",counterValue);
                document.getElementById(`counter-`+order.id).innerHTML = counterValue;

                //update item price
                price = price - order.price;
                totalNode = document.getElementById("total-price");
                totalNode.innerHTML = "$"+price;
                totalNode.setAttribute("value", price);
                //update order price

            }
        });
    })
}
    

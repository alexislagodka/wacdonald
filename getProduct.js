console.log('get Menu & pruduct');
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
        console.log(elements);
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
                console.log(element.id);
                let selected = menus.find(menu => menu.id == element.id);
                console.log(selected);
                 let orderelement = `
                    <div class="order-item">
                        <img src="/assets/Wacdonald/Wacdonald/icons/`+selected.icon+`"/>
                        <div class="item-title">`+selected.name+`</div>
                        <div class="item-price">$ `+selected.price+`</div>
                        <div class="item-counter">
                            <button class="add-button" value="-">-</button>
                            <div class="counter">1</div>
                            <button class="en-button" value="+">+</button>
                    </div>
                `;
                document.getElementById("orderlist").insertAdjacentHTML("beforeend", orderelement);
            });
        });
       
});
    

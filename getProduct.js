console.log('get Menu & pruduct');

fetch('./assets/Wacdonald/Wacdonald/menu.json')
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
    console.log(data);
    menu = data;
    menu.map(menu => {
        
        let menuelement ="";
        let productelement ="";

        menu.cat==="menu" ? menuelement = `
        <div class="card-menu-item" id="`+menu.id+`" >
                    <img src="/assets/Wacdonald/Wacdonald/icons/`+menu.icon+`"/>
                    <div>`+menu.name+`</div>
                </div>
        ` : '' ;

        menu.cat==="product" ? productelement = `
        <div class="card-menu-item" key="" >
                    <img src="/assets/Wacdonald/Wacdonald/icons/`+menu.icon+`"/>
                    <div>`+menu.name+`</div>
                </div>
        ` : '' ;

            document.getElementById("menu").insertAdjacentHTML('beforeend', menuelement);
            document.getElementById("product").insertAdjacentHTML('beforeend', productelement);
        });
    });
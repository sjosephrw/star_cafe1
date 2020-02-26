window.addEventListener('resize', () => {
  document.querySelector('.submenu').classList.add("hide");
  document.querySelector('.submenu').classList.remove("show");
});


document.getElementById('toggle-submenu').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('.submenu').classList.contains('show')){
      document.querySelector('.submenu').classList.remove("show");
      document.querySelector('.submenu').classList.add("hide");
  } else {
      document.querySelector('.submenu').classList.remove("hide");
      document.querySelector('.submenu').classList.add("show");        
  }
});

function hideSubMenuOnLoad(){
    document.querySelector('.submenu').classList.remove("show");
    document.querySelector('.submenu').classList.add("hide");
  
}

hideSubMenuOnLoad();

function myFunction(x) {
    if (x.matches) { // If media query matches
        document.querySelector('.links-navi').classList.remove("show");
        document.querySelector('.links-navi').classList.add("hide");
        
        document.querySelector('.resp-menu-open').classList.remove("hide");
        document.querySelector('.resp-menu-open').classList.add("show");    
    
        document.querySelector('.resp-menu-close').classList.remove("show");
        document.querySelector('.resp-menu-close').classList.add("hide");         
        

    } else {
        document.querySelector('.links-navi').classList.remove("hide");
        document.querySelector('.links-navi').classList.add("show"); 

        document.querySelector('.resp-menu-open').classList.remove("show");
        document.querySelector('.resp-menu-open').classList.add("hide"); 
        
        document.querySelector('.resp-menu-close').classList.remove("show");
        document.querySelector('.resp-menu-close').classList.add("hide");         

    }
  }
  
  var x = window.matchMedia("(max-width: 600px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes

  document.querySelector('.resp-menu-open').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.links-navi').classList.remove("hide");
    document.querySelector('.links-navi').classList.add("show"); 

    document.querySelector('.resp-menu-open').classList.remove("show");
    document.querySelector('.resp-menu-open').classList.add("hide");    

    document.querySelector('.resp-menu-close').classList.remove("hide");
    document.querySelector('.resp-menu-close').classList.add("show");     
    
  });


  document.querySelector('.resp-menu-close').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.links-navi').classList.remove("show");
    document.querySelector('.links-navi').classList.add("hide"); 

    document.querySelector('.resp-menu-open').classList.remove("hide");
    document.querySelector('.resp-menu-open').classList.add("show");    

    document.querySelector('.resp-menu-close').classList.remove("show");
    document.querySelector('.resp-menu-close').classList.add("hide");     
    
  });

  hideCartDropDownOnPageLoad();

  function hideCartDropDownOnPageLoad(){
    document.querySelector('.contents-dropdown').classList.remove("show");
    document.querySelector('.contents-dropdown').classList.add("hide");      
  }
  
  document.querySelector('.link-cart').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.contents-dropdown').classList.remove("hide");
    document.querySelector('.contents-dropdown').classList.add("show");
  });

  document.querySelector('.cart-dropdown-close').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.contents-dropdown').classList.remove("show");
    document.querySelector('.contents-dropdown').classList.add("hide");  
  });
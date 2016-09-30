/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: cart.js
 */

"use strict"; // interpret JavaScript in strict mode

function checkCart() {
   var cart = document.getElementById("cart");
   if (document.cookie) {
      cart.setAttribute("src", "images/shopping_cart_full.png");
   } else {
      cart.setAttribute("src", "images/shopping_cart_empty.png");
   }
}

// call function when window loads
if (window.addEventListener) {
   window.addEventListener("load", checkCart, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", checkCart);
}

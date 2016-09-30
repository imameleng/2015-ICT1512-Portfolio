/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: prod_order.js
 */

"use strict"; //interpret Javascript in strict mode

//global variables
var qtyCounter = [ 0, 0, 0, 0, 0, 0];
var formVal;

function getCookie() {
   // check if a cookie set
   if (document.cookie) { 
      // decode cookie string and set as value of cookieString variable
      var cookieString = decodeURIComponent(document.cookie);
      // create substring of values only
      cookieString = cookieString.substring(cookieString.indexOf("=") + 1);
      // split string into array
      var cookieArray = cookieString.split(",");
      
      for (var i = 0; i < cookieArray.length; i++) {
         // convert string to numeric values
         cookieArray[i] = Number(cookieArray[i]);
      }
      
      // set element values of qtyArray same as cookieArray
      qtyCounter = cookieArray;
      // display values
      var qtyFields = document.querySelectorAll("span.itemQty");      
      for (var i = 0; i < qtyFields.length; i++) {
         qtyFields[i].innerHTML = qtyCounter[i];
      }
   }
}

//increment qtyCounter when 'add' button is clicked
// based on caller element
function addItem(e) {
   if (e === undefined) { // get caller element in IE8
      e = window.event;
   }
   // determine caller element
   var target = e.target || e.srcElement;
   // fetch all add buttons 
   var addBtn = document.querySelectorAll("input.add");
   // fetch all quantity display elements 
   var qtyFields = document.querySelectorAll("span.itemQty"); 
   for (var i = 0; i < addBtn.length; i++) {
      if (target == addBtn[i]) {
         // increment appropriate array element value based on caller element
         qtyCounter[i] += 1;
         // display quantity in appropriate element
         qtyFields[i].innerHTML = qtyCounter[i];
      }
   }
}

//decrement qtyCounter when 'remove' button is clicked
function removeItem(e) {
   if (e === undefined) { // get caller element in IE8
      e = window.event;
   }
   // determine caller element
   var target = e.target || e.srcElement;
   // fetch all remove buttons
   var removeBtn = document.querySelectorAll("input.remove");
   // fetch all quantity display elements
   var qtyFields = document.querySelectorAll("span.itemQty");
   for (var i = 0; i < removeBtn.length; i++) {
      if (target == removeBtn[i]) {
         // decrement appropriate array element value based on caller element
         qtyCounter[i]--;
         // check if value is less that zero
         if (qtyCounter[i] < 0) {
            qtyCounter[i] = 0; // set back to zero (value cant be less than 0)
         }
         // display quantity in appropriate element
         qtyFields[i].innerHTML = qtyCounter[i];
      }
   }
}


//test if all values in array are more than zero
function testValue(element, index, array) {
   var numExp = /^[1-9][0-9]*$/; // test numeric value
   return numExp.test(element); // return result of RegExp test() method (true / false)
}

// check that least one one item is ordered, else throw exception
function validateOrder() {
   // fetch all quantity display elements
    var qtyFields = document.querySelectorAll("span.itemQty");
    // fetch error message element
    var errorDiv = document.getElementById("errmsg");
    var orderVal = true; // reset order validity
    
    /* use some() method of Array class to call testValue() function, 
       to test that ALL values of array elements are not zero
       which would make order invalid */
    var result = qtyCounter.some(testValue); 
    try {
        //check if at least one item is ordered
         if (result === false) { // all elements in array had 0 values
            for (var i = 0; i < qtyCounter.length; i++) {
               // set red borders to indicate an error
               qtyFields[i].style.border = "1px solid red";
               orderVal = false; // set validity to false 
            }
        } else {
            for (var i = 0; i < qtyCounter.length; i++) {
               // reset borders
               qtyFields[i].style.border = "1px solid gray";
            }
        }
        if (orderVal === false) {
           // trow error message
            throw "Please select at least one item before you place an order."
        }
        errorDiv.style.display = "none";
        errorDiv.innerHTML = "";
    }
    catch (message) {
      //display error message        
        errorDiv.style.display = "block"
        errorDiv.innerHTML = message;
        formVal = false;
   }
}

// function to set cookie with item quantities for order
function setCookie() {
   //set expires date
   var expiresDate = new Date();
   expiresDate.setDate(expiresDate.getDate() + 7);
   // convert array elements to string
   var qtyString = qtyCounter.toString();
   // URI encode string and set cookie
   document.cookie = "itemCounts" + "=" + encodeURIComponent(qtyString) + "; expires=" + expiresDate.toUTCString();
}

// function to validate order and submit order to checkout
function placeOrder(evt) {
    var errorDiv = document.getElementById("errmsg");
    if(evt.preventDefault) {
        //prevent the form from submitting
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formVal = true; // reset form validity
    //call validation function
    validateOrder();
    if (formVal === true) {
      //set cookie and submit form if validation passed
        setCookie();
        document.getElementById("form").submit();
        // hide error div
        errorDiv.innerHTML = "";
        errorDiv.style.display = "none";
    } 
}

// create event handlers
function createEventHandlers() {
   // event handlers for add and remove buttons
   var addBtn = document.querySelectorAll("input.add");
   var removeBtn = document.querySelectorAll("input.remove");
   if (addBtn[0].addEventListener) {
      for (var i = 0; i < addBtn.length; i++) {
         addBtn[i].addEventListener("click", addItem, false);
         removeBtn[i].addEventListener("click", removeItem, false);
      }       
   } else if (addBtn.attachEvent) {
      for (var i = 0; i < addBtn.length; i++) {
               addBtn[i].attachEvent("onclick", addItem);
               removeBtn[i].attachEvent("onclick", removeItem);
      }
   }
   //event handler for order button
   var orderBtn = document.getElementById("orderbutton");
   if (orderBtn.addEventListener) {
      orderBtn.addEventListener("click", placeOrder, false);
   } else if (orderBtn.attachEvent) {
      orderBtn.attachEvent("onclick", placeOrder);
   }
}


function setupPage() {
   createEventHandlers();
   getCookie();
}

// set up page when page loads
if (window.addEventListener) {
   window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setupPage);
}

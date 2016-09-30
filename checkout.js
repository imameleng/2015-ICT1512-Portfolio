/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: orders.js
 */

"use strict";

//global variables
var formVal = true;
var contactVal = true;
var billVal = true;
var delVal = true;
var delFee = 0;
var cookieArray = [];
var cost = [0,0,0,0,0,0];

// parse cookie & populate cookieArray with item counts
function getCookie() {
   if (document.cookie) { // check if a cookie set
      // decode cookie string and set as value of cookieString variable
      var cookieString = decodeURIComponent(document.cookie);
      // create substring of values only
      cookieString = cookieString.substring(cookieString.indexOf("=") +1);
      // split string into array
      cookieArray = cookieString.split(",");
      for(var i = 0; i < cookieArray.length; i++) {
         // convert string to numeric values
         cookieArray[i] = parseInt(cookieArray[i], 10);
      }
      // populate hidden form fields
      var hidden = document.getElementsByClassName("hidden");
      for (var i = 0; i < cookieArray.length; i++) {
         hidden[i].value = cookieArray[i];
      }
      var today = new Date()
      document.getElementById("order-date").value = today.toDateString();
      // call function to render the order summary table
      displaySummary();
   } else {
      // hide form and display message that no order was placed
      document.getElementById("form-01").style.display = "none";
      document.getElementById("orderStatus").style.display = "block";
   }   
}

function clearCookie() {
  var cookieString = document.cookie;
  var expiresDate = new Date();
  expiresDate.setDate(expiresDate.getDate() - 7);
  document.cookie = cookieString + "; expires=" + expiresDate.toUTCString();
}

// function to render and display summary of order
function displaySummary() {
   // fetch table data cells
   var itemCells = document.getElementsByClassName("qty");
   var costCells = document.getElementsByClassName("cost");
   var tableRow = document.querySelectorAll("tbody tr");
   // declare array variable with item prices
   var itemPrice = [85, 85, 90, 45, 65, 65];
   // loop through and add item counts to table cells
   for (var i = 0; i < cookieArray.length; i++) {
      itemCells[i].innerHTML = cookieArray[i];
      //calculate and display costs of each item ordered
      cost[i] = cookieArray[i] * itemPrice[i];
      costCells[i].innerHTML = cost[i].toFixed(2);
      if (cookieArray[i] === 0) {
         // hide table rows with 0 values
         tableRow[i].style.display = "none";
      } else {
         // display values > 0
         tableRow[i].style.display = "table-row";
      }
   }
   // call function to calculate totals and tax
   calculateTotal();
}

//function to calculate and display cost
function calculateTotal() {
   // declare variables   
   var subTotal = 0;
   var tax = 0;
   var total = 0;
   //multiply product quantity with the relevant price
   for (var i = 0; i < cookieArray.length; i++) {
        subTotal = subTotal + cost[i];
    }
   // calculate the total due
   tax = subTotal * 0.14;
   total = subTotal + tax + delFee;
   // display totals
   document.getElementById("subtotal").innerHTML = subTotal.toFixed(2);
   document.getElementById("tax").innerHTML = tax.toFixed(2);
   document.getElementById("delfee").innerHTML = delFee.toFixed(2);
   document.getElementById("total").innerHTML = total.toFixed(2);
}

//function to check delivery fee
function deliveryFee() {
   var delOption = document.getElementsByName("delivery");
      //check if delivery option selected and assign del fee
    if (delOption[1].checked) {
      delFee = 100;
    } else {
      delFee = 0;
    }
    // call function to calculate totals
    calculateTotal();
}

function goBack() {
   location.assign("products.html");
}

// function to display contact and address details
function displayDetails() {   
   // fetch division elements
   var sectionOne = document.getElementById("section-one");
   var sectionTwo = document.getElementById("section-two");
   // hide section one (order summary)
   sectionOne.style.display = "none";
   // show section two (contact and delivery details)
   sectionTwo.style.display = "block";
}

// function to copy billing address to shipping address when checkbox is checked
function copyAddress () {
   // fetch input elements
    var billInput = document.querySelectorAll("#billingaddr input");
    var delInput = document.querySelectorAll("#deliveryaddr input")
    var sameAddr = document.getElementById("sameAddr");
    if (sameAddr.checked) { // check if checkbox is checked
        for (var i = 0; i < billInput.length; i++) {
           // copy delivery address values to billing address input element values
            delInput[i+1].value = billInput[i].value;
        }    
    } else {
        for (var i = 0; i < billInput.length; i++) {
           // clear input values
           delInput[i+1].value = "";
        }
    }
}

//validate the text elements of the contact details section
function validateContactDetails() {
   // fetch input elements
    var textElements = document.querySelectorAll("#contact input");
    var errorDiv = document.getElementById("contacterr");
    // regex for email validation
    var emailPattern = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
    // regex for phone number validation
    var phoneNoPattern = /^[/+]?\d{10,11}$/;
    // reset fieldset validity
    var contactVal = true;
    try {
        for (var i = 0; i < textElements.length; i++) {
           // test if input elements are empty
            if (textElements[i].value === "") {
               // set background to pink
                textElements[i].style.background = "#e294b8";
                // fieldset validity is false                
                contactVal = false;
                // throw error message
                throw "Please fill out all your contact details";           
            } else {
                for (var i = 0; i < textElements.length; i++) {
                   // reset background to white
                    textElements[i].style.background = "white";
                }
            }
        }
        // test if email field contains a valid email address
        if (emailPattern.test(textElements[2].value) === false) {           
            // set background of email field to pink
            textElements[2].style.background = "#e294b8";
            // set fieldset validity to false
            contactVal = false;
            // throw error message
            throw "Please provide a valid email address";
         } else {
            textElements[2].style.background = "white";
         }
         // validate phone number field
         if (phoneNoPattern.test(textElements[3].value) === false) {
            // set background of email field to pink
            textElements[3].style.background = "#e294b8";
            // set fieldset validity to false
            contactVal = false;
            // throw error message
            throw "Please enter a valid phone number"
         } else {
            textElements[2].style.background = "white";
         }
      // hide error message div
      errorDiv.style.display = "none";
      errorDiv.innerHTML = ""
    }
    catch (message) {
       // display error message
        errorDiv.style.display = "block"
        errorDiv.innerHTML = message;
        // set form validity to false
        formVal = false;
   }   
}

//validate the text elements of the billing address section
function validateBillingAddress() {
    var textElements = document.querySelectorAll("#billingaddr input");
    var errorDiv = document.getElementById("billerr");
    var billVal = true;
    try {
        for (var i = 0; i < textElements.length; i++) {
          // test if text elements are empty
            if (textElements[i].value === "") { 
                textElements[i].style.background = "#e294b8";
                billVal = false;                
            } else {
                for (var i = 0; i < textElements.length; i++) {
                    textElements[i].style.background = "white";
                }
            }
        }
        if (billVal === false) {
            throw "Please fill out all the billing address fields.";
        }
        errorDiv.style.display = "none";
        errorDiv.innerHTML = ""
    }
    catch (message) {
      // display error message
        errorDiv.style.display = "block"
        errorDiv.innerHTML = message;
        formVal = false;
   }   
}

//validate the text elements of the billing address section
function validateDeliveryAddress() {
    var textElements = document.querySelectorAll("#deliveryaddr input");
    var checkBox = document.getElementById("sameAddr")
    var errorDiv = document.getElementById("delerr");
    var delVal = true;
    try {
        for (var i = 0; i < textElements.length; i++) {
            if (textElements[i] === checkBox) {
                continue; //ignore element if checkbox
            }
            // test if elements are empty
            if (textElements[i].value === "") {
                textElements[i].style.background = "#e294b8";
                delVal = false;                
            } else {
                for (var i = 0; i < textElements.length; i++) {
                    textElements[i].style.background = "white";
                }
            }
        }
        if (delVal === false) {
            throw "Please fill out all the delivery address fields.";
        }
        errorDiv.style.display = "none";
        errorDiv.innerHTML = ""
    }
    catch (message) {
      //display error message
        errorDiv.style.display = "block"
        errorDiv.innerHTML = message;
        formVal = false;
   }   
}

//validate the form on submit
function validateForm(evt) {
    if(evt.preventDefault) {
        //prevent the form from submitting
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    formVal = true;
    //call functions
    validateContactDetails();
    validateBillingAddress();
    validateDeliveryAddress();
    if (formVal === true) {
       //submit form if validation passed
       document.getElementById("form-01").submit();
       // clear the cookie once the order is placed
       clearCookie();
    } 
}

//add event listeners for page
function createEventListeners() {
   //event handler for same address checkbox
    var sameAddr = document.getElementById("sameAddr");
    if (sameAddr.addEventListener) {
        sameAddr.addEventListener("click", copyAddress, false);
    } else if (sameAddr.attachEvent) {
        sameAddr.attachEvent("onclick", copyAddress);
    }
    // event handler for submit button
    var submit = document.getElementById("orderbutton")
    if (submit.addEventListener) {
        submit.addEventListener("click", validateForm, false);
    } else if (submit.attachEvent) {
        submit.attachEvent("onclick", validateForm);
    }
    // event handler for delivery fee options
    var delOption = document.getElementsByName("delivery");
    if (delOption[0].addEventListener) {
       delOption[0].addEventListener("click", deliveryFee, false);
       delOption[1].addEventListener("click", deliveryFee, false);
    } else if (delOption[0].attachEvent) {
       delOption[0].attachEvent("onclick", deliveryFee);
       delOption[1].attachEvent("onclick", deliveryFee);
    }
}

// configure page on load
function setupPage() {
   createEventListeners();
   getCookie();
}

// call setupPage() function once page loads
if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setupPage);
}
    

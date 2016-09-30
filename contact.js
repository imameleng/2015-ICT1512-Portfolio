/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: contact.js
 */

"use strict"; // interpret JavaScript in strict mode
var formVal = true;


//validate the text elements of the contact details section
function validateContactDetails() {
   // fetch input elements
    var textElements = document.querySelectorAll("#form-02 input");
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
                throw "Please fill out the required contact details";           
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
    if (formVal === true) {
       //submit form if validation passed
       document.getElementById("form-02").submit();
    } 
}

function createEventListeners() {
   var submitBtn = document.getElementById("submitBtn");
   if (submitBtn.addEventListener) {
      submitBtn.addEventListener("click", validateForm, false);
   } else if (submitBtn.attachEvent) {
      submitBtn.attachEvent("onclick", validateForm);
   }
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}

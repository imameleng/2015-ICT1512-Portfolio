/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: prod_slider.js
 */

"use strict"; // interpret Javascript code in strict mode

//global variables
var photoOrder = [1, 2, 3, 4, 5, 6];
var mainImage;


//function to create image slideshow with overlay
function createSlider(e) {
   // create div container elements for image slider
   var overlay = document.createElement("div");    // opaque overlay covering entire page
   var wrapper = document.createElement("div");    // wrapper element for slider
   var leftarrow = document.createElement("div");  // container for left advance arrow
   var mainImg = document.createElement("img");    // main image container
   var rightarrow = document.createElement("div"); // container for right advance arrow
   var thumbnails = document.createElement("div"); // container for thumbnail images
   var close = document.createElement("div");      // container for close button
   // set attributes for div elements
   overlay.setAttribute("id", "overlay");
   overlay.setAttribute("class", "overlay");
   wrapper.setAttribute("id", "wrapper");
   leftarrow.setAttribute("id", "leftArrow");
   mainImg.setAttribute("id", "slide");
   mainImg.setAttribute("width", "500");
   mainImg.setAttribute("height", "500");
   rightarrow.setAttribute("id", "rightArrow");
   thumbnails.setAttribute("id", "thumbnails");
   close.setAttribute("id", "close");
   //attach overlay div to document
   document.body.appendChild(overlay);
   //attach wrapper to document
   document.body.appendChild(wrapper);
   //append remaining div's to wrapper
   wrapper.appendChild(leftarrow);
   wrapper.appendChild(mainImg);
   wrapper.appendChild(rightarrow);
   wrapper.appendChild(thumbnails);
   wrapper.appendChild(close);
   //create left and right arrows img elements
   var leftArrImg = document.createElement("img")
   var rightArrImg = document.createElement("img");
   // set attributes for arrow elements
   leftArrImg.setAttribute("src", "images/left-arrow.jpg");
   rightArrImg.setAttribute("src", "images/right-arrow.jpg");
   //attach arrow img elements to relevant div's
   leftarrow.appendChild(leftArrImg);
   rightarrow.appendChild(rightArrImg);
   //create thumnail img elements & attach to thumbnails div
   var thumbImg = [];
   for (var i = 0; i < 6; i++) {
      thumbImg[i] = document.createElement("img");
      // set attributes for thumbnail img elements
      thumbImg[i].setAttribute("width", "100");
      thumbImg[i].setAttribute("height", "100");
      // attach thumbnmails to div container
      thumbnails.appendChild(thumbImg[i]); 
   }
   // create close button and attach to close div
   var button = document.createElement("button");
   // set attributes for close button
   button.setAttribute("id", "closeButton");
   button.innerHTML = "Close";
   // append to div container
   close.appendChild(button);
   //populate main image based on caller function
   e = e || window.event; 
   var target = e.target || e.srcElement; 
   var thumbOrder = [1, 2, 3, 4, 5, 6];
   var thumbnails = document.getElementsByClassName("thumb");
   var slide = document.getElementById("slide");
   var filename;
   // set main image to thumbnail that called function
   for (var i = 0; i < thumbnails.length; i++) {
      if (target == thumbnails[i]) {
         filename = "images/prod-0" + thumbOrder[i] + ".jpg";
         slide.src = filename;
      }
   }
   //populate thumbnails
   populateThumbs();
}

//funtion to populate thumbnail images
function populateThumbs() {
   var filename;
   var currentFig;
   for (var i = 0; i < 6; i++) {
      filename = "images/prod-0" + photoOrder[i] + ".jpg";
      currentFig = document.querySelectorAll("#thumbnails img");
      currentFig[i].src = filename;
   }
}

//function to populate main image
function mainImage() {
   var slide = document.getElementById("slide");
   var filename = "images/prod-0" + photoOrder[0] + ".jpg";
   slide.src = filename;
}

//funtion to set the main image to the selected thumbnail when clicked
function setMainImage(e) {
   e = e || window.event;
   var target = e.target || e.srcElement;
   var thumbOrder = [1, 2, 3, 4, 5, 6];
   var thumbnails = document.querySelectorAll("#thumbnails img");
   var slide = document.getElementById("slide");
   var filename;
   // set main image to thumbnail that called function
   for (var i = 0; i < thumbnails.length; i++) {
      if (target == thumbnails[i]) {
         filename = "images/prod-0" + thumbOrder[i] + ".jpg";
         slide.src = filename;
      }
   }
}

//function to set image source
function setImage() {
   var slide = document.getElementById("slide");
   var filename = "images/prod-0" + photoOrder[0] + ".jpg";
   // set image source based on filename created from index value of photoOrder array
   slide.src = filename;  
}

//advance images to the left
function leftArrow() {
   // loop through array
   for (var i = 0; i < 6; i++) {
      // check if value less than images in array
      if ((photoOrder[i] - 1) === 0) { 
         // move to last image in array
         photoOrder[i] = 6;
      } else {
         // go backwards one image
         photoOrder[i] -= 1; 
      }
      setImage();
   }
}

//function rightArrow() {
//   rightAdvance();
//}

// advance images to the right
function rightArrow() {
   // loop through array
   for (var i = 0; i < 6; i++) {
      // check if value more images in array 7
      if ((photoOrder[i] + 1) === 7) {
         // set to first image in array
         photoOrder[i] = 1;
      } else {
         // advance one image
         photoOrder[i] += 1;
      }
      setImage();
   }
}

//close the slideshow
function closeSlider() {
   // remove div over and slider container div elements
   document.body.removeChild(overlay);
   document.body.removeChild(wrapper);
}

function slideEventHandlers() {
   // event handlers for left and right arrows
    var leftarrow = document.getElementById("leftArrow");
    var rightarrow = document.getElementById("rightArrow");
    if (leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
        rightarrow.addEventListener("click", rightArrow, false);
    } else if (leftarrow.attachEvent) {
        leftarrow.attachEvent("onclick", leftArrow);
        rightarrow.attachEvent("onclick", rightArrow);
    }
    //event handlers for slider thumbnail images to set main image
    var thumbnails = document.querySelectorAll("#thumbnails img");
    if (thumbnails[0].addEventListener) {
       for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].addEventListener("click", setMainImage, false);
       }
    } else if (thumbnails[0].attachEvent) {
       for (var i = 0; i < thumbnails.lenght; i++) {
          thumbnails[i].attachEvent("onclick", setMainImage); 
       }
    }
    // event handler for close button and overlay div
    var button = document.getElementById("closeButton");
    var overlay = document.getElementById("overlay");
    if (button.addEventListener) {
       // close slider when button clicked or anywhere on the overlay
       button.addEventListener("click", closeSlider, false);
       overlay.addEventListener("click", closeSlider, false);
    } else if (button.attachEvent) {
       button.attachEvent("onclick", closeSlider);
       overlay.attachEvent("onclick", closeSlider);
    }
}

//function to create event handlers for click events on product image thumbnails
function createEventListeners() {
   //event handlers for product images to open slider
   var images = document.getElementsByClassName("thumb");
   if (images[0].addEventListener) {
      for (var i = 0; i < images.length; i++) {
         images[i].addEventListener("click", createSlider, false); 
         // create event handlers for slider function only when slider loaded
         images[i].addEventListener("click", slideEventHandlers, false); 
      }
   } else if (images[0].attachEvent) {
      for (var i = 0; i < images.length; i++) {
         images[i].attachEvent("onclick", createSlider);
         images[i].attachEvent("onclick", slideEventHandlers);
      }
   }   
}

// call createEventListeners function when window loads
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}

 
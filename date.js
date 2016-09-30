/*
 * Bake it Yourself
 * Developer: PG Odendaal
 * filename: date.js
 */

"use strict"; // interpret Javascript code in strict mode

//set the current date using the Date Object
function setDate() {
    //declare new Date object
    var today = new Date();
    //declare array with the months of the year
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //declare array with the days of the week
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //use Date Object methods to retrieve current date
    var currentDay = day[today.getDay()];
    var currentDate = today.getDate();
    var currentMonth = month[today.getMonth()];
    var currentYear = today.getFullYear();
    //display date on screen
    var dateElement = document.getElementById("date");
    dateElement.innerHTML = currentDay + " " + currentDate + " " + currentMonth + " " + currentYear;
}

//call setDate() function once window has finished loading
if (window.addEventListener) {
   window.addEventListener("load", setDate, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setDate);
}

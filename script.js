"use strict";

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //it selects available seats not occupied seats
const count = document.getElementById("count");
let total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUi();
let ticketPrice = +movieSelect.value; //+ sign makes it string to integer or we can use parseint() fxn.

//Save selected mmovie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectdeMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    //copy selected seats into array
    //map through array
    //return a new array indexes

    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });
    console.log(seatsIndex);

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from locak storage and populate ui
function populateUi() {
    const selectedSeats = localStorage.getItem("selectedSeats");

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach(function(seats, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seats.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select event

movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    console.log(ticketPrice);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

//seats click event
container.addEventListener("click", function(e) {
    // console.log(e.target);

    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        //if it has the class of seats and occupied
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

//Initial count and total
updateSelectedCount();